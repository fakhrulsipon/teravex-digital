import {
  BadgeCheck,
  ClipboardList,
  Code2,
  CreditCard,
  Headphones,
  Languages,
  Layers,
  LifeBuoy,
  MessageCircle,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Users,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceSlug, Testimonial } from "@/types";
import { serviceStats } from "./services";
import { projects } from "./projects";
import { projectSteps } from "./process";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

/** Verified statistics — every number is derived from the site data. */
export const impactStats: Stat[] = [
  { value: String(projects.length), label: "Live Projects" },
  { value: String(serviceStats.webServices), label: "Website Services" },
  { value: "2", label: "Languages (English & Arabic)" },
  { value: String(projectSteps.length), label: "Steps on Every Project" },
];

/** Why Qatar businesses choose Teravex Digital — shown in the "Built for Qatar" section. */
export const qatarPoints: Feature[] = [
  { icon: Languages, title: "English & Arabic", description: "Websites and apps in both languages." },
  { icon: Smartphone, title: "Made for Phones", description: "Fast and easy on every phone." },
  { icon: MessageCircle, title: "WhatsApp Ready", description: "Customers can message you in one tap." },
  { icon: CreditCard, title: "Online payments", description: "Accept card payments on your website." },
];

export const whyChooseUs: Feature[] = [
  { icon: Layers, title: "One team, every service", description: "Website, app and marketing under one roof." },
  { icon: Users, title: "One contact person", description: "One person looks after your project from start to finish." },
  { icon: BadgeCheck, title: "Clear plan & timeline", description: "You know what you get before we start." },
  { icon: ShieldCheck, title: "Carefully tested", description: "Everything is checked before it goes live." },
  { icon: Rocket, title: "Fast & modern", description: "Quick websites and smooth apps that look great." },
  { icon: LifeBuoy, title: "Help after launch", description: "We stay with you for updates and support." },
];

/** Highlights used next to the About preview on the home page. */
export const aboutHighlights: string[] = [
  "Designers, developers & marketers in one team",
  "Tested and safe before launch",
  "Help and updates after launch",
];

/** Process phases (grouping the 13 project steps for compact display). */
export const processPhases: Feature[] = [
  { icon: ClipboardList, title: "Plan", description: "We learn your goals." },
  { icon: Code2, title: "Build", description: "We design and build it." },
  { icon: Rocket, title: "Launch", description: "We test it and go live." },
  { icon: Headphones, title: "Support", description: "We show you how it works." },
  { icon: RefreshCw, title: "Grow", description: "We keep it updated and safe." },
];

/**
 * Real client testimonials. This list is intentionally EMPTY — Teravex Digital has not
 * supplied verified reviews. Add genuine reviews here (with permission) and the
 * home page will show them automatically instead of the client promises below.
 */
export const testimonials: Testimonial[] = [];

/** What every client can expect — shown while there are no real testimonials. */
export const clientPromises: { title: string; quote: string; step: string }[] = [
  { title: "We listen first", quote: "Every project starts with your goals — then we plan around them.", step: "Plan" },
  { title: "Checked twice", quote: "Everything is tested and checked again before it goes live.", step: "Build & test" },
  { title: "Clear handover", quote: "We show you how everything works — and stay to help.", step: "Launch" },
  { title: "Safe & up to date", quote: "We keep your website secure and remind you before your domain or hosting expires.", step: "Support" },
];

export interface ShowcaseItem {
  title: string;
  category: "Web" | "App" | "Marketing";
  service: ServiceSlug;
  description: string;
  tags: string[];
  visual: "business" | "ecommerce" | "landing" | "app" | "ads" | "analytics";
}

/**
 * Illustrative project types (used by the optional PortfolioSection).
 * The home page now shows real projects from src/data/projects.ts instead.
 */
export const showcase: ShowcaseItem[] = [
  { title: "Business Website", category: "Web", service: "website-development", description: "Bilingual 5-page site with WhatsApp & Google Maps.", tags: ["EN / AR", "SEO", "WhatsApp"], visual: "business" },
  { title: "E-commerce Store", category: "Web", service: "website-development", description: "Products, cart, checkout and online payment.", tags: ["Checkout", "Payments"], visual: "ecommerce" },
  { title: "Shopping App", category: "App", service: "mobile-app-development", description: "Android & iOS app with order tracking.", tags: ["Android", "iOS"], visual: "app" },
  { title: "Lead Landing Page", category: "Web", service: "website-development", description: "One fast page built to capture leads.", tags: ["Fast", "Lead form"], visual: "landing" },
  { title: "Meta Ads Campaign", category: "Marketing", service: "meta-ads", description: "Instagram & Facebook ads for Qatar audiences.", tags: ["Reels", "Retargeting"], visual: "ads" },
  { title: "Analytics Dashboard", category: "Marketing", service: "google-analytics-tracking", description: "GA4 + Tag Manager with a monthly dashboard.", tags: ["GA4", "GTM"], visual: "analytics" },
];

