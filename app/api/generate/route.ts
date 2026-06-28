import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { saveGeneration } from '@/lib/supabase'
import type {
  GenerationRequest,
  GeneratedContent,
  Category,
  ScreenshotTemplate,
} from '@/lib/types'
import { CATEGORY_TEMPLATE_MAP, RACE_KEYWORDS } from '@/lib/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function buildPrompt(req: GenerationRequest, todayStr: string): string {
  const { goal, category, timeframe, tone, currentSituation } = req
  const situationText = currentSituation
    ? `Their current situation: ${currentSituation}.`
    : ''

  const toneGuides: Record<string, string> = {
    Realistic: 'grounded, plausible, and genuinely motivating',
    Funny: 'hilarious, over-the-top absurd but still about the goal, with jokes',
    Dramatic: 'extremely dramatic, epic, cinematic — like a movie trailer',
    Luxury: 'dripping with opulence, designer brands, private jets, champagne',
    Motivational: 'deeply inspiring, emotional, goosebump-inducing',
  }

  // Build metric examples based on the actual goal to avoid generic outputs
  const metricExamples: Record<string, string> = {
    Money: '"primary_label": "Balance", "primary_value": "₱2,450,000", "secondary_label": "Monthly Income", "secondary_value": "₱85,000", "tertiary_label": "Savings Rate", "tertiary_value": "42%"',
    Fitness: '"primary_label": "Weight", "primary_value": "58 kg", "secondary_label": "Body Fat", "secondary_value": "18%", "tertiary_label": "Workouts Done", "tertiary_value": "312"',
    Career: '"primary_label": "Salary", "primary_value": "₱120,000/mo", "secondary_label": "Position", "secondary_value": "Senior Manager", "tertiary_label": "Years Experience", "tertiary_value": "5 yrs"',
    Business: '"primary_label": "Monthly Revenue", "primary_value": "₱850,000", "secondary_label": "Profit Margin", "secondary_value": "38%", "tertiary_label": "Clients", "tertiary_value": "47"',
    Creator: '"primary_label": "Followers", "primary_value": "1.2M", "secondary_label": "Avg Views", "secondary_value": "485K", "tertiary_label": "Monthly Earnings", "tertiary_value": "₱95,000"',
    Relationship: '"primary_label": "Milestone", "primary_value": "2 Years Together", "secondary_label": "Date Nights", "secondary_value": "104", "tertiary_label": "Happiness Score", "tertiary_value": "10/10"',
    Custom: '"primary_label": "Goal", "primary_value": "100% Complete", "secondary_label": "Time Taken", "secondary_value": "${timeframe}", "tertiary_label": "Milestones Hit", "tertiary_value": "All"',
  }

  return `You are generating content for a fun, fictional "Future Screenshot" app for users in the Philippines.
The user set a goal and you generate fake-but-motivating data as if it came true.

TODAY'S DATE: ${todayStr}
GOAL: "${goal}"
CATEGORY: ${category}
TIMEFRAME: ${timeframe} from now
TONE: ${toneGuides[tone] || tone}
${situationText}

IMPORTANT RULES FOR METRICS:
- All money values MUST use Philippine Peso (₱) — never use $ or USD
- Metrics must make sense for the SPECIFIC GOAL, not generic placeholders
- For fitness goals like Pilates, yoga, weight loss: use weight (kg), body fat %, classes attended — NOT marathon split times or race distances
- For running/race goals: use finish time, pace (min/km), placement
- Example metrics for ${category}: { ${metricExamples[category] || metricExamples.Custom} }

Generate a JSON response with these exact fields:
{
  "title": "Short punchy achievement headline (max 8 words)",
  "description": "2-3 sentence vivid description of what happened (${tone} tone), relevant to the specific goal",
  "metrics": {
    "primary_label": "Main metric name relevant to THIS specific goal",
    "primary_value": "The impressive result — use ₱ for money, kg for weight, etc.",
    "secondary_label": "Second metric relevant to THIS goal",
    "secondary_value": "Second metric value",
    "tertiary_label": "Third metric relevant to THIS goal",
    "tertiary_value": "Third metric value"
  },
  "futureDate": "A specific date exactly ${timeframe} from ${todayStr} (formatted as Month DD, YYYY)",
  "caption": "Funny or motivational 1-liner caption (${tone} tone)",
  "shareText": "Tweet-length share text with caption and hashtags",
  "appName": "Fictional Filipino app name relevant to the goal (e.g., 'PesoPal', 'FitPinas', 'KitaKita Bank')",
  "senderName": "If chat/email/DM: sender name (e.g., 'future_mo', 'Future You')",
  "narration": "A dramatic 1-2 sentence narrator voice-over. Should feel like a movie trailer or story. Examples: 'You almost quit in 2027. Good thing you didn't.' or 'This almost never happened. But you chose to keep going.' or 'Everyone said it was impossible. You wrote a different ending.' Make it emotional and personal to the goal."
}

Only return valid JSON, nothing else.`
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerationRequest = await req.json()
    const { goal, category, timeframe, tone, currentSituation } = body

    // Basic validation
    if (!goal || !category || !timeframe || !tone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (goal.length > 500) {
      return NextResponse.json({ error: 'Goal too long' }, { status: 400 })
    }

    // Pass today's real date so AI calculates future dates correctly
    const todayStr = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    // Generate with OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a creative writer for a motivational app. Generate fictional, fun, inspiring content. Always return valid JSON only.',
        },
        {
          role: 'user',
          content: buildPrompt(body, todayStr),
        },
      ],
      temperature: 0.9,
      max_tokens: 700,
      response_format: { type: 'json_object' },
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) throw new Error('No content from OpenAI')

    const aiData = JSON.parse(raw)

    // Smart template selection based on goal keywords
    let template: ScreenshotTemplate = CATEGORY_TEMPLATE_MAP[category as Category] || 'certificate'
    const goalLower = goal.toLowerCase()

    if (category === 'Fitness') {
      const isRace = RACE_KEYWORDS.some((kw) => goalLower.includes(kw))
      template = isRace ? 'race' : 'health'
    } else if (category === 'Creator') {
      const isYoutube = ['youtube', 'video', 'vlog', 'channel'].some((kw) => goalLower.includes(kw))
      template = isYoutube ? 'social' : 'spotify'
    }

    const generatedContent: GeneratedContent = {
      title: aiData.title || 'Goal Achieved!',
      description: aiData.description || '',
      metrics: aiData.metrics || {},
      futureDate: aiData.futureDate || '',
      caption: aiData.caption || '',
      shareText: aiData.shareText || '',
      template,
      narration: aiData.narration,
      appName: aiData.appName,
      senderName: aiData.senderName,
    }

    // Save to Supabase (fire-and-forget, don't block response)
    saveGeneration({
      user_id: null, // anonymous for now
      goal,
      category: category as Category,
      timeframe,
      tone,
      current_situation: currentSituation || null,
      generated_content: generatedContent,
    }).catch(console.error)

    return NextResponse.json({ success: true, data: generatedContent })
  } catch (err) {
    console.error('Generate error:', err)
    return NextResponse.json(
      { error: 'Failed to generate screenshot. Please try again.' },
      { status: 500 }
    )
  }
}
