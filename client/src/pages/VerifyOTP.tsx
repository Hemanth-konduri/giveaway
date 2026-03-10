import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Loader2, ArrowRight, Mail } from 'lucide-react'
import { verifyOTP } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const navigate = useNavigate()
  const { login } = useAuth()

  const email = localStorage.getItem('pendingEmail') || ''
  const userId = localStorage.getItem('pendingUserId') || ''

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pasted)) return
    const newOtp = pasted.split('').concat(Array(6).fill('')).slice(0, 6)
    setOtp(newOtp)
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const handleSubmit = async () => {
    const otpString = otp.join('')
    if (otpString.length !== 6) {
      setError('Please enter the complete 6 digit OTP')
      return
    }
    try {
      setLoading(true)
      setError('')
      const response = await verifyOTP({
        userId: parseInt(userId),
        otp: otpString
      })
      login(response.user, response.token)
      localStorage.removeItem('pendingUserId')
      localStorage.removeItem('pendingEmail')
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      {/* Background design */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="grid-otp" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="1" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-otp)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Give<span className="text-primary">Wave</span>
            </span>
          </Link>
          <Link to="/register" className="text-sm text-primary font-semibold hover:underline">
            Back to sign up
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Icon */}
          <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Verify your email
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              We sent a 6-digit code to{' '}
              <span className="text-primary font-semibold">{email}</span>
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* OTP inputs */}
          <div className="flex gap-2 justify-between mb-8" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none transition-all ${
                  digit
                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-gray-200 dark:border-gray-700 focus:border-primary'
                }`}
              />
            ))}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading || otp.join('').length !== 6}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mb-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify email
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Resend */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Didn't receive the code?{' '}
            {countdown > 0 ? (
              <span className="text-gray-400">Resend in {countdown}s</span>
            ) : (
              <button
                onClick={() => setCountdown(60)}
                className="text-primary font-semibold hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-gray-950 text-gray-500">or</span>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-700 dark:text-blue-400">
            <p className="font-semibold mb-1">Didn't receive an email?</p>
            <p className="text-xs">Check your spam folder or try signing up again with a different email address.</p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-gray-100 dark:border-gray-800 py-6 px-6">
        <div className="max-w-7xl mx-auto text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Your account is secure and protected with industry-standard encryption</p>
        </div>
      </div>
    </div>
  )
}

export default VerifyOTP
