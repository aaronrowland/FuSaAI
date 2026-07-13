import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown, ArrowLeft, ArrowRight,
  Cpu, FileSpreadsheet, Layers3, Mail, Menu,
  Sparkles, X, Zap
} from 'lucide-react'
import { articleMeta } from './article-meta.js'
import './styles.css'

const articles = [
  {
    ...articleMeta[0],
    number: '01',
    category: 'FMEDA',
    date: '11 July 2026',
    read: '8 min read',
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
    ...articleMeta[1],
    number: '02',
    category: 'Fault injection',
    date: '04 July 2026',
    read: '6 min read',
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
    ...articleMeta[2],
    number: '03',
    category: 'Safety architecture',
    date: '25 June 2026',
    read: '7 min read',
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

const aiApplications = [
  {
    number: 'A1',
    title: 'Cross-document consistency',
    text: 'Compare safety concepts, manuals, FMEDAs and verification artefacts to expose conflicting assumptions, terminology and obligations.'
  },
  {
    number: 'A2',
    title: 'Change-impact analysis',
    text: 'Trace a design or evidence change to the safety claims, mechanisms, assumptions and customer-facing material that may need review.'
  },
  {
    number: 'A3',
    title: 'Evidence retrieval',
    text: 'Create source-linked views across large evidence sets so engineers can reconstruct an argument without losing provenance.'
  }
]

const HOME_TITLE = 'Criticality Consulting — Semiconductor Functional Safety'
const HOME_DESCRIPTION = 'Independent semiconductor functional safety consultancy combining semiconductor design, FuSa engineering and applied AI.'
const articlePath = (article) => `/fieldnotes/${article.slug}/`
const articleFromPath = (pathname) => {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`
  return articles.find((item) => articlePath(item) === normalizedPath) || null
}

function isModifiedClick(event) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

function updateMetadata(article) {
  const title = article ? `${article.title} — Criticality Fieldnotes` : HOME_TITLE
  const description = article?.standfirst || HOME_DESCRIPTION
  const canonicalUrl = `${window.location.origin}${article ? articlePath(article) : '/'}`
  const setMeta = (selector, attribute, value) => {
    const element = document.querySelector(selector)
    if (element) element.setAttribute(attribute, value)
  }

  document.title = title
  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[property="og:title"]', 'content', title)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[property="og:type"]', 'content', article ? 'article' : 'website')
  setMeta('meta[property="og:url"]', 'content', canonicalUrl)
  setMeta('meta[property="og:image"]', 'content', `${window.location.origin}/social-card.png`)
  setMeta('meta[name="twitter:title"]', 'content', title)
  setMeta('meta[name="twitter:description"]', 'content', description)
  setMeta('meta[name="twitter:image"]', 'content', `${window.location.origin}/social-card.png`)
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', canonicalUrl)

  const structuredData = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.standfirst,
        datePublished: article.isoDate,
        mainEntityOfPage: canonicalUrl,
        author: { '@type': 'Organization', name: 'Criticality Consulting' },
        publisher: { '@type': 'Organization', name: 'Criticality Consulting' }
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Criticality Consulting',
        description: HOME_DESCRIPTION,
        areaServed: 'United Kingdom',
        url: canonicalUrl,
        knowsAbout: ['Semiconductor design', 'Functional safety', 'FMEDA', 'Fault injection', 'Applied AI']
      }

  const script = document.getElementById('structured-data')
  if (script) script.textContent = JSON.stringify(structuredData)
}

function App() {
  const [article, setArticle] = useState(() => articleFromPath(window.location.pathname))
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const syncRoute = () => {
      setArticle(articleFromPath(window.location.pathname))
      setMenuOpen(false)
      const targetId = window.location.hash.slice(1)
      if (targetId) setTimeout(() => document.getElementById(targetId)?.scrollIntoView(), 0)
      else window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('popstate', syncRoute)
    const initialTargetId = window.location.hash.slice(1)
    if (initialTargetId) setTimeout(() => document.getElementById(initialTargetId)?.scrollIntoView(), 0)
    return () => window.removeEventListener('popstate', syncRoute)
  }, [])

  useEffect(() => updateMetadata(article), [article])

  const openArticle = (item, event) => {
    if (event && isModifiedClick(event)) return
    event?.preventDefault()
    window.history.pushState({}, '', articlePath(item))
    setArticle(item)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = (event, destination = '/') => {
    if (event && isModifiedClick(event)) return
    event?.preventDefault()
    window.history.pushState({}, '', destination)
    setArticle(null)
    setMenuOpen(false)
    const targetId = destination.split('#')[1]
    if (targetId) setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }), 0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
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
  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen, setMenuOpen])

  const jump = (event, id) => {
    setMenuOpen(false)
    if (!article) return
    if (isModifiedClick(event)) return
    event.preventDefault()
    goHome(undefined, `/#${id}`)
  }

  return (
    <header className="site-header">
      <a className="wordmark" href="/" onClick={goHome} aria-label="Criticality Consulting home">
        <CriticalityMark compact />
        <span className="brand-type"><strong>CRITICALITY</strong><small>CONSULTING</small></span>
      </a>
      <div className="header-datum">SEMICONDUCTOR × FUSA × APPLIED AI</div>
      <nav id="primary-navigation" className={menuOpen ? 'open' : ''} aria-label="Primary navigation">
        <a href="/#expertise" onClick={(event) => jump(event, 'expertise')}>Expertise</a>
        <a href="/#insights" onClick={(event) => jump(event, 'insights')}>Insights</a>
        <a href="/#approach" onClick={(event) => jump(event, 'approach')}>Approach</a>
        <a className="nav-contact" href="/#contact" onClick={(event) => jump(event, 'contact')}>Start a conversation <ArrowRight size={14} /></a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="primary-navigation">
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
          <h1>Functional safety,<br /><em>from safety concept</em><br />to trusted silicon.</h1>
          <p className="hero-intro">A unique blend of semiconductor design, functional safety and applied AI experience—bringing new insight to the engineering processes, evidence and tools your teams already use.</p>
          <div className="hero-links">
            <a href="#contact">Discuss a programme <ArrowRight size={16} /></a>
            <a href="#insights" className="quiet-link">Read the fieldnotes <ArrowDown size={15} /></a>
          </div>
        </div>
        <DieFigure />
      </section>

      <section className="manifesto">
        <div className="section-label">WHY CRITICALITY</div>
        <div className="manifesto-copy">
          <p className="manifesto-lead">One problem. Three disciplines.</p>
          <p>Semiconductor design knowledge keeps the safety argument connected to architecture, implementation constraints and the realities of IP and SoC integration.</p>
          <p>Functional safety experience turns that design intent into explicit assumptions, quantitative analysis, verification evidence and reviewable claims.</p>
          <p>Applied AI helps engineers interrogate those connected artefacts at scale—while sources, decisions and engineering control remain visible.</p>
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
        <div className="engagement-strip" aria-label="Typical engagements">
          <span>Typical engagements</span>
          <p>Independent technical review · Architecture and FMEDA support · Evidence and integration review · AI workflow assessment or pilot</p>
        </div>
      </section>

      <section className="insights" id="insights">
        <SectionTitle eyebrow="Latest fieldnotes" title="Working notes on semiconductor safety." />
        <a className="feature-article" href={articlePath(articles[0])} onClick={(event) => openArticle(articles[0], event)}>
          <div className="feature-art"><FieldnoteCover article={articles[0]} /></div>
          <div className="feature-copy">
            <div className="article-meta"><span>{articles[0].category}</span><span>{articles[0].read}</span></div>
            <h3>{articles[0].title}</h3>
            <p>{articles[0].standfirst}</p>
            <span className="read-fieldnote">Read fieldnote <ArrowRight size={15} /></span>
          </div>
        </a>
        <div className="article-list">
          {articles.slice(1).map((item) => (
            <article key={item.slug}>
              <a className="article-link" href={articlePath(item)} onClick={(event) => openArticle(item, event)}>
                <span className="article-number">{item.number}</span>
                <div><div className="article-meta"><span>{item.category}</span><span>{item.read}</span></div><h3>{item.title}</h3></div>
                <p>{item.standfirst}</p>
                <ArrowRight size={18} />
              </a>
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
        <div className="ai-practice">
          <div className="ai-practice-heading">
            <Sparkles size={20} />
            <div><strong>AI insight, integrated</strong><p>Applied to the processes and evidence your teams already control.</p></div>
          </div>
          <div className="ai-use-cases">
            {aiApplications.map((item) => (
              <article className="ai-use-case" key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="ai-control-note">Customer information remains controlled. Outputs stay source-linked and subject to engineering review; AI does not replace safety judgement or established approval controls.</p>
        </div>
      </section>

      <Contact />
    </main>
  )
}

function ArticlePage({ article, goHome }) {
  return (
    <main className="article-page">
      <div className="article-breadcrumb"><a href="/#insights" onClick={(event) => goHome(event, '/#insights')}><ArrowLeft size={14} /> All fieldnotes</a><span>{article.number} / {article.category}</span></div>
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
          <div className="article-end"><span>END / {article.number}</span><a href="/#insights" onClick={(event) => goHome(event, '/#insights')}>Return to fieldnotes <ArrowRight size={14} /></a></div>
        </article>
      </div>
      <Contact />
    </main>
  )
}

function DieFigure() {
  return (
    <div className="soc-figure" aria-label="Semiconductor safety architecture block diagram">
      <div className="soc-caption"><span>EXAMPLE / SoC SAFETY ARCHITECTURE</span><b>REV 09</b></div>
      <svg className="soc-diagram-desktop" viewBox="0 0 640 530" role="img" aria-label="Example SoC block diagram showing aligned connections between compute, safety, interconnect, memory, clock and input-output blocks">
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
      <svg className="soc-diagram-mobile" viewBox="0 0 360 370" role="img" aria-label="Simplified example SoC block diagram showing CPU, safety island, interconnect, memory and input-output blocks">
        <defs>
          <pattern id="soc-grid-mobile" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#405553" />
          </pattern>
        </defs>
        <rect x="8" y="12" width="344" height="346" className="soc-die" />
        <rect x="20" y="24" width="320" height="322" fill="url(#soc-grid-mobile)" className="soc-die-inset" />
        <g className="soc-connectors">
          <path d="M95 126V157" /><path d="M265 126V157" />
          <path d="M95 231V266" /><path d="M265 231V266" />
        </g>
        <g className="soc-ports">
          <rect x="90" y="121" width="10" height="10" /><rect x="90" y="152" width="10" height="10" />
          <rect x="260" y="121" width="10" height="10" /><rect x="260" y="152" width="10" height="10" />
          <rect x="90" y="226" width="10" height="10" /><rect x="90" y="261" width="10" height="10" />
          <rect x="260" y="226" width="10" height="10" /><rect x="260" y="261" width="10" height="10" />
        </g>
        <g className="soc-block">
          <rect x="38" y="55" width="114" height="71" />
          <text x="95" y="84" textAnchor="middle" className="soc-block-title">CPU CLUSTER</text>
          <text x="95" y="105" textAnchor="middle" className="soc-block-sub">LOCKSTEP</text>
        </g>
        <g className="soc-block safety-block">
          <rect x="208" y="55" width="114" height="71" />
          <text x="265" y="84" textAnchor="middle" className="soc-block-title">SAFETY ISLAND</text>
          <text x="265" y="105" textAnchor="middle" className="soc-block-sub">MONITOR</text>
        </g>
        <g className="soc-block fabric-block">
          <rect x="38" y="157" width="284" height="74" />
          <text x="180" y="189" textAnchor="middle" className="soc-block-title">ON-CHIP INTERCONNECT</text>
          <path d="M72 210H288" className="fabric-bus" />
        </g>
        <g className="soc-block">
          <rect x="38" y="266" width="114" height="57" />
          <text x="95" y="300" textAnchor="middle" className="soc-block-title">SRAM / ECC</text>
        </g>
        <g className="soc-block">
          <rect x="208" y="266" width="114" height="57" />
          <text x="265" y="300" textAnchor="middle" className="soc-block-title">I/O + CRC</text>
        </g>
      </svg>
    </div>
  )
}

function FieldnoteCover({ article }) {
  return (
    <div className="fieldnote-cover" aria-label={`Fieldnote ${article.number}: ${article.title}`}>
      <div className="cover-rule" />
      <span className="cover-series">CRITICALITY / FIELDNOTES</span>
      <strong className="cover-number">{article.number}</strong>
      <div className="cover-copy">
        <h4>{article.title}</h4>
        <span>{article.category} · INTERFACES · {article.read}</span>
      </div>
      <div className="cover-mark"><CriticalityMark compact /></div>
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
      <rect className="mark-die" x="42" y="36" width="16" height="16" />
      <path className="mark-pins" d="M46 32v4m4-4v4m4-4v4M46 52v4m4-4v4m4-4v4M38 40h4m-4 4h4m-4 4h4M58 40h4m-4 4h4m-4 4h4" />
      <circle className="mark-diagnostic" cx="54" cy="40" r="2.2" />
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
      <a className="footer-brand" href="/" onClick={goHome}><CriticalityMark compact /><span><strong>CRITICALITY</strong><small>CONSULTING</small></span></a>
      <p>Semiconductor design, functional safety and applied AI.</p>
      <span>© 2026 / UNITED KINGDOM</span>
    </footer>
  )
}

createRoot(document.getElementById('root')).render(<App />)
