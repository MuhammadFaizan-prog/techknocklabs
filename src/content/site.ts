// All copy below is taken verbatim from https://www.techknocklabs.com/
// (home, /services, /about, /work, /contact), scraped 2026-11-12 and
// re-checked against the live site 2026-11-15 (no text changes).
import servicesJson from "./services.json";
import workJson from "./work.json";
import blogJson from "./blog.json";

export const CAL_URL = "https://cal.com/techknock/30min";
export const SITE_URL = "https://www.techknocklabs.com";
export const BRAND = "Techknock Labs";
export const TAGLINE = "Intelligent solutions. Lasting impact.";

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  primaryCta: string;
  countStat: string;
  countLabel: string;
  stack: string[];
  overview: string[];
  toolsHeading?: string;
  tools?: string[];
  capabilities: { title: string; body: string }[];
  audience: string[];
  useCases: { title: string; body: string }[];
  mobile?: { heading: string; body: string; platforms: string[] };
  related: { industry: string; name: string; outcome: string }[];
  pricing: { bestWhen: string; timeline: string; from: string };
  mvp?: { heading: string; items: string[]; timeline: string; from: string; cta: string };
  testimonial: { quote: string; name: string; role: string };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cta: { heading: string; body: string; button: string };
};

export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  industry: string;
  platform: string;
  services: string;
  stack: string;
  site?: string;
  about: string[];
  liveUrl?: string;
  challenge: string[];
  timeline: { phase: string; n: string; duration: string; body: string }[];
  approach: string[];
  features: { title: string; body: string }[];
  techStack: string[];
  results: string[];
  card: { category: string; summary: string; tags: string[] };
  image?: string | null;
  logo?: string | null;
};

export type Post = {
  slug: string;
  title: string;
  iso: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  html: string;
};

const servicesMap = servicesJson as unknown as Record<string, Service>;
export const SERVICE_ORDER = [
  "ai-agents",
  "custom-ai-applications",
  "saas-digital-products",
  "web-mobile-applications",
  "enterprise-systems",
];
export const services: Service[] = SERVICE_ORDER.map((s) => servicesMap[s]);
export const getService = (slug: string) => servicesMap[slug];

export const caseStudies = workJson as unknown as CaseStudy[];
export const getCase = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const caseByName = (name: string) =>
  caseStudies.find((c) => c.name.toLowerCase() === name.toLowerCase());

export const posts = (blogJson as unknown as Post[]).map((p) => ({
  ...p,
  // Their own article HTML; defensively drop any script tags.
  html: p.html.replace(/<script[\s\S]*?<\/script>/gi, ""),
}));
/** Generated cover art per post (official site has none; see DEVIATIONS.md #14). */
export const coverFor = (slug: string) => `/img/blog/${slug}.webp`;
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

// Short labels used on the home list (from the site's nav menu)
export const serviceMenuLine: Record<string, string> = {
  "ai-agents": "Software that completes the work, not just the form.",
  "custom-ai-applications": "Generative AI, grounded in your knowledge.",
  "saas-digital-products": "From idea validation to cloud-ready product.",
  "web-mobile-applications": "Portals, dashboards and platforms your customers and team rely on.",
  "enterprise-systems": "Custom systems, cleanly engineered.",
};

// Home / services overview copy per service (from home + /services)
export const serviceOverview: Record<
  string,
  { count: string; countLabel: string; body: string; tags: string[]; image: string; imageAlt: string }
