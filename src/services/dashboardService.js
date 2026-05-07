import api from './api.js'

const dashboardService = {

  // =====================================
  // KPI CARDS
  // =====================================

  getKPIs(department = 'LEGAL') {

    return api.get(
      `/dashboard/kpis/${department}`
    )
  },

  // =====================================
  // DEADLINES
  // =====================================

  getDeadlines() {

    return api.get(
      '/dashboard/deadlines'
    )
  },

  // =====================================
  // RECENT CASES
  // =====================================

  getRecent() {

    return api.get(
      '/dashboard/recent'
    )
  },

  // =====================================
  // DEPARTMENT DISTRIBUTION
  // =====================================

  getDepartments() {

    return api.get(
      '/dashboard/departments'
    )
  },
}

export default dashboardService