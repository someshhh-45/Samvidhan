import { useState, useEffect } from 'react'

import dashboardService from '../services/dashboardService.js'

export default function useDashboard() {

  const [kpis, setKpis] =
    useState([])

  const [deadlines, setDeadlines] =
    useState([])

  const [recent, setRecent] =
    useState([])

  const [departments, setDepartments] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState(null)

  useEffect(() => {

    loadDashboard()

  }, [])

  const loadDashboard = async () => {

    try {

      setLoading(true)

      setError(null)

      // =====================================
      // API CALLS
      // =====================================

      const [
        kpiResponse,
        deadlineResponse,
        recentResponse,
        departmentResponse,
      ] = await Promise.all([

        // IMPORTANT FIX
        dashboardService.getKPIs(
          'LEGAL'
        ),

        dashboardService.getDeadlines(),

        dashboardService.getRecent(),

        dashboardService.getDepartments(),
      ])

      console.log(
        'KPI:',
        kpiResponse
      )

      console.log(
        'Deadlines:',
        deadlineResponse
      )

      console.log(
        'Recent:',
        recentResponse
      )

      console.log(
        'Departments:',
        departmentResponse
      )

      // =====================================
      // SET STATE
      // =====================================

      setKpis(
        kpiResponse || []
      )

      setDeadlines(
        deadlineResponse || []
      )

      setRecent(
        recentResponse || []
      )

      setDepartments(
        departmentResponse || []
      )

    } catch (e) {

      console.error(e)

      setError(

        e?.message ||

        e?.error ||

        'Failed to load dashboard'
      )

    } finally {

      setLoading(false)
    }
  }

  return {

    kpis,

    deadlines,

    recent,

    departments,

    loading,

    error,

    reload: loadDashboard,
  }
}