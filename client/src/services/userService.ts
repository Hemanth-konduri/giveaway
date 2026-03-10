import api from './api'

const userAPI = {
  getStats: async () => {
    const response = await api.get('/api/user/stats')
    return response.data
  },

  getLiveCampaigns: async (params = {}) => {
    const response = await api.get('/api/user/live-campaigns', { params })
    return response.data
  },

  donate: async (data: { campaign_id: number; amount: number; message?: string; is_anonymous?: boolean }) => {
    const response = await api.post('/api/user/donate', data)
    return response.data
  },

  getMyDonations: async () => {
    const response = await api.get('/api/user/my-donations')
    return response.data
  },

  getHeroCampaigns: async () => {
    const response = await api.get('/api/user/hero-campaigns')
    return response.data
  },

  getActivities: async () => {
    const response = await api.get('/api/user/activities')
    return response.data
  }
}

export default userAPI
