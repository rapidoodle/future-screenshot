'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function CertificateTemplate({ content }: Props) {
  const { metrics, futureDate, title, description, achievementName } = content

  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-amber-50 to-yellow-50 rounded-[2rem] overflow-hidden shadow-2xl select-none border-2 border-amber-200">
      {/* Gold border accent */}
      <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

      <div className="px-8 py-8">
        {/* Header ornament */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-300" />
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-300" />
          </div>

          <div className="text-amber-600 text-xs uppercase tracking-[0.3em] font-semibold mb-1">
            Certificate of Achievement
          </div>
          <div className="text-xs text-amber-500">{futureDate}</div>
        </div>

        {/* Main content */}
        <div className="text-center mb-6">
          <div className="text-amber-700 text-sm mb-3">This certifies that</div>
          <div className="font-black text-gray-900 text-2xl leading-tight mb-2">You</div>
          <div className="text-amber-700 text-sm mb-3">has successfully achieved</div>
          <div className="font-black text-gray-900 text-xl leading-tight px-4">
            {achievementName || title || 'Extraordinary Business Success'}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/60 rounded-xl px-4 py-3 mb-5 border border-amber-100">
          <p className="text-gray-600 text-sm text-center leading-relaxed">
            {description || `An outstanding milestone demonstrating exceptional dedication, perseverance, and skill.`}
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { label: metrics.primary_label || 'Revenue', value: metrics.primary_value || '$1M+' },
            { label: metrics.secondary_label || 'Growth', value: metrics.secondary_value || '340%' },
            { label: metrics.tertiary_label || 'Impact', value: metrics.tertiary_value || 'Global' },
          ].map((m) => (
            <div key={m.label} className="text-center bg-white/60 rounded-xl p-2 border border-amber-100">
              <div className="font-black text-gray-900 text-sm">{m.value}</div>
              <div className="text-amber-600 text-[10px] font-medium">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Signature area */}
        <div className="flex items-end justify-between border-t border-amber-200 pt-4">
          <div className="text-center">
            <div className="font-bold text-gray-700 text-xs mb-1" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '18px', color: '#78350f' }}>
              Future You
            </div>
            <div className="h-px w-24 bg-amber-300" />
            <div className="text-amber-600 text-[10px] mt-1">Awarded to</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-md">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-amber-600 text-[10px]">Verified</div>
          </div>
        </div>
      </div>

      <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />
      <div className="bg-amber-50 px-4 py-2 text-center">
        <p className="text-[9px] text-amber-400">Generated screenshots are fictional and for motivation/entertainment only.</p>
      </div>
    </div>
  )
}
