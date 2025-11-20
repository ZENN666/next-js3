"use client";

import { useEffect, useRef, useState } from "react";
import StaggeredMenuOriginal from "./components/StaggeredMenu/StaggeredMenu";
const StaggeredMenu = StaggeredMenuOriginal as any;

import "./components/StaggeredMenu/StaggeredMenu.css";

// 🔥 IMPORT ORB
import Orb from "./components/Orb/Orb";

const menuItems = [
  { label: "Home", link: "/" },
  { label: "Stream", link: "/stream" },
  { label: "Services", link: "/services" },
  { label: "About us", link: "/AboutUs" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      setIsLoading(true);
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">

      {/* === BACKGROUND (Orb + Hitam + Interaktif) === */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-black">
        <Orb
          hoverIntensity={Math.min(volume + 0.2, 1)} // Volume nge-boost efek hover
          rotateOnHover={true}
          hue={0}
          forceHoverState={isPlaying} // nge-pulse pas lagi play
        />
      </div>

      {/* === MENU === */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        colors={["#B19EEF", "#5227FF"]}
        logoUrl="/sebayu.png"
        accentColor="#ff6b6b"
      />

      {/* === RADIO PLAYER === */}
      <div
        className="
        absolute left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
        bg-black/40 backdrop-blur-xl
        border border-white/20 shadow-lg
        px-6 py-4 rounded-2xl
        flex items-center gap-6
        text-white
        z-[30]
        pointer-events-auto
      "
      >
        {/* PLAY BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="w-12 h-12 flex items-center justify-center
            bg-white/20 hover:bg-white/30
            rounded-full transition-all"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            "⏸️"
          ) : (
            "▶️"
          )}
        </button>

        {/* STATUS */}
        <div className="flex flex-col">
          <span className="font-semibold text-lg">Radio Sebayu 94 FM</span>
          <span className="text-sm opacity-80">
            {isLoading ? "Buffering..." : isPlaying ? "Now Playing" : "Paused"}
          </span>
        </div>

        {/* VOLUME */}
        <div className="flex items-center gap-2">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              const v = Number(e.target.value);
              setVolume(v);
              if (audioRef.current) audioRef.current.volume = v;
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="w-32 cursor-pointer"
          />
        </div>

        {/* AUDIO */}
        <audio
          ref={audioRef}
          src="https://admin.sebayu.my.id/listen/sebayubaru/radio.mp3"
          preload="none"
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsPlaying(true);
            setIsLoading(false);
          }}
          onError={() => {
            setIsPlaying(false);
            setIsLoading(false);
          }}
        />
      </div>
    </div>
  );
}
