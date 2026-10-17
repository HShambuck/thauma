// SINGLE SOURCE OF TRUTH for all copy. Do not hardcode text in components.
// Anything marked // REPLACE is placeholder data.

export const siteContent = {
  brand: {
    name: "Thauma Digital Solutions",
    short: "Thauma",
    motto: "Engineering wonder, unlocking growth.",
    vision:
      "To be the premier digital growth partner for African businesses, empowering everyday enterprises to achieve extraordinary scale through the seamless fusion of intelligent technology and creative media.",
    mission:
      "To help growing businesses unlock their full potential by providing integrated software tools, AI automation, and high-impact visual media that drive visibility, operational efficiency, and sustainable sales.",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/work#contact" },
  ],
  navCta: { label: "Get Started", href: "/work#contact" },

  hero: {
    eyebrow: ["TECH", "CREATIVE", "IMPACT"],
    headlineLead: "We Build Media & Digital Systems That",
    headlineHighlight: "Scale Businesses.",
    sub: "Thauma is a tech and creative agency helping African brands turn ideas into powerful digital products, stunning visuals and scalable solutions.",
    primaryCta: { label: "Supercharge Your Business", href: "/work#contact" },
    secondaryCta: { label: "Watch Showreel" },
    cards: {
      growth: { label: "Total Growth", value: "+248%", note: "Last 30 days" }, // REPLACE
      momo: {
        title: "MoMo Webhook",
        lines: ["POST /payments/momo", "status: SUCCESS", "GHS 450.00 received"], // REPLACE
      },
      code: {
        title: "order-agent.ts",
        lines: ["const order = await track(id);", "await notify.whatsapp(order);", "analytics.update(order);"],
      },
      output: { label: "Creative Output", value: "98%" }, // REPLACE
    },
  },

  serviceStrip: [
    { icon: "code", title: "Web & Software Development", desc: "Robust, scalable and modern web applications tailored to your needs.", href: "/services" },
    { icon: "camera", title: "Creative Media Production", desc: "High-quality video, photo and graphic content that tells your story.", href: "/services" },
    { icon: "cloud", title: "Cloud & AI Automation", desc: "Secure, serverless cloud systems and autonomous AI agents.", href: "/services" },
    { icon: "bulb", title: "Branding & Digital Strategy", desc: "Strategic design and digital solutions to grow your brand.", href: "/services" },
  ],

  philosophy:
    "We handle the tech complexity and creative heavy lifting so you can focus entirely on perfecting your product and service.",

  team: [
    { name: "Halifax Shambuck Addo Yeboah", role: "Chief Executive Officer", focus: "Lead Cloud & Software Engineer. Full-Stack, AWS Serverless Architectures, AI Agent Engineering." },
    { name: "Richard Yeboah", role: "Creative Media & Production Director", focus: "High-end Studio Videography, Motion Graphics, Visual Storytelling." },
    { name: "Pietro Carletto Bonaldi", role: "Business Branding & Social Media Marketing Director", focus: "Brand Strategy, Client Relations, Campaign Direction." },
    { name: "Derrick Aduama", role: "Marketing & Growth Strategist", focus: "Market Acquisition, Advertising Funnels, Client Growth." },
  ],

  friction: {
    title: "Running a business manually is chaos.",
    sub: "Scroll to watch Thauma turn the mess into a system.",
    after: "Structured. Automated. Scaling.",
    cards: [
      "Lost DM leads", "Manual inventory tracking", "Unpolished phone videos",
      "Missed payments", "Slow customer replies", "Scattered spreadsheets",
    ],
  },

  pillars: {
    title: "Two pillars. One growth engine.",
    left: {
      title: "Media & Visual Identity",
      items: ["High-definition video reels", "Studio product photography", "Brand storytelling"],
    },
    right: {
      title: "AI & Cloud Infrastructure",
      items: ["Serverless web apps", "Autonomous AI agents", "Automated order tracking", "Custom analytics", "MoMo & card gateways"],
    },
  },

  ecosystem: {
    title: "See the whole engine in motion.",
    sub: "From first impression to automated fulfilment.",
    phases: [
      { id: "brand", label: "Branding", title: "Raw footage becomes a studio-graded reel", lines: ["Raw clip imported", "Colour graded and sound mixed", "Reel published to Instagram and TikTok"] },
      { id: "commerce", label: "Commerce", title: "Customers pay in seconds with MoMo", lines: ["Order placed on your web app", "MoMo prompt sent to customer", "Payment confirmed: GHS 450.00"] },
      { id: "ai", label: "AI & Automation", title: "Your AI agent handles the follow-up", lines: ["Payment webhook received", "WhatsApp delivery alert sent", "CRM and analytics updated"] },
    ],
  },

  cta: {
    title: "Ready to scale your business?",
    sub: "Tell us where you are. We will show you where the tech and media can take you.",
    fields: { name: "Your name", contact: "Phone or email", message: "What are you trying to grow?" },
    submit: "Send My Details",
    sending: "Sending...",
    success: "Thank you! We will reach out shortly.",
    error: "Something went wrong. Please try again.",
    bookLabel: "Book a 15-Min Strategy Call",
  },

  servicesPage: {
    hero: {
      eyebrow: "WHAT WE DO",
      title: "Credibility that gets you seen. Technology that gets you sales.",
      sub: "We manage your branding and socials, and we build custom tech solutions. Use one, or combine both.",
    },
    cta: { label: "Discuss your project", href: "/work#contact" },
    services: [
      { id: "media", icon: "clapper", title: "Creative Media & Branding",
        desc: "High-production video content, professional photography, and visual brand identity that establish immediate market authority.",
        points: ["Video production", "Professional photography", "Visual brand identity", "Social media management"] },
      { id: "web", icon: "code", title: "Custom Web & Application Development",
        desc: "High-performance, SEO-optimized web applications with integrated payment gateways (Mobile Money and Cards), automated order tracking, and custom features tailored to your operations.",
        points: ["SEO-optimised web apps", "Mobile Money and card payments", "Automated order tracking", "Custom features for your business"] },
      { id: "ops", icon: "bot", title: "Automated Account Operations",
        desc: "Internal AI-driven workflows that streamline content scheduling, lead triaging, and social media analytics, ensuring consistent audience engagement with minimal manual friction.",
        points: ["Content scheduling", "Lead triaging", "Social media analytics", "AI agents for routine tasks"] },
    ],
    packages: {
      title: "Packages that combine media and tech",
      sub: "Brands grow fastest when creative and technology work together. Every package is tailored to your business.",
      note: "We only recommend advanced features when they will genuinely streamline your processes.",
      items: [
        { id: "brand", name: "Brand & Socials", tag: "Media-led",
          desc: "We manage your branding and social presence so your business looks credible and gets seen.",
          includes: ["Visual brand identity", "Professional photo and video content", "Social media management", "Content scheduling and analytics"] },
        { id: "web", name: "Professional Website", tag: "Media + Web",
          desc: "A professional website built around your brand and linked to your socials.",
          includes: ["Custom, SEO-optimised website", "Linked to your social channels", "Brand-consistent design", "Fast, mobile-first build"] },
        { id: "eco", name: "Full Growth Ecosystem", tag: "Media + Web App + Automation", featured: true,
          desc: "A custom web application backed by your branding and socials, built around how your business actually runs.",
          includes: ["Everything in Professional Website", "Custom web app for your operations"],
          conditionalLabel: "Added only if your business needs it",
          conditional: ["AI integration", "Mobile Money and card payments", "Order tracking", "AI agent to automate tasks"] },
      ],
    },
    oneOff: {
      title: "Need just one thing? We do standalone work too.",
      sub: "No package required. Pay for exactly what you need.",
      items: [
        { icon: "code", title: "Custom Systems", desc: "A tailor-made system or application built for your operations." },
        { icon: "camera", title: "Event Photography & Videography", desc: "Professional coverage for your event, launch or shoot." },
        { icon: "pen", title: "Graphic Design", desc: "Flyers, logos, social graphics and more as a one-time job." },
        { icon: "music", title: "Video & Sound Editing", desc: "Polished edits, colour grading and audio clean-up for your footage." },
      ],
    },
    techStack: {
      title: "The stack behind the wonder",
      groups: [
        { group: "Frontend", chips: ["React", "Vite", "TypeScript", "Tailwind CSS", "GSAP", "PWA"] },
        { group: "Cloud", chips: ["AWS Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront"] },
        { group: "AI & Automation", chips: ["LLM Agents", "NLP", "WhatsApp API", "Webhooks"] },
        { group: "Payments", chips: ["MTN MoMo", "Telecel Cash", "AT Money", "Paystack", "Hubtel"] },
        { group: "Media", chips: ["Studio Video", "Motion Graphics", "Colour Grading", "Photography"] },
      ],
    },
    blueprint: {
      title: "Architecture Blueprint",
      sub: "Hover or tap a node to see how data flows from your media campaign to the serverless backend.",
      connected: "Connected to",
      idle: "Select a node to explore the flow.",
      nodes: [
        { id: "video", label: "Media", x: 110, y: 90, desc: "Reels and brand content drive traffic into your web app." },
        { id: "payments", label: "Payments", x: 110, y: 310, desc: "MoMo and card payments confirm orders instantly." },
        { id: "cloud", label: "Serverless", x: 400, y: 200, desc: "API Gateway and Lambda run the backend, scaling with demand." },
        { id: "ai", label: "AI Agent", x: 690, y: 90, desc: "Handles DMs, qualifies leads, triages support and alerts your team." },
        { id: "analytics", label: "Analytics", x: 690, y: 310, desc: "Live dashboards for inventory, fulfilment speed and retention." },
      ],
      edges: [["video", "cloud"], ["payments", "cloud"], ["ai", "cloud"], ["analytics", "cloud"], ["ai", "analytics"]],
    },
  },

  footer: {
    blurb: "Engineering wonder, unlocking growth.",
    copyright: "Thauma Digital Solutions. All rights reserved.",
  },
} as const;

export type SiteContent = typeof siteContent;
