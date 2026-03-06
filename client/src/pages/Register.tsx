import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Heart, Loader2 } from 'lucide-react'
import { registerUser } from '../services/authService'

interface RegisterForm {
  full_name: string
  email: string
  password: string
  confirm_password: string
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterForm>()

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true)
      setError('')
      const response = await registerUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password
      })
      // Save userId for OTP page
      localStorage.setItem('pendingUserId', response.userId)
      localStorage.setItem('pendingEmail', data.email)
      navigate('/verify-otp')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">

      {/* Left — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Give<span className="text-emerald-500">Wave</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create your account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Join thousands of people solving real problems across India.
          </p>

          {/* Error */}
          {error && (
            <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                Full Name
              </label>
              <input
                {...register('full_name', { required: 'Full name is required' })}
                placeholder="Hemanth Konduri"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              {errors.full_name && (
                <p className="text-rose-500 text-xs mt-1">{errors.full_name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                Email Address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                })}
                placeholder="hemanth@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              {errors.email && (
                <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                Confirm Password
              </label>
              <input
                {...register('confirm_password', {
                  required: 'Please confirm your password',
                  validate: (val) => val === watch('password') || 'Passwords do not match'
                })}
                type="password"
                placeholder="Repeat your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              {errors.confirm_password && (
                <p className="text-rose-500 text-xs mt-1">{errors.confirm_password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-500 font-semibold hover:underline">
              Login
            </Link>
          </p>

        </motion.div>
      </div>

      {/* Right — Image */}
     {/* Right — Visual */}
<div className="hidden lg:flex flex-1 relative bg-gray-950 overflow-hidden">

  {/* Background image */}
  <img
    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80"
    alt="Community"
    className="w-full h-full object-cover opacity-40"
  />

  {/* Content overlay */}
  <div className="absolute inset-0 flex flex-col justify-between p-12">

    {/* Top — Logo watermark */}
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
        <Heart className="w-4 h-4 text-white" fill="white" />
      </div>
      <span className="text-white font-bold text-lg">
        Give<span className="text-emerald-400">Wave</span>
      </span>
    </div>

    {/* Middle — Main text */}
    <div>
      <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        India's Problem Solving Network
      </div>
      <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
        Every problem <br />deserves a <br />
        <span className="text-emerald-400">solution</span>
      </h2>
      <p className="text-gray-400 text-base leading-relaxed max-w-sm">
        Join thousands of donors, volunteers and changemakers solving real problems across India every day.
      </p>
    </div>

    {/* Bottom — Floating stat cards */}
    <div className="flex flex-col gap-4">

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: '1,200+', label: 'Campaigns' },
          { value: '92K+', label: 'Lives Helped' },
          { value: '640+', label: 'Solved' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center"
          >
            <p className="text-emerald-400 font-bold text-xl">{stat.value}</p>
            <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      {/* Recent activity */}
<div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
  {[
    { color: 'bg-emerald-400', text: 'Rahul donated ₹500 to Clean Water project' },
    { color: 'bg-blue-400', text: 'Priya joined as volunteer in Vijayawada' },
    { color: 'bg-amber-400', text: 'School benches campaign fully funded!' },
  ].map((item, i) => (
    <div key={i} className="flex items-center gap-3">
      <span className={`w-2 h-2 rounded-full shrink-0 ${item.color}`} />
      <p className="text-gray-300 text-xs">{item.text}</p>
    </div>
  ))}
</div>

    </div>
  </div>
</div>

    </div>
  )
}

export default Register