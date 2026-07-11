import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity, ArrowUpRight, Bell, Bot, Check, ChevronDown, ChevronRight,
  CircleHelp, Clock3, FileCheck2, FileSpreadsheet, FileText, Filter,
  FolderOpen, LayoutDashboard, Library, Link2, ListFilter, LockKeyhole,
  Menu, MessageSquareText, MoreHorizontal, Plus, Search, Send, Settings,
  ShieldAlert, ShieldCheck, Sparkles, Upload, Users, X
} from 'lucide-react'
import './styles.css'

const documents = [
  { name: 'Ceres SoC FMEDA', type: 'xlsx', date: 'Today, 09:42', status: 'Reviewed', icon: FileSpreadsheet, color: 'mint' },
  { name: 'Safety Manual · Rev 0.9', type: 'pdf', date: 'Yesterday', status: '3 findings', icon: FileText, color: 'amber' },
  { name: 'FI Campaign Summary', type: 'csv', date: '08 Jul 2026', status: 'Connected', icon: Activity, color: 'blue' },
  { name: 'Safety requirements', type: 'docx', date: '03 Jul 2026', status: 'Connected', icon: FileCheck2, color: 'blue' },
]

const findings = [
  { level: 'High', title: 'Clock-monitor coverage claim is unsupported', detail: 'The FMEDA claims 99% DC for 18 clock-related failure modes, but no supporting FI evidence is linked.', sources: 'FMEDA rows 214–231 · FI Campaign §4.2', avatar: 'CM' },
  { level: 'Medium', title: 'External watchdog assumption is missing', detail: 'The Safety Manual states the watchdog is required for ASIL D use; no matching integration requirement was found.', sources: 'Safety Manual §3.4 · Req. traceability', avatar: 'WD' },
  { level: 'Low', title: 'Two failure-mode rationales need review', detail: 'The safe-state classification is inconsistent with the documented reset behaviour.', sources: 'FMEDA rows 447, 452', avatar: 'RS' },
]

