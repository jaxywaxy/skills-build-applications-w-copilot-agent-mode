import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

const sections = [
  { path: '/', label: 'Overview', title: 'Your training, in focus', eyebrow: 'TODAY' },
  { path: '/activities', label: 'Activities', title: 'Activity log', eyebrow: 'MOVEMENT' },
  { path: '/teams', label: 'Teams', title: 'Your teams', eyebrow: 'TOGETHER' },
  { path: '/leaderboard', label: 'Leaderboard', title: 'Leaderboard', eyebrow: 'IN THE MIX' },
  { path: '/workouts', label: 'Workouts', title: 'Workout ideas', eyebrow: 'NEXT UP' },
]

type ApiStatus = 'checking' | 'online' | 'offline'

function ApiHealth() {
  const [status, setStatus] = useState<ApiStatus>('checking')

  useEffect(() => {
    const controller = new AbortController()
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/health', { signal: controller.signal })
        if (!response.ok) throw new Error('API unavailable')
        setStatus('online')
      } catch {
        if (!controller.signal.aborted) setStatus('offline')
      }
    }

    void checkHealth()
    const interval = window.setInterval(checkHealth, 30_000)
    return () => {
      controller.abort()
      window.clearInterval(interval)
    }
  }, [])

  const label = status === 'online' ? 'API connected' : status === 'offline' ? 'API offline' : 'Checking API'

  return <span className={`api-status api-status--${status}`} aria-live="polite">{label}</span>
}

function SectionContent() {
  const { pathname } = useLocation()
  const section = sections.find((item) => item.path === pathname) ?? sections[0]
  const currentDate = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date()).toUpperCase()

  if (pathname === '/') {
    return (
      <>
        <div className="welcome-row">
          <div>
            <p className="eyebrow">{section.eyebrow} / {currentDate}</p>
            <h1>{section.title}</h1>
            <p className="intro">A little progress adds up. Here’s your space to keep moving.</p>
          </div>
          <button className="btn btn-dark action-button" type="button" disabled>
            + Log activity
          </button>
        </div>

        <section className="stats-grid" aria-label="Your activity summary">
          <article className="stat-panel stat-panel--mint">
            <span className="stat-label">ACTIVE MINUTES</span>
            <strong>--</strong>
            <span className="stat-note">This week</span>
          </article>
          <article className="stat-panel stat-panel--peach">
            <span className="stat-label">ACTIVITIES</span>
            <strong>--</strong>
            <span className="stat-note">This week</span>
          </article>
          <article className="stat-panel stat-panel--sky">
            <span className="stat-label">TEAM POINTS</span>
            <strong>--</strong>
            <span className="stat-note">Season total</span>
          </article>
        </section>

        <section className="activity-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR MOVEMENT</p>
              <h2>Recent activity</h2>
            </div>
            <NavLink to="/activities" className="text-link">View activity log <span aria-hidden="true">→</span></NavLink>
          </div>
          <div className="empty-state">
            <span className="empty-mark" aria-hidden="true">+</span>
            <div>
              <h3>Your first activity starts here</h3>
              <p>Log a workout to see your progress take shape.</p>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <div className="welcome-row section-empty">
      <div>
        <p className="eyebrow">{section.eyebrow}</p>
        <h1>{section.title}</h1>
        <p className="intro">This space is ready for your OctoFit {section.label.toLowerCase()}.</p>
      </div>
    </div>
  )
}

function App() {

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <NavLink to="/" className="brand-lockup" aria-label="OctoFit home">
          <img className="brand-logo" src={octofitLogo} alt="OctoFit Tracker" />
        </NavLink>
        <p className="nav-heading">TRACKER</p>
        <nav className="primary-nav" aria-label="Main navigation">
          {sections.map((section) => (
            <NavLink
              key={section.path}
              to={section.path}
              end={section.path === '/'}
              className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}
            >
              <span className="nav-glyph" aria-hidden="true">{section.label.slice(0, 1)}</span>
              {section.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="avatar">O</span>
          <span><strong>My profile</strong><small>Personal tracker</small></span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <span className="topbar-context">FITNESS, WITH YOUR PEOPLE</span>
          <ApiHealth />
        </header>
        <div className="page-content">
          <Routes>
            {sections.map((section) => (
              <Route key={section.path} path={section.path} element={<SectionContent />} />
            ))}
            <Route path="*" element={<SectionContent />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
