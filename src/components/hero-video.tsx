"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./hero-video.css";

export default function HeroVideo() {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    const target = container.current;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (target) observer.observe(target);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const shouldPlay =
    visible && pageVisible && !manuallyPaused && !failed;

  useEffect(() => {
    // No video URL is emitted during SSR or requested before these conditions.
    if (shouldPlay) setLoadVideo(true);
  }, [shouldPlay]);

  useEffect(() => {
    const player = video.current;
    if (!player || !loadVideo) return;
    let active = true;
    if (shouldPlay) {
      player.play().catch(() => {
        // Autoplay may be declined. The poster and explicit play remain usable.
        if (active) setPlaying(false);
      });
    } else {
      player.pause();
    }
    return () => {
      active = false;
      player.pause();
    };
  }, [loadVideo, shouldPlay]);

  function togglePlayback() {
    if (playing) {
      setManuallyPaused(true);
      video.current?.pause();
      return;
    }
    setManuallyPaused(false);
    setFailed(false);
    setLoadVideo(true);
    // Retry inside the user's gesture when an earlier autoplay was declined.
    video.current?.play().catch(() => setPlaying(false));
  }

  return (
    <div
      className="hero-video"
      ref={container}
      data-has-frame={hasFrame && !failed}
    >
      <Image
        className="hero-video-poster"
        src="/images/hero-video-poster.webp"
        alt="Escuela, viviendas y obras realizadas con tecnología VBT"
        fill
        priority
        sizes="(max-width:800px) 100vw, 94vw"
      />
      {loadVideo && !failed && (
        <video
          ref={video}
          className="hero-video-player"
          src="/videos/vbt-inicio-15s.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={(event) => {
            if (event.currentTarget.paused || !shouldPlay) return;
            setHasFrame(true);
            setPlaying(true);
          }}
          onPause={(event) => {
            if (event.currentTarget.paused) setPlaying(false);
          }}
          onError={() => {
            setPlaying(false);
            setHasFrame(false);
            setFailed(true);
            setLoadVideo(false);
          }}
        />
      )}
      <button
        type="button"
        className="hero-video-control"
        onClick={togglePlayback}
        aria-label={
          playing
            ? "Pausar video de proyectos VBT"
            : "Reproducir video de proyectos VBT"
        }
      >
        <svg width="15" height="15" viewBox="0 0 20 20" aria-hidden="true">
          {playing ? (
            <path
              d="M6 4v12M14 4v12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
          ) : (
            <path d="m6 3 10 7-10 7Z" fill="currentColor" />
          )}
        </svg>
        {playing ? "Pausar" : "Reproducir"}
      </button>
    </div>
  );
}
