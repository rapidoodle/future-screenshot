'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function ChatTemplate({ content }: Props) {
  const { metrics, futureDate, title, description, senderName, caption } = content

  const sender = senderName || 'Future You'
  const timeStr = '2:47 PM'

  const messages = [
    {
      from: 'them',
      text: `Hey, I'm you — from ${futureDate}. Just wanted to say... you did it. 🎉`,
      time: '2:41 PM',
    },
    {
      from: 'them',
      text: title || 'Goal achieved! You actually made it happen.',
      time: '2:41 PM',
    },
    {
      from: 'me',
      text: 'Wait, what?? Tell me everything!',
      time: '2:42 PM',
    },
    {
      from: 'them',
      text: description || `${metrics.primary_label}: ${metrics.primary_value}. Can you believe it?`,
      time: '2:43 PM',
    },
    {
      from: 'them',
      text: caption || 'Trust the process. You got this. 💪',
      time: timeStr,
    },
    {
      from: 'me',
      text: "I'm literally crying 😭 Thank you!",
      time: timeStr,
    },
  ]

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl select-none">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 pt-10 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {sender.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-300 rounded-full border-2 border-green-500" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">{sender}</div>
            <div className="text-green-200 text-xs">Online • from {futureDate}</div>
          </div>
          <div className="ml-auto flex gap-3">
            <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-gray-50 px-4 py-4 space-y-2 min-h-[280px]">
        <div className="text-center text-xs text-gray-400 mb-3">{futureDate}</div>

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.from === 'me'
                  ? 'bg-green-500 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'
              }`}
            >
              {msg.text}
              <div className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-green-200' : 'text-gray-400'} text-right`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-2">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-gray-400 text-sm">
          Message...
        </div>
        <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center">
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
