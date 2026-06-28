'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function LinkedInTemplate({ content }: Props) {
  const { metrics, futureDate, title, description, appName } = content
  const role = metrics.primary_value || 'Senior Manager'
  const company = appName || 'Dream Company PH'
  const salary = metrics.secondary_value || '₱120,000/mo'

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl select-none">
      {/* LinkedIn blue header */}
      <div className="bg-[#0A66C2] px-5 pt-10 pb-5">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span className="text-white font-bold text-sm">LinkedIn</span>
        </div>

        {/* Notification bell */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a2 2 0 01-2-2h4a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-snug">Congratulations on your new role!</p>
            <p className="text-blue-200 text-xs mt-0.5">{futureDate}</p>
          </div>
        </div>
      </div>

      {/* Profile section */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-violet-500 rounded-full flex items-center justify-center text-white text-xl font-black flex-shrink-0">
            Y
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">You</div>
            <div className="text-gray-600 text-xs mt-0.5 leading-snug">{role} at {company}</div>
            <div className="text-gray-400 text-xs mt-1">{futureDate} · <span className="text-[#0A66C2]">1st</span></div>
          </div>
        </div>
      </div>

      {/* Post card */}
      <div className="px-5 py-4">
        <p className="text-gray-800 text-sm leading-relaxed mb-3">
          🎉 Thrilled to share that I've started a new position as <strong>{role}</strong> at <strong>{company}</strong>!
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          {description || `This journey wasn't easy, but every late night and early morning was worth it. Grateful for everyone who believed in me.`}
        </p>
        <p className="text-gray-800 text-sm">#NewRole #CareerGrowth #Grateful</p>
      </div>

      {/* Metrics banner */}
      <div className="mx-5 mb-4 bg-gradient-to-r from-[#0A66C2]/10 to-violet-50 rounded-xl p-4 border border-[#0A66C2]/20">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-400 font-medium">{metrics.primary_label || 'New Salary'}</div>
            <div className="font-black text-gray-900 text-sm mt-0.5">{salary}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">{metrics.tertiary_label || 'Post Views'}</div>
            <div className="font-black text-gray-900 text-sm mt-0.5">{metrics.tertiary_value || '24,831'}</div>
          </div>
        </div>
      </div>

      {/* Reactions */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <div className="flex -space-x-1">
            {['👍','❤️','🎉'].map((e, i) => (
              <span key={i} className="text-sm">{e}</span>
            ))}
          </div>
          <span className="ml-1">4,218 · 847 comments · 2.1K reposts</span>
        </div>
        <div className="grid grid-cols-4 border-t border-gray-100 pt-3 gap-1">
          {['Like','Comment','Repost','Send'].map((action, i) => (
            <div key={action} className={`flex flex-col items-center gap-0.5 text-xs font-medium ${i === 0 ? 'text-[#0A66C2]' : 'text-gray-400'}`}>
              <div className="w-4 h-4 bg-current rounded opacity-60" style={{ borderRadius: '30%' }} />
              {action}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-2 text-center">
        <p className="text-[9px] text-gray-400">Generated screenshots are fictional and for motivation/entertainment only.</p>
      </div>
    </div>
  )
}
