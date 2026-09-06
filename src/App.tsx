import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight, Instagram, Menu, X } from 'lucide-react'
import heroScene from './assets/hero.webp'
import chocolateDrip from './assets/hero-up.jpg'
import heroPack from './assets/product-original.png'
import wafer from './assets/crunch.webp'
import innerChocolate from './assets/inner-choco.webp'
import outerTop from './assets/outer-top.webp'
import outerDown from './assets/outer-down.webp'
import productOriginal from './assets/product-original.png'
import productBigfun from './assets/product-bigfun.png'
import productRolls from './assets/product-rolls.png'
import productSmiley from './assets/product-smiley.png'
import productJoy from './assets/product-joy.png'
import productCrush from './assets/product-crush.png'
import chocofunScene from './assets/chocofun.png'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { name: 'ORIGINAL', sub: 'The familiar three-layer crunch.', color: '#d71920', accent: '#ffe436', image: productOriginal },
  { name: 'BIGFUN', sub: 'Four layers. Bigger fun.', color: '#ed3138', accent: '#f7d366', image: productBigfun },
  { name: 'ROLLS', sub: 'Crispy outside. Creamy at the core.', color: '#e92572', accent: '#ffd8e8', image: productRolls },
  { name: 'SMILEY', sub: 'A little crunch worth sharing.', color: '#f1442e', accent: '#ffe44a', image: productSmiley },
  { name: 'JOY', sub: 'Rich chocolate, made to melt.', color: '#8f318f', accent: '#ffd742', image: productJoy },
  { name: 'CRUSH', sub: 'Chocolate with a crispy attitude.', color: '#5a2418', accent: '#ff4b40', image: productCrush },
]

const milestones = [
  { year: '1999', label: 'ORIGINAL', note: 'The first familiar crunch.' },
  { year: '2012', label: 'BIGFUN', note: 'A bigger wafer joins the fun.' },
  { year: '2019', label: 'ROLLS', note: 'A new kind of crispy arrives.' },
  { year: '2024', label: 'JOY', note: 'Chocofun steps into moulded chocolate.' },
  { year: '2025', label: 'CRUSH', note: 'Chocolate meets crunchy wheat crisps.' },
]

function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <a className={`brand-mark ${dark ? 'brand-mark--dark' : ''}`} href="#top" aria-label="Chocofun home">
      <span>Choco</span><i>fun</i>
    </a>
  )
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(true)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setLoaderVisible(false), reducedMotion ? 250 : 1750)
    return () => window.clearTimeout(timer)
  }, [])

  useLayoutEffect(() => {
    if (loaderVisible) return
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      gsap.timeline({
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      })
        .to('.hero-pack', { xPercent: -55, yPercent: 48, rotate: -6, scale: .74, ease: 'none' }, 0)
        .to('.hero-wafer', { xPercent: 80, yPercent: 40, rotate: 13, ease: 'none' }, 0)
        .to('.hero-drip', { scaleY: 1.32, transformOrigin: 'top', ease: 'none' }, 0)
        .to('.hero-copy', { yPercent: 22, opacity: .1, ease: 'none' }, 0)

      const mm = gsap.matchMedia()
      mm.add('(min-width: 769px)', () => {
        const crunchTl = gsap.timeline({
          scrollTrigger: { trigger: '.crunch', start: 'top top', end: '+=320%', pin: true, scrub: 1, anticipatePin: 1 },
        })
        crunchTl
          .from('.crunch-title', { scale: .86, opacity: 0 })
          .to('.layer-top', { y: () => innerHeight * -.31, x: -8, rotate: -2 }, .3)
          .to('.layer-wafer-a', { y: () => innerHeight * -.15, x: -18 }, .3)
          .to('.layer-cream', { y: 0, x: 8 }, .3)
          .to('.layer-wafer-b', { y: () => innerHeight * .15, x: -8 }, .3)
          .to('.layer-bottom', { y: () => innerHeight * .31, x: 5, rotate: 2 }, .3)
          .to('.crunch-title', { opacity: 0, scale: 1.08 }, .55)
          .fromTo('.crunch-word', { opacity: 0, scale: .55 }, { opacity: 1, scale: 1, stagger: .2, duration: .2 }, .7)
          .to('.crunch-word', { letterSpacing: '.03em', duration: .2 }, 1.3)
          .to('.crunch-word', { opacity: 0, scale: 1.3, stagger: .06 }, 1.45)
          .to('.crunch-layer', { y: 0, x: 0, rotate: 0, duration: .55, ease: 'back.inOut(1.4)' }, 1.55)
          .from('.crunch-end', { opacity: 0, y: 45 }, 1.9)

        const historyTl = gsap.timeline({
          scrollTrigger: { trigger: '.history', start: 'top top', end: '+=380%', pin: '.history-stage', scrub: .7 },
        })
        milestones.forEach((_, i) => {
          if (i === 0) return
          historyTl
            .to(`.milestone-${i - 1}`, { opacity: 0, y: -40, duration: .18 })
            .fromTo(`.milestone-${i}`, { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: .18 })
            .to('.history-image-a', { rotate: i % 2 ? -5 : 5, xPercent: i * -4 }, '<')
            .to('.history-image-b', { rotate: i % 2 ? 6 : -4, yPercent: i * -2 }, '<')
        })
        historyTl.fromTo('.history-mid', { opacity: 0 }, { opacity: 1, duration: .2 }, 1.8).to('.history-mid', { opacity: 0 }, 2.3)
        historyTl.from('.history-end', { opacity: 0, y: 50, duration: .25 }, '>-0.05')

        const panels = gsap.utils.toArray<HTMLElement>('.product-panel')
        const productTl = gsap.timeline({
          scrollTrigger: { trigger: '.family', start: 'top top', end: `+=${panels.length * 115}%`, pin: true, scrub: .8, anticipatePin: 1 },
        })
        panels.forEach((panel, i) => {
          if (i === 0) return
          productTl
            .to(panels[i - 1], { opacity: 0, xPercent: -18, duration: .22 })
            .fromTo(panel, { opacity: 0, xPercent: 18 }, { opacity: 1, xPercent: 0, duration: .22 }, '<')
            .to('.family', { backgroundColor: products[i].color, duration: .22 }, '<')
        })
      })

      mm.add('(max-width: 768px)', () => {
        const mobileCrunch = gsap.timeline({
          scrollTrigger: {
            trigger: '.crunch',
            start: 'top top',
            end: 'bottom bottom',
            scrub: .55,
            invalidateOnRefresh: true,
          },
        })
        mobileCrunch
          .to('.crunch-title', { opacity: .08, duration: .22 }, 0)
          .to('.layer-top', { y: () => innerHeight * -.23, x: -4, duration: .34 }, 0)
          .to('.layer-wafer-a', { y: () => innerHeight * -.11, x: -8, duration: .34 }, 0)
          .to('.layer-cream', { y: 0, x: 4, duration: .34 }, 0)
          .to('.layer-wafer-b', { y: () => innerHeight * .11, x: -4, duration: .34 }, 0)
          .to('.layer-bottom', { y: () => innerHeight * .23, x: 3, duration: .34 }, 0)
          .fromTo('.crunch-word', { opacity: 0, scale: .72 }, { opacity: 1, scale: 1, stagger: .08, duration: .12 }, .3)
          .to('.crunch-word', { opacity: 0, scale: 1.12, stagger: .04, duration: .1 }, .56)
          .to('.crunch-layer', { y: 0, x: 0, duration: .3, ease: 'back.inOut(1.25)' }, .68)
          .fromTo('.crunch-end', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .14 }, .9)

        gsap.utils.toArray<HTMLElement>('.product-panel').forEach((panel) => {
          gsap.from(panel.querySelector('.product-pack'), { rotate: 8, scale: .76, scrollTrigger: { trigger: panel, start: 'top 75%', end: 'center 50%', scrub: .6 } })
        })
      })

      gsap.utils.toArray<HTMLElement>('.memory-card').forEach((card, i) => {
        gsap.from(card, { y: 150 + i * 20, rotate: i % 2 ? 10 : -10, scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 45%', scrub: .8 } })
      })
      gsap.from('.memory-line span', { yPercent: 110, stagger: .1, scrollTrigger: { trigger: '.memory-copy', start: 'top 75%', end: 'bottom 60%', scrub: .5 } })
      gsap.fromTo('.liquid-rise', { scaleY: 0 }, { scaleY: 1, transformOrigin: 'bottom', ease: 'none', scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'max', scrub: 1 } })
      gsap.from('.final-pack', { yPercent: 30, rotate: -8, scale: .78, scrollTrigger: { trigger: '.final', start: 'top 70%', end: 'center 52%', scrub: .8 } })

      return () => mm.revert()
    }, root)
    return () => ctx.revert()
  }, [loaderVisible])

  return (
    <div ref={root} id="top">
      {loaderVisible && (
        <div className="preloader" role="status" aria-label="Opening Chocofun">
          <BrandMark />
          <div className="preloader-stage" aria-hidden="true">
            <img className="preloader-wafer" src={wafer} alt="" />
            <img className="preloader-wrapper preloader-wrapper--left" src={heroPack} alt="" />
            <img className="preloader-wrapper preloader-wrapper--right" src={heroPack} alt="" />
            <span className="preloader-snap">CRUNCH!</span>
          </div>
          <div className="preloader-steps" aria-hidden="true"><span>UNWRAP</span><span>SNAP</span><span>PLAY</span></div>
        </div>
      )}
      <header className="site-header">
        <nav className="nav-shell" aria-label="Primary navigation">
          <div className="nav-links nav-links--left">
            <a href="#story">STORY</a><a href="#crunch">THE CRUNCH</a>
          </div>
          <BrandMark />
          <div className="nav-links nav-links--right">
            <a href="#products">PRODUCTS</a><a href="#moments">MOMENTS</a>
          </div>
          <a className="find-link" href="https://www.sujal.com.np/chocofun" target="_blank" rel="noreferrer">FIND CHOCOFUN <ArrowUpRight size={15} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </nav>
        {menuOpen && <div className="mobile-menu"><a onClick={() => setMenuOpen(false)} href="#story">STORY</a><a onClick={() => setMenuOpen(false)} href="#crunch">THE CRUNCH</a><a onClick={() => setMenuOpen(false)} href="#products">PRODUCTS</a><a onClick={() => setMenuOpen(false)} href="#moments">MOMENTS</a></div>}
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-drip" src={chocolateDrip} alt="" aria-hidden="true" loading="eager" decoding="sync" fetchPriority="high" />

          <div className="hero-copy">
            <p className="eyebrow hero-kicker">NEPAL'S CRISPY FUN <b>·</b> SINCE 1999</p>
            <h1 id="hero-title"><span className="hero-line"><span>A CRUNCH</span></span><span className="hero-line hero-line--red"><span>FULL OF FUN.</span></span></h1>
            <p className="hero-note">Chocolate outside. Crisp inside.<br />A little moment of fun in every bite.</p>
            <a className="hero-cta" href="#crunch">EXPLORE THE CRUNCH <ArrowDown size={15} /></a>
          </div>
          <div className="hero-product" aria-label="Chocofun original pack with crispy wafer">
            <span className="burst burst--blue">3<br /><small>LAYERS</small></span>
            <img className="hero-wafer" src={wafer} alt="Crispy wafer" loading="eager" decoding="sync" fetchPriority="high" />
            <img className="hero-pack" src={heroPack} alt="Chocofun Original pack" loading="eager" decoding="sync" fetchPriority="high" />
            {!loaderVisible && <span className="hero-pack-shine" aria-hidden="true" />}
          </div>
          <a className="hero-scroll" href="#crunch"><span>UNWRAP THE STORY</span><ArrowDown /></a>
        </section>

        <section className="crunch" id="crunch">
          <div className="crunch-stage">
            <div className="section-index">02 / THE CRUNCH</div>
            <h2 className="crunch-title">WHAT MAKES<br /><em>THE CRUNCH?</em></h2>
            <div className="layer-stack" aria-label="Exploded view of Chocofun wafer layers">
              <div className="crunch-layer layer-bottom"><img src={outerDown} alt="Chocolate base layer" /></div>
              <div className="crunch-layer layer-wafer-b"><img src={wafer} alt="Crispy wafer layer" /></div>
              <div className="crunch-layer layer-cream"><img src={innerChocolate} alt="Chocolate cream layer" /></div>
              <div className="crunch-layer layer-wafer-a"><img src={wafer} alt="Crispy wafer layer" /></div>
              <div className="crunch-layer layer-top"><img src={outerTop} alt="Chocolate top layer" /></div>
            </div>
            <div className="crunch-words" aria-hidden="true"><span className="crunch-word">MELT.</span><span className="crunch-word">SNAP.</span><span className="crunch-word">CRUNCH.</span></div>
            <p className="crunch-end"><strong>THREE LAYERS.</strong><br />ONE FAMILIAR CRUNCH.</p>
          </div>
        </section>

        <section className="history" id="story">
          <div className="history-stage">
            <div className="section-index">03 / 1999 → NOW</div>
            <h2 className="history-heading">GROWING UP<br /><em>WITH NEPAL.</em></h2>
            <div className="history-photos" aria-hidden="true">
              <figure className="history-image-a"><img src={heroScene} alt="" /><figcaption>THE AFTER-SCHOOL CRUNCH</figcaption></figure>
              <figure className="history-image-b"><img src={chocofunScene} alt="Chocofun pack surrounded by flowing chocolate" /><figcaption>STILL IN OUR POCKETS</figcaption></figure>
            </div>
            <div className="milestones">
              {milestones.map((item, i) => <div className={`milestone milestone-${i}`} key={item.year} style={{ opacity: i ? 0 : 1 }}><span className="giant-year">{item.year}</span><div className="milestone-detail"><b>{item.label}</b><span>{item.note}</span></div></div>)}
            </div>
            <p className="history-mid">YOU GREW UP.<br /><em>SO DID WE.</em></p>
            <p className="history-end">SOME THINGS<br /><em>NEVER LEAVE CHILDHOOD.</em></p>
          </div>
        </section>

        <section className="family" id="products">
          <div className="family-top"><div className="section-index section-index--light">04 / CHOCOFUN FAMILY</div><p>ONE NAME. MORE WAYS TO HAVE FUN.</p></div>
          <div className="product-panels">
            {products.map((product, i) => <article className={`product-panel product-panel-${i}`} key={product.name} style={{ opacity: i ? 0 : 1, '--panel-color': product.color, '--panel-accent': product.accent } as React.CSSProperties}>
              <span className="product-count">0{i + 1} / 06</span>
              <h2>{product.name}</h2>
              <img className="product-pack" src={product.image} alt={`Chocofun ${product.name}`} />
              <div className="product-copy"><span>MEET</span><h3>CHOCOFUN<br />{product.name}</h3><p>{product.sub}</p></div>
              <div className="product-scribble" aria-hidden="true">✦ FUN ✦ CRUNCH ✦ PLAY ✦</div>
            </article>)}
          </div>
        </section>

        <section className="memories" id="moments">
          <div className="section-index">05 / ONLY CHOCOFUN</div>
          <div className="memory-copy">
            {['SCHOOL BREAKS.', 'FRIENDS.', 'SMALL WINS.', 'NO REASON AT ALL.'].map((line) => <span className="memory-line" key={line}><span>{line}</span></span>)}
          </div>
          <div className="memory-scatter" aria-label="Chocofun memory snapshots">
            <figure className="memory-card card-1"><img src={heroScene} alt="Chocolate and wafer in motion" /><figcaption>BREAK-TIME TREASURE</figcaption></figure>
            <figure className="memory-card card-2"><img src={chocofunScene} alt="Chocofun pack surrounded by flowing chocolate" /><figcaption>ONE FOR THE ROAD</figcaption></figure>
            <figure className="memory-card card-3"><img src={productRolls} alt="Chocofun Rolls pack" /><figcaption>PASS IT AROUND</figcaption></figure>
            <figure className="memory-card card-4"><img src={productSmiley} alt="Chocofun Smiley pack" /><figcaption>LITTLE WINS</figcaption></figure>
          </div>
          <h2 className="only-title">ONLY <span>CHOCOFUN.</span></h2>
        </section>

        <section className="final">
          <div className="final-sun" aria-hidden="true"></div>
          <p className="final-kicker">NEPAL GREW UP WITH CHOCOFUN.</p>
          <h2>HURKIDAI CHA NEPAL.<br /><em>CHOCOFUN MA RAMAUDAI.</em></h2>
          <img className="final-pack" src={heroPack} alt="Chocofun Original pack" />
          <div className="liquid-rise" aria-hidden="true"><svg viewBox="0 0 1440 500" preserveAspectRatio="none"><path d="M0,90 C130,20 215,140 350,75 C520,-8 600,140 760,78 C930,12 1015,145 1160,65 C1285,-2 1370,75 1440,35 L1440,500 L0,500 Z" /></svg></div>
          <footer>
            <BrandMark dark />
            <div className="footer-lockup"><b>CHOCOFUN</b><span>SINCE 1999</span><span>A SUJAL FOODS BRAND</span></div>
            <div className="footer-links"><a href="https://www.instagram.com/chocofun_nepal/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={19} /> INSTAGRAM</a><a href="https://www.sujal.com.np/" target="_blank" rel="noreferrer">SUJAL FOODS <ArrowUpRight size={16} /></a></div>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App
