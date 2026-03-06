import { useRef } from 'react'
import { motion } from 'framer-motion'

const images = [
  {
    url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
    title: 'Donations',
    description: 'People donate money directly to verified problems. Every rupee is tracked with full transparency.'
  },
  {
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
    title: 'Volunteering',
    description: 'Skilled volunteers offer their time and effort to solve problems on the ground.'
  },
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    title: 'Clean Water',
    description: 'We fund and build water infrastructure for villages that have no access to clean drinking water.'
  },
  {
    url: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80',
    title: 'Education',
    description: 'We connect schools with donors who provide books, benches, uniforms and scholarships.'
  },
  {
    url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80',
    title: 'Medical Aid',
    description: 'Emergency medical campaigns get funded fast through our urgent campaign system.'
  },
  {
    url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80',
    title: 'Environment',
    description: 'Tree planting, cleanup drives and green energy projects powered by community donations.'
  },
  {
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
    title: 'Disaster Relief',
    description: 'When disaster strikes we mobilize funds, volunteers and resources within hours.'
  },
  {
    url: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&q=80',
    title: 'Corporate CSR',
    description: 'Companies discover verified causes and fulfill their CSR goals with full impact reports.'
  }
]

const WhatWeDo = () => {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section id="what-we-do" className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      {/* Background design - Diagonal stripes */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="diagonals" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2" className="text-emerald-200 dark:text-emerald-800" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonals)" />
        </svg>
      </div>
      <div className="relative z-10">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-emerald-500 font-semibold text-sm uppercase tracking-widest"
            >
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-2"
            >
              We solve problems <br />
              <span className="text-emerald-500">together</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 max-w-md text-base leading-relaxed"
          >
            From clean water to education, medical emergencies to disaster relief — GiveWave connects every problem with the right solution.
          </motion.p>
        </div>
      </div>

      {/* Auto scrolling image strip */}
      <div className="relative">

        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />

        <motion.div
          ref={trackRef}
          className="flex gap-5 px-12"
          animate={{ x: [0, -1800] }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: 'paused' }}
          style={{ width: 'max-content' }}
        >
          {/* Duplicate images for seamless loop */}
          {[...images, ...images].map((item, i) => (
            <motion.div
              key={i}
              className="relative w-72 h-96 rounded-3xl overflow-hidden flex-shrink-0 cursor-pointer group"
              whileHover={{ scale: 1.03, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Default overlay — title only */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute bottom-0 left-0 right-0 p-5 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
              </div>

              {/* Hover overlay — full description */}
              <div className="absolute inset-0 bg-emerald-600/90 flex flex-col justify-center items-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-emerald-50 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      </div>
    </section>
  )
}

export default WhatWeDo