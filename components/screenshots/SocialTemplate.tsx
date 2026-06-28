'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function SocialTemplate({ content }: Props) {
  const { metrics, futureDate, title, appName } = content
  const subscribers = metrics.primary_value || '2.1M'
  const views = metrics.secondary_value || '48.3M'
  const revenue = metrics.tertiary_value || '$18,240'

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl select-none">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 pt-10 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/>
            </svg>
          </div>
          <div>
            <div className="text-white font-bold">{appName || 'YouTube Studio'}</div>
            <div className="text-white/70 text-xs">{futureDate}</div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-white/80 text-xs uppercase tracking-wider mb-1">Your Channel</div>
          <div className="text-white font-black text-2xl mb-1">{title || 'Creator Milestone'}</div>
          <div className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Gold Play Button Unlocked
          </div>
        </div>
      </div>

      {/* Main stat */}
      <div className="bg-gray-50 px-6 py-5 text-center border-b border-gray-100">
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{metrics.primary_label || 'Subscribers'}</div>
        <div className="text-5xl font-black text-gray-900 tracking-tight">{subscribers}</div>
        <div className="text-green-500 text-sm font-semibold mt-1">+142K this month</div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 divide-x divide-gray-100 bg-white">
        <div className="px-6 py-4 text-center">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{metrics.secondary_label || 'Total Views'}</div>
          <div className="text-2xl font-black text-gray-900">{views}</div>
          <div className="text-green-500 text-xs font-medium">+18% MoM</div>
        </div>
        <div className="px-6 py-4 text-center">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{metrics.tertiary_label || 'Est. Revenue'}</div>
          <div className="text-2xl font-black text-gray-900">{revenue}</div>
          <div className="text-green-500 text-xs font-medium">+$2,100 MTD</div>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="px-6 pb-4">
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-3 mt-4">Views — Last 28 Days</div>
        <div className="flex items-end gap-1 h-16">
          {[40, 55, 45, 70, 60, 80, 65, 90, 75, 100, 85, 95, 88, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-red-500 to-pink-400 rounded-t-sm opacity-80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div className="bg-gray-50 px-4 pb-3 text-center">
        <p className="text-[9px] text-gray-400">Generated screenshots are fictional and for motivation/entertainment only.</p>
      </div>
    </div>
  )
}
