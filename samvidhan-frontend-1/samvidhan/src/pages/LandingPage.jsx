import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'

/* ── KPI counter hook ── */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      let start = 0
      const step = target / (duration / 16)
      const tick = () => {
        start = Math.min(start + step, target)
        setCount(Math.floor(start))
        if (start < target) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return [count, ref]
}

/* ── Fade-up on scroll ── */
function useFadeUp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        obs.disconnect()
      }
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ── Workflow Card ── */
function WorkflowCard({ step, icon, title, desc, tags }) {
  const ref = useFadeUp()
  return (
    <div className="workflow-card" ref={ref}>
      <div className="wf-step">Step {step}</div>
      <div className="wf-icon-wrap"><span className="wf-icon">{icon}</span></div>
      <div className="wf-title">{title}</div>
      <div className="wf-desc">{desc}</div>
      <div className="wf-tags">{tags.map(t => <span key={t} className="wf-tag">{t}</span>)}</div>
    </div>
  )
}

/* ── Feature Card ── */
function FeatureCard({ icon, title, desc }) {
  const ref = useFadeUp()
  return (
    <div className="feature-card" ref={ref}>
      <div className="feature-icon">{icon}</div>
      <div className="feature-title">{title}</div>
      <div className="feature-desc">{desc}</div>
    </div>
  )
}

/* ── Upload Drop Zone ── */
function DropZone() {
  const [dragging, setDragging] = useState(false)
  return (
    <div
      className={`drop-zone ${dragging ? 'dragging' : ''}`}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false) }}
    >
      <div className="drop-icon">📄</div>
      <div className="drop-title">Drop Constitutional Documents Here</div>
      <div className="drop-sub">or click to browse from your system</div>
      <div className="drop-formats">
        {['PDF','DOCX','TXT','JPEG','PNG'].map(f => <span key={f} className="drop-format">{f}</span>)}
      </div>
    </div>
  )
}

