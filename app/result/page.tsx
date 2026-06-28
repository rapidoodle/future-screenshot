'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { GeneratedContent, GenerationRequest } from '@/lib/types'
import ScreenshotRenderer from '@/components/screenshots/ScreenshotRenderer'

export default function ResultPage() {
  const router = useRouter()
  const screenshotRef = useRef<HTMLDivElement>(null)

  const [content, setContent] = useState<GeneratedContent | null>(null)
  const [request, setRequest] = useState<GenerationRequest | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedContent = sessionStorage.getItem('futureshot_result')
    const storedRequest = sessionStorage.getItem('futureshot_request')

    if (!storedContent) {
      router.replace('/generate')
      return
    }

    try {
      setContent(JSON.parse(storedContent))
      if (storedRequest) setRequest(JSON.parse(storedRequest))
    } catch {
      router.replace('/generate')
    }
  }, [router])

  async function handleDownload() {
    if (!screenshotRef.current || !content) return
    setDownloading(true)

    try {
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(screenshotRef.current, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      })

      const link = document.createElement('a')
      link.download = `futureshot-${content.template}-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Download failed:', err)
      setError('Download failed. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  async function handleShare() {
    if (!content) return

    const shareText = content.shareText || `${content.caption} 🚀 Generate your own future screenshot at FutureShot!`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Future Screenshot',
          text: shareText,
          url: window.location.origin,
        })
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 3000)
    }
  }

  async function handleRegenerate() {
    if (!request) return
    setRegenerating(true)
    setError('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      sessionStorage.setItem('futureshot_result', JSON.stringify(data.data))
      setContent(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Regeneration failed')
    } finally {
      setRegenerating(false)
    }
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading your future...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-subtle">
      {/* Nav */}
      <nav className="fixed top-4 left-4 right-4 z-50">
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm">
          <Link href="/" className="font-black text-lg text-gradient">FutureShot</Link>
          <Link href="/generate" className="btn-secondary text-sm py-1.5 px-3">
            Create Another
          </Link>
        </div>
      </nav>

      <div className="pt-28 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Your future is ready
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
              {content.title}
            </h1>
            <p className="text-gray-500 text-lg max-w-md mx-auto">{content.description}</p>
          </div>

          {/* Screenshot card */}
          <div
            ref={screenshotRef}
            className="mb-6 animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            <ScreenshotRenderer content={content} />
          </div>

          {/* Caption */}
          <div
            className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 mb-6 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Caption</div>
            <p className="text-gray-800 font-semibold text-base leading-relaxed italic">
              &ldquo;{content.caption}&rdquo;
            </p>
          </div>

          {/* Action buttons */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <div
            className="grid grid-cols-2 gap-3 mb-3 animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="btn-primary justify-center disabled:opacity-60"
            >
              {downloading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PNG
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="btn-secondary justify-center"
            >
              {shareSuccess ? (
                <>
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </>
              )}
            </button>
          </div>

          <div
            className="grid grid-cols-2 gap-3 animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="btn-ghost justify-center border border-gray-200 disabled:opacity-60"
            >
              {regenerating ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Regenerating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Regenerate
                </>
              )}
            </button>

            <Link href="/generate" className="btn-ghost justify-center border border-gray-200 text-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Screenshot
            </Link>
          </div>

          {/* Share text preview */}
          {content.shareText && (
            <div
              className="mt-6 bg-white rounded-2xl p-5 shadow-card border border-gray-100 animate-slide-up"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Share text</div>
              <p className="text-gray-600 text-sm leading-relaxed">{content.shareText}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(content.shareText)
                  setShareSuccess(true)
                  setTimeout(() => setShareSuccess(false), 2000)
                }}
                className="mt-3 text-sky-500 text-xs font-semibold hover:text-sky-600 cursor-pointer transition-colors"
              >
                Copy to clipboard
              </button>
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-8">
            Generated screenshots are fictional and for motivation/entertainment only.
          </p>
        </div>
      </div>
    </main>
  )
}
