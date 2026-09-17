import { useState } from 'react'
import { Activity, ArrowUpRight, Bell, CalendarDays, ChevronDown, ChevronRight, CircleHelp, FileText, HeartPulse, LayoutDashboard, LockKeyhole, Menu, MoreHorizontal, Moon, Plus, Search, Settings, ShieldCheck, Sparkles, Stethoscope, Sun, Trash2, Upload, UsersRound, X } from 'lucide-react'
import './App.css'

const members = [
  { name: 'Father', relation: 'You', initials: 'RK', tone: 'coral', records: 12, predictions: 3 },
  { name: 'Mother', relation: 'Family member', initials: 'PM', tone: 'lilac', records: 8, predictions: 2 },
  { name: 'Son', relation: 'Family member', initials: 'AS', tone: 'mint', records: 4, predictions: 1 },
]

const navItems = [
  ['Dashboard', LayoutDashboard], ['Family members', UsersRound], ['Medical records', FileText], ['Upload record', Upload], ['AI predictions', Sparkles], ['Doctors', Stethoscope], ['Appointments', CalendarDays], ['Consultations', Activity], ['Prescriptions', HeartPulse], ['MediMind Knowledge', FileText],
]

const records = [
  { type: 'Blood test', date: '15 Sep 2026', source: 'Uploaded by Family', icon: Activity, color: 'orange', status: 'Available' },
  { type: 'X-Ray', date: '10 Sep 2026', source: 'Dr. Rahul · Orthopedics', icon: FileText, color: 'blue', status: 'Available' },
  { type: 'Consultation', date: '08 Sep 2026', source: 'Dr. Kumar · Cardiology', icon: Stethoscope, color: 'green', status: 'Finalized' },
]

const presentationData = {
  Doctors: [
    { title: 'Dr. Rahul Mehta', detail: 'Orthopedics · MediMind Hospital', meta: 'Available today · 10:30 AM', tone: 'coral', initials: 'RM', action: 'Book appointment' },
    { title: 'Dr. Ananya Rao', detail: 'Cardiology · Heart & Wellness Center', meta: 'Next slot · Tomorrow, 2:00 PM', tone: 'lilac', initials: 'AR', action: 'View profile' },
    { title: 'Dr. Kumar Iyer', detail: 'General medicine · City Care Clinic', meta: 'Available Friday · 11:15 AM', tone: 'mint', initials: 'KI', action: 'View profile' },
  ],
  Appointments: [
    { title: 'Orthopedics follow-up', detail: 'Dr. Rahul Mehta · Father', meta: '18 Sep 2026 · 10:30 AM', tone: 'coral', initials: '18', action: 'View details' },
    { title: 'Annual health review', detail: 'Dr. Ananya Rao · Mother', meta: '22 Sep 2026 · 2:00 PM', tone: 'lilac', initials: '22', action: 'View details' },
    { title: 'Routine check-up', detail: 'Dr. Kumar Iyer · Son', meta: '28 Sep 2026 · 11:15 AM', tone: 'mint', initials: '28', action: 'View details' },
  ],
  Consultations: [
    { title: 'Orthopedics follow-up notes', detail: 'Dr. Rahul Mehta · Father', meta: 'Updated 15 Sep 2026 · Treatment plan ready', tone: 'coral', initials: 'RM', action: 'Open notes' },
    { title: 'Cardiology consultation', detail: 'Dr. Ananya Rao · Mother', meta: 'Updated 12 Sep 2026 · Review recommended', tone: 'lilac', initials: 'AR', action: 'Open notes' },
    { title: 'General medicine visit', detail: 'Dr. Kumar Iyer · Son', meta: 'Updated 08 Sep 2026 · No follow-up needed', tone: 'mint', initials: 'KI', action: 'Open notes' },
  ],
  Prescriptions: [
    { title: 'Vitamin D3 supplement', detail: 'For Father · Once daily after breakfast', meta: 'Active until 30 Nov 2026', tone: 'coral', initials: 'Rx', action: 'View instructions' },
    { title: 'Blood pressure monitoring', detail: 'For Mother · Follow prescribed dosage', meta: 'Active until 15 Oct 2026', tone: 'lilac', initials: 'Rx', action: 'View instructions' },
    { title: 'Seasonal allergy relief', detail: 'For Son · As needed', meta: 'Active until 01 Oct 2026', tone: 'mint', initials: 'Rx', action: 'View instructions' },
  ],
  'MediMind Knowledge': [
    { title: 'Understanding your blood test', detail: 'Doctor-authored guide · 6 min read', meta: 'Updated 14 Sep 2026', tone: 'coral', initials: '01', action: 'Read article' },
    { title: 'Heart-healthy daily routines', detail: 'Wellness guide · 8 min read', meta: 'Updated 10 Sep 2026', tone: 'lilac', initials: '02', action: 'Read article' },
    { title: 'Preparing for an appointment', detail: 'Family care guide · 4 min read', meta: 'Updated 05 Sep 2026', tone: 'mint', initials: '03', action: 'Read article' },
  ],
}

function App() {
  const [page, setPage] = useState('Dashboard')
  const [memberIndex, setMemberIndex] = useState(0)
  const [dark, setDark] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [familyMembers, setFamilyMembers] = useState(members)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState({ name: '', relation: 'Family member', customRelation: '' })

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

    const relation = newMember.relation === 'Other' ? newMember.customRelation.trim() : newMember.relation
    if (!relation) {
      announce('Please enter a custom relation.')
      return
    }

    const initials = name.split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase() ?? '').join('') || 'MM'
    const tones = ['coral', 'lilac', 'mint']

    const nextMember = {
      name,
      relation,
      initials,
      tone: tones[(familyMembers.length) % tones.length],
      records: 0,
      predictions: 0,
    }

    const updatedMembers = [...familyMembers, nextMember]
    setFamilyMembers(updatedMembers)
    setMemberIndex(updatedMembers.length - 1)
    setShowAddMember(false)
    setNewMember({ name: '', relation: 'Family member', customRelation: '' })
    announce(`${name} was added to your family account.`)
  }

  const handleDeleteMember = (index) => {
    if (familyMembers.length === 1) {
      announce('At least one family member must remain in the account.')
      return
    }

    const deletedMember = familyMembers[index]
    if (!window.confirm(`Delete ${deletedMember.name} from this family account?`)) return

    const updatedMembers = familyMembers.filter((_, memberIndexToRemove) => memberIndexToRemove !== index)
    setFamilyMembers(updatedMembers)
    setMemberIndex(currentIndex => index < currentIndex ? currentIndex - 1 : Math.min(currentIndex, updatedMembers.length - 1))
    announce(`${deletedMember.name} was removed from your family account.`)
  }

  return <div className={`app-shell ${dark ? 'dark-theme' : ''}`}>
    <style>{`.upload-form{width:min(100%,720px);margin:0 auto}.upload-form .primary-button{width:100%;justify-content:center}.feature-panel:has(.upload-form){padding:32px 40px}.drop-zone{min-height:150px}.feature-panel:has(.upload-form) label{width:100%}.feature-view{display:flex;flex-direction:column;gap:20px}.feature-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}.feature-heading>div{flex:1}.feature-icon{display:grid;place-items:center;width:48px;height:48px;border-radius:14px;background:var(--soft);color:var(--teal)}.compact-button{margin-left:auto;white-space:nowrap}.add-member-form{margin-top:14px;padding:20px;border:1px solid var(--line);border-radius:18px;background:var(--card);box-shadow:0 10px 24px rgba(25,39,52,.04)}.form-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}.form-header h3{margin:0;font-size:1.1rem}.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.add-member-form label{display:flex;flex-direction:column;gap:8px;color:#5d646d;font-size:12px;font-weight:600}.add-member-form input,.add-member-form select{border:1px solid var(--line);border-radius:10px;background:var(--bg);padding:11px 12px;font:inherit;color:var(--ink)}.form-actions{display:flex;justify-content:flex-end;gap:12px;margin-top:18px}.secondary-button{display:inline-flex;align-items:center;justify-content:center;padding:10px 16px;border-radius:10px;border:1px solid var(--line);background:transparent;color:var(--ink);font-weight:600}.close-form{display:grid;place-items:center;width:32px;height:32px;border-radius:8px;border:1px solid var(--line);background:transparent;color:var(--ink)}.delete-member-button{display:grid;place-items:center;width:32px;height:32px;margin-left:0;border:1px solid #efcaca;border-radius:9px;background:transparent;color:#c45b5b}.delete-member-button:hover{background:#fff0f0;color:#a93f3f;transform:translateY(-1px)}.feature-card{flex-wrap:nowrap}.feature-card .text-button{margin-left:auto;align-self:center}.feature-card .delete-member-button{align-self:center}.recent-records-panel .section-heading h2{font-size:18px}.recent-records-panel .section-heading p{font-size:12px}.recent-records-panel .record-copy strong{font-size:13px}.recent-records-panel .record-copy span,.recent-records-panel .status-text{font-size:11px}@media(max-width:720px){.feature-heading{flex-direction:column}.compact-button{width:100%}.form-grid{grid-template-columns:1fr}.upload-form{width:100%}.feature-panel:has(.upload-form){padding:20px 16px}.feature-card{flex-wrap:wrap}.feature-card .text-button{margin-left:auto}}`}</style>
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
            page === 'Member profile' ? <MemberProfilePage member={member} navigate={navigate} announce={announce} /> : <FeaturePage page={page} member={member} announce={announce} navigate={navigate} familyMembers={familyMembers} setMemberIndex={setMemberIndex} showAddMember={showAddMember} setShowAddMember={setShowAddMember} newMember={newMember} setNewMember={setNewMember} handleAddMember={handleAddMember} handleDeleteMember={handleDeleteMember} />
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

      <div className="insight-card">
        <div className="insight-icon"><Sparkles size={18} /></div>
        <div>
          <p className="card-kicker">LATEST AI INSIGHT</p>
          <h3>Heart health looks stable</h3>
          <p className="insight-copy">Based on your latest health assessment from 10 Sep.</p>
          <button className="text-button" onClick={() => navigate('AI predictions')}>View prediction <ArrowUpRight size={15} /></button>
        </div>
        <div className="insight-ring"><span>86</span><small>score</small></div>
      </div>
    </section>

    <section className="lower-grid">
      <div className="records-panel">
        <div className="section-heading">
          <div>
            <h2>{member.name}’s recent records</h2>
            <p>Your latest health activity</p>
          </div>
          <button className="text-button" onClick={() => navigate('Medical records')}>View all <ArrowUpRight size={15} /></button>
        </div>
        <div className="record-list">{records.map(record => <RecordRow record={record} key={record.type} announce={announce} />)}</div>
        <button className="upload-button" onClick={() => navigate('Upload record')}><Upload size={17} /> Upload a medical record</button>
      </div>

      <div className="activity-panel">
        <div className="section-heading">
          <div>
            <h2>At a glance</h2>
            <p>Across your family account</p>
          </div>
          <button className="icon-button" onClick={() => announce('Family account summary refreshed.')} aria-label="Refresh family account summary"><MoreHorizontal size={18} /></button>
        </div>

        <div className="stat-grid">
          <div className="stat"><span className="stat-icon coral-bg"><FileText size={17} /></span><strong>24</strong><span>Medical records</span></div>
          <div className="stat"><span className="stat-icon lilac-bg"><Sparkles size={17} /></span><strong>6</strong><span>AI predictions</span></div>
          <div className="stat"><span className="stat-icon mint-bg"><CalendarDays size={17} /></span><strong>3</strong><span>Appointments</span></div>
          <div className="stat"><span className="stat-icon yellow-bg"><LockKeyhole size={17} /></span><strong>2</strong><span>Shared doctors</span></div>
        </div>

        <div className="secure-banner"><ShieldCheck size={17} /><span>All family profiles are protected with secure access.</span></div>
      </div>
    </section>

    <p className="disclaimer"><ShieldCheck size={14} /> MediMind supports better health decisions. It does not replace professional medical advice.</p>
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

function MemberProfilePage({ member, navigate, announce }) {
  return <section className="feature-view">
    <div className="feature-heading">
      <span className={`avatar avatar-${member.tone}`}>{member.initials}</span>
      <div>
        <p className="eyebrow">Family account</p>
        <h1>{member.name}'s profile</h1>
        <p>{member.relation} · Personal health overview and activity.</p>
      </div>
      <button className="secondary-button compact-button" onClick={() => navigate('Family members')}>
        <ArrowUpRight size={16} /> Back to family members
      </button>
    </div>

    <div className="dashboard-grid profile-summary-grid">
      <div className="insight-card">
        <div className="insight-icon"><HeartPulse size={18} /></div>
        <div>
          <p className="card-kicker">HEALTH OVERVIEW</p>
          <h3>Health profile is ready</h3>
          <p className="insight-copy">Review records, appointments, and AI-supported health updates for {member.name}.</p>
          <button className="text-button" onClick={() => navigate('Medical records')}>View records <ArrowUpRight size={15} /></button>
        </div>
        <div className="insight-ring"><span>78</span><small>score</small></div>
      </div>

      <div className="activity-panel">
        <div className="section-heading">
          <div>
            <h2>At a glance</h2>
            <p>{member.name}'s account activity</p>
          </div>
        </div>
        <div className="stat-grid">
          <div className="stat"><span className="stat-icon coral-bg"><FileText size={17} /></span><strong>{member.records}</strong><span>Medical records</span></div>
          <div className="stat"><span className="stat-icon lilac-bg"><Sparkles size={17} /></span><strong>{member.predictions}</strong><span>AI predictions</span></div>
        </div>
        <div className="secure-banner"><ShieldCheck size={17} /><span>This profile is protected with secure access.</span></div>
      </div>
    </div>

    <div className="records-panel recent-records-panel">
      <div className="section-heading">
        <div>
          <h2>Recent records</h2>
          <p>Latest health activity for {member.name}</p>
        </div>
        <button className="text-button" onClick={() => navigate('Medical records')}>View all <ArrowUpRight size={15} /></button>
      </div>
      <div className="record-list">{records.map(record => <RecordRow record={record} announce={announce} key={record.type} />)}</div>
    </div>
  </section>
}

