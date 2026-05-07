import api from './api.js'

const dashboardService = {
  getKPIs:       () => api.get('/dashboard/kpis'),
  getDeadlines:  () => api.get('/dashboard/deadlines'),
  getRecent:     () => api.get('/dashboard/recent'),
  getDeptStats:  () => api.get('/dashboard/departments'),
}

export default dashboardService
