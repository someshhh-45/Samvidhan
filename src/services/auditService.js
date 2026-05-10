import api from './api.js'

const auditService = {

  getLogs: async () => {

    return await api.get(
      '/audit-logs'
    )
  },

  exportCsv: async () => {

    const response = await api.get(

      '/audit-logs/export',

      {
        responseType: 'blob'
      }
    )

    const url =
      window.URL.createObjectURL(

        new Blob([response])
      )

    const link =
      document.createElement('a')

    link.href = url

    link.setAttribute(

      'download',

      'audit_logs.csv'
    )

    document.body.appendChild(link)

    link.click()

    link.remove()
  }
}

export default auditService