/* ─────────────────────────────── MAIN COMPONENT ─────────────────────────────── */
export default function LandingPage() {
  const [c1, r1] = useCountUp(12847)
  const [c2, r2] = useCountUp(98)
  const [c3, r3] = useCountUp(36)

  const WORKFLOW = [
    { step: 1, icon: '📄', title: 'Upload & Extract',   desc: 'Upload constitutional documents. AI extracts directives, articles, and departments with confidence scores.', tags: ['OCR', 'NLP', 'Auto-classify'] },
    { step: 2, icon: '🧠', title: 'AI Action Plan',     desc: 'Claude generates structured, article-specific action plans mapped to responsible departments.', tags: ['Claude AI', 'Action Items', 'Mapping'] },
    { step: 3, icon: '✅', title: 'Human Verification', desc: 'Officers review AI extractions and action plans. Approve, edit, or escalate with full audit trail.', tags: ['Review', 'Approve', 'Annotate'] },
    { step: 4, icon: '📊', title: 'Department Dashboard', desc: 'Departments track compliance, deadlines, and pending actions through role-based dashboards.', tags: ['KPIs', 'Deadlines', 'Reports'] },
  ]

  const FEATURES = [
    { icon: '🔗', title: 'CIS Integration',    desc: 'Seamless integration with the Constitutional Intelligence System for case tracking and record management.' },
    { icon: '👁', title: 'Advanced OCR',        desc: 'Multi-language OCR with 98%+ accuracy across handwritten, typed, and scanned constitutional documents.' },
    { icon: '🗂', title: 'Immutable Audit Trail', desc: 'Every action is timestamped and logged. Tamper-proof audit trail for complete accountability.' },
    { icon: '⏰', title: 'Deadline Engine',     desc: 'Smart deadline calculation with automated escalation alerts and compliance tracking across departments.' },
    { icon: '🔒', title: 'Enterprise Security', desc: 'ISO 27001 compliant. Data localisation on NIC servers. Role-based access with MFA support.' },
    { icon: '📈', title: 'Analytics & Reports', desc: 'Department-wise compliance heatmaps, trend analysis, and exportable reports for ministry review.' },
  ]

  const CASES = [
    { id: 'CIS-2024-0841', dept: 'Min. of Law',     date: '12 Jan 2024', status: 'verified', priority: 'high' },
    { id: 'CIS-2024-0792', dept: 'Min. of Finance',  date: '09 Jan 2024', status: 'pending',  priority: 'med'  },
    { id: 'CIS-2024-0755', dept: 'Min. of Home',     date: '07 Jan 2024', status: 'review',   priority: 'high' },
    { id: 'CIS-2024-0718', dept: 'Min. of Education',date: '04 Jan 2024', status: 'verified', priority: 'low'  },
    { id: 'CIS-2024-0703', dept: 'Min. of Health',   date: '02 Jan 2024', status: 'appeal',   priority: 'med'  },
  ]

  const DEADLINES = [
    { date: 'Jan 20', title: 'Art. 47 Compliance Review',  sub: 'Ministry of Health' },
    { date: 'Feb 01', title: 'DPSP Implementation Report',  sub: 'Ministry of Finance' },
    { date: 'Feb 15', title: 'Fundamental Rights Audit',    sub: 'Ministry of Law' },
    { date: 'Mar 01', title: 'Art. 21 Action Plan Submission', sub: 'Ministry of Home' },
  ]

  const FIELDS = [
    { icon: '⚖️', label: 'Constitutional Article', value: 'Article 47, Directive Principles', confidence: 98 },
    { icon: '🏛️', label: 'Responsible Department', value: 'Ministry of Health & Family Welfare', confidence: 95 },
    { icon: '📅', label: 'Compliance Deadline',    value: '31 March 2024',  confidence: 87 },
    { icon: '📋', label: 'Document Type',           value: 'DPSP Directive', confidence: 99 },
    { icon: '🔢', label: 'Case Reference',          value: 'CIS/2024/DPSP/0047', confidence: 94 },
    { icon: '⚡', label: 'Priority Level',           value: 'High — Immediate Action Required', confidence: 91 },
  ]

  return (
    <>
      <Navbar />

      {/* ══ HERO ══ */}
      <div className="hero">
        <div className="tricolour-bar" />
        <div className="hero-bg" />
        <div className="hero-overlay" />

        {/* Chakra watermark SVG */}
        <svg className="chakra-watermark" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" stroke="#C9A84C" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="38" stroke="#C9A84C" strokeWidth="0.3" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24
            const rad = (angle * Math.PI) / 180
            const x1 = 50 + 38 * Math.cos(rad)
            const y1 = 50 + 38 * Math.sin(rad)
            const x2 = 50 + 48 * Math.cos(rad)
            const y2 = 50 + 48 * Math.sin(rad)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A84C" strokeWidth="0.4" />
          })}
          <circle cx="50" cy="50" r="6" fill="#C9A84C" opacity="0.6" />
        </svg>

        <div className="hero-content">
          <div className="hero-eyebrow">Government of India · Constitutional Intelligence Platform</div>
          <h1 className="hero-title">Sam<span>vidhan</span></h1>
          <div className="hero-subtitle-line" />
          <p className="hero-subtitle">
            AI-powered platform for constitutional compliance, directive tracking,<br />
            and inter-ministry coordination
          </p>
          <div className="hero-cta-row">
            <Link to="/login" className="btn-primary">Access Platform</Link>
            <a href="#workflow" className="btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' }) }}>
              View Workflow
            </a>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item" ref={r1}>
            <span className="stat-num">{c1.toLocaleString('en-IN')}+</span>
            <span className="stat-label">Cases Processed</span>
          </div>
          <div className="stat-item" ref={r2}>
            <span className="stat-num">{c2}%</span>
            <span className="stat-label">AI Accuracy</span>
          </div>
          <div className="stat-item" ref={r3}>
            <span className="stat-num">{c3}</span>
            <span className="stat-label">Departments</span>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </div>
      </div>

      {/* ══ WORKFLOW ══ */}
      <section className="workflow-section" id="workflow">
        <div className="container">
          <div className="section-label">Platform Workflow</div>
          <h2 className="section-title">From Document to <em>Compliance</em></h2>
          <p className="section-desc">
            A four-step AI-powered pipeline that transforms raw constitutional documents
            into verified, trackable action plans for every ministry.
          </p>
          <div className="workflow-grid">
            {WORKFLOW.map(w => <WorkflowCard key={w.step} {...w} />)}
          </div>
        </div>
      </section>

      {/* ══ DASHBOARD MOCK ══ */}
      <section className="dashboard-section" id="dashboard">
        <div className="container">
          <div className="section-label">Live Dashboard</div>
          <h2 className="section-title">Command Centre <em>Overview</em></h2>
          <p className="section-desc">
            Real-time visibility into constitutional compliance across all ministries.
            Role-based dashboards for officers, admins, and department heads.
          </p>

          <div className="dash-frame">
            {/* Titlebar */}
            <div className="dash-titlebar">
              <div className="dash-titlebar-left">
                <div className="dash-dot dot-saffron" />
                <div className="dash-dot dot-gold" />
                <div className="dash-dot dot-jade" />
                <span className="dash-title-text">Samvidhan · Constitutional Compliance Dashboard</span>
              </div>
              <div className="dash-status">
                <div className="pulse-dot" /> Live · Updated just now
              </div>
            </div>

            {/* Body */}
            <div className="dash-body">
              {/* Sidebar */}
              <div className="dash-sidebar">
                <div className="dash-dept-label">Departments</div>
                {[
                  { icon: '⚖️', label: 'Ministry of Law',     count: 24, active: true },
                  { icon: '💰', label: 'Finance',              count: 18 },
                  { icon: '🏠', label: 'Home Affairs',         count: 31 },
                  { icon: '📚', label: 'Education',            count: 12 },
                  { icon: '🏥', label: 'Health',               count: 19 },
                  { icon: '🛡️', label: 'Defence',              count: 8  },
                  { icon: '🌐', label: 'External Affairs',     count: 6  },
                ].map(item => (
                  <div key={item.label} className={`dash-nav-item ${item.active ? 'active' : ''}`}>
                    <span className="dash-nav-icon">{item.icon}</span>
                    {item.label}
                    <span className="nav-count">{item.count}</span>
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className="dash-main">
                <div className="kpi-row">
                  {[
                    { label: 'Total Cases',    value: '12,847', change: '↑ 342 this month', cls: 'gold'    },
                    { label: 'Pending Review', value: '284',    change: '↓ 18 from yesterday', cls: 'saffron' },
                    { label: 'Verified',       value: '11,941', change: '↑ 99.2% compliance', cls: 'jade'    },
                    { label: 'Escalated',      value: '23',     change: '↑ 3 new today',      cls: 'crimson' },
                  ].map(k => (
                    <div key={k.label} className={`kpi-card ${k.cls}`}>
                      <div className="kpi-label">{k.label}</div>
                      <div className="kpi-value">{k.value}</div>
                      <div className="kpi-change">{k.change}</div>
                    </div>
                  ))}
                </div>

                <div className="dash-content-row">
                  <div className="dash-panel">
                    <div className="panel-header">
                      <span className="panel-title">Recent Cases</span>
                      <span className="panel-badge">Live</span>
                    </div>
                    <table className="case-table">
                      <thead><tr><th>Case ID</th><th>Department</th><th>Date</th><th>Status</th><th>Pri.</th></tr></thead>
                      <tbody>
                        {CASES.map(c => (
                          <tr key={c.id}>
                            <td style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: 'var(--gold)' }}>{c.id}</td>
                            <td style={{ color: 'var(--silver-light)', fontSize: 11 }}>{c.dept}</td>
                            <td style={{ color: 'var(--silver)', fontSize: 10 }}>{c.date}</td>
                            <td><span className={`status-badge status-${c.status}`}>{c.status}</span></td>
                            <td><span className={`priority-dot p-${c.priority}`} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="dash-panel">
                    <div className="panel-header">
                      <span className="panel-title">Upcoming Deadlines</span>
                      <span className="panel-badge">4 Due</span>
                    </div>
                    <div className="timeline-list">
                      {DEADLINES.map((d, i) => (
                        <div className="tl-item" key={i}>
                          <div className="tl-date">{d.date}</div>
                          <div className="tl-dot-col">
                            <div className="tl-dot" />
                            {i < DEADLINES.length - 1 && <div className="tl-line" />}
                          </div>
                          <div>
                            <div className="tl-content-title">{d.title}</div>
                            <div className="tl-content-sub">{d.sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ UPLOAD & EXTRACTION ══ */}
      <section className="upload-section" id="upload">
        <div className="container">
          <div className="section-label">Document Processing</div>
          <h2 className="section-title">Upload & <em>Extract</em></h2>
          <p className="section-desc">
            Drop any constitutional document and watch our AI extract
            every relevant field with confidence scores in seconds.
          </p>
          <div className="upload-grid">
            <DropZone />
            <div className="extraction-panel">
              <div className="extraction-header">
                <span className="extraction-title">Extracted Fields</span>
                <span className="panel-badge">6 Fields · 95% avg</span>
              </div>
              <div className="field-list">
                {FIELDS.map(f => (
                  <div className="field-item" key={f.label}>
                    <span className="field-icon">{f.icon}</span>
                    <div className="field-info">
                      <div className="field-label">{f.label}</div>
                      <div className="field-value">{f.value}</div>
                    </div>
                    <span className={`confidence-badge ${f.confidence >= 90 ? 'conf-high' : 'conf-med'}`}>
                      {f.confidence}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VERIFICATION PANEL ══ */}
      <section className="verification-section" id="verify">
        <div className="container">
          <div className="section-label">Human Verification</div>
          <h2 className="section-title">Review &amp; <em>Approve</em></h2>
          <p className="section-desc">
            Officers verify AI-extracted data against the source document.
            Colour-coded highlights link every field back to its origin.
          </p>
          <div className="verify-grid">
            <div className="pdf-viewer-mock">
              <div className="pdf-header">
                <span className="pdf-title">CIS-2024-0841 · Source Document</span>
                <span style={{ fontSize: 10, color: 'var(--silver)', fontFamily: 'Cinzel, serif', letterSpacing: 1 }}>Page 1 / 3</span>
              </div>
              <div className="pdf-body">
                <p style={{ marginBottom: 16 }}>
                  IN THE MATTER OF CONSTITUTIONAL COMPLIANCE — DIRECTIVE PRINCIPLES OF STATE POLICY
                </p>
                <p style={{ marginBottom: 14, lineHeight: 1.9 }}>
                  The <span className="highlight highlight-gold">Ministry of Health and Family Welfare</span> is hereby directed to
                  submit an implementation report under{' '}
                  <span className="highlight highlight-gold">Article 47</span> of the Constitution of India,
                  pertaining to the duty of the State to raise the level of nutrition and the standard of living.
                </p>
                <p style={{ marginBottom: 14, lineHeight: 1.9 }}>
                  Compliance report must be filed by{' '}
                  <span className="highlight highlight-saffron">31 March 2024</span>.
                  The report shall be submitted to the{' '}
                  <span className="highlight highlight-jade">Department of Constitutional Affairs</span>,
                  Ministry of Law and Justice, for review and verification.
                </p>
                <div style={{ marginTop: 20, padding: '10px 14px', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)', fontSize: 11, color: 'var(--silver)' }}>
                  <span style={{ color: 'var(--gold)' }}>■ </span> Directive &nbsp;&nbsp;
                  <span style={{ color: 'var(--jade-light)' }}>■ </span> Department &nbsp;&nbsp;
                  <span style={{ color: 'var(--saffron)' }}>■ </span> Date
                </div>
              </div>
            </div>

            <div className="action-panel">
              <div className="action-card">
                <div className="action-header">
                  <span className="action-icon">🧠</span>
                  <span className="action-title">AI-Generated Action Plan</span>
                </div>
                <div className="action-body">
                  {[
                    'Acknowledge receipt of DPSP directive under Article 47',
                    'Constitute a compliance committee within Ministry of Health',
                    'Collect data on nutrition levels across all states/UTs',
                    'Prepare draft report with measurable targets and timelines',
                    'Submit to Ministry of Law by 31 March 2024',
                  ].map((s, i) => (
                    <div className="action-step" key={i}>
                      <span className="step-num">{String(i+1).padStart(2,'0')}.</span>
                      <span className="step-text">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="action-btn-row">
                  <button className="action-btn btn-approve">✓ Approve</button>
                  <button className="action-btn btn-edit">✎ Edit</button>
                  <button className="action-btn btn-reject">✕ Reject</button>
                </div>
              </div>

              <div className="action-card">
                <div className="action-header">
                  <span className="action-icon">📊</span>
                  <span className="action-title">Extraction Confidence</span>
                </div>
                <div className="action-body">
                  {[
                    { label: 'Article Reference',  score: 98 },
                    { label: 'Department Mapping', score: 95 },
                    { label: 'Deadline Extraction',score: 87 },
                    { label: 'Priority Level',     score: 91 },
                  ].map(f => (
                    <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: 'var(--silver-light)' }}>{f.label}</span>
                      <span className={`confidence-badge ${f.score >= 90 ? 'conf-high' : 'conf-med'}`}>{f.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-label">Platform Capabilities</div>
          <h2 className="section-title">Built for <em>Governance</em></h2>
          <p className="section-desc">
            Enterprise-grade features designed for the security, compliance,
            and scale demands of constitutional administration.
          </p>
          <div className="features-grid">
            {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
