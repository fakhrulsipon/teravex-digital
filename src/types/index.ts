import type { LucideIcon } from "lucide-react";

export type ServiceSlug =
  | "website-development"
  | "mobile-app-development"
  | "seo"
  | "meta-ads"
  | "google-ads"
  | "social-media-management"
  | "google-analytics-tracking"
  | "email-marketing";

export interface SubService {
  name: string;
  features: string[];
}

export interface ServiceCategory {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind gradient classes used for the category accent */
  accent: string;
  /** "core" = Website & Mobile App (main focus), "growth" = marketing add-ons */
  group: "core" | "growth";
  subServices: SubService[];
}

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
  image?: string;
}

export interface NavItem {
  label: string;
  href: "/" | "/services" | "/about" | "/contact";
}
