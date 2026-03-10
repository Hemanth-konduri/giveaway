import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Heart, Users, Target } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const campaigns = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80",
    title: "Clean Water for Villages",
    location: "Andhra Pradesh",
    raised: 45000,
    goal: 80000,
    category: "💧 Water",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&q=80",
    title: "Education for Every Child",
    location: "Vijayawada",
    raised: 32000,
    goal: 50000,
    category: "📚 Education",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&q=80",
    title: "Medical Aid for Families",
    location: "Guntur",
    raised: 68000,
    goal: 100000,
    category: "🏥 Medical",
  },
]


const cardPositions = [
  {
    scale: 1,
    y: 0,
    x: 0,
    rotate: -2,
    zIndex: 30,
    opacity: 1
  },
  {
    scale: 0.9,
    y: 30,
    x: 30,
    rotate: 3,
    zIndex: 20,
    opacity: 0.9
  },
  {
    scale: 0.8,
    y: 60,
    x: 60,
    rotate: 6,
    zIndex: 10,
    opacity: 0.7
  }
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % campaigns.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* ===== Animated Gradient Background ===== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-red-500/20 blur-[140px] rounded-full"
        />

        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-250px] right-[-200px] w-[700px] h-[700px] bg-pink-400/20 blur-[160px] rounded-full"
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-[30%] left-[40%] w-[400px] h-[400px] bg-orange-400/10 blur-[120px] rounded-full"
        />

      </div>

      {/* ===== Content Container ===== */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* ===== TEXT SECTION ===== */}

        <div className="space-y-8 text-center lg:text-left">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            India's Problem Solving Network
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            Every Problem
            <br />

            <span className="text-red-600 relative">
              Deserves
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-1 left-0 h-1 bg-red-300 rounded-full"
              />
            </span>{" "}
            a Solution
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0"
          >
            GiveWave connects real problems with real solutions through
            donations, volunteers and community action.
          </motion.p>

          {/* Stats */}

          <div className="flex justify-center lg:justify-start gap-10">

            {[
              { icon: Heart, label: "Campaigns", value: "1,200+" },
              { icon: Users, label: "Volunteers", value: "8,400+" },
              { icon: Target, label: "Solved", value: "640+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <div className="flex items-center gap-2 text-red-600">
                  <Icon className="w-5 h-5" />
                  <span className="text-2xl font-bold text-gray-900">
                    {value}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}

          </div>

          {/* Buttons */}

          <div className="flex justify-center lg:justify-start gap-4 flex-wrap">

            <Link to="/register">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-base">
                Start a Campaign <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>

            <Link to="/campaigns">
              <Button variant="outline" className="px-8 py-6 text-base">
                Browse Problems
              </Button>
            </Link>

          </div>

        </div>

        {/* ===== CAMPAIGN CARDS ===== */}

        <div className="relative flex justify-center items-center h-[500px] order-2 lg:order-2">

  {campaigns.map((campaign, index) => {

    const position = (index - current + campaigns.length) % campaigns.length

    if (position > 2) return null

    const style = cardPositions[position]
    const progressPercent = (campaign.raised / campaign.goal) * 100

    return (
      <motion.div
        key={campaign.id}
        animate={style}
        transition={{
          duration: 0.7,
          ease: [0.32, 0.72, 0, 1]
        }}
        className="absolute w-[340px] rounded-lg overflow-hidden shadow-2xl cursor-pointer"
        onClick={() => setCurrent((prev) => (prev + 1) % campaigns.length)}
      >

        <div className="relative">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-[420px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

            <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {campaign.category}
            </span>

            <h3 className="text-xl font-bold mt-3 mb-1">{campaign.title}</h3>

            <p className="text-sm text-white/70 mb-3">
              📍 {campaign.location}
            </p>

            <div className="w-full bg-white/20 rounded-full h-1.5 mb-2">
              <div
                className="bg-primary h-1.5 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-white/70">
              <span>₹{campaign.raised.toLocaleString()} raised</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>

          </div>
        </div>

      </motion.div>
    )
  })}

</div>

      </div>
    </section>
  )
}
