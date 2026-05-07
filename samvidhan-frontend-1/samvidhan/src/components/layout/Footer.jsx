import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">Sam<span>vidhan</span></div>
          <div className="footer-badges">
            {['MEITY Compliant','ISO 27001','NIC Hosted','Data Localised'].map(b => (
              <span key={b} className="footer-badge">{b}</span>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} Samvidhan — Constitutional Intelligence Platform. Government of India.
          </span>
          <div className="footer-tricolour" />
        </div>
      </div>
    </footer>
  )
}
