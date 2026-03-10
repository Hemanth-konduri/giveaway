import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WhoWeHelp = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  useEffect(() => {
    if (!videoRef.current) return
    if (isInView) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }, [isInView])

  return (
    <section id="who-we-help" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background design - Dots pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="3" fill="rgb(239, 68, 68)" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm uppercase tracking-widest"
          >
            Who We Help
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4"
          >
            Real people. <span className="text-primary">Real problems.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg"
          >
            From flood victims to students who can't afford books — GiveWave exists for every person who needs help and every person who wants to give it.
          </motion.p>
        </div>

        {/* Video Container */}
<motion.div
  ref={sectionRef}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="relative rounded-lg overflow-hidden bg-black"
  style={{ aspectRatio: '16/9' }}
>
  <iframe
    width="100%"
    height="100%"
    src={`https://www.youtube.com/embed/gg16HNVtAO0?autoplay=${isInView ? 1 : 0}&mute=1&loop=1&playlist=gg16HNVtAO0&controls=0&showinfo=0&rel=0&modestbranding=1`}
    title="Who We Help"
    allow="autoplay; encrypted-media"
    allowFullScreen
    className="absolute inset-0 w-full h-full"
    style={{ border: 'none' }}
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/30 pointer-events-none" />

  {/* Bottom overlay — text + stats */}
  <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/80 to-transparent pointer-events-none">
    <div className="flex items-end justify-between flex-wrap gap-6">
      <div>
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
          Our Mission
        </p>
        <h3 className="text-white text-2xl lg:text-3xl font-bold max-w-xl">
          Every rupee you give changes a real life
        </h3>
      </div>

      {/* Stats */}
      <div className="flex gap-8 text-center">
        {[
          { value: '1,200+', label: 'Problems Posted' },
          { value: '640+', label: 'Fully Solved' },
          { value: '92,000+', label: 'Lives Impacted' },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
            <p className="text-white/60 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>

</motion.div>

        {/* Category pills - horizontal scroll */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3 }}
  className="mt-10 overflow-hidden"
>
  <motion.div
    className="flex gap-4"
    style={{ width: 'max-content' }}
    animate={{ x: [0, -900] }}
    transition={{
      duration: 20,
      ease: 'linear',
      repeat: Infinity,
    }}
  >
    {[
      { label: 'Medical Aid', color: 'bg-rose-100 text-rose-600' },
      { label: 'Education', color: 'bg-blue-100 text-blue-600' },
      { label: 'Disaster Relief', color: 'bg-cyan-100 text-cyan-600' },
      { label: 'Clean Water', color: 'bg-sky-100 text-sky-600' },
      { label: 'Infrastructure', color: 'bg-amber-100 text-amber-600' },
      { label: 'Animal Rescue', color: 'bg-orange-100 text-orange-600' },
      { label: 'Environment', color: 'bg-emerald-100 text-emerald-600' },
      { label: 'Elderly Care', color: 'bg-purple-100 text-purple-600' },
      { label: 'Child Welfare', color: 'bg-pink-100 text-pink-600' },
      { label: 'Women Safety', color: 'bg-fuchsia-100 text-fuchsia-600' },
      // duplicate for seamless loop
      { label: 'Medical Aid', color: 'bg-rose-100 text-rose-600' },
      { label: 'Education', color: 'bg-blue-100 text-blue-600' },
      { label: 'Disaster Relief', color: 'bg-cyan-100 text-cyan-600' },
      { label: 'Clean Water', color: 'bg-sky-100 text-sky-600' },
      { label: 'Infrastructure', color: 'bg-amber-100 text-amber-600' },
      { label: 'Animal Rescue', color: 'bg-orange-100 text-orange-600' },
      { label: 'Environment', color: 'bg-emerald-100 text-emerald-600' },
      { label: 'Elderly Care', color: 'bg-purple-100 text-purple-600' },
      { label: 'Child Welfare', color: 'bg-pink-100 text-pink-600' },
      { label: 'Women Safety', color: 'bg-fuchsia-100 text-fuchsia-600' },
    ].map((cat, i) => (
      <span
        key={i}
        className={`px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap ${cat.color}`}
      >
        {cat.label}
      </span>
    ))}
  </motion.div>
</motion.div>

      </div>
      </div>
    </section>
  )
}

export default WhoWeHelp
