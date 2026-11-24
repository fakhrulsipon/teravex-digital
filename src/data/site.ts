import type { NavItem } from "@/types";

/**
 * Global site configuration — Teravex Digital, Qatar.
 *
 * NOTE: The email, phone, WhatsApp number and social links below are
 * PLACEHOLDERS. Replace them with Teravex Digital's real Qatar details before going live.
 */
export const siteConfig = {
  name: "Teravex Digital",
  tagline: "Website & App Agency in Qatar",
  description:
    "Teravex Digital builds fast websites and mobile apps in English & Arabic for businesses in Qatar.",
  url: "https://teravexdigital.com",
  locale: "en_QA",
  contact: {
    email: "hello@teravexdigital.com",
    phone: "+974 0000 0000",
    whatsapp: "https://wa.me/97400000000",
    location: "Doha, Qatar",
  },
  socials: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    youtube: "https://www.youtube.com/",
    x: "https://x.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
