const projectEmail = "mailto:caleb@trustedacademy.net?subject=TRUSTed%20Web%20Architecture%20Project";

const services = [
  ["01", "Website Strategy", "Clarify the role your site must play before a single page is designed."],
  ["02", "Content Architecture", "Shape a clear path from first impression to confident next step."],
  ["03", "Visual Direction", "Build a distinct visual system that makes your brand feel considered."],
  ["04", "Custom Development", "Turn the blueprint into a responsive, durable website made for your goals."],
];

const process = ["Discover", "Architect", "Create", "Launch"];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="TRUSTed Web Architecture home"><span>TRUSTed</span> Web Architecture</a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a><a href="#system">The System</a><a href="#process">Process</a><a href="#about">About</a>
        </nav>
        <a className="header-cta" href={projectEmail}>Start a Project <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">STRATEGY <i /> DESIGN <i /> DEVELOPMENT</p>
          <h1>Websites built<br />around <em>your</em> vision.</h1>
          <p className="hero-text">Hire us to architect and build your custom website—or use our guided expert system to create one with confidence.</p>
          <div className="actions"><a className="button button-dark" href={projectEmail}>Build My Website <span>↗</span></a><a className="text-link" href="#system">Explore the Guided System <span>↓</span></a></div>
        </div>
        <div className="blueprint" aria-label="Abstract website architecture blueprint">
          <div className="grid-lines" /><span className="blueprint-label label-one">VISION</span><span className="blueprint-label label-two">AUDIENCE</span><span className="blueprint-label label-three">OFFER</span>
          <div className="architect-card"><div className="card-top"><span>WEBSITE / 01</span><span>✦</span></div><div className="card-mark">T</div><div className="card-lines"><b /><b /><b /></div><div className="card-footer">A clear place to begin <span>→</span></div></div>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="node node-one" /><div className="node node-two" />
        </div>
      </section>

      <section className="ways section-pad" id="about">
        <div className="section-intro"><p className="eyebrow">ONE VISION. TWO WAYS FORWARD.</p><h2>Build the right way<br />for where you are.</h2></div>
        <div className="way-grid">
          <article className="way-card forest"><p className="card-kicker">01 / DONE FOR YOU</p><h3>A custom website,<br /><em>fully built for you.</em></h3><p>For founders and teams who want an experienced partner to turn an ambitious vision into a complete, high-performing digital home.</p><ul><li>Strategy-led from the start</li><li>Custom design and development</li><li>A clear, collaborative process</li></ul><a href={projectEmail}>Start a custom project <span>↗</span></a></article>
          <article className="way-card mint"><p className="card-kicker">02 / BUILD WITH GUIDANCE</p><h3>Your vision,<br /><em>expertly guided.</em></h3><p>For people ready to create their own site—with a thoughtful system that keeps the big decisions clear and manageable.</p><ul><li>Guided planning framework</li><li>Expert prompts at every turn</li><li>Support without the overwhelm</li></ul><a href={projectEmail}>Explore the guided system <span>↗</span></a></article>
        </div>
      </section>

      <section className="services section-pad" id="services"><div className="section-intro"><p className="eyebrow">WHAT WE ARCHITECT</p><h2>Every strong website<br />starts with structure.</h2></div><div className="services-list">{services.map(([number, title, text]) => <article className="service" key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p><b>↗</b></article>)}</div></section>

      <section className="system section-pad" id="system"><div className="system-art"><div className="system-circle"><span>START<br />WITH<br />WHAT<br />MATTERS</span></div><div className="system-ring ring-a" /><div className="system-ring ring-b" /><div className="system-point">+</div></div><div className="system-copy"><p className="eyebrow">THE GUIDED EXPERT SYSTEM</p><h2>You don’t need<br />all the answers.<br /><em>We know what to ask.</em></h2><p>Our guided system leads you through a structured interview about your vision, audience, offers, brand, content, and goals—then helps turn those answers into a website with direction.</p><a className="button button-light" href={projectEmail}>Talk through your idea <span>↗</span></a></div></section>

      <section className="process section-pad" id="process"><div className="section-intro"><p className="eyebrow">A CALMER WAY TO BUILD</p><h2>From first thought<br />to a real launch.</h2></div><div className="process-list">{process.map((step, index) => <div className="process-step" key={step}><span>0{index + 1}</span><h3>{step}</h3><p>{["Find the signal in your vision.", "Give every idea its right place.", "Shape a website people can use.", "Put it into the world with confidence."][index]}</p></div>)}</div></section>

      <section className="statement"><p>A website shouldn’t just look professional. It should make your business easier to understand, easier to trust, and easier to choose.</p><span>✦</span></section>
      <section className="final-cta section-pad"><p className="eyebrow">READY WHEN YOU ARE</p><h2>Bring the vision.<br /><em>We’ll architect</em> the way forward.</h2><a className="button button-gold" href={projectEmail}>Start a Project <span>↗</span></a></section>
      <footer><a className="wordmark" href="#top"><span>TRUSTed</span> Web Architecture</a><p>Custom websites and guided support for people building something worth finding.</p><a href="mailto:caleb@trustedacademy.net">caleb@trustedacademy.net</a><small>© 2026 TRUSTed Web Architecture</small></footer>
    </main>
  );
}
