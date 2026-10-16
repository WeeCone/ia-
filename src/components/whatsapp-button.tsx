"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Customer service number, public on purpose (it has to be in the link).
const WHATSAPP_NUMBER = "33631667604";
const MESSAGE = "Bonjour, j'ai une question sur Scanzivo.";
const HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

/** Floating WhatsApp contact for customer service, bottom right. On the homepage it waits for a little scroll. */
export function WhatsAppButton() {
  const pathname = usePathname();
  const waitForScroll = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!waitForScroll) return;
    const update = () => setScrolled(window.scrollY > 240);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [waitForScroll]);

  if (pathname.startsWith("/admin")) return null;
  const shown = !waitForScroll || scrolled;

  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter le service client sur WhatsApp"
      title="Service client sur WhatsApp"
      tabIndex={shown ? undefined : -1}
      className={`group fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_28px_-8px_rgb(0_0_0/0.45)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366] active:scale-95 sm:bottom-6 sm:right-6 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 32 32" className="size-7" fill="currentColor" aria-hidden>
        <path d="M16.004 3C8.832 3 3 8.83 3 16c0 2.292.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.004 29C23.172 29 29 23.17 29 16S23.172 3 16.004 3Zm0 23.62c-2.02 0-4-.54-5.73-1.57l-.41-.24-3.96 1.04 1.06-3.86-.27-.4A10.6 10.6 0 0 1 5.38 16c0-5.86 4.77-10.62 10.63-10.62S26.62 10.14 26.62 16s-4.76 10.62-10.62 10.62Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.14 3.09 1.3 3.3c.16.21 2.25 3.43 5.45 4.81.76.33 1.35.52 1.82.67.76.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
