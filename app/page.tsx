import Link from 'next/link'
import BankTemplate from '@/components/screenshots/BankTemplate'
import RaceTemplate from '@/components/screenshots/RaceTemplate'
import SocialTemplate from '@/components/screenshots/SocialTemplate'
import CertificateTemplate from '@/components/screenshots/CertificateTemplate'

// Example cards data
const EXAMPLE_CARDS = [
  {
    label: 'Money',
    template: 'bank' as const,
    content: {
      title: 'Business Took Off',
      description: 'Your online business has hit 6 figures!',
      metrics: {
        primary_label: 'Balance',
        primary_value: '$127,450.00',
        secondary_label: 'This Month',
        secondary_value: '+$18,200',
        tertiary_label: 'Investment Return',
        tertiary_value: '+$4,100',
      },
      futureDate: 'December 15, 2026',
      caption: 'Started from the bottom, now my bank app glitches because it can\'t count this high.',
      shareText: '',
      template: 'bank' as const,
      appName: 'WealthFlow Bank',
    },
  },
  {
    label: 'Fitness',
    template: 'race' as const,
    content: {
      title: 'First Marathon Conquered',
      description: 'You finished the Boston Marathon!',
      metrics: {
        primary_label: 'Finish Time',
        primary_value: '3:42:15',
        secondary_label: 'Avg Pace',
        secondary_value: '8:32/mi',
        tertiary_label: 'Placement',
        tertiary_value: '247th / 12,400',
      },
      futureDate: 'April 21, 2027',
      caption: 'My legs said no but my future self said YES.',
      shareText: '',
      template: 'race' as const,
      appName: 'RunTracker Pro',
    },
  },
  {
    label: 'Creator',
    template: 'social' as const,
    content: {
      title: 'YouTube Gold Button',
      description: 'You crossed 1 million subscribers!',
      metrics: {
        primary_label: 'Subscribers',
        primary_value: '2.1M',
        secondary_label: 'Total Views',
        secondary_value: '48.3M',
        tertiary_label: 'Est. Revenue',
        tertiary_value: '$18,240',
      },
      futureDate: 'March 8, 2027',
      caption: 'They said "nobody watches long videos" — 2.1 million people disagree.',
      shareText: '',
      template: 'social' as const,
      appName: 'YouTube Studio',
    },
  },
  {
    label: 'Career',
    template: 'certificate' as const,
    content: {
      title: 'Senior Engineer at Dream Company',
      description: 'You landed the job you always wanted.',
      metrics: {
        primary_label: 'Salary',
        primary_value: '$245,000',
        secondary_label: 'TC',
        secondary_value: '$320K',
        tertiary_label: 'Level',
        tertiary_value: 'Senior L6',
      },
      futureDate: 'September 1, 2027',
      caption: 'Rejection letters are just delayed acceptance.',
      shareText: '',
      template: 'certificate' as const,
      achievementName: 'Senior Software Engineer — Dream Tech Co.',
    },
  },
]