function FeaturePage({ page, member, announce, navigate, familyMembers, setMemberIndex, showAddMember, setShowAddMember, newMember, setNewMember, handleAddMember, handleDeleteMember }) {
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
                <button className="text-button" onClick={() => { setMemberIndex(index); navigate('Member profile'); announce(`Opening ${item.name}'s profile.`) }}>
                  View profile <ArrowUpRight size={14} />
                </button>
                <button
                  type="button"
                  className="delete-member-button"
                  onClick={() => handleDeleteMember(index)}
                  aria-label={`Delete ${item.name}`}
                  title={`Delete ${item.name}`}
                >
                  <Trash2 size={16} />
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
                  {newMember.relation === 'Other' && (
                    <input
                      value={newMember.customRelation}
                      onChange={(event) => setNewMember(current => ({ ...current, customRelation: event.target.value }))}
                      placeholder="Enter custom relation"
                      aria-label="Custom relation"
                      required
                    />
                  )}
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
      {presentationData[page] && <PresentationFeature page={page} announce={announce} />}
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

function PresentationFeature({ page, announce }) {
  return <div className="feature-list">
    {presentationData[page].map((item, index) => (
      <article className="feature-card" key={`${page}-${item.title}`}>
        <div className={`avatar avatar-${item.tone}`}>{item.initials}</div>
        <div>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
          <span className="feature-meta">{item.meta}</span>
        </div>
        <button className="text-button" onClick={() => announce(`${item.action}: ${item.title}.`)}>
          {item.action} <ArrowUpRight size={14} />
        </button>
      </article>
    ))}
  </div>
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
