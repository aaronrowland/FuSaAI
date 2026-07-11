import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight,
  CircuitBoard, Cpu, FileSpreadsheet, Layers3, Mail, Menu, ShieldCheck,
  Sparkles, X, Zap
} from 'lucide-react'
import './styles.css'

const articles = [
  {
    slug: 'fmeda-customer-boundary',
    number: '01',
    category: 'FMEDA',
    date: '11 July 2026',
    read: '8 min read',
    title: 'Why semiconductor FMEDAs fail at the customer boundary',
    standfirst: 'The arithmetic is rarely the problem. Trouble starts when an internally consistent analysis meets a system context it was never written to survive.',
    accent: 'amber',
    sections: [
      {
        heading: 'An FMEDA is an interface, not merely an analysis',
        body: [
          'Inside a semiconductor organisation, the FMEDA can look complete. Failure rates reconcile, safety mechanisms are assigned and the hardware metrics meet their targets. But a Tier 1 customer does not integrate the internal spreadsheet. They integrate the assumptions represented by it.',
          'That distinction matters. Diagnostic coverage is conditional on operating modes, fault-reaction paths, software configuration, external measures and timing assumptions. When those conditions are not transferred precisely, the customer receives numbers without the engineering contract that makes them valid.'
        ]
      },
      {
        heading: 'Where the handover usually breaks',
        body: [
          'The first failure is vocabulary. The semiconductor analysis and the system safety concept often classify effects at different levels of abstraction. A failure described as safe at IP level may become safety relevant once the integrator allocates a vehicle-level function to that IP.',
          'The second is configurability. Device variants, enabled features and mission profiles change the relevant failure population. A static export can conceal which assumptions were selected and which parts of the analysis were excluded.',
          'The third is evidence separation. The safety manual communicates what the integrator must do, while the FMEDA states what the device achieves. If the two artefacts are maintained independently, coverage claims and assumptions drift apart.'
        ]
      },
      {
        heading: 'Treat every metric as a claim with dependencies',
        body: [
          'A useful handover model connects each quantitative claim to four things: the failure modes it covers, the safety mechanism that detects them, the verification evidence supporting the coverage, and the assumptions the integrator must preserve.',
          'This turns the FMEDA from a final spreadsheet into a navigable evidence structure. It also makes changes manageable: when a clock monitor, memory protection scheme or fault-reaction time changes, the affected claims and customer obligations become visible.'
        ]
      },
      {
        heading: 'A practical review question',
        body: [
          'Before releasing a semiconductor safety package, ask whether an engineer outside the organisation could reproduce the intended system context using only the released artefacts. If the answer depends on a meeting, an internal expert or an undocumented spreadsheet convention, the interface is incomplete.'
        ]
      }
    ]
  },
  {
    slug: 'diagnostic-coverage-evidence',
    number: '02',
    category: 'Fault injection',
    date: '04 July 2026',
    read: '6 min read',
    title: 'Diagnostic coverage is an evidence claim, not a spreadsheet field',
    standfirst: 'A percentage becomes credible only when its fault population, detection criteria and supporting campaign can be reconstructed.',
    accent: 'green',
    sections: [
      {
        heading: 'The seductive precision of a percentage',
        body: [
          'Diagnostic coverage values look authoritative because they are numerical. Yet the number carries little meaning without a defined fault population, observation window, detection criterion and treatment of inconclusive results.',
          'The useful engineering question is not “what DC did we assign?” but “what evidence would cause us to revise this claim?”'
        ]
      },
      {
        heading: 'Build the chain backwards',
        body: [
          'Start with the safety mechanism and its intended detection behaviour. Identify the failure modes it is credited against, then connect representative fault-injection results and analytical arguments. Finally, expose exclusions and uncertainty rather than burying them in campaign notes.',
          'This structure makes review faster and prevents evidence produced for one configuration from being reused silently in another.'
        ]
      }
    ]
  },
  {
    slug: 'ip-to-soc-assumptions',
    number: '03',
    category: 'Safety architecture',
    date: '25 June 2026',
    read: '7 min read',
    title: 'From IP to SoC: preserving safety assumptions across integration',
    standfirst: 'Reuse saves engineering effort only when inherited safety assumptions remain explicit, testable and owned.',
    accent: 'blue',
    sections: [
      {
        heading: 'Reuse moves responsibility; it does not remove it',
        body: [
          'A qualified IP block arrives with assumptions about clocks, resets, power domains, diagnostics and dependent failures. At SoC level those assumptions meet a new architecture, and some cease to be true.',
          'The integration argument should therefore identify which assumptions are preserved by construction, which require external measures and which must be revalidated in the SoC context.'
        ]
      },
      {
        heading: 'Make assumptions executable',
        body: [
          'An assumption that cannot be mapped to an owner, requirement or verification activity is documentation rather than control. Converting the most important assumptions into integration checks creates a repeatable release gate for later derivatives.'
        ]
      }
    ]
  }
]

