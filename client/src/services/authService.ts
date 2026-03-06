import api from './api'

export const registerUser = async (data: {
  full_name: string
  email: string
  password: string
}) => {
  const response = await api.post('/api/auth/register', data)
  return response.data
}

export const verifyOTP = async (data: {
  userId: number
  otp: string
}) => {
  const response = await api.post('/api/auth/verify-otp', data)
  return response.data
}

export const loginUser = async (data: {
  email: string
  password: string
}) => {
  const response = await api.post('/api/auth/login', data)
  return response.data
}