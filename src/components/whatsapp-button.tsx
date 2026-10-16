"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/client";
import { LogoMark } from "./logo";

// Customer service number, public on purpose (it has to be in the link).
const WHATSAPP_NUMBER = "33631667604";
const ICON_PATH =
  "M16.004 3C8.832 3 3 8.83 3 16c0 2.292.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.004 29C23.172 29 29 23.17 29 16S23.172 3 16.004 3Zm0 23.62c-2.02 0-4-.54-5.73-1.57l-.41-.24-3.96 1.04 1.06-3.86-.27-.4A10.6 10.6 0 0 1 5.38 16c0-5.86 4.77-10.62 10.63-10.62S26.62 10.14 26.62 16s-4.76 10.62-10.62 10.62Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.14 3.09 1.3 3.3c.16.21 2.25 3.43 5.45 4.81.76.33 1.35.52 1.82.67.76.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z";
const whatsappHref = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

function WhatsAppIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d={ICON_PATH} />
    </svg>
  );
}

/**
 * Floating customer-service contact on WhatsApp, bottom right: a full card on larger screens, a round button on phones
 * (where the activity toast sits bottom left). On the homepage it waits for a little scroll.
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const { t } = useI18n();
  const waitForScroll = pathname === "/" || pathname === "/en" || pathname === "/es";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!waitForScroll) return;
    const update = () => setScrolled(window.scrollY > 240);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [waitForScroll]);

  if (pathname.includes("/admin")) return null;
  const shown = !waitForScroll || scrolled;

  return (
    <a
      href={whatsappHref(t.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
      tabIndex={shown ? undefined : -1}
      className={`group fixed bottom-5 right-5 z-40 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none sm:bottom-6 sm:right-6 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Phones: round button. */}
      <span className="grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_28px_-8px_rgb(0_0_0/0.45)] transition-transform group-hover:scale-105 group-active:scale-95 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-[#25d366] sm:hidden">
        <WhatsAppIcon className="size-7" />
      </span>

      {/* Larger screens: who answers, and the action. */}
      <span className="hidden items-center gap-3 rounded-full border border-[#d0d7de] bg-white py-1.5 pl-1.5 pr-1.5 text-[#0b0e14] shadow-[0_18px_40px_-14px_rgb(15_23_42/0.4)] transition-transform group-hover:-translate-y-0.5 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-[#25d366] sm:flex">
        <span className="relative shrink-0">
          <LogoMark className="size-11" />
          <span className="absolute -bottom-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-[#25d366] text-white ring-2 ring-white">
            <WhatsAppIcon className="size-3" />
          </span>
        </span>
        <span className="pr-1 leading-tight">
          <span className="block font-display text-[15px] font-bold">{t.whatsapp.title}</span>
          <span className="block text-xs text-[#57606a]">{t.whatsapp.subtitle}</span>
        </span>
        <span className="flex items-center gap-2 rounded-full bg-[#047857] px-4 py-2.5 font-display text-sm font-semibold text-white transition-colors group-hover:bg-[#065f46]">
          <WhatsAppIcon className="size-5" />
          {t.whatsapp.cta}
        </span>
      </span>
    </a>
  );
}
