import { motion } from 'framer-motion'
import { Heart, Mail, Phone, MapPin, Edit2, LogOut, Award, TrendingUp, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    location: 'Vijayawada, Andhra Pradesh',
    joinDate: 'January 2024',
    avatar: 'JD',
  }

  const achievements = [
    { icon: '🎯', label: 'First Donation', description: 'Made your first donation' },
    { icon: '💯', label: 'Century Donor', description: 'Donated ₹10,000+' },
    { icon: '🌟', label: 'Super Helper', description: 'Volunteered 10+ hours' },
    { icon: '🏆', label: 'Impact Leader', description: 'Helped 50+ people' },
  ]

  const donationHistory = [
    { campaign: 'Clean Water for Villages', amount: '₹5,000', date: 'Mar 15, 2024', status: 'Completed' },
    { campaign: 'Education for Every Child', amount: '₹3,500', date: 'Mar 10, 2024', status: 'Completed' },
    { campaign: 'Medical Aid for Families', amount: '₹4,000', date: 'Mar 5, 2024', status: 'Completed' },
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
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">Dashboard</Link>
            <Link to="/campaigns" className="text-gray-600 hover:text-gray-900 font-medium">Campaigns</Link>
            <button className="text-gray-600 hover:text-gray-900">Logout</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-50 to-pink-50 border border-gray-100 rounded-3xl p-8 md:p-12 mb-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Avatar */}
            <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
              {user.avatar}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined {user.joinDate}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { label: 'Total Donated', value: '₹12,500', icon: Heart },
            { label: 'Campaigns Supported', value: '8', icon: TrendingUp },
            { label: 'Volunteer Hours', value: '32 hrs', icon: Award },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600 font-medium">{stat.label}</p>
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{achievement.label}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Donation History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Donations</h2>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Campaign</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donationHistory.map((donation) => (
                    <tr key={donation.campaign} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{donation.campaign}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{donation.amount}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{donation.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default UserProfile
