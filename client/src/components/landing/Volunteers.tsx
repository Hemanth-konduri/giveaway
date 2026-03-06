import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const faces = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80',
  'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=200&q=80',
  'https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=200&q=80',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?w=200&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80',
  'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=200&q=80',
]

const sizes = [
  'w-16 h-16', 'w-20 h-20', 'w-14 h-14', 'w-24 h-24',
  'w-16 h-16', 'w-20 h-20', 'w-14 h-14', 'w-18 h-18',
  'w-24 h-24', 'w-16 h-16', 'w-20 h-20', 'w-14 h-14',
  'w-20 h-20', 'w-16 h-16', 'w-24 h-24', 'w-14 h-14',
  'w-18 h-18', 'w-20 h-20', 'w-16 h-16', 'w-24 h-24',
  'w-14 h-14', 'w-20 h-20', 'w-16 h-16', 'w-18 h-18',
]

const Volunteers = () => {
  return (
   <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      {/* Background design - Hexagon pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40,0 L80,23 L80,69 L40,92 L0,69 L0,23 Z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-300 dark:text-emerald-700" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-500 font-semibold text-sm uppercase tracking-widest"
          >
            Volunteers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4"
          >
            8,400+ people who
            <span className="text-emerald-500"> give their time</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg"
          >
            You don't need money to make a difference. Your skills, time and presence can change lives across India.
          </motion.p>
        </div>

        {/* Face wall */}
        <div className="relative">

         {/* Left fade */}
<div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900" />
{/* Right fade */}
<div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900" />
          <motion.div
            className="flex gap-4 mb-4 items-center"
            style={{ width: 'max-content' }}
            animate={{ x: [0, -faces.slice(0, 12).length * 100] }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          >
            {[...faces.slice(0, 12), ...faces.slice(0, 12)].map((face, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, zIndex: 20 }}
                className={`${sizes[i % sizes.length]} rounded-full overflow-hidden flex-shrink-0 border-2 border-white dark:border-gray-800 shadow-md cursor-pointer`}
              >
                <img src={face} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>

          {/* Row 2 — right */}
          <motion.div
            className="flex gap-4 mb-4 items-center"
            style={{ width: 'max-content' }}
            animate={{ x: [-faces.slice(12).length * 100, 0] }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
          >
            {[...faces.slice(12), ...faces.slice(12)].map((face, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, zIndex: 20 }}
                className={`${sizes[(i + 4) % sizes.length]} rounded-full overflow-hidden flex-shrink-0 border-2 border-white dark:border-gray-800 shadow-md cursor-pointer`}
              >
                <img src={face} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>

          {/* Row 3 — left again */}
          <motion.div
            className="flex gap-4 items-center"
            style={{ width: 'max-content' }}
            animate={{ x: [0, -faces.slice(0, 12).length * 90] }}
            transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
          >
            {[...faces.slice(6, 18), ...faces.slice(6, 18)].map((face, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, zIndex: 20 }}
                className={`${sizes[(i + 8) % sizes.length]} rounded-full overflow-hidden flex-shrink-0 border-2 border-white dark:border-gray-800 shadow-md cursor-pointer`}
              >
                <img src={face} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Join thousands of volunteers making a real difference every day
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-900"
          >
            Become a Volunteer <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
      </div>
    </section>
  )
}

export default Volunteers