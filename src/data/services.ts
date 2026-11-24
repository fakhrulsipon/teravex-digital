import { AppWindow, BarChart3, Globe, Mail, Megaphone, Search, Smartphone, Users } from "lucide-react";
import type { ServiceCategory, ServiceSlug } from "@/types";

/**
 * All Teravex Digital services (Qatar edition).
 * Copy is written for business owners, not developers: plain words, no tech jargon.
 * Websites are listed first, then mobile apps, then marketing services.
 */
export const services: ServiceCategory[] = [
  {
    slug: "website-development",
    name: "Website Development",
    shortName: "Website",
    tagline: "Every kind of website — designed, built and looked after.",
    description: "From a simple business website to a full online store, in English & Arabic.",
    icon: Globe,
    accent: "from-brand-600 to-sky-500",
    group: "core",
    subServices: [
      { name: "Business Websites", features: ["Show your business online", "English & Arabic", "WhatsApp & call buttons"] },
      { name: "Online Stores", features: ["Sell your products online", "Accept card payments", "Manage orders easily"] },
      { name: "Landing Pages", features: ["One page for your offer or ad", "Loads in seconds", "Brings more enquiries"] },
      { name: "Booking & Business Systems", features: ["Booking & reservations", "Customer accounts", "Easy business dashboard"] },
      { name: "Website Design", features: ["Modern, clean look", "Simple for visitors to use", "Looks great on phones"] },
      { name: "Easy-to-Edit Websites", features: ["Change text & photos yourself", "WordPress available", "Blog & news pages"] },
      { name: "Website Redesign", features: ["Fresh, modern look", "Faster & easier to find", "Keep all your content"] },
      { name: "Payments & Connections", features: ["Online payment setup", "Connect delivery & booking tools", "Link your business software"] },
      { name: "Speed Boost", features: ["Pages open fast", "Better Google ranking", "Smooth on every phone"] },
      { name: "Security & Backups", features: ["Safe, secure website (https)", "Protection from hackers", "Regular backups"] },
      { name: "Domain, Hosting & Email", features: [".com & .qa web address", "Reliable hosting", "Email with your company name"] },
      { name: "Care & Support", features: ["Updates & fixes", "Text & photo changes", "Help whenever you need it"] },
      { name: "SaaS Products", features: ["Your own online software", "Customer accounts & subscriptions", "Easy admin dashboard"] },
      { name: "AI Agents & AI Services", features: ["AI chat assistant for your website", "Answers customers in English & Arabic", "Saves your team time"] },
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    shortName: "Mobile App",
    tagline: "Android & iPhone apps, from idea to app store.",
    description: "Easy-to-use apps in Arabic & English, ready to grow with your business.",
    icon: Smartphone,
    accent: "from-indigo-600 to-violet-500",
    group: "core",
    subServices: [
      { name: "Android Apps", features: ["Phones & tablets", "Published on Google Play", "Fast & smooth"] },
      { name: "iPhone Apps", features: ["iPhone & iPad", "Published on the App Store", "Meets Apple’s rules"] },
      { name: "One App for Both Phones", features: ["Works on Android & iPhone", "Saves time & budget", "Launch faster"] },
      { name: "Shopping & Delivery Apps", features: ["Products, cart & checkout", "Live order tracking", "Sale & order alerts"] },
      { name: "Booking Apps", features: ["Appointments & reservations", "Live location tracking", "Pay inside the app"] },
      { name: "App Design", features: ["Simple, clear screens", "Arabic & English layouts", "Easy for every user"] },
      { name: "Admin Panel", features: ["Manage everything in one place", "See orders & customers", "Safe login for your team"] },
      { name: "App Store Publishing", features: ["App Store & Google Play", "Store page & screenshots", "We handle the approval"] },
      { name: "App Care & Updates", features: ["Updates for new phones", "Bug fixes", "New features"] },
    ],
  },
  {
    slug: "seo",
    name: "SEO",
    shortName: "SEO",
    tagline: "Get found on Google in Qatar.",
    description: "Help customers find you when they search on Google — in English & Arabic.",
    icon: Search,
    accent: "from-teal-600 to-cyan-500",
    group: "growth",
    subServices: [
      { name: "Website Content", features: ["The words people search for", "Better page titles", "Clear, helpful text"] },
      { name: "Technical Fixes", features: ["Faster pages", "Fix broken links", "Easy for Google to read"] },
      { name: "Google Maps & Local", features: ["Google Business Profile", "Show up in Doha searches", "Rank on Google Maps"] },
    ],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    shortName: "Meta Ads",
    tagline: "Instagram & Facebook ads for Qatar.",
    description: "Ads that reach the right people and bring you customers.",
    icon: Megaphone,
    accent: "from-blue-600 to-indigo-500",
    group: "growth",
    subServices: [
      { name: "Instagram Ads", features: ["Feed, Story & Reels ads", "Eye-catching designs", "Reach the right people"] },
      { name: "Facebook Ads", features: ["Full ad setup", "Test what works best", "Stay on budget"] },
      { name: "Win Back Visitors", features: ["Ads for people who visited", "Bring back interested buyers", "Remind people who left the cart"] },
    ],
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    shortName: "Google Ads",
    tagline: "Search, banner & YouTube ads.",
    description: "Show up the moment people in Qatar search for what you sell.",
    icon: AppWindow,
    accent: "from-amber-500 to-orange-500",
    group: "growth",
    subServices: [
      { name: "Search Ads", features: ["The right search words", "Ads in English & Arabic", "Count calls & enquiries"] },
      { name: "Banner Ads", features: ["Banner design", "Ads for past visitors", "Choose where ads appear"] },
      { name: "YouTube Ads", features: ["Video ad setup", "Reach the right viewers", "See who watched"] },
    ],
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    shortName: "Social Media",
    tagline: "Instagram, TikTok & Snapchat, done for you.",
    description: "We plan, design and post — you focus on your business.",
    icon: Users,
    accent: "from-pink-600 to-rose-500",
    group: "growth",
    subServices: [
      { name: "Content Planning", features: ["Monthly post calendar", "Arabic & English captions", "Best times to post"] },
      { name: "Post & Reel Design", features: ["Posts & stories", "Reels editing", "Matches your brand"] },
      { name: "Page Management", features: ["Instagram & TikTok", "Snapchat & Facebook", "Monthly report"] },
    ],
  },
  {
    slug: "google-analytics-tracking",
    name: "Analytics & Reports",
    shortName: "Analytics",
    tagline: "Know where your customers come from.",
    description: "Simple monthly reports on your visitors, calls and sales.",
    icon: BarChart3,
    accent: "from-lime-600 to-emerald-500",
    group: "growth",
    subServices: [
      { name: "Google Analytics Setup", features: ["Track visitors & sales", "See where they come from", "Linked to Google Search"] },
      { name: "Click Tracking", features: ["Count form & WhatsApp clicks", "Track your ads", "Tested & working"] },
      { name: "Monthly Reports", features: ["Easy-to-read dashboard", "Monthly summary", "Clear next steps"] },
    ],
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    shortName: "Email",
    tagline: "Emails that bring customers back.",
    description: "Newsletters and automatic emails that keep customers coming back.",
    icon: Mail,
    accent: "from-fuchsia-600 to-purple-500",
    group: "growth",
    subServices: [
      { name: "Newsletters", features: ["Email design", "Content writing", "Sent at the best time"] },
      { name: "Automatic Emails", features: ["Welcome emails", "Cart reminders", "Follow-up emails"] },
      { name: "Email Reports", features: ["Who opened & clicked", "Test what works best", "Clean email list"] },
    ],
  },
];

export const coreServices = services.filter((s) => s.group === "core");
export const growthServices = services.filter((s) => s.group === "growth");

export function getService(slug: ServiceSlug): ServiceCategory {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}

/** Totals derived from the data above (used for verified statistics). */
export const serviceStats = {
  categories: services.length,
  subServices: services.reduce((n, s) => n + s.subServices.length, 0),
  webServices: getService("website-development").subServices.length,
  appServices: getService("mobile-app-development").subServices.length,
};
