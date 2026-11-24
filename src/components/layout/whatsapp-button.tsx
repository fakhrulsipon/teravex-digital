import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

/** Floating "Chat on WhatsApp" button — the quickest way for Qatar clients to reach us. */
export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-emerald-500 p-3 text-white shadow-lift ring-4 ring-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-600 sm:right-6 sm:bottom-6 sm:py-3 sm:pr-5 sm:pl-4"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden text-sm font-bold sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
