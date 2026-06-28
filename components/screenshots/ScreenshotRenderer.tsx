'use client'

import type { GeneratedContent, ScreenshotTemplate } from '@/lib/types'
import BankTemplate from './BankTemplate'
import RaceTemplate from './RaceTemplate'
import HealthTemplate from './HealthTemplate'
import SocialTemplate from './SocialTemplate'
import CalendarTemplate from './CalendarTemplate'
import ChatTemplate from './ChatTemplate'
import EmailTemplate from './EmailTemplate'
import CertificateTemplate from './CertificateTemplate'

interface Props {
  content: GeneratedContent
  template?: ScreenshotTemplate
}

export default function ScreenshotRenderer({ content, template }: Props) {
  const t = template || content.template

  switch (t) {
    case 'bank':
      return <BankTemplate content={content} />
    case 'race':
      return <RaceTemplate content={content} />
    case 'health':
      return <HealthTemplate content={content} />
    case 'social':
      return <SocialTemplate content={content} />
    case 'calendar':
      return <CalendarTemplate content={content} />
    case 'chat':
      return <ChatTemplate content={content} />
    case 'email':
      return <EmailTemplate content={content} />
    case 'certificate':
    default:
      return <CertificateTemplate content={content} />
  }
}
