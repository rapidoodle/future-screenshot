'use client'

import type { GeneratedContent, ScreenshotTemplate } from '@/lib/types'
import BankTemplate from './BankTemplate'
import AppleWalletTemplate from './AppleWalletTemplate'
import RaceTemplate from './RaceTemplate'
import HealthTemplate from './HealthTemplate'
import SocialTemplate from './SocialTemplate'
import SpotifyTemplate from './SpotifyTemplate'
import LinkedInTemplate from './LinkedInTemplate'
import GmailTemplate from './GmailTemplate'
import InstagramTemplate from './InstagramTemplate'
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
    case 'apple-wallet':
      return <AppleWalletTemplate content={content} />
    case 'bank':
      return <BankTemplate content={content} />
    case 'race':
      return <RaceTemplate content={content} />
    case 'health':
      return <HealthTemplate content={content} />
    case 'social':
      return <SocialTemplate content={content} />
    case 'spotify':
      return <SpotifyTemplate content={content} />
    case 'linkedin':
      return <LinkedInTemplate content={content} />
    case 'gmail':
      return <GmailTemplate content={content} />
    case 'instagram':
      return <InstagramTemplate content={content} />
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
