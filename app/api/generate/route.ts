import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { saveGeneration } from '@/lib/supabase'
import type {
  GenerationRequest,
  GeneratedContent,
  Category,
  ScreenshotTemplate,
} from '@/lib/types'
import { CATEGORY_TEMPLATE_MAP } from '@/lib/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function buildPrompt(req: GenerationRequest): string {
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

  return `You are generating content for a fun, fictional "Future Screenshot" app.
The user set a goal and you generate fake-but-motivating data as if it came true.

GOAL: "${goal}"
CATEGORY: ${category}
TIMEFRAME: ${timeframe} from now
TONE: ${toneGuides[tone] || tone}
${situationText}

Generate a JSON response with these exact fields:
{
  "title": "Short punchy achievement headline (max 8 words)",
  "description": "2-3 sentence vivid description of what happened (${tone} tone)",
  "metrics": {
    "primary_label": "Main metric name (e.g., 'Balance', 'Subscribers', 'Finish Time')",
    "primary_value": "The impressive number or result (e.g., '$127,450', '2.1M', '3:42:15')",
    "secondary_label": "Second metric name",
    "secondary_value": "Second metric value",
    "tertiary_label": "Third metric name",
    "tertiary_value": "Third metric value"
  },
  "futureDate": "A specific date ${timeframe} from today (formatted as Month DD, YYYY)",
  "caption": "Funny or motivational 1-liner caption to share with friends (${tone} tone)",
  "shareText": "Tweet-length share text with the caption and hashtags",
  "appName": "Fictional app name that would show this data (e.g., 'CashFlow Bank', 'Strava', 'YouTube Studio')",
  "senderName": "If it's a chat/email, the sender's name (e.g., 'Future You', a celebrity name if funny tone)"
}

Rules:
- Keep it CLEARLY FICTIONAL — no real financial advice
- Numbers should be impressive but feel earned for the timeframe
- ${tone === 'Funny' ? 'Include at least one absurd joke element' : 'Keep it inspiring'}
- The data should match the category: ${category}
- Only return valid JSON, nothing else`
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
          content: buildPrompt(body),
        },
      ],
      temperature: 0.9,
      max_tokens: 600,
      response_format: { type: 'json_object' },
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) throw new Error('No content from OpenAI')

    const aiData = JSON.parse(raw)

    const template: ScreenshotTemplate =
      CATEGORY_TEMPLATE_MAP[category as Category] || 'certificate'

    const generatedContent: GeneratedContent = {
      title: aiData.title || 'Goal Achieved!',
      description: aiData.description || '',
      metrics: aiData.metrics || {},
      futureDate: aiData.futureDate || '',
      caption: aiData.caption || '',
      shareText: aiData.shareText || '',
      template,
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
