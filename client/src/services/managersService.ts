import api from './api'

const managersAPI = {
  getAllManagers: async (search = '', status = '', page = 1, limit = 10) => {
    const response = await api.get('/api/managers', {
      params: { search, status, page, limit }
    })
    return response.data
  },

  createManager: async (data: any) => {
    const response = await api.post('/api/managers', data)
    return response.data
  },

  updateManager: async (id: number, data: any) => {
    const response = await api.put(`/api/managers/${id}`, data)
    return response.data
  },

  assignManagerDetails: async (id: number, data: any) => {
    const response = await api.post(`/api/managers/${id}/assign`, data)
    return response.data
  },

  approveManager: async (id: number) => {
    const response = await api.post(`/api/managers/${id}/approve`)
    return response.data
  },

  rejectManager: async (id: number, reason: string) => {
    const response = await api.post(`/api/managers/${id}/reject`, { reason })
    return response.data
  },

  suspendManager: async (id: number, reason: string) => {
    const response = await api.post(`/api/managers/${id}/suspend`, { reason })
    return response.data
  },

  deleteManager: async (id: number) => {
    const response = await api.delete(`/api/managers/${id}`)
    return response.data
  },

  getManagerStats: async (id: number) => {
    const response = await api.get(`/api/managers/${id}/stats`)
    return response.data
  }
}

export default managersAPI