> = {
  "ai-agents": {
    count: "42+",
    countLabel: "AI Solutions Delivered",
    body: "We design intelligent systems that automate repetitive work, streamline operations, and improve business efficiency. From customer interactions to internal workflows, our AI solutions help teams focus on what matters most.",
    tags: ["Automation", "Productivity", "Decision Making", "Efficiency", "Scalability", "Growth"],
    image: "/portfolio/clone-caller.jpg",
    imageAlt: "Clone Caller AI voice-agent platform",
  },
  "custom-ai-applications": {
    count: "24+",
    countLabel: "AI Products Built",
    body: "Every business has unique challenges. We build custom AI applications that transform ideas into practical solutions, helping organizations improve experiences, uncover insights, and create new opportunities.",
    tags: ["Innovation", "Intelligence", "Personalization", "Performance", "Automation", "Growth"],
    image: "/portfolio/a1-renovations.jpg",
    imageAlt: "A1 Renovations AI estimate app",
  },
  "saas-digital-products": {
    count: "30+",
    countLabel: "Products Delivered",
    body: "We help businesses launch and scale digital products that deliver exceptional user experiences while supporting long term business growth.",
    tags: ["Scalability", "User Experience", "Reliability", "Security", "Growth", "Innovation"],
    image: "/portfolio/loadbetter.jpg",
    imageAlt: "Loadbetter warehouse SaaS",
  },
  "web-mobile-applications": {
    count: "32+",
    countLabel: "Apps Delivered",
    body: "We build modern web and mobile applications that combine intuitive design with powerful functionality — fast, accessible products that customers and teams enjoy using, on desktop, iOS, and Android.",
    tags: ["Performance", "Accessibility", "Mobility", "Engagement", "Reliability", "Scalability"],
    image: "/portfolio/secure-living.jpg",
    imageAlt: "Secure Living web app",
  },
  "enterprise-systems": {
    count: "10+",
    countLabel: "Business Platforms Built",
    body: "We develop enterprise solutions that simplify operations, improve collaboration, and provide organizations with the tools they need to scale confidently.",
    tags: ["Efficiency", "Collaboration", "Visibility", "Security", "Productivity", "Growth"],
    image: "/portfolio/braincity.jpg",
    imageAlt: "BrainCity multi-tenant learning platform",
  },
};

export const heroIntro =
  "From MVPs to enterprise platforms and production-ready AI, Techknock Labs designs, builds, and supports software and AI systems for startups and growing businesses. Senior engineers on every project, with working software every week.";

export const rotatingWhat = ["custom AI apps", "SaaS products", "web apps", "AI agents", "automations"];

export const bigStats = [
  { value: "$10M+", label: "Funding raised by our clients", note: "From pre-seed to Series B" },
  { value: "138+", label: "Projects delivered", note: "Web, mobile, AI & SaaS" },
  { value: "25+", label: "Experts available", note: "Engineers, designers & strategists" },
  { value: "5.0", label: "Average Clutch rating", note: "Across verified reviews" },
];

export const clients = [
  { name: "Clone Caller", logo: "/clients/clone-caller.png" },
  { name: "Mural Link", logo: "/clients/mural-link.png" },
  { name: "CrossMyPart", logo: "/clients/crossmypart.png" },
  { name: "Plan AI", logo: "/clients/pln-ai.png" },
  { name: "StayNest", logo: "/clients/staynest.png" },
  { name: "Archively", logo: "/clients/archively.png" },
  { name: "Loadbetter", logo: "/clients/loadbetter.png" },
  { name: "BrainCity", logo: "/clients/braincity.png" },
];

export const featuredCases = ["clone-caller", "a1-renovations", "justtravel", "secure-living"];
// Category line shown on the home featured cards
export const featuredIndustry: Record<string, string> = {
  "clone-caller": "AI Voice Agents / Sales",
  "a1-renovations": "Home Services / Marketplace",
  justtravel: "TravelTech / AI",
  "secure-living": "PropTech / Property Management",
};

export const reasons = [
  { title: "Senior engineers only", body: "Every project is led by engineers with 7+ years' experience. No juniors learning on your budget, no hand-offs." },
  { title: "Working software every week", body: "Weekly demos, so you see progress and can change direction early instead of waiting months." },
  { title: "Fixed-price phases", body: "Clear scope and a fixed or capped price for each phase. No surprise invoices." },
  { title: "Software and AI in one team", body: "We build the product and the AI inside it, so you don't have to coordinate two vendors." },
  { title: "You own everything", body: "Full code ownership, documentation and handover. Or we stay on to support it." },
];

