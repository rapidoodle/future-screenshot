'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function RaceTemplate({ content }: Props) {
  const { metrics, futureDate, title, appName } = content
  const finishTime = metrics.primary_value || '3:42:15'
  const pace = metrics.secondary_value || '8:32/mi'
  const placement = metrics.tertiary_value || '247th / 12,400'

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl select-none">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 pt-10 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white text-sm font-bold opacity-90">{appName || 'Race Results'}</div>
          <div className="bg-white/20 rounded-full px-3 py-1 text-white text-xs font-semibold">OFFICIAL</div>
        </div>
        <div className="text-center">
          <div className="text-white/70 text-xs mb-2 uppercase tracking-widest">{futureDate}</div>
          <h2 className="text-white font-black text-xl mb-1">{title || 'Marathon Finisher'}</h2>
          <div className="text-orange-200 text-sm">Certificate of Completion</div>
        </div>
      </div>

      {/* Finish time - big display */}
      <div className="bg-gray-800 px-6 py-6 text-center">
        <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">Official Finish Time</div>
        <div className="text-5xl font-black text-white tracking-tight mb-1 font-mono">{finishTime}</div>
        <div className="text-orange-400 text-sm font-semibold">Personal Best</div>
      </div>

      {/* Stats grid */}
      <div className="bg-gray-900 px-6 py-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: metrics.secondary_label || 'Avg Pace', value: pace, icon: '⚡' },
            { label: metrics.tertiary_label || 'Placement', value: placement, icon: '🏅' },
            { label: 'Distance', value: '26.2 mi', icon: '📍' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-800 rounded-2xl p-3 text-center">
              <div className="text-lg mb-1">{stat.icon}</div>
              <div className="text-white font-bold text-sm leading-tight">{stat.value}</div>
              <div className="text-gray-500 text-[10px] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Splits */}
        <div className="mt-4">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-3">Split Times</div>
          {[
            { km: '10K', time: '55:12', delta: '-0:43' },
            { km: 'Half', time: '1:52:08', delta: '-1:15' },
            { km: 'Finish', time: finishTime, delta: 'PR 🔥' },
          ].map((split) => (
            <div key={split.km} className="flex items-center justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400 text-sm">{split.km}</span>
              <span className="text-white font-mono font-semibold text-sm">{split.time}</span>
              <span className="text-orange-400 text-xs font-bold">{split.delta}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 px-4 pb-4 text-center">
        <p className="text-[9px] text-gray-600">Generated screenshots are fictional and for motivation/entertainment only.</p>
      </div>
    </div>
  )
}
