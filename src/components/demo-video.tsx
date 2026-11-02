"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";

/** Looping product demo. Browsers only autoplay muted videos, so sound is opt-in. */
export function DemoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  // Until frames really play, the still is drawn over the video: some Safari setups show a black box instead of the
  // poster (blocked autoplay, low power mode). If the browser refuses to start it, a play button asks.
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const { t } = useI18n();

  function start() {
    const video = ref.current;
    if (!video) return;
    video
      .play()
      .then(() => setBlocked(false))
      .catch(() => setBlocked(true));
  }

  // The loop only plays while on screen: no decoding (or sound) for a video nobody sees.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggleSound() {
    const video = ref.current;
    if (!video) return;
    video.muted = !muted;
    if (muted) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    setMuted(!muted);
  }

  return (
    <div className="relative">
      <video
        ref={ref}
        className="block aspect-video w-full"
        poster="/media/btc-scan-poster.jpg?v=3"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={t.demo.videoLabel}
        onPlaying={() => setPlaying(true)}
      >
        {/* H.264 first: every browser plays it, where Safari can show VP9 WebM as a black frame. */}
        <source src="/media/btc-scan.mp4?v=3" type="video/mp4" />
        <source src="/media/btc-scan.webm?v=3" type="video/webm" />
      </video>
      {!playing && (
        <button type="button" onClick={start} aria-label={t.demo.play} className="group absolute inset-0 block cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element -- the video's own poster, already sized */}
          <img src="/media/btc-scan-poster.jpg?v=3" alt="" className="size-full object-cover" />
          {blocked && (
            <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/75 text-white transition group-hover:bg-black/90">
              <svg viewBox="0 0 20 20" className="ml-1 size-7" fill="currentColor" aria-hidden>
                <path d="M6 4l10 6-10 6z" />
              </svg>
            </span>
          )}
        </button>
      )}
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/75 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-black/90"
      >
        <svg
          viewBox="0 0 20 20"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 8v4h3l4 3V5L6 8H3z" />
          {muted ? <path d="M13.5 8l4 4M17.5 8l-4 4" /> : <path d="M13.5 7.5a3.5 3.5 0 0 1 0 5M15.5 5.5a6.5 6.5 0 0 1 0 9" />}
        </svg>
        {muted ? t.demo.soundOn : t.demo.soundOff}
      </button>
    </div>
  );
}
