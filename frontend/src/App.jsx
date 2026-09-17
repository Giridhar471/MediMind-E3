import { useState } from 'react'
import { Activity, ArrowUpRight, Bell, CalendarDays, ChevronDown, ChevronRight, CircleHelp, FileText, HeartPulse, LayoutDashboard, LockKeyhole, Menu, MoreHorizontal, Moon, Plus, Search, Settings, ShieldCheck, Sparkles, Stethoscope, Sun, Upload, UsersRound, X } from 'lucide-react'
import './App.css'

const members = [
  { name: 'Father', relation: 'You', initials: 'RK', tone: 'coral', records: 12, predictions: 3 },
  { name: 'Mother', relation: 'Family member', initials: 'PM', tone: 'lilac', records: 8, predictions: 2 },
  { name: 'Son', relation: 'Family member', initials: 'AS', tone: 'mint', records: 4, predictions: 1 },
]

const navItems = [
  ['Dashboard', LayoutDashboard], ['Family members', UsersRound], ['Medical records', FileText], ['Upload record', Upload], ['AI predictions', Sparkles], ['Doctors', Stethoscope], ['Appointments', CalendarDays], ['Consultations', Activity], ['Prescriptions', HeartPulse], ['Doctor access', LockKeyhole], ['MediMind Knowledge', FileText],
]

const records = [
  { type: 'Blood test', date: '15 Sep 2026', source: 'Uploaded by Family', icon: Activity, color: 'orange', status: 'Available' },
  { type: 'X-Ray', date: '10 Sep 2026', source: 'Dr. Rahul · Orthopedics', icon: FileText, color: 'blue', status: 'Available' },
  { type: 'Consultation', date: '08 Sep 2026', source: 'Dr. Kumar · Cardiology', icon: Stethoscope, color: 'green', status: 'Finalized' },
]

