import React from 'react'

export default function Loader({ fullPage }) {
  if (fullPage) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'var(--deep-navy)' }}>
        <div className="loader" />
      </div>
    )
  }
  return (
    <div className="loader-wrap">
      <div className="loader" />
    </div>
  )
}
