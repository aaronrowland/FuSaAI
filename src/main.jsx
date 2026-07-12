import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown, ArrowLeft, ArrowRight,
  Cpu, FileSpreadsheet, Layers3, Mail, Menu,
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
    title: 'AI-enabled safety processes',
    text: 'Practical AI integration for existing FuSa workflows, evidence retrieval, traceability, change impact and technical review.'
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
      <button className="wordmark" onClick={goHome} aria-label="Criticality Consulting home">
        <CriticalityMark compact />
        <span className="brand-type"><strong>CRITICALITY</strong><small>CONSULTING</small></span>
      </button>
      <div className="header-datum">SEMICONDUCTOR × FUSA × APPLIED AI</div>
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
          <p className="kicker">Semiconductor design · Functional safety · Applied AI</p>
          <h1>Functional safety,<br /><em>from IP block</em><br />to safety case.</h1>
          <p className="hero-intro">A unique blend of semiconductor design, functional safety and applied AI experience—bringing new insight to the engineering processes, evidence and tools your teams already use.</p>
          <div className="hero-links">
            <a href="#contact">Discuss a programme <ArrowRight size={16} /></a>
            <a href="#insights" className="quiet-link">Read the fieldnotes <ArrowDown size={15} /></a>
          </div>
        </div>
        <DieFigure />
      </section>

      <section className="manifesto">
        <div className="section-label">THE PROPOSITION</div>
        <div className="manifesto-copy">
          <p className="manifesto-lead">Deep domain experience, amplified by AI.</p>
          <p>We connect semiconductor design knowledge with functional safety practice, turning architectural intent, quantitative analysis and verification evidence into arguments that survive integration, change and independent review.</p>
          <p>Our AI support works within your existing processes. It helps engineers interrogate large evidence sets, surface inconsistencies and find overlooked connections—adding insight without replacing engineering judgement or established controls.</p>
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
          <div><strong>AI insight, integrated</strong><p>We apply AI to the processes and evidence you already have: document comparison, evidence retrieval, traceability, consistency analysis and review preparation—always source-linked and under engineering control.</p></div>
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
          <div className="article-mark"><CriticalityMark compact /><span>FIELDNOTE<br />{article.number}</span></div>
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
    <div className="soc-figure" aria-label="Semiconductor safety architecture block diagram">
      <div className="soc-caption"><span>REFERENCE SoC / SAFETY ARCHITECTURE</span><b>REV 09</b></div>
      <svg viewBox="0 0 640 530" role="img" aria-label="SoC block diagram showing aligned connections between compute, safety, interconnect, memory, clock and input-output blocks">
        <defs>
          <pattern id="soc-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#405553" />
          </pattern>
        </defs>
        <rect x="38" y="36" width="564" height="468" className="soc-die" />
        <rect x="54" y="52" width="532" height="436" fill="url(#soc-grid)" className="soc-die-inset" />

        <g className="soc-connectors">
          <path d="M170 202V250" />
          <path d="M470 202V250" />
          <path d="M150 330V378" />
          <path d="M320 330V378" />
          <path d="M490 330V378" />
        </g>
        <g className="soc-ports">
          <rect x="165" y="197" width="10" height="10" /><rect x="165" y="245" width="10" height="10" />
          <rect x="465" y="197" width="10" height="10" /><rect x="465" y="245" width="10" height="10" />
          <rect x="145" y="325" width="10" height="10" /><rect x="145" y="373" width="10" height="10" />
          <rect x="315" y="325" width="10" height="10" /><rect x="315" y="373" width="10" height="10" />
          <rect x="485" y="325" width="10" height="10" /><rect x="485" y="373" width="10" height="10" />
        </g>

        <g className="soc-block">
          <rect x="98" y="92" width="144" height="110" />
          <text x="112" y="114" className="soc-block-id">FCR 01</text>
          <text x="170" y="146" textAnchor="middle" className="soc-block-title">CPU CLUSTER</text>
          <text x="170" y="168" textAnchor="middle" className="soc-block-sub">LOCKSTEP / MPU</text>
        </g>
        <g className="soc-block safety-block">
          <rect x="398" y="92" width="144" height="110" />
          <text x="412" y="114" className="soc-block-id">FCR 02 / ASIL D</text>
          <text x="470" y="146" textAnchor="middle" className="soc-block-title">SAFETY ISLAND</text>
          <text x="470" y="168" textAnchor="middle" className="soc-block-sub">MONITOR / REACT</text>
        </g>
        <g className="soc-block fabric-block">
          <rect x="78" y="250" width="484" height="80" />
          <text x="96" y="274" className="soc-block-id">INTERCONNECT 00</text>
          <text x="320" y="297" textAnchor="middle" className="soc-block-title">ON-CHIP INTERCONNECT</text>
          <path d="M118 311H522" className="fabric-bus" />
        </g>
        <g className="soc-block">
          <rect x="78" y="378" width="144" height="110" />
          <text x="92" y="400" className="soc-block-id">MEM 04</text>
          <text x="150" y="434" textAnchor="middle" className="soc-block-title">SRAM / ECC</text>
          <text x="150" y="456" textAnchor="middle" className="soc-block-sub">SECDED + SCRUB</text>
        </g>
        <g className="soc-block">
          <rect x="248" y="378" width="144" height="110" />
          <text x="262" y="400" className="soc-block-id">CLK 06</text>
          <text x="320" y="434" textAnchor="middle" className="soc-block-title">CLOCK</text>
          <text x="320" y="456" textAnchor="middle" className="soc-block-sub">MONITOR</text>
        </g>
        <g className="soc-block">
          <rect x="418" y="378" width="144" height="110" />
          <text x="432" y="400" className="soc-block-id">PERIPH 08</text>
          <text x="490" y="434" textAnchor="middle" className="soc-block-title">I/O</text>
          <text x="490" y="456" textAnchor="middle" className="soc-block-sub">CRC / TIMEOUT</text>
        </g>
      </svg>
    </div>
  )
}

