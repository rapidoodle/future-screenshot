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
  | 'race'
  | 'social'
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

// Map category -> template
export const CATEGORY_TEMPLATE_MAP: Record<Category, ScreenshotTemplate> = {
  Money: 'bank',
  Fitness: 'race',
  Creator: 'social',
  Career: 'email',
  Business: 'certificate',
  Relationship: 'chat',
  Custom: 'calendar',
}
