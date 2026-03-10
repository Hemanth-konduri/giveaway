import { motion } from 'framer-motion'
import { Heart, Users, Target, ArrowRight, MapPin, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const stats = [
    { label: 'Donations Made', value: '₹12,500', icon: Heart, color: 'bg-red-100 text-red-600' },
    { label: 'Campaigns Supported', value: '8', icon: Target, color: 'bg-blue-100 text-blue-600' },
    { label: 'Impact Created', value: '24 Lives', icon: Users, color: 'bg-green-100 text-green-600' },
    { label: 'Volunteer Hours', value: '32 hrs', icon: Clock, color: 'bg-purple-100 text-purple-600' },
  ]

  const recentCampaigns = [
    {
      id: 1,
      title: 'Clean Water for Villages',
      location: 'Andhra Pradesh',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
      raised: 45000,
      goal: 80000,
      category: '💧 Water',
    },
    {
      id: 2,
      title: 'Education for Every Child',
      location: 'Vijayawada',
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80',
      raised: 32000,
      goal: 50000,
      category: '📚 Education',
    },
    {
      id: 3,
      title: 'Medical Aid for Families',
      location: 'Guntur',
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80',
      raised: 68000,
      goal: 100000,
      category: '🏥 Medical',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              Give<span className="text-primary">Wave</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/user/campaigns" className="text-gray-600 hover:text-gray-900 font-medium">Campaigns</Link>
            <Link to="/user/profile" className="text-gray-600 hover:text-gray-900 font-medium">Profile</Link>
            <button className="text-gray-600 hover:text-gray-900">Logout</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, Donor! 👋</h1>
          <p className="text-gray-600">Your impact is making a real difference. Here's what you've accomplished.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Campaigns Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Campaigns You're Supporting</h2>
              <p className="text-gray-600 text-sm mt-1">Keep track of your donations and impact</p>
            </div>
            <Link to="/user/campaigns" className="text-primary font-semibold hover:underline flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCampaigns.map((campaign) => {
              const progress = (campaign.raised / campaign.goal) * 100
              return (
                <motion.div
                  key={campaign.id}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">
                      {campaign.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{campaign.title}</h3>
                    <div className="flex items-center gap-1 text-gray-600 text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      {campaign.location}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>₹{campaign.raised.toLocaleString()} raised</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                    </div>

                    <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition-colors">
                      Donate More
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Discover More Ways to Help</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explore new campaigns, volunteer opportunities, or post a problem that needs solving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/user/campaigns" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Browse Campaigns
            </Link>
            <Link to="/user/volunteer" className="border border-primary text-primary hover:bg-primary/5 font-semibold px-8 py-3 rounded-lg transition-colors">
              Become a Volunteer
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard
