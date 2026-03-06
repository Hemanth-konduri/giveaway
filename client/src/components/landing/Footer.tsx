import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-emerald-500 rounded-3xl p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Ready to make a difference?
            </h3>
            <p className="text-emerald-100 text-sm">
              Join 92,000+ people already solving real problems across India.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/register"
              className="bg-white text-emerald-600 font-bold px-8 py-3 rounded-full hover:bg-emerald-50 transition-all whitespace-nowrap"
            >
              Get Started →
            </Link>
            <Link
              to="/campaigns"
              className="border-2 border-white/50 text-white font-bold px-8 py-3 rounded-full hover:border-white transition-all whitespace-nowrap"
            >
              Browse Campaigns
            </Link>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold">
                Give<span className="text-emerald-500">Wave</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              India's Problem Solving Network — connecting real problems with real solutions through donations, volunteers and community support.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                { icon: MapPin, text: 'Vijayawada, Andhra Pradesh, India' },
                { icon: Mail, text: 'support@givewave.in' },
                { icon: Phone, text: '+91 98765 43210' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-gray-400 text-sm">
                  <Icon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Github, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">
              Platform
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                'Browse Campaigns',
                'Post a Problem',
                'Become a Volunteer',
                'Corporate CSR',
                'Emergency Aid',
                'Disaster Relief',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                'About Us',
                'Our Mission',
                'Team',
                'Blog',
                'Press',
                'Careers',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                'Privacy Policy',
                'Terms of Service',
                'Refund Policy',
                'Cookie Policy',
                'Transparency Report',
                'Contact Us',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 GiveWave. All rights reserved. Made with ❤️ in Vijayawada.
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            All systems operational
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer