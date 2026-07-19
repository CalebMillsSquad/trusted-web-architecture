const projectEmail = "mailto:caleb@trustedacademy.net?subject=TRUSTed%20Digital%20Architecture%20Project";

const solutions = [
  ["01", "Website Architecture", "Premium websites with a clear structure, visual direction, and a purposeful path to action."],
  ["02", "Software Development", "Custom software, dashboards, client portals, and connected tools built around how your business works."],
  ["03", "AI Systems", "Useful AI chatbots and AI employees designed to support real workflows—not simply add noise."],
  ["04", "Learning & Studio Platforms", "LMS and studio platforms that turn expertise, curriculum, and creative work into a coherent experience."],
  ["05", "Automation & Operations", "Intelligent automation and operational systems that reduce friction across the work that matters."],
  ["06", "Managed Digital Operations", "Ongoing stewardship for the connected digital foundation your business depends on."],
];

const process = [
  ["Discover", "Understand what matters, what is changing, and where the opportunity lives."],
  ["Architect", "Give your priorities, systems, and customer journey a durable structure."],
  ["Design", "Make the experience feel clear, distinct, and naturally easy to trust."],
  ["Develop", "Build the right digital tools with care for the details beneath the surface."],
  ["Launch", "Bring the work into the world with a calm, coordinated rollout."],
  ["Grow", "Continue improving the foundation as your business and operations evolve."],
];

const industries = ["Professional Services", "Education & Learning", "Creative Studios", "Real Estate & Development", "Mission-Driven Organizations", "Growing Businesses"];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="TRUSTed Digital Architecture home"><span>TRUSTed</span> Digital Architecture</a>
        <nav aria-label="Main navigation"><a href="#solutions">Solutions</a><a href="#process">Process</a><a href="#industries">Industries</a><a href="#about">About</a></nav>
        <a className="header-cta" href={projectEmail}>Start a Project <span>↗</span></a>
      </header>
      <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#solutions">Solutions</a><a href="#process">Process</a><a href="#industries">Industries</a><a href="#about">About</a></nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">STRATEGY <i /> SYSTEMS <i /> DIGITAL CRAFT</p>
          <h1>Designing the digital<br /><em>foundation</em> of<br />modern business.</h1>
          <p className="hero-text">TRUSTed architects and builds the websites, software, AI systems, and operations that help ambitious businesses become easier to understand, run, and grow.</p>
          <div className="actions"><a className="button button-dark" href={projectEmail}>Start a Conversation <span>↗</span></a><a className="text-link" href="#solutions">Explore Our Solutions <span>↓</span></a></div>
        </div>
        <div className="blueprint" aria-label="Abstract digital systems architecture blueprint">
          <div className="grid-lines" /><span className="blueprint-label label-one">VISION</span><span className="blueprint-label label-two">SYSTEMS</span><span className="blueprint-label label-three">GROWTH</span>
          <div className="architect-card"><div className="card-top"><span>DIGITAL / 01</span><span>✦</span></div><div className="card-mark">T</div><div className="card-lines"><b /><b /><b /></div><div className="card-footer">Built for the business ahead <span>→</span></div></div>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="node node-one" /><div className="node node-two" />
        </div>
      </section>

      <section className="ways section-pad" id="about">
        <div className="section-intro"><p className="eyebrow">A CONNECTED WAY FORWARD</p><h2>More than a digital presence.<br /><em>A foundation for progress.</em></h2></div>
        <div className="way-grid">
          <article className="way-card forest"><p className="card-kicker">DESIGN & BUILD</p><h3>Bring the vision.<br /><em>We’ll build the system.</em></h3><p>For leaders who need an experienced digital partner to turn a complex idea, operation, or business model into a complete, connected experience.</p><ul><li>Strategic architecture from the start</li><li>Designed and developed as one system</li><li>Clear collaboration at every stage</li></ul><a href={projectEmail}>Plan your digital foundation <span>↗</span></a></article>
          <article className="way-card mint"><p className="card-kicker">GUIDED EXPERTISE</p><h3>Move with clarity.<br /><em>Keep your team close.</em></h3><p>For teams that want expert structure and support while participating meaningfully in the decisions that shape their digital future.</p><ul><li>Guided planning and prioritization</li><li>Plain-language expert counsel</li><li>Support built around your capacity</li></ul><a href={projectEmail}>Talk through your opportunity <span>↗</span></a></article>
        </div>
      </section>

      <section className="services section-pad" id="solutions"><div className="section-intro"><p className="eyebrow">WHAT WE BUILD</p><h2>Digital architecture<br />with room to grow.</h2></div><div className="services-list">{solutions.map(([number, title, text]) => <article className="service" key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p><b>↗</b></article>)}</div></section>

      <section className="system section-pad"><div className="system-art"><div className="system-circle"><span>BUILD<br />WHAT<br />YOUR<br />BUSINESS<br />NEEDS</span></div><div className="system-ring ring-a" /><div className="system-ring ring-b" /><div className="system-point">+</div></div><div className="system-copy"><p className="eyebrow">CONNECTED BUSINESS SYSTEMS</p><h2>Every part should<br />work <em>together.</em></h2><p>From an exceptional first visit to the client portal, learning platform, dashboard, AI assistant, or automation behind it—TRUSTed makes the digital pieces feel intentional, connected, and ready for what comes next.</p><a className="button button-light" href={projectEmail}>Explore your possibilities <span>↗</span></a></div></section>

      <section className="process section-pad" id="process"><div className="section-intro"><p className="eyebrow">OUR PROCESS</p><h2>Thoughtful from the<br />first question onward.</h2></div><div className="process-list">{process.map(([step, text], index) => <div className="process-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3><p>{text}</p></div>)}</div></section>

      <section className="industries section-pad" id="industries"><div className="section-intro"><p className="eyebrow">BUILT FOR REAL-WORLD WORK</p><h2>For businesses building<br />what comes next.</h2></div><div className="industry-grid">{industries.map((industry, index) => <div className="industry" key={industry}><span>{String(index + 1).padStart(2, "0")}</span><p>{industry}</p></div>)}</div></section>

      <section className="statement"><p>Digital architecture isn’t about adding more technology. It’s about making your business easier to understand, easier to operate, and easier to choose.</p><span>✦</span></section>
      <section className="final-cta section-pad"><p className="eyebrow">READY WHEN YOU ARE</p><h2>Bring the ambition.<br /><em>We’ll design</em> the foundation.</h2><a className="button button-gold" href={projectEmail}>Start a Project <span>↗</span></a></section>
      <footer><a className="wordmark" href="#top"><span>TRUSTed</span> Digital Architecture</a><p>Digital foundations for modern businesses: websites, software, AI systems, platforms, and operations.</p><a href="mailto:caleb@trustedacademy.net?subject=TRUSTed%20Digital%20Architecture%20Inquiry">caleb@trustedacademy.net</a><small>© 2026 TRUSTed Digital Architecture</small></footer>
    </main>
  );
}
