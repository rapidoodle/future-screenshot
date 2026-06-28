'use client'

import type { GeneratedContent } from '@/lib/types'

interface Props {
  content: GeneratedContent
}

export default function BankTemplate({ content }: Props) {
  const { metrics, futureDate, appName, title } = content
  const balance = metrics.primary_value || '$127,450.00'
  const change = metrics.secondary_value || '+$12,400'
  const changeLabel = metrics.secondary_label || 'This Month'

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl select-none">
      {/* Status bar */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 pt-12 pb-10 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium opacity-80">{appName || 'Future Bank'}</div>
          <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="text-xs opacity-60 mb-4">{futureDate}</div>
        <div className="text-sm opacity-70 mb-1">Total Balance</div>
        <div className="text-4xl font-bold tracking-tight mb-2">{balance}</div>
        <div className="flex items-center gap-1 text-emerald-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-sm font-semibold">{change}</span>
          <span className="text-xs opacity-70">{changeLabel}</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="grid grid-cols-4 gap-2 mb-5">
          {['Send', 'Receive', 'Pay', 'Invest'].map((action) => (
            <div key={action} className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <div className="w-5 h-5 bg-emerald-100 rounded-full" />
              </div>
              <span className="text-xs text-gray-500 font-medium">{action}</span>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent</div>
        <div className="space-y-3">
          {[
            { label: title || 'Business Revenue', amount: metrics.primary_value || '+$12,400', color: 'text-emerald-600', icon: '🏢' },
            { label: metrics.tertiary_label || 'Investment Return', amount: metrics.tertiary_value || '+$3,200', color: 'text-emerald-600', icon: '📈' },
            { label: 'Rent Payment', amount: '-$2,800', color: 'text-gray-500', icon: '🏠' },
          ].map((tx) => (
            <div key={tx.label} className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-base">
                  {tx.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{tx.label}</span>
              </div>
              <span className={`text-sm font-bold ${tx.color}`}>{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-white border-t border-gray-100 px-6 py-4 flex justify-around">
        {['Home', 'Cards', 'Insights', 'Profile'].map((tab, i) => (
          <div key={tab} className={`flex flex-col items-center gap-1 ${i === 0 ? 'text-emerald-600' : 'text-gray-400'}`}>
            <div className={`w-5 h-5 rounded-md ${i === 0 ? 'bg-emerald-100' : 'bg-gray-100'}`} />
            <span className="text-[10px] font-medium">{tab}</span>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 px-4 py-2 text-center">
        <p className="text-[9px] text-gray-400">Generated screenshots are fictional and for motivation/entertainment only.</p>
      </div>
    </div>
  )
}