const services = [
  {
    icon: Cpu,
    number: '01',
    title: 'Semiconductor safety architecture',
    text: 'Safety concepts, fault-containment regions, dependent-failure analysis and mechanism allocation from IP to SoC.'
  },
  {
    icon: FileSpreadsheet,
    number: '02',
    title: 'FMEDA and hardware metrics',
    text: 'Failure-rate modelling, FMEDA review, SPFM/LFM/PMHF analysis and customer-configurable handover strategies.'
  },
  {
    icon: Zap,
    number: '03',
    title: 'Diagnostic coverage evidence',
    text: 'Fault-injection planning, result triage and defensible links between coverage claims and verification evidence.'
  },
  {
    icon: Layers3,
    number: '04',
    title: 'Safety collateral and assurance',
    text: 'Safety manuals, assumptions of use, traceability, change impact and assessor-ready technical arguments.'
  }
]

function App() {
  const [article, setArticle] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const openArticle = (item) => {
    setArticle(item)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = () => {
    setArticle(null)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <Header article={article} goHome={goHome} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {article ? <ArticlePage article={article} goHome={goHome} /> : <HomePage openArticle={openArticle} />}
      <Footer goHome={goHome} />
    </div>
  )
}

function Header({ article, goHome, menuOpen, setMenuOpen }) {
  const jump = (id) => {
    if (article) goHome()
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <button className="wordmark" onClick={goHome} aria-label="FuSa Fieldnotes home">
        <span className="wordmark-chip"><CircuitBoard size={18} /></span>
        <span>FuSa<span>/</span>Fieldnotes</span>
      </button>
      <div className="header-datum">SEMICONDUCTOR FUNCTIONAL SAFETY</div>
      <nav className={menuOpen ? 'open' : ''}>
        <button onClick={() => jump('expertise')}>Expertise</button>
        <button onClick={() => jump('insights')}>Insights</button>
        <button onClick={() => jump('approach')}>Approach</button>
        <button className="nav-contact" onClick={() => jump('contact')}>Start a conversation <ArrowRight size={14} /></button>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function HomePage({ openArticle }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-index">FIELD NOTE / 00</div>
        <div className="hero-copy">
          <p className="kicker">Independent semiconductor FuSa consultancy</p>
          <h1>Functional safety,<br /><em>from IP block</em><br />to safety case.</h1>
          <p className="hero-intro">Engineering support for semiconductor teams building credible safety architectures, FMEDAs, diagnostic evidence and customer collateral.</p>
          <div className="hero-links">
            <a href="#contact">Discuss a programme <ArrowRight size={16} /></a>
            <a href="#insights" className="quiet-link">Read the fieldnotes <ArrowDown size={15} /></a>
          </div>
        </div>
        <DieFigure />
        <aside className="hero-note">
          <span>FOCUS</span>
          <p>ISO 26262 semiconductor development, with particular attention to the interfaces where safety arguments tend to fracture.</p>
        </aside>
      </section>

      <section className="manifesto">
        <div className="section-label">THE PROPOSITION</div>
        <div className="manifesto-copy">
          <p className="manifesto-lead">The spreadsheet is not the safety argument.</p>
          <p>Strong semiconductor functional safety work connects architectural intent, quantitative analysis and verification evidence into something that survives integration, change and independent review.</p>
          <p>We combine practitioner-led engineering judgement with carefully bounded AI support to interrogate large evidence sets, find inconsistencies and accelerate—not replace—technical review.</p>
        </div>
      </section>

      <section className="expertise" id="expertise">
        <SectionTitle eyebrow="What we do" title="Specialist support at the difficult interfaces." />
        <div className="service-grid">
          {services.map(({ icon: Icon, number, title, text }) => (
            <article className="service" key={number}>
              <div className="service-top"><span>{number}</span><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="service-line" />
            </article>
          ))}
        </div>
      </section>

      <section className="insights" id="insights">
        <SectionTitle eyebrow="Latest fieldnotes" title="Working notes on semiconductor safety." />
        <div className="feature-article" onClick={() => openArticle(articles[0])} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openArticle(articles[0])}>
          <div className="feature-art"><DieMiniature /><span>FMEDA / INTERFACES</span></div>
          <div className="feature-copy">
            <div className="article-meta"><span>{articles[0].category}</span><span>{articles[0].read}</span></div>
            <h3>{articles[0].title}</h3>
            <p>{articles[0].standfirst}</p>
            <button>Read fieldnote <ArrowRight size={15} /></button>
          </div>
        </div>
        <div className="article-list">
          {articles.slice(1).map((item) => (
            <article key={item.slug} onClick={() => openArticle(item)}>
              <span className="article-number">{item.number}</span>
              <div><div className="article-meta"><span>{item.category}</span><span>{item.read}</span></div><h3>{item.title}</h3></div>
              <p>{item.standfirst}</p>
              <ArrowRight size={18} />
            </article>
          ))}
        </div>
      </section>

      <section className="approach" id="approach">
        <SectionTitle eyebrow="How we work" title="Expert-led. Evidence-bound. Proportionate." />
        <div className="approach-grid">
          {[
            ['01', 'Frame', 'Define the safety context, decision to be made and evidence that would change it.'],
            ['02', 'Interrogate', 'Challenge architectures, assumptions, analyses and supporting evidence at their interfaces.'],
            ['03', 'Resolve', 'Turn findings into owned engineering actions with explicit rationale and verification.'],
            ['04', 'Transfer', 'Leave a reviewable argument and reusable method—not a consultant-dependent black box.']
          ].map(([n, title, text]) => <div className="approach-step" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}
        </div>
        <div className="ai-position">
          <Sparkles size={20} />
          <div><strong>Where AI fits</strong><p>Document comparison, evidence retrieval, traceability suggestions and review preparation—always source-linked and under engineering control.</p></div>
        </div>
      </section>

      <Contact />
    </main>
  )
}

function ArticlePage({ article, goHome }) {
  return (
    <main className="article-page">
      <div className="article-breadcrumb"><button onClick={goHome}><ArrowLeft size={14} /> All fieldnotes</button><span>{article.number} / {article.category}</span></div>
      <header className="article-hero">
        <div className="article-meta"><span>{article.date}</span><span>{article.read}</span></div>
        <h1>{article.title}</h1>
        <p>{article.standfirst}</p>
      </header>
      <div className="article-layout">
        <aside>
          <div className="article-mark"><CircuitBoard size={23} /><span>FIELDNOTE<br />{article.number}</span></div>
          <p>Semiconductor functional safety</p>
        </aside>
        <article className="article-body">
          {article.sections.map((section, index) => (
            <section key={section.heading}>
              <span className="section-count">{String(index + 1).padStart(2, '0')}</span>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          <div className="article-end"><span>END / {article.number}</span><button onClick={goHome}>Return to fieldnotes <ArrowRight size={14} /></button></div>
        </article>
      </div>
      <Contact />
    </main>
  )
}

function DieFigure() {
  return (
    <div className="die-figure" aria-label="Abstract semiconductor die diagram">
      <div className="die-coordinate top">A0&nbsp;&nbsp;&nbsp; CERES-7 &nbsp;&nbsp;&nbsp;F7</div>
      <div className="die-coordinate side">SAFETY ARCHITECTURE / REV 09</div>
      <div className="die">
        <div className="die-block cpu">CPU<br />CLUSTER</div>
        <div className="die-block safety"><ShieldCheck size={19} />SAFETY<br />ISLAND</div>
        <div className="die-block noc">NoC FABRIC</div>
        <div className="die-block mem">SRAM / ECC</div>
        <div className="die-block io">I/O</div>
        <div className="die-block clock">CLK</div>
        <div className="die-trace trace-a" /><div className="die-trace trace-b" /><div className="die-trace trace-c" />
      </div>
      <div className="die-legend"><span><i className="safe" /> Safety related</span><span><i /> Supporting function</span></div>
    </div>
  )
}

function DieMiniature() {
  return <div className="die-mini"><span /><span /><span /><span /><span /><span /><i /><i /></div>
}

function SectionTitle({ eyebrow, title }) {
  return <div className="section-title"><span>{eyebrow}</span><h2>{title}</h2></div>
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-index">START / 01</div>
      <div><p className="kicker">A technical conversation, not a sales call</p><h2>Bring the difficult<br />safety question.</h2></div>
      <div className="contact-copy">
        <p>For semiconductor safety architecture, FMEDA review, fault-injection evidence or customer collateral support, outline the programme and the decision you need to make.</p>
        <a href="mailto:hello@example.com"><Mail size={17} /> Start a confidential conversation <ArrowRight size={16} /></a>
        <small>Replace the placeholder address with your consultancy email before launch.</small>
      </div>
    </section>
  )
}

function Footer({ goHome }) {
  return (
    <footer>
      <button className="footer-brand" onClick={goHome}><CircuitBoard size={17} /> FuSa/Fieldnotes</button>
      <p>Independent semiconductor functional safety consultancy.</p>
      <span>© 2026 / UNITED KINGDOM</span>
    </footer>
  )
}

createRoot(document.getElementById('root')).render(<App />)
