'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function AppleWalletTemplate({ content }: Props) {
  const { metrics, futureDate, title, appName } = content
  const balance = metrics.primary_value || '₱2,450,000'
  const income = metrics.secondary_value || '₱85,000'
  const savings = metrics.tertiary_value || '42%'

  const transactions = [
    { label: title || 'Business Revenue', amount: `+${income}`, time: '9:41 AM', color: 'text-emerald-400' },
    { label: 'Transfer to Savings', amount: `-${savings}`, time: 'Yesterday', color: 'text-gray-400' },
    { label: metrics.tertiary_label || 'Investment Return', amount: `+${savings}`, time: 'Jun 12', color: 'text-emerald-400' },
  ]

  return (
    <div className="w-full max-w-sm mx-auto select-none" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      {/* Phone chrome */}
      <div className="bg-black rounded-[3rem] p-3 shadow-2xl">
        <div className="bg-black rounded-[2.5rem] overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-7 pt-4 pb-2">
            <span className="text-white text-xs font-semibold">9:41</span>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 12">
                <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4"/>
                <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6"/>
                <rect x="9" y="0" width="3" height="12" rx="1"/>
                <rect x="13.5" y="0" width="3" height="12" rx="1"/>
              </svg>
              <svg className="w-4 h-3 text-white" fill="currentColor" viewBox="0 0 20 14">
                <path d="M10 2.5C6.5 2.5 3.4 4 1.2 6.4L0 5.2C2.6 2.3 6.1.5 10 .5s7.4 1.8 10 4.7l-1.2 1.2C16.6 4 13.5 2.5 10 2.5z" opacity="0.4"/>
                <path d="M10 6.5c-2.2 0-4.2.9-5.6 2.4L3.2 7.7C5 5.8 7.4 4.5 10 4.5s5 1.3 6.8 3.2l-1.2 1.2C14.2 7.4 12.2 6.5 10 6.5z" opacity="0.7"/>
                <path d="M10 10.5c-1.1 0-2.1.4-2.8 1.1L6 10.4C7.1 9.2 8.5 8.5 10 8.5s2.9.7 4 1.9l-1.2 1.2c-.7-.7-1.7-1.1-2.8-1.1z"/>
                <circle cx="10" cy="13.5" r="1.5"/>
              </svg>
              <div className="flex items-center gap-0.5">
                <div className="w-6 h-3 border border-white/60 rounded-sm p-0.5">
                  <div className="h-full w-4/5 bg-white rounded-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Wallet card */}
          <div className="mx-4 mb-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 border border-gray-700/50 shadow-xl">
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-gray-400 text-xs font-medium mb-0.5">{appName || 'Maya Bank'}</div>
                  <div className="text-gray-500 text-[10px]">Savings Account</div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full" />
              </div>

              {/* Balance */}
              <div className="mb-5">
                <div className="text-gray-400 text-xs mb-1">Available Balance</div>
                <div className="text-white text-3xl font-bold tracking-tight">{balance}</div>
                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-emerald-400 text-xs font-semibold">{income} this month</span>
                </div>
              </div>

              {/* Card number */}
              <div className="flex items-center justify-between">
                <div className="text-gray-600 text-xs tracking-widest">•••• •••• •••• 8421</div>
                <div className="text-gray-500 text-xs">{futureDate?.split(',')[0]}</div>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="px-4 pb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white text-sm font-semibold">Recent</span>
              <span className="text-blue-400 text-xs">See All</span>
            </div>
            <div className="space-y-1">
              {transactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-600 rounded-sm" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium leading-tight">{tx.label}</div>
                      <div className="text-gray-500 text-xs">{tx.time}</div>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${tx.color}`}>{tx.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="flex justify-around px-8 pb-8 pt-2 border-t border-gray-800/50">
            {['Cards', 'Payments', 'Passes', 'More'].map((tab, i) => (
              <div key={tab} className={`flex flex-col items-center gap-1 ${i === 0 ? 'text-white' : 'text-gray-600'}`}>
                <div className="w-5 h-5 bg-current rounded opacity-80" style={{ borderRadius: '30%' }} />
                <span className="text-[9px]">{tab}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <p className="text-[9px] text-gray-400">Generated screenshots are fictional and for motivation/entertainment only.</p>
      </div>
    </div>
  )
}
