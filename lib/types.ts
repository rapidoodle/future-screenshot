export type Category =
  | 'Money'
  | 'Fitness'
  | 'Career'
  | 'Business'
  | 'Creator'
  | 'Relationship'
  | 'Custom'

export type Timeframe =
  | '3 months'
  | '6 months'
  | '1 year'
  | '3 years'
  | '5 years'

export type Tone =
  | 'Realistic'
  | 'Funny'
  | 'Dramatic'
  | 'Luxury'
  | 'Motivational'

export type ScreenshotTemplate =
  | 'bank'
  | 'apple-wallet'
  | 'race'
  | 'health'
  | 'social'
  | 'spotify'
  | 'linkedin'
  | 'gmail'
  | 'instagram'
  | 'calendar'
  | 'chat'
  | 'email'
  | 'certificate'

export interface GenerationRequest {
  goal: string
  category: Category
  timeframe: Timeframe
  tone: Tone
  currentSituation?: string
}

export interface GeneratedContent {
  title: string
  description: string
  metrics: Record<string, string>
  futureDate: string
  caption: string
  shareText: string
  template: ScreenshotTemplate
  narration?: string   // dramatic one-liner narrator text
  appName?: string
  senderName?: string
  achievementName?: string
}

export interface Generation {
  id: string
  user_id: string | null
  goal: string
  category: Category
  timeframe: Timeframe
  tone: Tone
  current_situation: string | null
  generated_content: GeneratedContent
  created_at: string
}

// Default fallback map (API will override with smarter goal-based selection)
export const CATEGORY_TEMPLATE_MAP: Record<Category, ScreenshotTemplate> = {
  Money: 'apple-wallet',
  Fitness: 'health',       // API upgrades to 'race' for running goals
  Creator: 'spotify',      // API upgrades to 'social' for YouTube goals
  Career: 'linkedin',
  Business: 'gmail',
  Relationship: 'instagram',
  Custom: 'calendar',
}

// Keywords that indicate a running/race goal
export const RACE_KEYWORDS = [
  'marathon', 'run', 'race', '5k', '10k', 'triathlon',
  'sprint', 'cycling', 'swim', 'ironman', 'half marathon',
]
