'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function EmailTemplate({ content }: Props) {
  const { metrics, futureDate, title, description, appName, senderName } = content

  const sender = senderName || appName || 'notifications@company.com'
  const subject = title || 'Congratulations — You Made It!'

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-100 rounded-[2rem] overflow-hidden shadow-2xl select-none">
      {/* Mail app header */}
      <div className="bg-white px-5 pt-10 pb-3">
        <div className="flex items-center justify-between mb-4">
          <button className="text-sky-500 font-medium text-sm cursor-pointer">Inbox</button>
          <div className="text-gray-600 font-semibold text-sm">Mail</div>
          <div className="w-16" />
        </div>
      </div>

      {/* Email detail */}
      <div className="bg-white mx-3 rounded-2xl overflow-hidden shadow-sm">
        {/* Email header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-50">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {sender.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="font-bold text-gray-900 text-sm truncate">{sender}</div>
                <div className="text-gray-400 text-xs flex-shrink-0 ml-2">{futureDate}</div>
              </div>
              <div className="text-gray-500 text-xs mt-0.5">To: You</div>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 text-base leading-snug">{subject}</h3>
        </div>

        {/* Email body */}
        <div className="px-5 py-5 space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            Dear {metrics.primary_label ? 'Future ' : ''}You,
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            {description || `We are thrilled to officially confirm your achievement. Your dedication has paid off — this is a moment to celebrate.`}
          </p>

          {/* Metrics callout */}
          <div className="bg-gradient-to-r from-sky-50 to-violet-50 rounded-xl p-4 border border-sky-100">
            <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-3">Your Results</div>
            <div className="space-y-2">
              {[
                { label: metrics.primary_label || 'Achievement', value: metrics.primary_value || '✓ Complete' },
                { label: metrics.secondary_label || 'Milestone', value: metrics.secondary_value || 'Top Performer' },
                { label: metrics.tertiary_label || 'Recognition', value: metrics.tertiary_value || 'Outstanding' },
              ].map((m) => (
                <div key={m.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{m.label}</span>
                  <span className="font-bold text-gray-900">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed">
            You did what you set out to do. This is just the beginning.
          </p>

          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-sky-500 to-violet-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
              View Full Report
            </div>
          </div>

          <p className="text-gray-400 text-xs leading-relaxed border-t border-gray-100 pt-4">
            {appName || 'Career Platform'} · {futureDate}
          </p>
        </div>
      </div>

      <div className="px-4 py-3 text-center">
        <p className="text-[9px] text-gray-400">Generated screenshots are fictional and for motivation/entertainment only.</p>
      </div>
    </div>
  )
}
