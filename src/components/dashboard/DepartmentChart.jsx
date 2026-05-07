import React from 'react'

export default function DepartmentChart({ data = [] }) {
  const max = Math.max(...data.map(d => d.count), 1)

  return (
    <div style={{ padding: '16px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: 'var(--silver-light)' }}>{d.name}</span>
            <span style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'Cinzel, serif' }}>{d.count}</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
            <div style={{
              height: '100%',
              width: `${(d.count / max) * 100}%`,
              background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
              borderRadius: 2,
              transition: 'width 0.8s ease'
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}
