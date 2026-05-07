import React, { useState } from 'react'
import ActionPlanCard from '../components/dashboard/ActionPlanCard.jsx'
import SearchBar from '../components/common/SearchBar.jsx'
import EmptyState from '../components/common/EmptyState.jsx'

const MOCK_PLANS = [
  {
    id: 1, title: 'Art. 47 — Nutrition & Public Health',
    department: 'Ministry of Health', dueDate: '2024-03-31',
    status: 'active',
    steps: [
      'Acknowledge receipt of directive under Article 47',
      'Constitute compliance committee within Ministry of Health',
      'Collect nutrition data across all states and UTs',
      'Prepare draft with measurable targets',
      'Submit report to Ministry of Law by deadline',
    ],
  },
  {
    id: 2, title: 'Art. 21 — Right to Life Implementation',
    department: 'Ministry of Home Affairs', dueDate: '2024-02-28',
    status: 'in-progress',
    steps: [
      'Review all pending cases under Article 21',
      'Ensure state-level compliance with right to life directives',
      'Coordinate with state home departments',
      'File quarterly compliance report',
    ],
  },
  {
    id: 3, title: 'Art. 39 — DPSP Economic Justice',
    department: 'Ministry of Finance', dueDate: '2024-04-15',
    status: 'pending',
    steps: [
      'Identify policy gaps under Article 39 DPSP',
      'Draft policy amendments for economic justice',
      'Stakeholder consultation with states',
      'Submit policy note to Cabinet',
    ],
  },
  {
    id: 4, title: 'Art. 45 — Free & Compulsory Education',
    department: 'Ministry of Education', dueDate: '2024-05-01',
    status: 'pending',
    steps: [
      'Audit current enrolment data across districts',
      'Identify districts below 90% enrolment',
      'Initiate targeted campaigns',
      'Submit progress report',
    ],
  },
]

const STATUS_TABS = ['All', 'Active', 'In-Progress', 'Pending', 'Completed']

export default function ActionPlans() {
  const [search, setSearch] = useState('')
  const [tab,    setTab]    = useState('All')

  const filtered = MOCK_PLANS.filter(p => {
    const matchTab    = tab === 'All' || p.status === tab.toLowerCase().replace(' ', '-')
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.department.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Action <em>Plans</em></h1>
        <p className="page-subtitle">AI-generated constitutional compliance action plans by department</p>
      </div>

      <div className="page-body">
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <SearchBar placeholder="Search by title or department…" value={search} onChange={setSearch} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {STATUS_TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: 1,
                  padding: '6px 14px', cursor: 'pointer', transition: 'all 0.2s',
                  background: tab === t ? 'rgba(201,168,76,0.15)' : 'transparent',
                  color: tab === t ? 'var(--gold)' : 'var(--silver)',
                  border: `1px solid ${tab === t ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon="📌" title="No action plans found" desc="Try adjusting your filters." />
        ) : (
          <div className="grid-2">
            {filtered.map(plan => <ActionPlanCard key={plan.id} plan={plan} />)}
          </div>
        )}
      </div>
    </>
  )
}
