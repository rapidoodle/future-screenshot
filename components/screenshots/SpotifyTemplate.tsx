'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function SpotifyTemplate({ content }: Props) {
  const { metrics, futureDate, title, description, appName } = content
  const streams = metrics.primary_value || '4.2M'
  const listeners = metrics.secondary_value || '892K'
  const followers = metrics.tertiary_value || '1.1M'
  const year = futureDate ? new Date(futureDate).getFullYear() : new Date().getFullYear()

  return (
    <div className="w-full max-w-sm mx-auto select-none">
      <div className="bg-black rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Spotify Wrapped header */}
        <div className="bg-gradient-to-b from-[#1DB954] to-black px-6 pt-10 pb-8">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span className="text-white font-black text-sm tracking-wide">Spotify Wrapped {year}</span>
          </div>

          <div className="text-center">
            <div className="text-[#1DB954] text-xs font-bold uppercase tracking-widest mb-2">Your Year in Music</div>
            <h2 className="text-white font-black text-2xl leading-tight mb-1">{title || 'You Made Waves'}</h2>
            <p className="text-gray-300 text-sm">{futureDate}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-5 space-y-4">
          {/* Big number */}
          <div className="text-center py-4">
            <div className="text-[#1DB954] text-xs font-bold uppercase tracking-widest mb-2">{metrics.primary_label || 'Total Streams'}</div>
            <div className="text-white font-black text-5xl tracking-tight">{streams}</div>
            <div className="text-gray-400 text-sm mt-1">streams this year</div>
          </div>

          <div className="h-px bg-gray-800" />

          {/* Grid stats */}
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="text-center">
              <div className="text-[#1DB954] font-black text-2xl">{listeners}</div>
              <div className="text-gray-400 text-xs mt-1">{metrics.secondary_label || 'Monthly Listeners'}</div>
            </div>
            <div className="text-center">
              <div className="text-[#1DB954] font-black text-2xl">{followers}</div>
              <div className="text-gray-400 text-xs mt-1">{metrics.tertiary_label || 'Followers'}</div>
            </div>
          </div>

          <div className="h-px bg-gray-800" />

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed text-center py-2">
            {description || `Your music reached listeners in 47 countries. You were in the top 0.1% of artists this year.`}
          </p>

          {/* Top chart bars */}
          <div>
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-3">Monthly Streams</div>
            <div className="flex items-end gap-1 h-12">
              {[30, 45, 40, 60, 55, 80, 70, 95, 85, 100, 90, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(to top, #1DB954, #1ed760)`,
                    opacity: i === 11 ? 1 : 0.5 + (i / 24),
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-gray-600 text-[9px] mt-1">
              <span>Jan</span><span>Jun</span><span>Dec</span>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 text-center">
          <p className="text-[9px] text-gray-600">Generated screenshots are fictional and for motivation/entertainment only.</p>
        </div>
      </div>
    </div>
  )
}
