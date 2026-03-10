import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Heart, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone, ArrowRight } from "lucide-react"

const Footer = () => {
return ( <footer className="bg-gray-950 text-white pt-24 pb-10 px-6 relative overflow-hidden">


  {/* subtle background glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/10 blur-[140px] rounded-full" />
  </div>

  <div className="max-w-7xl mx-auto relative z-10">

    {/* CTA Strip */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-20 border border-gray-800 rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6 bg-gray-900/40 backdrop-blur"
    >
      <div>
        <h3 className="text-2xl font-bold mb-1">
          Ready to make a difference?
        </h3>
        <p className="text-gray-400 text-sm">
          Join thousands solving real problems across India.
        </p>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link
          to="/register"
          className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-full font-semibold flex items-center gap-2"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/campaigns"
          className="border border-gray-700 hover:border-gray-500 px-6 py-3 rounded-full font-semibold"
        >
          Browse Campaigns
        </Link>
      </div>
    </motion.div>

    {/* Main footer grid */}
    <div className="grid lg:grid-cols-4 gap-14 mb-16">

      {/* Brand */}
      <div>
        <Link to="/" className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="text-xl font-bold">
            Give<span className="text-primary">Wave</span>
          </span>
        </Link>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Connecting real problems with real solutions through donations,
          volunteers and community action.
        </p>

        {/* contact */}
        <div className="flex flex-col gap-3 text-gray-400 text-sm mb-6">

          <div className="flex gap-2 items-center">
            <MapPin className="w-4 h-4 text-primary" />
            Vijayawada, Andhra Pradesh
          </div>

          <div className="flex gap-2 items-center">
            <Mail className="w-4 h-4 text-primary" />
            support@givewave.in
          </div>

          <div className="flex gap-2 items-center">
            <Phone className="w-4 h-4 text-primary" />
            +91 98765 43210
          </div>

        </div>

        {/* social */}
        <div className="flex gap-3">

          {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-9 h-9 bg-gray-900 hover:bg-primary rounded-full flex items-center justify-center transition"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}

        </div>
      </div>

      {/* Platform */}
      <div>
        <h4 className="font-semibold mb-5 text-gray-200">
          Platform
        </h4>

        <ul className="space-y-3 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white">Browse Campaigns</a></li>
          <li><a href="#" className="hover:text-white">Post a Problem</a></li>
          <li><a href="#" className="hover:text-white">Volunteer</a></li>
          <li><a href="#" className="hover:text-white">Corporate CSR</a></li>
          <li><a href="#" className="hover:text-white">Disaster Relief</a></li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="font-semibold mb-5 text-gray-200">
          Company
        </h4>

        <ul className="space-y-3 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white">About</a></li>
          <li><a href="#" className="hover:text-white">Mission</a></li>
          <li><a href="#" className="hover:text-white">Team</a></li>
          <li><a href="#" className="hover:text-white">Blog</a></li>
          <li><a href="#" className="hover:text-white">Careers</a></li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h4 className="font-semibold mb-5 text-gray-200">
          Legal
        </h4>

        <ul className="space-y-3 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white">Terms</a></li>
          <li><a href="#" className="hover:text-white">Refund Policy</a></li>
          <li><a href="#" className="hover:text-white">Transparency</a></li>
          <li><a href="#" className="hover:text-white">Contact</a></li>
        </ul>
      </div>

    </div>

    {/* bottom bar */}
    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-3">

      <p>
        © 2025 GiveWave — Built with ❤️ in Vijayawada
      </p>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        All systems operational
      </div>

    </div>

  </div>
</footer>


)
}

export default Footer
