import api from './api.js'

const annotationService = {
  getByReview: (reviewId) => api.get(`/annotations/${reviewId}`),
  create:      (payload)  => api.post('/annotations', payload),
  update:      (id, data) => api.put(`/annotations/${id}`, data),
  delete:      (id)       => api.delete(`/annotations/${id}`),
}

export default annotationService
