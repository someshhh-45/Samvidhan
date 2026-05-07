import api from './api.js'

const auditService = {
  getLogs:   (params) => api.get('/audit', { params }),
  getById:   (id)     => api.get(`/audit/${id}`),
  exportCSV: (params) => api.get('/audit/export', { params, responseType: 'blob' }),
}

export default auditService
