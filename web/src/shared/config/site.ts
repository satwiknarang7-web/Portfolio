/**
 * Site-wide identity and navigation. Edit this file to change your name,
 * tagline, social links and the menu in one place.
 */
export const siteConfig = {
  name: "Satwik Narang",
  initials: "SN",
  role: "AI-Native Engineer",
  tagline:
    "Working at the bridge of engineering and business — I build full-stack products, the dashboards that measure them and the designs that sell them.",
  location: "Noida, India",
  timeZone: "Asia/Kolkata",
  email: "satwiknarang7@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Drop your photo at web/public/images/profile.jpg — the site falls back to a monogram until then.
  portrait: "/images/profile.jpg",
  socials: [
    { label: "GitHub", href: "https://github.com/satwiknarang7-web" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Email", href: "mailto:satwiknarang7@gmail.com" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Education", href: "/education" },
    { label: "Projects", href: "/projects" },
    { label: "Hobbies", href: "/hobbies" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
