import api from './api.js'

const reviewService = {
  getAll: (params) => api.get('/reviews', { params }),
  getById: (id)    => api.get(`/reviews/${id}`),
  approve: (id, note) => api.post(`/reviews/${id}/approve`, { note }),
  reject:  (id, reason) => api.post(`/reviews/${id}/reject`, { reason }),
  update:  (id, payload) => api.put(`/reviews/${id}`, payload),
  upload:  (formData) => api.post('/reviews/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getStats: () => api.get('/reviews/stats'),
}

export default reviewService
