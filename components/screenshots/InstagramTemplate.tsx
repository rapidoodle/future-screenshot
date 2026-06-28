'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function InstagramTemplate({ content }: Props) {
  const { metrics, futureDate, title, caption, senderName } = content
  const sender = senderName || 'future_you'

  const messages = [
    {
      from: 'them',
      text: `Hey. It's you — from ${futureDate}. 👋`,
      time: '11:42 PM',
    },
    {
      from: 'them',
      text: title || "We made it. Everything you're working towards right now? It happens.",
      time: '11:42 PM',
    },
    {
      from: 'me',
      text: 'Wait what??? How?? 😭',
      time: '11:43 PM',
    },
    {
      from: 'them',
      text: `${metrics.primary_label || 'The result'}: ${metrics.primary_value || 'Beyond what you imagined'} 🔥`,
      time: '11:43 PM',
    },
    {
      from: 'them',
      text: caption || "Don't give up. I'm proof it works.",
      time: '11:44 PM',
    },
    {
      from: 'me',
      text: 'I needed this so badly right now 🥹',
      time: '11:44 PM',
    },
  ]

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl select-none">
      {/* Instagram DM header */}
      <div className="bg-white px-4 pt-10 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f09433"/>
                <stop offset="25%" stopColor="#e6683c"/>
                <stop offset="50%" stopColor="#dc2743"/>
                <stop offset="75%" stopColor="#cc2366"/>
                <stop offset="100%" stopColor="#bc1888"/>
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" stroke="url(#ig-grad)" strokeWidth="2"/>
            <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-grad)"/>
          </svg>
          <span className="text-gray-800 font-semibold text-sm">Direct</span>
        </div>
      </div>

      {/* DM thread header */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
            style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">F</div>
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <div>
          <div className="font-bold text-gray-900 text-sm">{sender}</div>
          <div className="text-gray-400 text-xs">Active now · from {futureDate}</div>
        </div>
        <div className="ml-auto">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white px-4 py-4 space-y-2 min-h-[280px]">
        <div className="text-center text-xs text-gray-400 mb-2">{futureDate}</div>

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {msg.from === 'them' && (
              <div className="w-6 h-6 rounded-full flex-shrink-0 mb-1"
                style={{ background: 'linear-gradient(45deg, #f09433, #bc1888)' }}>
                <div className="w-full h-full flex items-center justify-center text-white text-[9px] font-bold">F</div>
              </div>
            )}
            <div
              className={`max-w-[72%] px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.from === 'me'
                  ? 'bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white rounded-2xl rounded-br-sm'
                  : 'bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm'
              }`}
            >
              {msg.text}
              <div className={`text-[9px] mt-1 ${msg.from === 'me' ? 'text-pink-200' : 'text-gray-400'} text-right`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        {/* Seen indicator */}
        <div className="flex justify-end">
          <span className="text-[10px] text-gray-400">Seen {futureDate}</span>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-2">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-400 text-sm">Message...</div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(45deg, #f09433, #bc1888)' }}>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-2 text-center">
        <p className="text-[9px] text-gray-400">Generated screenshots are fictional and for motivation/entertainment only.</p>
      </div>
    </div>
  )
}
