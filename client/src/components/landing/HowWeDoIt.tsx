import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Post Your Problem',
    description: 'Anyone can post a real problem — medical emergency, school needs, disaster relief or community issue. Add photos, documents and set a goal amount.',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80',
    tag: 'Get Started'
  },
  {
    number: '02',
    title: 'Get Verified & Trusted',
    description: 'Our team verifies your identity and documents. Verified campaigns get a trust badge making donors feel 100% confident to contribute.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    tag: 'Build Trust'
  },
  {
    number: '03',
    title: 'Community Steps In',
    description: 'Donors contribute money, volunteers offer time, corporates match donations and resources flow in from across the country.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    tag: 'Get Help'
  },
  {
    number: '04',
    title: 'Track Every Rupee',
    description: 'Every rupee is tracked. Campaign creators upload bills, photos and updates. Donors see exactly how their money changed lives.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tag: 'Stay Transparent'
  }
]

const HowWeDoIt = () => {
  return (
    <section id="how-we-do-it" className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background design - Grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-300 dark:text-emerald-700" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-500 font-semibold text-sm uppercase tracking-widest"
          >
            How We Do It
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-3"
          >
            Four steps to change
            <span className="text-emerald-500"> someone's life</span>
          </motion.h2>
        </div>

        {/* Steps — alternating layout */}
        <div className="flex flex-col gap-32">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                i % 2 !== 0 ? 'lg:flex lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl overflow-hidden aspect-video shadow-2xl"
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Tag badge */}
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg">
                  {step.tag}
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-6">
                <span className="text-8xl font-black text-gray-100 dark:text-gray-800 leading-none select-none">
                  {step.number}
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white -mt-6">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                  {step.description}
                </p>

                {/* Divider */}
                <div className="w-16 h-1 bg-emerald-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-32"
        >
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">
            Ready to make a difference?
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/register"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-900"
            >
              Post a Problem →
            </a>
            <a
              href="/campaigns"
              className="border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold px-8 py-4 rounded-full hover:border-emerald-500 hover:text-emerald-500 transition-all"
            >
              Browse Campaigns
            </a>
          </div>
        </motion.div>

      </div>
      </div>
    </section>
  )
}

export default HowWeDoIt