import type { StaticImageData } from "next/image";
import sitebari from "@/assets/projects/sitebari.png";
import codeclash from "@/assets/projects/codeclash.png";
import ridex from "@/assets/projects/ridex.png";
import mailbari from "@/assets/projects/mailbari.png";

export interface Project {
  name: string;
  subtitle: string;
  tag: string;
  description: string;
  /** What the product does, in plain words (shown as chips — no tech jargon). */
  features: string[];
  live: string;
  image: StaticImageData;
}

/** Real, live products built by the team. */
export const projects: Project[] = [
  {
    name: "Sitebari",
    subtitle: "Online Store Builder",
    tag: "E-commerce",
    description:
      "Helps businesses open an online store, manage products and orders, take payments and arrange delivery — all in one place.",
    features: ["Online store", "Card payments", "Order tracking", "Delivery", "Sales reports"],
    live: "https://sitebari.com/",
    image: sitebari,
  },
  {
    name: "CodeClash",
    subtitle: "Online Coding Contests",
    tag: "Education",
    description: "A website where programmers join live contests, solve problems in the browser and see their ranking instantly.",
    features: ["Live contests", "Live rankings", "User accounts", "Works in the browser"],
    live: "https://code-clash-d9152.web.app/",
    image: codeclash,
  },
  {
    name: "RideX",
    subtitle: "Ride Booking Website",
    tag: "Transport",
    description: "Book a ride in a few taps. Passengers find nearby drivers through a smooth, phone-friendly website.",
    features: ["Ride booking", "Nearby drivers", "Phone-friendly", "Smooth animations"],
    live: "https://ridex-ride-sharing.vercel.app/",
    image: ridex,
  },
  {
    name: "Mailbari",
    subtitle: "Business Email Service",
    tag: "Business Email",
    description: "Professional email with your own company name — simple to manage for the whole team.",
    features: ["Company email", "Team accounts", "Strong security", "Easy admin"],
    live: "https://mailbari.com/",
    image: mailbari,
  },
];
