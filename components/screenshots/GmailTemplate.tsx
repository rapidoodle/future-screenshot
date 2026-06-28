'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function GmailTemplate({ content }: Props) {
  const { metrics, futureDate, title, description, appName, senderName } = content
  const sender = senderName || appName || 'Stripe'
  const subject = title || 'You\'ve hit ₱1,000,000 in revenue 🎉'

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl select-none">
      {/* Gmail header */}
      <div className="bg-white px-5 pt-10 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M6 18V6l6 4.5L18 6v12" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6h12" stroke="#EA4335" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-gray-700 font-bold text-sm">Gmail</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-sky-400 to-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold">Y</div>
          </div>
        </div>

        {/* Email subject line */}
        <h2 className="text-gray-900 font-bold text-base leading-snug mb-1">{subject}</h2>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold text-xs flex-shrink-0">
            {sender.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-gray-800 text-xs font-semibold">{sender} <span className="text-gray-400 font-normal">&lt;noreply@{sender.toLowerCase().replace(/\s/g, '')}.com&gt;</span></div>
            <div className="text-gray-400 text-xs">to me · {futureDate}</div>
          </div>
        </div>
      </div>

      {/* Email body */}
      <div className="px-5 py-5 space-y-4">
        {/* Hero banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 text-center text-white">
          <div className="text-3xl mb-1">🎉</div>
          <div className="font-black text-xl mb-1">{metrics.primary_value || '₱1,000,000'}</div>
          <div className="text-emerald-100 text-sm">{metrics.primary_label || 'Total Revenue'}</div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          Hi there,
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          {description || `Congratulations! You've reached an incredible milestone. This is the result of your hard work, consistency, and vision. Take a moment to celebrate — you've earned it.`}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: metrics.secondary_label || 'This Month', value: metrics.secondary_value || '₱85,000' },
            { label: metrics.tertiary_label || 'Total Customers', value: metrics.tertiary_value || '1,247' },
          ].map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <div className="font-black text-gray-900 text-sm">{s.value}</div>
              <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          Keep going. This is just the beginning.
        </p>
        <p className="text-gray-600 text-sm font-medium">— The {sender} Team</p>

        {/* CTA button */}
        <div className="text-center pt-2">
          <div className="inline-block bg-[#4285F4] text-white text-sm font-semibold px-6 py-2.5 rounded-full">
            View Dashboard
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3">
          <p className="text-gray-400 text-[10px] text-center leading-relaxed">
            {sender} · {futureDate}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-2 text-center">
        <p className="text-[9px] text-gray-400">Generated screenshots are fictional and for motivation/entertainment only.</p>
      </div>
    </div>
  )
}