export type Engagement = { title: string; bestWhen: string; body: string; from: string; unit?: string };
export const engagementsHome: Engagement[] = [
  { title: "Fixed-price project", bestWhen: "You're building an MVP, software, an app or an AI system with defined features", body: "Clear scope, timeline and price agreed up front. Delivered in milestones.", from: "$5,000" },
  { title: "Monthly retainer", bestWhen: "Your product keeps evolving", body: "A set number of engineering hours each month for new features, fixes and support.", from: "$2,500", unit: "/month" },
  { title: "Dedicated engineers", bestWhen: "Your team needs more capacity", body: "Senior developers who join your team, your tools and your standups.", from: "$35", unit: "/hour per engineer" },
];
// /services shows a monthly figure for dedicated engineers — kept as published there.
export const engagementsServices: Engagement[] = [
  { ...engagementsHome[0] },
  { ...engagementsHome[1] },
  { ...engagementsHome[2], from: "$3,500", unit: "/month" },
];

export const processSteps = [
  { step: "Step 1", title: "Discover", body: "A free call to understand your goals, users and constraints.", time: "30 minutes, free" },
  { step: "Step 2", title: "Scope", body: "A written proposal with features, timeline and fixed price.", time: "Within 1–2 days" },
  { step: "Step 3", title: "Build", body: "Weekly sprints with a demo every week. You see real progress, not status reports.", time: "Typically 4+ weeks" },
  { step: "Step 4", title: "Launch & support", body: "Go-live, monitoring and ongoing improvements.", time: "Ongoing" },
];

export type Testimonial = { tag: string; quote: string; name: string; role: string };
export const testimonials: Testimonial[] = [
  { tag: "AI", quote: "They shipped a working AI agent against our real data in weeks, not months — with guardrails and monitoring from day one. It's been running in production reliably ever since.", name: "Priya", role: "Head of Engineering, B2B SaaS company" },
  { tag: "Software", quote: "The Techknock Labs team supported our developers as full-stack engineers in Node.js and React for almost a year. I'd highly recommend them to anyone considering them for a project.", name: "Jaclyn", role: "CEO & Founder, Tech startup" },
  { tag: "Software", quote: "They are experts in development and in the entire delivery process. Extremely good communication and better than 99% of the developers I've worked with in the past.", name: "Matthew", role: "CTO, SaaS startup" },
  { tag: "AI", quote: "Strong stakeholder management and a real drive to help customers succeed. Their automation work cut our processing time in half and fixed workflows we'd struggled with for years.", name: "Daniel", role: "Operations Director, Logistics company" },
  { tag: "Software", quote: "We came with a rough idea and left with a sellable product. They scoped the smallest version a customer would pay for, then built it properly so we could scale without rewrites.", name: "Liam", role: "Founder, B2B platform" },
];

export const resources = [
  { title: "Software Project Cost Guide", body: "What MVPs, web apps, mobile apps and AI agents really cost in 2026.", cta: "Get the free guide", href: "/contact?interest=cost-guide" },
  { title: "Free AI Automation Audit", body: "Tell us how your team works. We'll show you 3–5 tasks AI can take off their plate.", cta: "Request your audit", href: "/contact?interest=ai-audit" },
];

export type Faq = { q: string; a: string };
export const homeFaqs: Faq[] = [
  { q: "How do you charge for projects?", a: "We offer three engagement models. Fixed-price projects suit when everything is defined: scope, timeline and price are agreed up front. Monthly retainers suit products that keep evolving, with a set number of engineering hours each month for new features, improvements and support. Dedicated engineers suit teams that need more capacity: senior developers join your team on a monthly basis. Whichever you choose, you get a clear written estimate and full cost transparency, with no surprise invoices." },
  { q: "Who do you usually work with?", a: "We partner with startups, growing businesses, and established companies looking for a reliable technology partner. Our clients span multiple industries across the US, UK, Middle East, and beyond." },
  { q: "How long does a typical project take?", a: "Project timelines depend on complexity and scope. Most MVPs are delivered within 4 to 8 weeks, while larger platforms are developed in planned milestones, allowing for early feedback and continuous improvements." },
  { q: "How does your development process work?", a: "Every project begins with a discovery session to understand your business and objectives. We then define the scope, create a tailored roadmap, and move through design, development, testing, and deployment while keeping you involved with regular updates and progress reviews." },
  { q: "Who owns the code?", a: "You do, 100%, from day one." },
  { q: "Do you sign NDAs?", a: "Yes, before you share any details." },
  { q: "Can you work with our existing team or codebase?", a: "Yes, we do." },
  { q: "Do you provide post-launch support?", a: "Yes. Launch is only the beginning. We provide ongoing maintenance, performance improvements, feature enhancements, and technical support to ensure your product continues to evolve alongside your business." },
];

