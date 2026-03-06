import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

const row1 = [
  {
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    title: 'Build a Water Tank for Govt School',
    location: 'Vijayawada, AP',
    category: 'Clean Water',
    raised: 55,
  },
  {
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
    title: 'Heart Surgery for 6 Year Old Child',
    location: 'Guntur, AP',
    category: 'Medical',
    raised: 73,
  },
  {
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80',
    title: 'Scholarships for 50 Girls in Rural AP',
    location: 'Kurnool, AP',
    category: 'Education',
    raised: 68,
  },
  {
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80',
    title: 'Plant 10,000 Trees Across Telangana',
    location: 'Hyderabad, TS',
    category: 'Environment',
    raised: 42,
  },
  {
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
    title: 'Flood Relief for 200 Families',
    location: 'Krishna, AP',
    category: 'Disaster Relief',
    raised: 88,
  },
]

const row2 = [
  {
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
    title: 'Weekend Teaching Drive for Slum Kids',
    location: 'Visakhapatnam, AP',
    category: 'Volunteering',
    raised: 35,
  },
  {
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80',
    title: 'Free Medical Camp in Tribal Areas',
    location: 'Vizianagaram, AP',
    category: 'Medical',
    raised: 61,
  },
  {
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&q=80',
    title: 'Build Toilets in Village School',
    location: 'Nellore, AP',
    category: 'Infrastructure',
    raised: 79,
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    title: 'Solar Panels for Rural Homes',
    location: 'Kadapa, AP',
    category: 'Environment',
    raised: 52,
  },
  {
    image: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=600&q=80',
    title: 'Animal Shelter Food & Medicine',
    location: 'Tirupati, AP',
    category: 'Animal Rescue',
    raised: 44,
  },
]

const Card = ({ item }: { item: typeof row1[0] }) => (
  <motion.div
    whileHover={{ scale: 1.03, zIndex: 10 }}
    transition={{ duration: 0.3 }}
    className="relative w-72 h-80 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer group"
  >
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

    {/* Category badge */}
    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
      {item.category}
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-5">
      <h3 className="text-white font-bold text-sm leading-snug mb-2">
        {item.title}
      </h3>
      <div className="flex items-center gap-1 text-white/60 text-xs mb-3">
        <MapPin className="w-3 h-3" />
        {item.location}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/20 rounded-full h-1 mb-1">
        <div
          className="bg-emerald-400 h-1 rounded-full"
          style={{ width: `${item.raised}%` }}
        />
      </div>
      <div className="flex justify-between text-white/60 text-xs">
        <span>{item.raised}% funded</span>
        <span className="text-emerald-400 font-semibold">Donate →</span>
      </div>
    </div>
  </motion.div>
)

const MarqueeRow = ({
  items,
  direction,
}: {
  items: typeof row1
  direction: 'left' | 'right'
}) => {
  const doubled = [...items, ...items]
  const animate = direction === 'left'
    ? { x: [0, -items.length * 304] }
    : { x: [-items.length * 304, 0] }

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-6"
        style={{ width: 'max-content' }}
        animate={animate}
        transition={{
          duration: 25,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {doubled.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </motion.div>
    </div>
  )
}

const Campaigns = () => {
  return (
    <section id="campaigns" className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      {/* Background design - Wavy lines */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 600">
          <defs>
            <pattern id="waves" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M0,100 Q50,50 100,100 T200,100" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-300 dark:text-emerald-700" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>
      </div>
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-emerald-500 font-semibold text-sm uppercase tracking-widest"
            >
              Live Campaigns
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-2"
            >
              Problems waiting <br />
              <span className="text-emerald-500">for your help</span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="/campaigns"
            className="text-emerald-500 font-semibold hover:underline text-sm self-end"
          >
            View all campaigns →
          </motion.a>
        </div>
      </div>

      {/* Row 1 — left to right */}
      <div className="mb-6">
        <MarqueeRow items={row1} direction="left" />
      </div>

      {/* Row 2 — right to left */}
      <MarqueeRow items={row2} direction="right" />

      </div>
    </section>
  )
}

export default Campaigns