function App() {
  const [page, setPage] = useState('Dashboard')
  const [memberIndex, setMemberIndex] = useState(0)
  const [dark, setDark] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [familyMembers, setFamilyMembers] = useState(members)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState({ name: '', relation: 'Family member' })

  const member = familyMembers[memberIndex] ?? familyMembers[0]

  const announce = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const navigate = (nextPage) => {
    setPage(nextPage)
    setProfileOpen(false)
  }

  const handleAddMember = (event) => {
    event.preventDefault()

    const name = newMember.name.trim()
    if (!name) {
      announce('Please enter a name to add a family member.')
      return
    }

    const initials = name.split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase() ?? '').join('') || 'MM'
    const tones = ['coral', 'lilac', 'mint']

    const nextMember = {
      name,
      relation: newMember.relation,
      initials,
      tone: tones[(familyMembers.length) % tones.length],
      records: 0,
      predictions: 0,
    }

    const updatedMembers = [...familyMembers, nextMember]
    setFamilyMembers(updatedMembers)
    setMemberIndex(updatedMembers.length - 1)
    setShowAddMember(false)
    setNewMember({ name: '', relation: 'Family member' })
    announce(`${name} was added to your family account.`)
  }

  return <div className={`app-shell ${dark ? 'dark-theme' : ''}`}>
    <style>{`.upload-form{width:min(100%,720px);margin:0 auto}.upload-form .primary-button{width:100%;justify-content:center}.feature-panel:has(.upload-form){padding:32px 40px}.drop-zone{min-height:150px}.feature-panel:has(.upload-form) label{width:100%}.feature-view{display:flex;flex-direction:column;gap:20px}.feature-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}.feature-heading>div{flex:1}.feature-icon{display:grid;place-items:center;width:48px;height:48px;border-radius:14px;background:var(--soft);color:var(--teal)}.compact-button{margin-left:auto;white-space:nowrap}.add-member-form{margin-top:14px;padding:20px;border:1px solid var(--line);border-radius:18px;background:var(--card);box-shadow:0 10px 24px rgba(25,39,52,.04)}.form-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}.form-header h3{margin:0;font-size:1.1rem}.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.add-member-form label{display:flex;flex-direction:column;gap:8px;color:#5d646d;font-size:12px;font-weight:600}.add-member-form input,.add-member-form select{border:1px solid var(--line);border-radius:10px;background:var(--bg);padding:11px 12px;font:inherit;color:var(--ink)}.form-actions{display:flex;justify-content:flex-end;gap:12px;margin-top:18px}.secondary-button{display:inline-flex;align-items:center;justify-content:center;padding:10px 16px;border-radius:10px;border:1px solid var(--line);background:transparent;color:var(--ink);font-weight:600}.close-form{display:grid;place-items:center;width:32px;height:32px;border-radius:8px;border:1px solid var(--line);background:transparent;color:var(--ink)}@media(max-width:720px){.feature-heading{flex-direction:column}.compact-button{width:100%}.form-grid{grid-template-columns:1fr}.upload-form{width:100%}.feature-panel:has(.upload-form){padding:20px 16px}}`}</style>
    <style>{`@keyframes medimind-enter{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@keyframes medimind-card{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.page-transition{animation:medimind-enter .32s cubic-bezier(.22,1,.36,1)}.page-transition .member-card,.page-transition .dashboard-grid>*,.page-transition .lower-grid>*,.page-transition .feature-card,.page-transition .ai-module,.page-transition .feature-records .record-row{animation:medimind-card .36s cubic-bezier(.22,1,.36,1) both}.page-transition .member-card:nth-child(2),.page-transition .feature-card:nth-child(2),.page-transition .ai-module:nth-child(2),.page-transition .feature-records .record-row:nth-child(2){animation-delay:.05s}.page-transition .member-card:nth-child(3),.page-transition .feature-card:nth-child(3),.page-transition .ai-module:nth-child(3),.page-transition .feature-records .record-row:nth-child(3){animation-delay:.1s}.primary-button,.text-button,.plain-button,.upload-button,.icon-button,.nav-item,.member-card,.ai-module,.record-row,.filter{transition:transform .2s ease,background-color .2s ease,border-color .2s ease,box-shadow .2s ease,color .2s ease}.primary-button:hover,.upload-button:hover{transform:translateY(-2px);box-shadow:0 8px 18px #156f7030}.primary-button:active,.upload-button:active,.text-button:active,.plain-button:active,.icon-button:active{transform:scale(.97)}.member-card:hover,.feature-card:hover,.ai-module:hover{transform:translateY(-3px);box-shadow:0 10px 22px #20352b12}.nav-item:hover{transform:translateX(3px)}.record-row:hover{background:#f3f8f6;padding-left:8px;padding-right:8px}.dark-theme .record-row:hover{background:#2a3942}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}`}</style>

    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><HeartPulse size={21} /></div>
        <span>Medi<span>Mind</span></span>
      </div>

      <button className="account-switcher" onClick={() => setProfileOpen(!profileOpen)}>
        <div className="avatar avatar-coral">RK</div>
        <div className="account-copy">
          <strong>Rohan Kapoor</strong>
          <span>Family account</span>
        </div>
        <ChevronDown size={16} />
      </button>

      <p className="nav-label">Workspace</p>
      <nav>
        {navItems.map(([label, Icon]) => (
          <button key={label} className={`nav-item ${page === label ? 'active' : ''}`} onClick={() => navigate(label)}>
            <Icon size={18} />
            <span>{label}</span>
            {label === 'Doctor access' && <span className="nav-dot" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="nav-item">
          <CircleHelp size={18} />
          <span>Help center</span>
        </button>

        <button className="nav-item" onClick={() => announce('Settings are available for account, security, and preferences.')}>
          <Settings size={18} />
          <span>Settings</span>
        </button>

        <div className="privacy-note">
          <ShieldCheck size={17} />
          <span>Your health data is private<br />and secure.</span>
        </div>
      </div>
    </aside>

    <main className="main-content">
      <header className="topbar">
        <button className="mobile-menu" aria-label="Open menu"><Menu size={20} /></button>

        <div className="breadcrumbs">
          <span>Family account</span>
          <ChevronRight size={15} />
          <strong>{page}</strong>
        </div>

        <div className="top-actions">
          <div className="search-box">
            <Search size={17} />
            <input placeholder="Search your records" aria-label="Search your records" />
          </div>

          <button className="icon-button theme-button" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="notification-wrap">
            <button className="icon-button" onClick={() => setNoticeOpen(!noticeOpen)} aria-label="Notifications">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            {noticeOpen && (
              <div className="notification-popover">
                <strong>Notifications</strong>
                <p>Your appointment with Dr. Rahul is tomorrow at 10:30 AM.</p>
                <small>Appointment reminder</small>
              </div>
            )}
          </div>

          <button className="profile-button" onClick={() => setProfileOpen(!profileOpen)}>
            <div className="avatar avatar-coral small">RK</div>
            <ChevronDown size={16} />
          </button>
        </div>
      </header>

      <div className="page-content">
        <div className="page-transition" key={page}>
          {page === 'Dashboard' ? (
            <Dashboard member={member} memberIndex={memberIndex} setMemberIndex={setMemberIndex} navigate={navigate} announce={announce} familyMembers={familyMembers} />
          ) : (
            <FeaturePage page={page} member={member} announce={announce} familyMembers={familyMembers} setMemberIndex={setMemberIndex} showAddMember={showAddMember} setShowAddMember={setShowAddMember} newMember={newMember} setNewMember={setNewMember} handleAddMember={handleAddMember} />
          )}
        </div>
      </div>
    </main>

    {profileOpen && (
      <div className="profile-popover">
        <div className="popover-header">
          <strong>Switch profile</strong>
          <button onClick={() => setProfileOpen(false)} aria-label="Close profile switcher"><X size={16} /></button>
        </div>
        {familyMembers.map((item, index) => (
          <button className="popover-member" key={`${item.name}-${index}`} onClick={() => { setMemberIndex(index); setProfileOpen(false) }}>
            <div className={`avatar avatar-${item.tone} small`}>{item.initials}</div>
            <span>{item.name}</span>
            {memberIndex === index && <span className="check">✓</span>}
          </button>
        ))}
      </div>
    )}

    {toast && <div className="toast" role="status"><ShieldCheck size={16} /> {toast}</div>}
  </div>
}

function Dashboard({ member, memberIndex, setMemberIndex, navigate, announce, familyMembers }) {
  return <>
    <section className="welcome-row">
      <div>
        <p className="eyebrow">Tuesday, 16 September 2026</p>
        <h1>Welcome back, Rohan <span>✦</span></h1>
        <p className="subheading">Here’s a clear view of your family’s health, all in one place.</p>
      </div>
    </section>

    <section className="member-strip">
      <div className="section-heading">
        <div>
          <h2>Family members</h2>
          <p>Switch profiles to see their health overview</p>
        </div>
        <button className="text-button" onClick={() => navigate('Family members')}>View all <ArrowUpRight size={15} /></button>
      </div>

      <div className="member-cards">
        {familyMembers.map((item, index) => (
          <button className={`member-card ${memberIndex === index ? 'selected' : ''}`} key={`${item.name}-${index}`} onClick={() => setMemberIndex(index)}>
            <div className={`avatar avatar-${item.tone}`}>{item.initials}</div>
            <div className="member-info">
              <strong>{item.name}</strong>
              <span>{item.relation}</span>
            </div>
            {memberIndex === index && <span className="selected-check">✓</span>}
            <MoreHorizontal size={18} className="member-more" />
          </button>
        ))}
      </div>
    </section>

    <section className="dashboard-grid">
      <div className="appointment-card">
        <div className="card-topline">
          <div>
            <p className="card-kicker">NEXT APPOINTMENT</p>
            <h3>Orthopedics follow-up</h3>
          </div>
          <span className="date-badge">18 <small>SEP</small></span>
        </div>

        <div className="doctor-line">
          <div className="doctor-avatar">DR</div>
          <div>
            <strong>Dr. Rahul Mehta</strong>
            <span>Orthopedic specialist · 10:30 AM</span>
          </div>
          <ChevronRight size={18} />
        </div>

        <div className="appointment-footer">
          <span><CalendarDays size={15} /> MediMind Hospital</span>
          <button className="plain-button" onClick={() => navigate('Appointments')}>View appointment <ArrowUpRight size={14} /></button>
        </div>
      </div>

      <div className="wellness-card">
        <div className="card-topline">
          <div>
            <p className="card-kicker">HEALTH SCORE</p>
            <h3>{member.name}</h3>
          </div>
          <span className="score-pill">78%</span>
        </div>

        <div className="progress-wrap">
          <div className="progress-bar">
            <span style={{ width: '78%' }}></span>
          </div>
        </div>

        <div className="mini-metrics">
          <div><strong>6</strong><span>Care plans</span></div>
          <div><strong>3</strong><span>Risk alerts</span></div>
          <div><strong>5</strong><span>Labs due</span></div>
        </div>
      </div>

      <div className="summary-card">
        <p className="card-kicker">FAMILY SUMMARY</p>
        <h3>Healthy trends this month</h3>
        <ul>
          <li>Heart routines improved by 12%</li>
          <li>Sleep consistency is improving</li>
          <li>Appointments are on track</li>
        </ul>
      </div>
    </section>

    <section className="lower-grid">
      <div className="feature-sheet">
        <div className="sheet-header">
          <h3>Recent activity</h3>
          <button className="text-button" onClick={() => navigate('Medical records')}>See all <ArrowUpRight size={15} /></button>
        </div>
        <div className="activity-list">
          <div><span>Lab upload</span><strong>Blood test</strong></div>
          <div><span>AI review</span><strong>Risk score updated</strong></div>
          <div><span>Doctor note</span><strong>Follow-up added</strong></div>
        </div>
      </div>

      <div className="feature-sheet">
        <div className="sheet-header">
          <h3>Next check-ins</h3>
          <button className="text-button" onClick={() => navigate('Appointments')}>Open <ArrowUpRight size={15} /></button>
        </div>
        <div className="checkin-list">
          <div><span>Orthopedics</span><strong>Thu, 10:30 AM</strong></div>
          <div><span>General physician</span><strong>Fri, 1:15 PM</strong></div>
        </div>
      </div>
    </section>
  </>
}

function RecordRow({ record, announce }) {
  const Icon = record.icon
  return <button className="record-row" onClick={() => announce(`Opening ${record.type.toLowerCase()} record...`)}>
    <div className={`record-icon ${record.color}`}><Icon size={18} /></div>
    <div className="record-copy">
      <strong>{record.type}</strong>
      <span>{record.date} · {record.source}</span>
    </div>
    <span className="status-text">{record.status}</span>
    <ChevronRight size={17} />
  </button>
}

function FeaturePage({ page, member, announce, familyMembers, setMemberIndex, showAddMember, setShowAddMember, newMember, setNewMember, handleAddMember }) {
  const title = page === 'Medical records' ? 'Unified medical records' : page

  const subtitles = {
    'Family members': 'Manage patient profiles in your family account.',
    'Medical records': 'A complete, scannable history of reports, tests, prescriptions, and consultations.',
    'Upload record': `Add a family-owned document for ${member.name}.`,
    'AI predictions': `Decision-support tools for ${member.name}.`,
    Doctors: 'Browse trusted healthcare professionals by department.',
    Appointments: 'Book and manage care for a specific family member.',
    Consultations: 'Review doctor notes, treatment plans, and linked records.',
    Prescriptions: 'View finalized prescriptions and instructions.',
    'Doctor access': 'Share one patient’s complete authorized history with a doctor.',
    'MediMind Knowledge': 'Read published doctor-authored healthcare information.',
  }

  return <section className="feature-view">
    <div className="feature-heading">
      <span className="feature-icon"><FileText size={20} /></span>
      <div>
        <p className="eyebrow">Family account</p>
        <h1>{title}</h1>
        <p>{subtitles[page]}</p>
      </div>

      {page === 'Family members' && (
        <button className="primary-button compact-button" onClick={() => setShowAddMember(true)}>
          <Plus size={16} /> Add member
        </button>
      )}
    </div>

    <div className="feature-panel">
      {page === 'Family members' && (
        <>
          <div className="feature-list">
            {familyMembers.map((item, index) => (
              <article className="feature-card" key={`${item.name}-${index}`}>
                <div className={`avatar avatar-${item.tone}`}>{item.initials}</div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.relation} · {item.records} records · {item.predictions} predictions</p>
                </div>
                <button className="text-button" onClick={() => { setMemberIndex(index); announce(`Opening ${item.name}'s profile.`) }}>
                  View profile <ArrowUpRight size={14} />
                </button>
              </article>
            ))}
          </div>

          {showAddMember && (
            <form className="add-member-form" onSubmit={handleAddMember}>
              <div className="form-header">
                <h3>Add family member</h3>
                <button type="button" className="close-form" onClick={() => setShowAddMember(false)} aria-label="Close add-member form">
                  <X size={16} />
                </button>
              </div>

              <div className="form-grid">
                <label>
                  <span>Name</span>
                  <input
                    value={newMember.name}
                    onChange={(event) => setNewMember(current => ({ ...current, name: event.target.value }))}
                    placeholder="Enter member name"
                  />
                </label>

                <label>
                  <span>Relation</span>
                  <select value={newMember.relation} onChange={(event) => setNewMember(current => ({ ...current, relation: event.target.value }))}>
                    <option>Family member</option>
                    <option>You</option>
                    <option>Spouse</option>
                    <option>Child</option>
                    <option>Parent</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="secondary-button" onClick={() => setShowAddMember(false)}>Cancel</button>
                <button type="submit" className="primary-button">Save member</button>
              </div>
            </form>
          )}
        </>
      )}

      {page === 'Medical records' && (
        <>
          <div className="filter-row">
            <button className="filter active">All records</button>
            <button className="filter">Reports</button>
            <button className="filter">Tests</button>
            <button className="filter">Prescriptions</button>
            <button className="filter">AI reports</button>
          </div>

          <div className="feature-records">
            {records.map(record => <RecordRow record={record} announce={announce} key={record.type} />)}
          </div>
        </>
      )}

      {page === 'Upload record' && <UploadForm announce={announce} />}
      {page === 'AI predictions' && <AIModules announce={announce} />}
      {page === 'Doctors' && <EmptyFeature page={page} announce={announce} />}
      {page === 'Appointments' && <EmptyFeature page={page} announce={announce} />}
      {page === 'Consultations' && <EmptyFeature page={page} announce={announce} />}
      {page === 'Prescriptions' && <EmptyFeature page={page} announce={announce} />}
      {page === 'Doctor access' && <EmptyFeature page={page} announce={announce} />}
      {page === 'MediMind Knowledge' && <EmptyFeature page={page} announce={announce} />}
    </div>
  </section>
}

function UploadForm({ announce }) {
  return <div className="upload-form">
    <label>Patient profile
      <select className="feature-input"><option>Father</option><option>Mother</option><option>Son</option></select>
    </label>

    <label>Record type
      <select className="feature-input"><option>Report</option><option>Test result</option><option>X-Ray or scan</option><option>Prescription</option></select>
    </label>

    <label className="drop-zone">
      <Upload size={25} />
      <strong>Choose a PDF, image, X-ray, or scan</strong>
      <span>Drag and drop files here</span>
      <input type="file" accept=".pdf,image/*" />
    </label>

    <label>Description
      <textarea className="feature-input" placeholder="Add context for this medical record" />
    </label>

    <button className="primary-button" onClick={() => announce('Medical record upload is ready to save.')}>Save record</button>
  </div>
}

function AIModules({ announce }) {
  return <>
    <div className="ai-modules">
      <button className="ai-module" onClick={() => announce('Fracture detection upload flow opened.')}>
        <span className="ai-icon coral-bg"><Activity size={18} /></span>
        <h3>Fracture detection</h3>
        <p>Upload an X-Ray, review confidence, and view explanation.</p>
        <ArrowUpRight size={16} />
      </button>

      <button className="ai-module" onClick={() => announce('Diabetes risk parameters opened.')}>
        <span className="ai-icon lilac-bg"><Activity size={18} /></span>
        <h3>Diabetes risk</h3>
        <p>Enter health parameters and review risk score.</p>
        <ArrowUpRight size={16} />
      </button>

      <button className="ai-module" onClick={() => announce('Heart disease risk parameters opened.')}>
        <span className="ai-icon mint-bg"><HeartPulse size={18} /></span>
        <h3>Heart disease risk</h3>
        <p>Enter health parameters and review risk score.</p>
        <ArrowUpRight size={16} />
      </button>
    </div>

    <div className="ai-warning">
      <ShieldCheck size={17} /> AI-assisted results support clinical decisions and are not a medical diagnosis.
    </div>
  </>
}

function EmptyFeature({ page, announce }) {
  const isAppointment = page === 'Appointments'

  return <div className="empty-feature">
    <div className="empty-art"><ShieldCheck size={26} /></div>
    <h2>{page === 'Doctor access' ? 'Patient-specific sharing' : page}</h2>
    <p>{page === 'Doctor access' ? 'Manage which doctor can access this patient’s complete authorized history.' : `The existing ${page.toLowerCase()} workflow is ready for connected data.`}</p>

    {isAppointment ? (
      <button className="primary-button" onClick={() => announce('Appointment booking flow opened.')}><Plus size={17} /> Book appointment</button>
    ) : (
      <button className="primary-button" onClick={() => announce(`${page} view is ready for connected data.`)}>Open {page.toLowerCase()} <ArrowUpRight size={15} /></button>
    )}
  </div>
}

export default App