export const servicesFaqs: Faq[] = [
  { q: "Can you combine services in one project?", a: "Yes. One team handles everything, so there's no coordination between different vendors for a project." },
  { q: "Can you take over an existing project or codebase?", a: "Yes. We start with a code audit, fix what's fragile, then continue with your roadmap." },
  { q: "Do you do design as well as development?", a: "Yes. UX and UI design are part of every project." },
  { q: "Can we start small?", a: "Yes. Many clients start with a pilot, an MVP or a single integration, then expand once it proves its value." },
  { q: "What if we don't know exactly what we need?", a: "Start with a free call. We'll recommend the right service and send a written proposal within 1–2 days." },
  { q: "Do you offer support after launch?", a: "Yes, through a monthly retainer for fixes, updates and new features." },
];

export const contactFaqs: Faq[] = [
  { q: "Is the first consultation really free?", a: "Yes. The first call and your written proposal cost nothing, and there's no obligation." },
  { q: "Who will I speak to?", a: "A senior engineer who understands your project, not a salesperson." },
  { q: "Will you sign an NDA?", a: "Yes, before you share any details." },
  { q: "What if my budget is small?", a: "Tell us anyway. We'll suggest the smallest version that works, or point you to a better option if we're not the right fit." },
  { q: "What should I prepare for the call?", a: "Just a rough idea of what you want to build and why. Documents, designs or examples help, but aren't needed." },
];

export const industries = [
  "Healthcare", "FinTech", "Retail & eCommerce", "Real Estate", "EdTech", "Marketing & SaaS",
  "Home Services", "Professional Services", "Travel & Hospitality", "Social & Marketplaces", "Customer Support & CX",
];

export const offices = [
  { region: "United Kingdom", code: "UK", flag: "🇬🇧", address: "215a 650 Avebury Boulevard, Milton Keynes, England, MK9 3FQ", hours: "UK business hours" },
  { region: "United States", code: "US", flag: "🇺🇸", address: "228 Park Ave S, New York, NY 10003, USA", hours: "US business hours" },
  { region: "Global engineering team", code: "Global", flag: "🌍", address: "Senior engineers across time zones, overlapping with your working day.", hours: "Live overlap with UK & US" },
];

// Team: only the CEO is named on their site; the rest are published as roles.
export const team = [
  { name: "Ahmed Khan", role: "Founder & CEO" },
  { name: null, role: "Chief Technology Officer" },
  { name: null, role: "Head of Engineering" },
  { name: null, role: "Lead AI Engineer" },
  { name: null, role: "Head of Product" },
  { name: null, role: "Head of Design" },
  { name: null, role: "Senior Full-Stack Engineer" },
  { name: null, role: "Senior Mobile Engineer" },
  { name: null, role: "DevOps Lead" },
  { name: null, role: "QA Lead" },
];

export const promises = [
  { title: "Senior engineers only", body: "Every project is led by engineers with 7+ years' experience. No juniors learning on your budget." },
  { title: "Working software every week", body: "Weekly demos, so you see real progress and can change direction early." },
  { title: "Honest scoping", body: "We'll tell you what not to build, and recommend the smallest version that works." },
  { title: "Fixed-price phases", body: "Clear scope and a fixed or capped price for each phase. No surprise invoices." },
  { title: "You own everything", body: "Full code ownership, documentation and handover from day one." },
  { title: "Accountable after launch", body: "We support what we build, and many clients stay with us for years." },
];

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