const TESTIMONIALS = [
  {
    text: '"I cried when I saw my future bank balance. Then I got to work."',
    name: 'Alex K.',
    role: 'Entrepreneur',
  },
  {
    text: '"Showed my future marathon time to my coach. He said it was impossible. I trained harder."',
    name: 'Maria L.',
    role: 'Runner',
  },
  {
    text: '"The YouTube screenshot made me post my first video. 50K subs later..."',
    name: 'James T.',
    role: 'Content Creator',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-4 left-4 right-4 z-50">
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm">
          <div className="font-black text-lg text-gradient">FutureShot</div>
          <div className="flex items-center gap-3">
            <Link
              href="/generate"
              className="btn-primary text-sm px-4 py-2"
            >
              Generate Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background gradient blob */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-200/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse-slow" />
            100% fictional · 100% motivating
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
            See screenshots{' '}
            <br />
            <span className="text-gradient">from your future self.</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Set your goal, choose your vibe, and generate a fake-but-hilarious screenshot of your future success.
            Motivate yourself. Make your friends jealous. Frame it on the wall.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/generate" className="btn-cta">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate My Future — Free
            </Link>
            <p className="text-sm text-gray-400">No sign-up required · 3 free generations/day</p>
          </div>
        </div>
      </section>

      {/* Example cards */}
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              What your future looks like
            </h2>
            <p className="text-gray-500 text-lg">Real templates, fictional data, genuine motivation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXAMPLE_CARDS.map((card) => (
              <div
                key={card.label}
                className="group relative transform hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-float"
                style={{ animationDelay: `${EXAMPLE_CARDS.indexOf(card) * 1.5}s` }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gradient-hero text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {card.label}
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-card group-hover:shadow-card-hover transition-shadow duration-300">
                  {card.template === 'bank' && <BankTemplate content={card.content} />}
                  {card.template === 'race' && <RaceTemplate content={card.content} />}
                  {card.template === 'social' && <SocialTemplate content={card.content} />}
                  {card.template === 'certificate' && <CertificateTemplate content={card.content} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">How it works</h2>
            <p className="text-gray-500 text-lg">Three steps to your future glory.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Set your goal',
                description: 'Tell us what you want to achieve — money, fitness, career, or anything else.',
                color: 'from-sky-400 to-sky-600',
              },
              {
                step: '02',
                title: 'Choose your vibe',
                description: 'Pick your category, timeframe, and tone — from Realistic to Absolutely Dramatic.',
                color: 'from-violet-400 to-violet-600',
              },
              {
                step: '03',
                title: 'Get your screenshot',
                description: 'AI generates a fake-but-epic screenshot of your achieved future. Download and share.',
                color: 'from-orange-400 to-orange-600',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-white font-black text-xl">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/generate" className="btn-cta">
              Start Now — It's Free
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-subtle">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">People are manifesting</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">{t.text}</p>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Simple pricing</h2>
            <p className="text-gray-500">Start free. Go pro when you're ready to manifest harder.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-7 shadow-card">
              <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Free</div>
              <div className="text-4xl font-black text-gray-900 mb-1">$0</div>
              <div className="text-gray-400 text-sm mb-6">forever</div>
              <ul className="space-y-3 mb-8">
                {[
                  '3 generations per day',
                  '7 screenshot templates',
                  'Download as PNG',
                  'Share on social',
                  'FutureShot watermark',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <Link href="/generate" className="btn-secondary w-full text-center">
                Get Started Free
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-sky-500 to-violet-600 rounded-2xl p-7 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                COMING SOON
              </div>
              <div className="text-sky-200 text-sm font-semibold uppercase tracking-wider mb-2">Pro</div>
              <div className="text-4xl font-black text-white mb-1">$9</div>
              <div className="text-sky-300 text-sm mb-6">per month</div>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited generations',
                  'Premium templates',
                  'No watermark',
                  'HD downloads (4K)',
                  'Priority AI generation',
                  'Early access to new features',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-white">
                    <svg className="w-4 h-4 text-sky-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-sky-600 font-bold py-3 rounded-xl cursor-pointer hover:bg-sky-50 transition-colors duration-200" disabled>
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-sky-600 via-violet-600 to-purple-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Your future is waiting.
          </h2>
          <p className="text-sky-200 text-xl mb-10">
            Generate your first screenshot free. No sign-up needed.
          </p>
          <Link href="/generate" className="inline-flex items-center gap-2 bg-white text-violet-700 font-black px-10 py-4 rounded-xl text-lg hover:bg-sky-50 transition-colors duration-200 shadow-cta cursor-pointer">
            Generate My Future
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-center">
        <div className="font-black text-white text-lg mb-2">FutureShot</div>
        <p className="text-gray-500 text-sm mb-4">
          Generated screenshots are fictional and for motivation/entertainment only.
        </p>
        <p className="text-gray-600 text-xs">© 2026 FutureShot. All rights reserved.</p>
      </footer>
    </main>
  )
}
