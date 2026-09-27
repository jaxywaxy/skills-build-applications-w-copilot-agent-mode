import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiEndpoint } from './components/api.js'
import './App.css'

const sections = [
  { path: '/', label: 'Overview' },
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
  { path: '/users', label: 'Users' },
]

function ApiHealth() {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    const controller = new AbortController()

    const checkHealth = async () => {
      try {
        const response = await fetch(apiEndpoint('health'), { signal: controller.signal })
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

function Overview() {
  const currentDate = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date()).toUpperCase()

  return (
    <>
      <div className="welcome-row">
        <div>
          <p className="eyebrow">TODAY / {currentDate}</p>
          <h1>Your training, in focus</h1>
          <p className="intro">A little progress adds up. Here’s your space to keep moving.</p>
        </div>
        <NavLink className="btn btn-dark action-button" to="/activities">View activity</NavLink>
      </div>
      <section className="stats-grid" aria-label="Tracker sections">
        <article className="stat-panel stat-panel--mint"><span className="stat-label">MOVEMENT</span><strong>01</strong><span className="stat-note">Activities logged</span></article>
        <article className="stat-panel stat-panel--peach"><span className="stat-label">TOGETHER</span><strong>02</strong><span className="stat-note">Teams to explore</span></article>
        <article className="stat-panel stat-panel--sky"><span className="stat-label">NEXT UP</span><strong>03</strong><span className="stat-note">Ways to train</span></article>
      </section>
      <section className="activity-section">
        <div className="section-heading">
          <div><p className="eyebrow">YOUR OCTOFIT TRACKER</p><h2>Explore your progress</h2></div>
          <NavLink to="/leaderboard" className="text-link">See leaderboard <span aria-hidden="true">-&gt;</span></NavLink>
        </div>
        <div className="empty-state">
          <span className="empty-mark" aria-hidden="true">+</span>
          <div><h3>Your activity, teams, and training</h3><p>Choose a section to see the latest tracker data.</p></div>
        </div>
      </section>
    </>
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
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App