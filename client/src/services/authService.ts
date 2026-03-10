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


export const getAdminStats = async () => {
  const response = await api.get('/api/admin/stats')
  return response.data
}

export const getRecentUsers = async () => {
  const response = await api.get('/api/admin/recent-users')
  return response.data
}


export const getUserGrowth = async () => {
  const response = await api.get('/api/admin/user-growth')
  return response.data
}

export const getRoleBreakdown = async () => {
  const response = await api.get('/api/admin/role-breakdown')
  return response.data
}



