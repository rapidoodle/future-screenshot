'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function HealthTemplate({ content }: Props) {
  const { metrics, futureDate, title, appName } = content
  const primary = metrics.primary_value || '52 kg'
  const secondary = metrics.secondary_value || '18.5%'
  const tertiary = metrics.tertiary_value || '1,250'

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl select-none">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600 px-6 pt-10 pb-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-bold opacity-90">{appName || 'FitTrack'}</div>
          <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">GOAL REACHED</div>
        </div>
        <div className="text-center">
          <div className="text-white/70 text-xs mb-2 uppercase tracking-widest">{futureDate}</div>
          <h2 className="text-white font-black text-xl mb-1 leading-tight">{title || 'Body Transformation Complete'}</h2>
          <div className="text-pink-200 text-sm">Personal Milestone</div>
        </div>
      </div>

      {/* Main metric */}
      <div className="bg-gray-50 px-6 py-5 text-center border-b border-gray-100">
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{metrics.primary_label || 'Current Weight'}</div>
        <div className="text-5xl font-black text-gray-900 tracking-tight">{primary}</div>
        <div className="text-rose-500 text-sm font-semibold mt-1">Personal Best</div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 divide-x divide-gray-100 bg-white">
        <div className="px-6 py-4 text-center">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{metrics.secondary_label || 'Body Fat'}</div>
          <div className="text-2xl font-black text-gray-900">{secondary}</div>
          <div className="text-rose-500 text-xs font-medium">-8% total</div>
        </div>
        <div className="px-6 py-4 text-center">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{metrics.tertiary_label || 'Classes Done'}</div>
          <div className="text-2xl font-black text-gray-900">{tertiary}</div>
          <div className="text-rose-500 text-xs font-medium">streak 🔥</div>
        </div>
      </div>

      {/* Progress milestones */}
      <div className="px-6 pb-4 pt-2">
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-3 mt-2">Milestones Hit</div>
        <div className="space-y-2">
          {[
            { label: 'First goal weight reached', done: true },
            { label: metrics.secondary_label || 'Flexibility goal achieved', done: true },
            { label: 'Consistency streak — 90 days', done: true },
            { label: 'Final transformation goal', done: true },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 pb-5">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span className="font-bold text-rose-500">100%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-rose-400 to-fuchsia-500 rounded-full" />
        </div>
      </div>

      <div className="bg-gray-50 px-4 pb-3 text-center">
        <p className="text-[9px] text-gray-400">Generated screenshots are fictional and for motivation/entertainment only.</p>
      </div>
    </div>
  )
}
