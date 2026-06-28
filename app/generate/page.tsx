'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Category, Timeframe, Tone, GeneratedContent } from '@/lib/types'

const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: 'Money', label: 'Money', icon: '💰' },
  { value: 'Fitness', label: 'Fitness', icon: '🏃' },
  { value: 'Career', label: 'Career', icon: '💼' },
  { value: 'Business', label: 'Business', icon: '🚀' },
  { value: 'Creator', label: 'Creator', icon: '🎬' },
  { value: 'Relationship', label: 'Relationship', icon: '❤️' },
  { value: 'Custom', label: 'Custom', icon: '✨' },
]

const TIMEFRAMES: { value: Timeframe; label: string }[] = [
  { value: '3 months', label: '3 months' },
  { value: '6 months', label: '6 months' },
  { value: '1 year', label: '1 year' },
  { value: '3 years', label: '3 years' },
  { value: '5 years', label: '5 years' },
]

const TONES: { value: Tone; label: string; desc: string }[] = [
  { value: 'Realistic', label: 'Realistic', desc: 'Grounded & achievable' },
  { value: 'Funny', label: 'Funny', desc: 'Absurd & hilarious' },
  { value: 'Dramatic', label: 'Dramatic', desc: 'Epic & cinematic' },
  { value: 'Luxury', label: 'Luxury', desc: 'Opulent & extravagant' },
  { value: 'Motivational', label: 'Motivational', desc: 'Inspiring & powerful' },
]

export default function GeneratePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [goal, setGoal] = useState('')
  const [category, setCategory] = useState<Category>('Money')
  const [timeframe, setTimeframe] = useState<Timeframe>('1 year')
  const [tone, setTone] = useState<Tone>('Motivational')
  const [currentSituation, setCurrentSituation] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!goal.trim()) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, category, timeframe, tone, currentSituation }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      // Store result in sessionStorage and navigate
      sessionStorage.setItem('futureshot_result', JSON.stringify(data.data))
      sessionStorage.setItem('futureshot_request', JSON.stringify({ goal, category, timeframe, tone, currentSituation }))
      router.push('/result')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const canProceedStep1 = goal.trim().length >= 5
  const canSubmit = canProceedStep1 && category && timeframe && tone

  return (
    <main className="min-h-screen bg-gradient-subtle">
      {/* Nav */}
      <nav className="fixed top-4 left-4 right-4 z-50">
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm">
          <Link href="/" className="font-black text-lg text-gradient">FutureShot</Link>
          <div className="text-sm text-gray-400 font-medium">Step {step} of 2</div>
        </div>
      </nav>

      <div className="pt-28 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-violet-600 rounded-full transition-all duration-500"
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Goal */}
            {step === 1 && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
                    What's your goal?
                  </h1>
                  <p className="text-gray-500">Be specific — the more detail, the better your screenshot.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 mb-5">
                  <label htmlFor="goal" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your future achievement
                  </label>
                  <textarea
                    id="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g. Start a profitable online business, Run a marathon under 4 hours, Get 1 million YouTube subscribers..."
                    className="w-full h-32 p-4 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm leading-relaxed placeholder:text-gray-400 transition-colors"
                    maxLength={500}
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">Be specific for best results</span>
                    <span className="text-xs text-gray-400">{goal.length}/500</span>
                  </div>
                </div>

                {/* Category */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 mb-5">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Category</div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value)}
                        className={`
                          flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer
                          ${category === cat.value
                            ? 'border-sky-500 bg-sky-50 text-sky-700'
                            : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200 hover:bg-gray-100'
                          }
                        `}
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-xs font-semibold">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="btn-cta w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            )}

            {/* Step 2: Settings */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
                    Customize your future
                  </h1>
                  <p className="text-gray-500">Set the timeframe and choose your vibe.</p>
                </div>

                {/* Timeframe */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 mb-5">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Timeframe from now</div>
                  <div className="flex flex-wrap gap-2">
                    {TIMEFRAMES.map((tf) => (
                      <button
                        key={tf.value}
                        type="button"
                        onClick={() => setTimeframe(tf.value)}
                        className={`
                          px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 cursor-pointer
                          ${timeframe === tf.value
                            ? 'border-sky-500 bg-sky-500 text-white'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                          }
                        `}
                      >
                        {tf.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tone */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 mb-5">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Tone</div>
                  <div className="space-y-2">
                    {TONES.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setTone(t.value)}
                        className={`
                          w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left
                          ${tone === t.value
                            ? 'border-sky-500 bg-sky-50'
                            : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                          }
                        `}
                      >
                        <div>
                          <div className={`text-sm font-bold ${tone === t.value ? 'text-sky-700' : 'text-gray-700'}`}>
                            {t.label}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">{t.desc}</div>
                        </div>
                        {tone === t.value && (
                          <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional: current situation */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 mb-5">
                  <label htmlFor="situation" className="block text-sm font-semibold text-gray-700 mb-1">
                    Current situation{' '}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <p className="text-xs text-gray-400 mb-3">Adds context for more personalized results</p>
                  <textarea
                    id="situation"
                    value={currentSituation}
                    onChange={(e) => setCurrentSituation(e.target.value)}
                    placeholder="e.g. Currently making $45K/year as a teacher, just started a side project..."
                    className="w-full h-20 p-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm leading-relaxed placeholder:text-gray-400 transition-colors"
                    maxLength={300}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-ghost flex-shrink-0"
                    disabled={loading}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={!canSubmit || loading}
                    className="btn-cta flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Generating your future...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generate My Future
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Generated screenshots are fictional and for motivation/entertainment only.
          </p>
        </div>
      </div>
    </main>
  )
}
