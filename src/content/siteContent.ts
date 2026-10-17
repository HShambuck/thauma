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

  footer: {
    blurb: "Engineering wonder, unlocking growth.",
    copyright: "Thauma Digital Solutions. All rights reserved.",
  },
} as const;

export type SiteContent = typeof siteContent;