function DieMiniature() {
  return (
    <div className="die-mini" aria-label="Simplified SoC safety architecture diagram">
      <svg viewBox="0 0 360 300" role="img" aria-label="Aligned block diagram linking compute and safety functions through an interconnect to memory, clock and input-output blocks">
        <rect x="18" y="18" width="324" height="264" className="mini-die" />
        <g className="mini-connectors">
          <path d="M91 103V128" /><path d="M269 103V128" />
          <path d="M91 174V199" /><path d="M181 174V199" /><path d="M280 174V199" />
        </g>
        <g className="mini-ports">
          <rect x="87" y="99" width="8" height="8" /><rect x="87" y="124" width="8" height="8" />
          <rect x="265" y="99" width="8" height="8" /><rect x="265" y="124" width="8" height="8" />
          <rect x="87" y="170" width="8" height="8" /><rect x="87" y="195" width="8" height="8" />
          <rect x="177" y="170" width="8" height="8" /><rect x="177" y="195" width="8" height="8" />
          <rect x="276" y="170" width="8" height="8" /><rect x="276" y="195" width="8" height="8" />
        </g>
        <g className="mini-block"><rect x="42" y="48" width="98" height="55" /><text x="91" y="80" textAnchor="middle">CPU</text></g>
        <g className="mini-block mini-safety"><rect x="220" y="48" width="98" height="55" /><text x="269" y="75" textAnchor="middle">SAFETY</text><text x="269" y="87" textAnchor="middle">ISLAND</text></g>
        <g className="mini-block mini-fabric"><rect x="42" y="128" width="276" height="46" /><text x="180" y="155" textAnchor="middle">ON-CHIP INTERCONNECT</text></g>
        <g className="mini-block"><rect x="42" y="199" width="98" height="55" /><text x="91" y="231" textAnchor="middle">SRAM / ECC</text></g>
        <g className="mini-block"><rect x="158" y="199" width="46" height="55" /><text x="181" y="231" textAnchor="middle">CLK</text></g>
        <g className="mini-block"><rect x="242" y="199" width="76" height="55" /><text x="280" y="231" textAnchor="middle">I/O</text></g>
      </svg>
    </div>
  )
}

function SectionTitle({ eyebrow, title }) {
  return <div className="section-title"><span>{eyebrow}</span><h2>{title}</h2></div>
}

function CriticalityMark({ compact = false }) {
  return (
    <svg className={`criticality-mark${compact ? ' compact' : ''}`} viewBox="0 0 88 88" aria-hidden="true">
      <path className="mark-channel mark-channel-outer" d="M70 20A31 31 0 1 0 70 68" />
      <circle className="mark-terminal mark-terminal-dark" cx="70" cy="20" r="4.5" />
      <circle className="mark-terminal mark-terminal-dark" cx="70" cy="68" r="4.5" />
      <path className="mark-channel mark-channel-inner" d="M65 30A20 20 0 1 0 65 58" />
      <circle className="mark-terminal mark-terminal-copper" cx="65" cy="30" r="4" />
      <circle className="mark-terminal mark-terminal-copper" cx="65" cy="58" r="4" />
      <rect className="mark-die" x="36" y="36" width="16" height="16" />
      <path className="mark-pins" d="M40 32v4m4-4v4m4-4v4M40 52v4m4-4v4m4-4v4M32 40h4m-4 4h4m-4 4h4M52 40h4m-4 4h4m-4 4h4" />
      <circle className="mark-diagnostic" cx="48" cy="40" r="2.2" />
    </svg>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-index">START / 01</div>
      <div><p className="kicker">A technical conversation, not a sales call</p><h2>Bring the difficult<br />safety question.</h2></div>
      <div className="contact-copy">
        <p>Whether you need semiconductor safety expertise or want to introduce AI insight into an existing FuSa process, outline the programme, current workflow and decision you need to make.</p>
        <a href="mailto:hello@example.com"><Mail size={17} /> Start a confidential conversation <ArrowRight size={16} /></a>
        <small>Replace the placeholder address with your consultancy email before launch.</small>
      </div>
    </section>
  )
}

function Footer({ goHome }) {
  return (
    <footer>
      <button className="footer-brand" onClick={goHome}><CriticalityMark compact /><span><strong>CRITICALITY</strong><small>CONSULTING</small></span></button>
      <p>Semiconductor design, functional safety and applied AI.</p>
      <span>© 2026 / UNITED KINGDOM</span>
    </footer>
  )
}

createRoot(document.getElementById('root')).render(<App />)
