"use client";

import { useState } from "react";

const projectEmail = "mailto:caleb@trustedacademy.net?subject=TRUSTed%20Digital%20Architecture%20Project";

const layers = [
  ["Business", "Business Architecture", "The strategic foundation that aligns your offers, operations, and growth priorities."],
  ["Web", "Website Architecture", "A premium digital presence designed to make your business easier to understand and choose."],
  ["AI", "AI Systems", "AI chatbots and AI employees shaped around useful, human-centered workflows."],
  ["Ops", "Operations", "Dashboards, automation, client portals, and connected systems that make daily work lighter."],
] as const;

const solutions = [
  ["Website Architecture", "Strategic websites that are clear, credible, and built to convert.", "▣"],
  ["Software Development", "Custom software and platforms engineered around how your business actually works.", "</>"],
  ["AI Solutions", "Intelligent systems that automate decisions and create useful new capacity.", "✦"],
  ["Automation & Operations", "Connected operations that reduce friction and help the right work move forward.", "◎"],
];

const industries = ["Professional Services", "Healthcare", "Finance", "Technology", "Manufacturing", "Real Estate", "E-commerce", "Nonprofit"];
const process = [["Discover", "We find the signal in your business, users, and goals."], ["Architect", "We define the strategic structure and technical blueprint."], ["Design", "We craft an experience with clarity, warmth, and purpose."], ["Develop", "We build with precision, quality, and scalability in mind."], ["Launch", "We bring the work to market with confidence and care."], ["Grow", "We improve, iterate, and help your system keep working."]];

export default function Home() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState("Professional Services");
  const [expandedSolution, setExpandedSolution] = useState<number | null>(null);
  const layer = layers[activeLayer];

  return <main>
    <header className="site-header">
      <a className="wordmark" href="#top"><span>TRUST</span><em>ed</em><b>Digital Architecture</b></a>
      <nav aria-label="Main navigation"><a href="#top" className="active">Home</a><a href="#solutions">Solutions</a><a href="#industries">Industries</a><a href="#process">Process</a><a href="#about">About</a></nav>
      <a className="header-cta" href={projectEmail}>Contact</a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">DIGITAL ARCHITECTURE FIRM</p>
        <h1>Designing the<br />digital foundation of<br /><em>modern business.</em></h1>
        <p>We architect and build websites, intelligent software, AI solutions, and scalable business systems that strengthen how modern companies operate and grow.</p>
        <div className="actions"><a className="button button-dark" href={projectEmail}>Start a conversation <span>→</span></a><a className="text-link" href="#solutions">Explore solutions <span>→</span></a></div>
      </div>
      <div className="architecture-panel" aria-label="Interactive digital architecture layers">
        <div className="architecture-grid" />
        <p className="panel-note note-left">STRATEGY<br />ALIGNMENT</p><p className="panel-note note-right">SYSTEMS THAT<br />WORK TOGETHER</p>
        <div className="layer-stack">
          {layers.map(([short, title], index) => <button key={short} className={`architecture-layer ${activeLayer === index ? "selected" : ""}`} onClick={() => setActiveLayer(index)} aria-pressed={activeLayer === index}><span>{short === "Business" ? "⌂" : short === "Web" ? "▣" : short === "AI" ? "✦" : "◎"}</span><b>{short}</b><small>{index === activeLayer ? "Viewing" : "Explore"}</small></button>)}
        </div>
        <div className="layer-detail"><span>0{activeLayer + 1}</span><strong>{layer[1]}</strong><p>{layer[2]}</p></div>
      </div>
    </section>

    <section className="philosophy section-pad" id="about"><div className="sketch-house" aria-hidden="true"><i /><i /><i /><i /></div><div><p className="eyebrow">OUR PHILOSOPHY</p><h2>Don’t buy a website.<br />Build the right foundation.</h2><p>We believe digital success starts with architecture—clear strategy, solid structure, and systems designed to last. Everything we build is intentional, integrated, and aligned to your business goals.</p></div></section>

    <section className="solutions section-pad" id="solutions"><div className="section-heading"><div><p className="eyebrow">SOLUTIONS</p><h2>Integrated solutions.<br />Built to scale.</h2></div><p>From first principles to long-term performance, we design and build digital systems that work.</p></div><div className="solution-grid">{solutions.map(([title, text, icon], index) => <article className={`solution-card ${expandedSolution === index ? "expanded" : ""}`} key={title}><span className="solution-icon">{icon}</span><h3>{title}</h3><p>{text}</p><button onClick={() => setExpandedSolution(expandedSolution === index ? null : index)} aria-expanded={expandedSolution === index}>{expandedSolution === index ? "Show less" : "Learn more"} <span>→</span></button>{expandedSolution === index && <div className="solution-extra">Designed as one connected layer of your broader digital foundation.</div>}</article>)}</div></section>

    <section className="industries section-pad" id="industries"><div><p className="eyebrow">INDUSTRIES WE SERVE</p><h2>Deep expertise across<br />high-performing industries.</h2></div><div className="industry-chips">{industries.map((industry, index) => <button className={activeIndustry === industry ? "selected" : ""} onClick={() => setActiveIndustry(industry)} aria-pressed={activeIndustry === industry} key={industry}><span>{["▣", "+", "▥", "✦", "▤", "▥", "▱", "♡"][index]}</span>{industry}</button>)}<p className="industry-note">Selected focus: <strong>{activeIndustry}</strong></p></div></section>

    <section className="process section-pad" id="process"><div className="process-lead"><p className="eyebrow">OUR PROCESS</p><h2>A proven architecture process. Measurable outcomes.</h2></div><div className="process-list">{process.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><i>{["○", "◇", "╱", "</>", "↗", "▥"][index]}</i><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="final-cta"><div className="cta-sketch" aria-hidden="true" /><div><h2>Let’s build what’s next.</h2><p>Start a conversation about your project.</p></div><a className="button button-outline" href={projectEmail}>Start a conversation <span>→</span></a></section>

    <footer><div className="footer-brand"><a className="wordmark" href="#top"><span>TRUST</span><em>ed</em><b>Digital Architecture</b></a><p>We design and build the digital foundation that modern businesses rely on to operate, adapt, and grow.</p></div><div><b>Solutions</b><a href="#solutions">Website Architecture</a><a href="#solutions">Software Development</a><a href="#solutions">AI Solutions</a><a href="#solutions">Automation & Operations</a></div><div><b>Company</b><a href="#about">About</a><a href="#process">Our Process</a><a href={projectEmail}>Contact</a></div><div><b>Let’s Talk</b><a href="mailto:caleb@trustedacademy.net">caleb@trustedacademy.net</a><p>Digital architecture for modern business.</p></div><small>© 2026 TRUSTed Digital Architecture. All rights reserved.</small></footer>
  </main>;
}
