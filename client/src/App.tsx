import { useState } from 'react'
import Header from './components/landing/Header'
import Hero from './components/landing/Hero'
import WhatWeDo from './components/landing/WhatWeDo'
import WhoWeHelp from './components/landing/WhoWeHelp'
import HowWeDoIt from './components/landing/HowWeDoIt'
import Campaigns from './components/landing/Campaigns'
import Volunteers from './components/landing/Volunteers'
import FAQ from './components/landing/FAQ'
import Footer from './components/landing/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero/>
        <WhatWeDo/>
        <WhoWeHelp/>
        <HowWeDoIt/>
        <Campaigns/>
        <Volunteers/>
        <FAQ/>
        <Footer/>
      </div>
    </div>
  )
}

export default App