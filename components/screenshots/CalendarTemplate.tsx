'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function CalendarTemplate({ content }: Props) {
  const { metrics, futureDate, title, description, appName } = content

  // Parse date for display
  const dateObj = futureDate ? new Date(futureDate) : new Date()
  const month = dateObj.toLocaleString('default', { month: 'long' })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  const dayName = dateObj.toLocaleString('default', { weekday: 'long' })

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl select-none">
      {/* iOS-style header */}
      <div className="bg-gradient-to-b from-sky-500 to-sky-600 px-6 pt-10 pb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold opacity-90">{appName || 'Calendar'}</div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">{day}</div>
        </div>
        <div className="text-center">
          <div className="text-white/70 text-sm font-medium">{month} {year}</div>
          <div className="text-5xl font-black mt-1">{day}</div>
          <div className="text-white/80 text-sm">{dayName}</div>
        </div>
      </div>

      {/* Mini calendar grid */}
      <div className="bg-sky-50 px-6 py-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <div key={i} className="text-[10px] font-bold text-gray-400">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {Array.from({ length: 35 }, (_, i) => {
            const num = i - 3 // offset
            const isToday = num === day
            const hasEvent = [day, day - 3, day + 2, day + 5].includes(num)
            return (
              <div key={i} className={`
                w-7 h-7 mx-auto flex items-center justify-center text-xs rounded-full font-medium
                ${isToday ? 'bg-sky-500 text-white font-bold' : ''}
                ${hasEvent && !isToday ? 'bg-sky-100 text-sky-600' : ''}
                ${!isToday && !hasEvent ? 'text-gray-500' : ''}
              `}>
                {num > 0 && num <= 31 ? num : ''}
              </div>
            )
          })}
        </div>
      </div>

      {/* Events */}
      <div className="px-6 py-4">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Events Today</div>

        {/* Main event */}
        <div className="bg-gradient-to-r from-sky-500 to-violet-500 rounded-2xl p-4 text-white mb-3 shadow-lg">
          <div className="text-xs opacity-80 mb-1">All Day</div>
          <div className="font-bold text-base leading-snug mb-1">{title || 'Goal Achieved!'}</div>
          <div className="text-xs opacity-80 line-clamp-2">{description || metrics.primary_value}</div>
        </div>

        {/* Other events */}
        {[
          { time: '9:00 AM', label: 'Celebration Breakfast', color: 'bg-yellow-400' },
          { time: '2:00 PM', label: metrics.tertiary_label || 'Team Announcement', color: 'bg-emerald-400' },
          { time: '7:00 PM', label: 'Dinner with Family', color: 'bg-pink-400' },
        ].map((evt) => (
          <div key={evt.label} className="flex items-center gap-3 py-2.5 border-b border-gray-50">
            <div className={`w-1 h-10 ${evt.color} rounded-full`} />
            <div>
              <div className="text-xs text-gray-400 font-medium">{evt.time}</div>
              <div className="text-sm font-semibold text-gray-700">{evt.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 px-4 py-3 text-center">
        <p className="text-[9px] text-gray-400">Generated screenshots are fictional and for motivation/entertainment only.</p>
      </div>
    </div>
  )
}
