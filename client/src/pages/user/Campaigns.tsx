import { motion } from 'framer-motion'
import { Heart, Search, Filter, MapPin, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Campaigns = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const campaigns = [
    {
      id: 1,
      title: 'Clean Water for Villages',
      location: 'Andhra Pradesh',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80',
      raised: 45000,
      goal: 80000,
      category: 'Water',
      donors: 234,
      urgency: 'Medium',
    },
    {
      id: 2,
      title: 'Education for Every Child',
      location: 'Vijayawada',
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&q=80',
      raised: 32000,
      goal: 50000,
      category: 'Education',
      donors: 156,
      urgency: 'Low',
    },
    {
      id: 3,
      title: 'Medical Aid for Families',
      location: 'Guntur',
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&q=80',
      raised: 68000,
      goal: 100000,
      category: 'Medical',
      donors: 412,
      urgency: 'High',
    },
    {
      id: 4,
      title: 'Plant 10,000 Trees',
      location: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&q=80',
      raised: 22000,
      goal: 40000,
      category: 'Environment',
      donors: 89,
      urgency: 'Low',
    },
    {
      id: 5,
      title: 'Flood Relief',
      location: 'Krishna',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80',
      raised: 95000,
      goal: 120000,
      category: 'Disaster',
      donors: 567,
      urgency: 'High',
    },
    {
      id: 6,
      title: 'Free Medical Camp',
      location: 'Vizianagaram',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&q=80',
      raised: 18000,
      goal: 35000,
      category: 'Medical',
      donors: 102,
      urgency: 'Medium',
    },
  ]

  const categories = ['all', 'Water', 'Education', 'Medical', 'Environment', 'Disaster']

  const filteredCampaigns = campaigns.filter(c => {
    const matchCategory = selectedCategory === 'all' || c.category === selectedCategory
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       c.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

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
            <Link to="/user/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">Dashboard</Link>
            <Link to="/user/profile" className="text-gray-600 hover:text-gray-900 font-medium">Profile</Link>
            <button className="text-gray-600 hover:text-gray-900">Logout</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-50 to-pink-50 border-b border-gray-100 py-12"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Active Campaigns</h1>
          <p className="text-gray-600">Find campaigns that matter to you and make a real difference</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              <span>More Filters</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign, i) => {
            const progress = (campaign.raised / campaign.goal) * 100
            const urgencyColor: Record<string, string> = {
              High: 'bg-red-100 text-red-700',
              Medium: 'bg-yellow-100 text-yellow-700',
              Low: 'bg-green-100 text-green-700',
            }

            return (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
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
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${urgencyColor[campaign.urgency]}`}>
                      {campaign.urgency}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{campaign.title}</h3>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {campaign.location}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {campaign.donors} donors
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>₹{campaign.raised.toLocaleString()}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-lg transition-colors">
                    Donate Now
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredCampaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">No campaigns found matching your search.</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default Campaigns
