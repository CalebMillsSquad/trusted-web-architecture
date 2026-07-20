import Link from "next/link";
import { PrimaryNavigation } from "./primary-navigation";

const emailHref = "mailto:caleb@trustedacademy.net?subject=TRUSTed%20Digital%20Architecture%20Project";

export function SiteHeader() {
  return <header className="site-header">
    <Link className="wordmark" href="/"><span>TRUST</span><em>ed</em><b>Digital Architecture</b></Link>
    <PrimaryNavigation />
    <Link className="header-cta" href={emailHref}>Start a conversation</Link>
  </header>;
}

export function SiteFooter() {
  return <footer>
    <div className="footer-brand"><Link className="wordmark" href="/"><span>TRUST</span><em>ed</em><b>Digital Architecture</b></Link><p>We architect websites, software, AI systems, automations, and connected digital infrastructure for modern organizations.</p></div>
    <nav aria-label="Footer services"><h2>Services</h2><Link href="/services/website-architecture">Website Architecture</Link><Link href="/services/software-development">Software Development</Link><Link href="/services/ai-systems">AI Systems</Link><Link href="/services/automation">Automation</Link><Link href="/services/api-integrations">API Integration</Link><Link href="/services/saas-development">SaaS Development</Link></nav>
    <nav aria-label="Footer solutions"><h2>Solutions</h2><Link href="/solutions/inventory-pos-integration">Inventory and POS</Link><Link href="/solutions/customer-portals">Customer Portals</Link><Link href="/solutions/learning-management">Learning Platforms</Link><Link href="/solutions/ai-assistants">AI Assistants</Link><Link href="/solutions/custom-dashboards">Dashboards</Link><Link href="/solutions/business-operations">Business Operations</Link></nav>
    <nav aria-label="Footer company and legal"><h2>Company</h2><Link href="/about">About</Link><Link href="/process">Process</Link><Link href="/products">Products</Link><Link href="/industries">Industries</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
    <small>© 2026 TRUSTed Digital Architecture · Digital architecture for modern business.</small>
  </footer>;
}
