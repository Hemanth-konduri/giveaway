import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Give<span className="text-primary">Wave</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['What We Do', 'Who We Help', 'Campaigns', 'Volunteers', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link to="/login">
            <Button variant="ghost" className="font-medium">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-6">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t dark:border-gray-800 px-6 py-4 flex flex-col gap-4">
          {['What We Do', 'Who We Help', 'Campaigns', 'Volunteers', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              {item}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/login" className="flex-1">
              <Button variant="outline" className="w-full">Login</Button>
            </Link>
            <Link to="/register" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header