import api from './api'

const campaignAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/api/campaigns', { params })
    return response.data
  },

  getOne: async (id: number) => {
    const response = await api.get(`/api/campaigns/${id}`)
    return response.data
  },

  create: async (data: any) => {
    const response = await api.post('/api/campaigns', data)
    return response.data
  },

  update: async (id: number, data: any) => {
    const response = await api.put(`/api/campaigns/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    const response = await api.delete(`/api/campaigns/${id}`)
    return response.data
  },

  approve: async (id: number) => {
    const response = await api.post(`/api/campaigns/${id}/approve`)
    return response.data
  },

  reject: async (id: number, reason: string) => {
    const response = await api.post(`/api/campaigns/${id}/reject`, { reason })
    return response.data
  },

  getStats: async () => {
    const response = await api.get('/api/campaigns/stats')
    return response.data
  },

  getManagersList: async () => {
    const response = await api.get('/api/campaigns/managers-list')
    return response.data
  },

  getSingleStats: async (id: number) => {
    const response = await api.get(`/api/campaigns/${id}/stats`)
    return response.data
  }
}

export default campaignAPI