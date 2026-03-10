import { Routes, Route } from 'react-router-dom'
import Header from './components/landing/Header'
import Hero from './components/landing/Hero'
import WhatWeDo from './components/landing/WhatWeDo'
import WhoWeHelp from './components/landing/WhoWeHelp'
import HowWeDoIt from './components/landing/HowWeDoIt'
import Campaigns from './components/landing/Campaigns'
import Volunteers from './components/landing/Volunteers'
import FAQ from './components/landing/FAQ'
import Footer from './components/landing/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import { useState } from 'react'
import VerifyOTP from './pages/VerifyOTP'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './pages/admin/AdminLayout'
import AdminOverview from './pages/admin/AdminOverview'

const LandingPage = ({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) => (
  <>
    <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    <Hero />
    <WhatWeDo />
    <WhoWeHelp />
    <HowWeDoIt />
    <Campaigns />
    <Volunteers />
    <FAQ />
    <Footer />
  </>
)

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Routes>
          <Route path="/" element={<LandingPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/register" element={<Register />} />
         <Route path="/verify-otp" element={<VerifyOTP />} />
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={
  <ProtectedRoute>
    <div>User Dashboard — coming soon</div>
  </ProtectedRoute>
} />

<Route path="/admin" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <AdminOverview />
    </AdminLayout>
  </ProtectedRoute>
} />

<Route path="/manager" element={
  <ProtectedRoute allowedRoles={['admin', 'manager']}>
    <div>Manager Dashboard — coming soon</div>
  </ProtectedRoute>
} />
        </Routes>
      </div>
    </div>
  )
}

export default App