function App() {
  const [active, setActive] = useState('Review room')
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([
    { by: 'ai', text: 'I found 3 cross-document findings in the Ceres safety package. The highest priority is the clock-monitor coverage claim.' }
  ])
  const [showUpload, setShowUpload] = useState(false)
  const [toast, setToast] = useState('')

  const ask = () => {
    const value = question.trim()
    if (!value) return
    setMessages([...messages, { by: 'me', text: value }, { by: 'ai', text: 'I’m tracing that through the FMEDA, safety manual and fault-injection evidence. I’ll only surface claims with a linked source.' }])
    setQuestion('')
  }
  const notify = (text) => { setToast(text); setTimeout(() => setToast(''), 2600) }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><ShieldCheck size={18}/></div><span>sentinel</span></div>
      <div className="workspace-switcher"><div className="workspace-dot">N</div><div><strong>Northstar Semicon</strong><span>Safety workspace</span></div><ChevronDown size={15}/></div>
      <nav>
        <p className="nav-label">WORKSPACE</p>
        {[
          ['Review room', LayoutDashboard], ['Evidence library', Library], ['Safety packages', FolderOpen], ['Team', Users]
        ].map(([label, Icon]) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => setActive(label)}><Icon size={17}/><span>{label}</span>{label === 'Review room' && <em>3</em>}</button>)}
        <p className="nav-label nav-space">MANAGE</p>
        <button className="nav-item"><Settings size={17}/><span>Workspace settings</span></button>
        <button className="nav-item"><CircleHelp size={17}/><span>Help & guidance</span></button>
      </nav>
      <div className="sidebar-foot"><div className="avatar">AR</div><div><strong>Aaron Rowland</strong><span>Safety engineer</span></div><MoreHorizontal size={17}/></div>
    </aside>

    <main>
      <header className="topbar"><div className="crumb"><span>Safety packages</span><ChevronRight size={14}/><strong>Ceres SoC · Rev 0.9</strong></div><div className="top-actions"><button className="icon-btn"><Search size={18}/></button><button className="icon-btn"><Bell size={18}/><i></i></button><button className="outline-btn" onClick={() => notify('Share link copied to clipboard')}>Share <ArrowUpRight size={15}/></button></div></header>
      <section className="content">
        <div className="hero-row">
          <div><div className="eyebrow"><span></span> REVIEW ROOM</div><h1>Ceres SoC safety package</h1><p className="sub">A live, evidence-grounded review of your functional-safety collateral.</p></div>
          <div className="hero-actions"><button className="secondary-btn" onClick={() => notify('Report generation started')}><FileText size={16}/> Export review</button><button className="primary-btn" onClick={() => setShowUpload(true)}><Plus size={17}/> Add evidence</button></div>
        </div>

        <div className="metric-grid">
          <Metric icon={ShieldAlert} label="Open findings" value="3" note="1 needs attention" tone="amber" />
          <Metric icon={Link2} label="Evidence coverage" value="86%" note="12 claims unlinked" tone="mint" />
          <Metric icon={FileCheck2} label="Review progress" value="72%" note="31 of 43 checks" tone="blue" />
          <Metric icon={Clock3} label="Last analysis" value="09:42" note="Today" tone="slate" />
        </div>

        <div className="work-grid">
          <section className="panel findings-panel">
            <div className="panel-head"><div><h2>AI review findings</h2><p>Cross-document inconsistencies and missing evidence</p></div><button className="text-btn">View all <ChevronRight size={15}/></button></div>
            <div className="finding-filter"><button className="filter-active"><ListFilter size={14}/> All findings <b>3</b></button><button>High <b>1</b></button><button>Medium <b>1</b></button><button>Low <b>1</b></button><button className="filter-icon"><Filter size={15}/></button></div>
            <div className="finding-list">{findings.map((f) => <article className="finding" key={f.title}><div className={`finding-avatar ${f.level.toLowerCase()}`}>{f.avatar}</div><div className="finding-body"><div className="finding-title"><span className={`severity ${f.level.toLowerCase()}`}>{f.level}</span><h3>{f.title}</h3></div><p>{f.detail}</p><div className="sources"><Link2 size={13}/>{f.sources}</div></div><button className="open-finding" onClick={() => notify(`Opened: ${f.title}`)}><ArrowUpRight size={16}/></button></article>)}</div>
          </section>

          <section className="panel assistant-panel">
            <div className="assistant-head"><div className="ai-orb"><Sparkles size={16}/></div><div><h2>Ask Sentinel</h2><p>Evidence-grounded AI assistant</p></div><span className="online"><i></i> Ready</span></div>
            <div className="chat">{messages.map((m, i) => <div className={`message ${m.by}`} key={i}>{m.by === 'ai' && <div className="mini-orb"><Bot size={13}/></div>}<p>{m.text}</p></div>)}</div>
            <div className="suggestions"><button onClick={() => setQuestion('Which safety manual claims have no evidence?')}>Unlinked safety claims</button><button onClick={() => setQuestion('What changed since the previous revision?')}>Revision impact</button></div>
            <div className="ask-box"><input value={question} onChange={e => setQuestion(e.target.value)} onKeyDown={e => e.key === 'Enter' && ask()} placeholder="Ask about this safety package…"/><button onClick={ask}><Send size={16}/></button></div>
            <div className="ai-note"><LockKeyhole size={12}/> Answers use only this package’s connected evidence.</div>
          </section>
        </div>

        <section className="panel docs-panel"><div className="panel-head"><div><h2>Connected evidence</h2><p>Sentinel traces every finding back to these source artefacts.</p></div><button className="text-btn" onClick={() => setShowUpload(true)}><Upload size={15}/> Upload</button></div><div className="doc-table"><div className="doc-row doc-header"><span>ARTEFACT</span><span>ADDED</span><span>STATUS</span><span></span></div>{documents.map(doc => { const Icon = doc.icon; return <div className="doc-row" key={doc.name}><div className="doc-name"><div className={`doc-icon ${doc.color}`}><Icon size={17}/></div><div><strong>{doc.name}</strong><span>{doc.type.toUpperCase()}</span></div></div><span>{doc.date}</span><span className={`doc-status ${doc.color}`}><i></i>{doc.status}</span><button className="row-more"><MoreHorizontal size={18}/></button></div>})}</div></section>
      </section>
    </main>
    {showUpload && <UploadModal close={() => setShowUpload(false)} notify={notify}/>} 
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </div>
}

function Metric({ icon: Icon, label, value, note, tone }) { return <div className="metric"><div className={`metric-icon ${tone}`}><Icon size={18}/></div><div><p>{label}</p><strong>{value}</strong><span>{note}</span></div></div> }

function UploadModal({ close, notify }) { return <div className="modal-backdrop" onMouseDown={close}><div className="modal" onMouseDown={e => e.stopPropagation()}><button className="close-btn" onClick={close}><X size={18}/></button><div className="modal-icon"><Upload size={20}/></div><h2>Add evidence</h2><p>Connect files to ground future review findings and answers.</p><label className="drop-zone"><Upload size={21}/><strong>Drop files here or <span>browse</span></strong><small>FMEDA, safety manual, FI results, requirements · PDF, XLSX, CSV, DOCX</small><input type="file" multiple onChange={() => { close(); notify('Evidence uploaded and queued for analysis') }}/></label><div className="modal-foot"><LockKeyhole size={13}/> Files stay inside your private workspace.</div></div></div> }

createRoot(document.getElementById('root')).render(<App />)
