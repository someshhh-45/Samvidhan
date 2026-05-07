import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

import { DEPARTMENTS } from '../utils/departmentUtils.js'

import DepartmentChart from '../components/dashboard/DepartmentChart.jsx'
import StatsCard from '../components/dashboard/StatsCard.jsx'
import DeadlineAlerts from '../components/dashboard/DeadlineAlerts.jsx'

const API_BASE = 'http://localhost:8083/api/dashboard'

export default function DepartmentDashboard() {

  const [selected, setSelected] = useState(
    DEPARTMENTS[0].id
  )

  const [kpis, setKpis] = useState([])

  const [departments, setDepartments] =
    useState([])

  const [deadlines, setDeadlines] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  // =========================================
  // BACKEND ↔ FRONTEND DEPARTMENT MAP
  // =========================================

  const departmentMap = {

    law: 'LEGAL',

    finance: 'FINANCE',

    home: 'HOME_AFFAIRS',

    education: 'EDUCATION',

    health: 'HEALTH',

    defence: 'DEFENCE',

    external: 'EXTERNAL_AFFAIRS',

    commerce: 'COMMERCE'

  }

  // =========================================
  // FETCH DASHBOARD DATA
  // =========================================

  useEffect(() => {

    fetchDashboard()

  }, [selected])

  const fetchDashboard = async () => {

    try {

      setLoading(true)

      const selectedDepartment =
        departmentMap[selected]

      const [
        kpiRes,
        deptRes,
        deadlineRes
      ] = await Promise.all([

        axios.get(
          `${API_BASE}/kpis/${selectedDepartment}`
        ),

        axios.get(
          `${API_BASE}/departments`
        ),

        axios.get(
          `${API_BASE}/deadlines`
        )

      ])

      console.log(
        'Departments:',
        deptRes.data
      )

      console.log(
        'KPIs:',
        kpiRes.data
      )

      setKpis(
        kpiRes.data || []
      )

      setDepartments(
        deptRes.data || []
      )

      setDeadlines(
        deadlineRes.data || []
      )

    } catch (err) {

      console.error(
        'Dashboard fetch failed:',
        err
      )

    } finally {

      setLoading(false)

    }
  }

  // =========================================
  // CHART DATA
  // =========================================

  const chartData = useMemo(() => {

    return departments.map(d => ({

      name: d.name
        ?.replaceAll('_', ' '),

      count: d.count || 0

    }))

  }, [departments])

  // =========================================
  // SELECTED DEPARTMENT
  // =========================================

  const selectedDepartment =
    DEPARTMENTS.find(
      d => d.id === selected
    )

  // =========================================
  // KPI HELPERS
  // =========================================

  const getKpiValue = label => {

    const item = kpis.find(
      k => k.label === label
    )

    return item?.value || 0
  }

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div
        style={{
          padding: 40,
          color: 'white'
        }}
      >
        Loading dashboard...
      </div>

    )
  }

  // =========================================
  // UI
  // =========================================

  return (
    <>

      {/* PAGE HEADER */}

      <div className="page-header">

        <h1 className="page-title">
          Department <em>Overview</em>
        </h1>

        <p className="page-subtitle">
          Ministry-wise compliance status
          and case distribution
        </p>

      </div>

      {/* PAGE BODY */}

      <div className="page-body">

        {/* ================================= */}
        {/* DEPARTMENT SELECTOR */}
        {/* ================================= */}

        <div
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 24
          }}
        >

          {DEPARTMENTS.map(d => (

            <button
              key={d.id}

              onClick={() =>
                setSelected(d.id)
              }

              style={{
                fontFamily: 'Cinzel, serif',

                fontSize: 10,

                letterSpacing: 1,

                padding: '8px 16px',

                cursor: 'pointer',

                transition: 'all 0.2s',

                background:
                  selected === d.id
                    ? 'rgba(201,168,76,0.15)'
                    : 'transparent',

                color:
                  selected === d.id
                    ? 'var(--gold)'
                    : 'var(--silver)',

                border: `1px solid ${
                  selected === d.id
                    ? 'rgba(201,168,76,0.4)'
                    : 'rgba(255,255,255,0.08)'
                }`,
              }}
            >

              {d.icon}
              {' '}
              {d.label.replace(
                'Ministry of ',
                ''
              )}

            </button>

          ))}

        </div>

        {/* ================================= */}
        {/* SELECTED DEPARTMENT */}
        {/* ================================= */}

        <div
          style={{
            marginBottom: 16,

            fontFamily: 'Cinzel, serif',

            fontSize: 13,

            color: 'var(--gold)',

            letterSpacing: 2
          }}
        >

          {selectedDepartment?.icon}
          {' '}
          {selectedDepartment?.label}

        </div>

        {/* ================================= */}
        {/* KPI CARDS */}
        {/* ================================= */}

        <div
          className="grid-4"
          style={{
            marginBottom: 24
          }}
        >

          <StatsCard
            label="Total Reviews"
            value={getKpiValue(
              'Total Reviews'
            )}
            colorClass="gold"
          />

          <StatsCard
            label="Pending Reviews"
            value={getKpiValue(
              'Pending Reviews'
            )}
            colorClass="saffron"
          />

          <StatsCard
            label="Verified Reviews"
            value={getKpiValue(
              'Verified Reviews'
            )}
            colorClass="jade"
          />

          <StatsCard
            label="Rejected Reviews"
            value={getKpiValue(
              'Rejected Reviews'
            )}
            colorClass="crimson"
          />

        </div>

        {/* ================================= */}
        {/* CHART + DEADLINES */}
        {/* ================================= */}

        <div className="grid-2">

          {/* CHART */}

          <div className="dash-panel">

            <div className="panel-header">

              <span className="panel-title">
                All Department Distribution
              </span>

              <span className="panel-badge">

                {departments.length}
                {' '}
                Ministries

              </span>

            </div>

            <DepartmentChart
              data={chartData}
            />

          </div>

          {/* DEADLINES */}

          <div className="dash-panel">

            <div className="panel-header">

              <span className="panel-title">
                Upcoming Deadlines
              </span>

              <span className="panel-badge">

                {deadlines.length}
                {' '}
                Due

              </span>

            </div>

            <DeadlineAlerts
              deadlines={deadlines}
            />

          </div>

        </div>

      </div>

    </>
  )
}