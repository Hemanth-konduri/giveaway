import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Heart, Users, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const campaigns = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80',
    title: 'Clean Water for Villages',
    location: 'Andhra Pradesh',
    raised: 45000,
    goal: 80000,
    category: '💧 Water'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&q=80',
    title: 'Education for Every Child',
    location: 'Vijayawada',
    raised: 32000,
    goal: 50000,
    category: '📚 Education'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&q=80',
    title: 'Medical Aid for Families',
    location: 'Guntur',
    raised: 68000,
    goal: 100000,
    category: '🏥 Medical'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&q=80',
    title: 'Plant 10,000 Trees',
    location: 'Telangana',
    raised: 21000,
    goal: 40000,
    category: '🌿 Environment'
  }
]

const Hero = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % campaigns.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const progressPercent = (campaigns[current].raised / campaigns[current].goal) * 100

  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-6 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background design - Gradient circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
      </div>
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Side — Text */}
       {/* Left Side — Text */}
<div className="space-y-8">

  {/* Badge */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-medium"
  >
    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
    India's Problem Solving Network
  </motion.div>

  {/* Headline */}
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
  >
    Every Problem
    <br />
    <span className="text-emerald-500 relative">
      Deserves
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-1 left-0 h-1 bg-emerald-200 dark:bg-emerald-800 rounded-full -z-10"
      />
    </span>
    {' '}a Solution
  </motion.h1>

  {/* Description */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg"
  >
    GiveWave connects real problems with real solutions — through donations, volunteers, resources and community support. Together we solve what no one can alone.
  </motion.p>

  {/* Stats */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="flex gap-8"
  >
    {[
      { icon: Heart, label: 'Campaigns', value: '1,200+', color: 'text-rose-500' },
      { icon: Users, label: 'Volunteers', value: '8,400+', color: 'text-blue-500' },
      { icon: Target, label: 'Solved', value: '640+', color: 'text-emerald-500' }
    ].map(({ icon: Icon, label, value, color }, i) => (
      <motion.div
        key={label}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="flex flex-col"
      >
        <div className={`flex items-center gap-1 ${color} mb-1`}>
          <Icon className="w-4 h-4" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </motion.div>
    ))}
  </motion.div>

  {/* Floating activity cards */}
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.5 }}
    className="flex flex-col gap-3"
  >
    
  </motion.div>

  {/* CTA Buttons */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.8 }}
    className="flex gap-4 flex-wrap"
  >
    <Link to="/register">
      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-6 text-base font-semibold">
        Start a Campaign <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </Link>
    <Link to="/campaigns">
      <Button variant="outline" className="rounded-full px-8 py-6 text-base font-semibold dark:border-gray-700 dark:text-white">
        Browse Problems
      </Button>
    </Link>
  </motion.div>

</div>

       {/* Right Side — Card Deck */}
{/* Right Side — Card Deck */}
<div className="relative flex justify-center items-center h-[500px]">

  {campaigns.map((campaign, i) => {
    const offset = (i - current + campaigns.length) % campaigns.length
    const progressPercent = (campaign.raised / campaign.goal) * 100

    return (
      <motion.div
        key={campaign.id}
        layout
        animate={{
          rotate: offset === 0 ? -2 : offset === 1 ? 3 : offset === 2 ? 7 : 10,
          x: offset === 0 ? 0 : offset === 1 ? 16 : offset === 2 ? 30 : 44,
          y: offset === 0 ? 0 : offset === 1 ? 16 : offset === 2 ? 30 : 44,
          scale: offset === 0 ? 1 : offset === 1 ? 0.94 : offset === 2 ? 0.88 : 0.82,
          zIndex: offset === 0 ? 30 : offset === 1 ? 20 : offset === 2 ? 10 : 0,
          opacity: offset === 0 ? 1 : offset === 1 ? 0.9 : offset === 2 ? 0.75 : 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.32, 0.72, 0, 1],
          layout: { duration: 0.7 }
        }}
        className="absolute w-[340px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
        onClick={() => {
          if (offset === 0) setCurrent((prev) => (prev + 1) % campaigns.length)
        }}
      >
        <div className="relative">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-[420px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <motion.div
            animate={{ opacity: offset === 0 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
          >
            <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {campaign.category}
            </span>
            <h3 className="text-xl font-bold mt-3 mb-1">{campaign.title}</h3>
            <p className="text-sm text-white/70 mb-3">📍 {campaign.location}</p>
            <div className="w-full bg-white/20 rounded-full h-1.5 mb-2">
              <div
                className="bg-emerald-400 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/70">
              <span>₹{campaign.raised.toLocaleString()} raised</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  })}

  {/* Click hint */}
  <motion.p
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="absolute -bottom-8 text-sm text-gray-400 dark:text-gray-500"
  >
    Click card to browse →
  </motion.p>

  {/* Dots */}
  <div className="absolute -bottom-16 flex gap-2">
    {campaigns.map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrent(i)}
        className={`h-2 rounded-full transition-all duration-300 ${
          i === current
            ? 'bg-emerald-500 w-6'
            : 'bg-gray-300 dark:bg-gray-600 w-2'
        }`}
      />
    ))}
  </div>

</div>

      </div>
    </section>
  )
}

export default Hero