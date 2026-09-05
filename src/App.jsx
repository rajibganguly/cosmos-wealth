import { useEffect, useState } from 'react'

const formatCurrency = (value) => `$${Number(value).toLocaleString('en-US')}`
const dataBaseUrl = `${import.meta.env.BASE_URL}data/`

const getTimeGreeting = () => {
  const currentHour = new Date().getHours()

  if (currentHour < 12) return 'Good Morning!'
  if (currentHour < 18) return 'Good Afternoon!'
  return 'Good Evening!'
}

function App() {
  const [dataStatus, setDataStatus] = useState('Loading local data')
  const [portfolio, setPortfolio] = useState([])
  const [activity, setActivity] = useState([])
  const [banner, setBanner] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch(`${dataBaseUrl}health.json`),
      fetch(`${dataBaseUrl}portfolio.json`),
      fetch(`${dataBaseUrl}activity.json`),
      fetch(`${dataBaseUrl}banner.json`),
    ])
      .then(async ([healthResponse, portfolioResponse, activityResponse, bannerResponse]) => {
        if (!healthResponse.ok || !portfolioResponse.ok || !activityResponse.ok || !bannerResponse.ok) throw new Error('Local data unavailable')
        const [portfolioData, activityData, bannerData] = await Promise.all([
          portfolioResponse.json(),
          activityResponse.json(),
          bannerResponse.json(),
        ])
        return { ...portfolioData, ...activityData, ...bannerData }
      })
      .then(({ assets, activities, milestone }) => {
        setPortfolio(assets)
        setActivity(activities)
        setBanner(milestone)
        setDataStatus('Local data ready')
      })
      .catch(() => {
        setDataStatus('Local data unavailable')
      })
  }, [])

  /* The local data file owns the asset names, values, and performance figures. */
  const displayPortfolio = portfolio.map((asset, index) => ({
    ...asset,
    detail: index === 0 ? 'Core allocation' : index === 1 ? 'Impact sleeve' : 'Liquidity',
    value: formatCurrency(asset.value),
    tone: asset.change.startsWith('+') ? 'positive' : 'neutral',
  }))

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark"><span>cw</span></div>
        <div className="brand-name">cosmos<br /><em>wealth</em></div>
        <nav aria-label="Primary navigation">
          <a className="active" href="#overview"><span>01</span>Overview</a>
          <a href="#portfolio"><span>02</span>Portfolio</a>
          <a href="#planning"><span>03</span>Planning</a>
          <a href="#activity"><span>04</span>Activity</a>
        </nav>
        <div className="sidebar-footer">
          <div className="status-dot" /> <span>{dataStatus}</span>
          <button aria-label="Open settings">•••</button>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Monday, September 5, 2026</p>
            <h1>{getTimeGreeting()}</h1>
          </div>
          <div className="profile"><span className="avatar">RG</span><span>Rajib Ganguly</span><span className="chevron">⌄</span></div>
        </header>

        <div className="content-grid" id="overview">
          <section className="hero-card">
            <div className="hero-copy"><p className="eyebrow">Total net worth</p><p className="net-worth">$709,710<span>.00</span></p><p className="gain"><strong>+$34,820</strong> <span>this month</span></p></div>
            <div className="hero-chart" aria-label="Net worth trend"><div className="chart-labels"><span>$750k</span><span>$700k</span><span>$650k</span></div><svg viewBox="0 0 500 170" role="img" aria-label="Upward net worth trend"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#b9d66a" stopOpacity=".42" /><stop offset="1" stopColor="#b9d66a" stopOpacity="0" /></linearGradient></defs><path d="M0 142 C48 136 68 120 106 125 S150 89 190 105 S234 88 264 96 S301 54 335 70 S370 63 399 39 S450 43 500 8 V170 H0Z" fill="url(#chartFill)" /><path d="M0 142 C48 136 68 120 106 125 S150 89 190 105 S234 88 264 96 S301 54 335 70 S370 63 399 39 S450 43 500 8" fill="none" stroke="#b9d66a" strokeWidth="3" /></svg></div>
            <div className="chart-range"><button className="selected">1M</button><button>3M</button><button>6M</button><button>1Y</button><button>ALL</button></div>
          </section>

          {banner && <section className="insight-card" id="planning"><p className="eyebrow">{banner.eyebrow}</p><h2>{banner.title}</h2><p className="insight-description">{banner.description} <strong>{banner.highlight}</strong></p><div className="progress"><span style={{ width: `${banner.progress}%` }} /></div><div className="progress-meta"><span>{banner.invested}</span><span>{banner.goal}</span></div><button className="text-button">{banner.action} <span>↗</span></button></section>}

          <section className="portfolio-section" id="portfolio"><div className="section-heading"><div><p className="eyebrow">Across your accounts</p><h2>Portfolio snapshot</h2></div><button className="outline-button">View portfolio <span>↗</span></button></div><div className="portfolio-list">{displayPortfolio.map((item) => <article className="portfolio-row" key={item.name}><div className="asset-icon">{item.name[0]}</div><div className="asset-name"><strong>{item.name}</strong><span>{item.detail}</span></div><strong className="asset-value">{item.value}</strong><span className={`asset-change ${item.tone}`}>{item.change}</span><button className="row-arrow" aria-label={`View ${item.name}`}>↗</button></article>)}</div></section>

          <section className="activity-card" id="activity"><div className="section-heading"><div><p className="eyebrow">Recent movement</p><h2>Activity</h2></div><button className="icon-button" aria-label="More activity">•••</button></div>{activity.map((item) => <div className="activity-item" key={`${item.title}-${item.date}`}><span className={`activity-bullet ${item.type}`}>{item.icon}</span><div><strong>{item.title}</strong><span>{item.date}</span></div><b>{item.amount}</b></div>)}</section>
        </div>
      </section>
    </main>
  )
}

export default App
