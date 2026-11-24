import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { mainNav, siteConfig } from "@/data/site";
import { services } from "@/data/services";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "./social-icons";

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedInIcon },
  { label: "Facebook", href: siteConfig.socials.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: siteConfig.socials.youtube, Icon: YouTubeIcon },
  { label: "X (Twitter)", href: siteConfig.socials.x, Icon: XIcon },
];

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -bottom-40 -left-20 size-96 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -right-24 -bottom-32 size-96 rounded-full bg-cyan-200/40 blur-3xl" />
      </div>

      <div data-gsap-stagger className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="col-span-2 flex flex-col gap-5 lg:col-span-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Websites and mobile apps in English & Arabic for businesses in Qatar.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Social media">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-xl border border-border bg-white text-slate-600 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 hover:shadow-soft"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <h2 className="text-sm font-bold text-navy-950">Quick Links</h2>
          <ul className="mt-3 flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1.5 text-sm text-muted-foreground transition-colors hover:text-brand-700">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-bold text-navy-950">Services</h2>
          <ul className="mt-3 grid grid-cols-1">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="inline-block py-1.5 text-sm text-muted-foreground transition-colors hover:text-brand-700"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-3">
          <h2 className="text-sm font-bold text-navy-950">Get in touch</h2>
          <ul className="mt-4 flex flex-col gap-3.5 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 hover:text-brand-700">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand-700">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                  <MessageCircle className="size-4" aria-hidden="true" />
                </span>
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-brand-700">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <Phone className="size-4" aria-hidden="true" />
                </span>
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <MapPin className="size-4" aria-hidden="true" />
              </span>
              {siteConfig.contact.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © <CopyrightYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
