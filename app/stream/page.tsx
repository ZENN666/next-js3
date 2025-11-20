"use client";
import { useRef, useState } from "react";
import Image from "next/image";

export default function StreamPage() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) setDuration(audioRef.current.duration);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const time = Number(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    return (
        <div className="w-full min-h-screen bg-[#eef0f4] flex flex-col items-center text-[#1c1c1c]">
            {/* TOP SECTION */}
            <section className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
                {/* LEFT COLUMN (tetap utuh) */}
                <div className="bg-white rounded-3xl p-12 shadow-sm flex flex-col gap-8 justify-center">
                    <div className="flex items-center gap-3 text-xl font-semibold">
                        <div className="w-7 h-7 bg-[#1a2a59] rounded-full" />
                        <span>Radio online Sebayu 94 FM</span>
                    </div>

                    <input
                        type="text"
                        placeholder="Search podcast"
                        className="w-full border border-gray-300 rounded-xl p-3 px-5 text-lg outline-none"
                    />

                    <div className="text-sm tracking-widest text-gray-500">/RADIO SEBAYU 94 FM</div>

                    <h1 className="text-5xl font-bold leading-tight">
                        Podcasts that
                        <br /> inspire to grow
                    </h1>

                    <p className="text-gray-600 text-lg max-w-md"> Informasinya menarik, musiknya asik
                    </p>

                    <div className="flex gap-4 mt-4">
                        <button className="bg-[#9be16d] text-black font-semibold px-6 py-3 rounded-xl shadow">
                            Start Listening
                        </button>
                        <button className="border border-gray-300 px-6 py-3 rounded-xl font-semibold">
                            Explore Channels
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <div className="flex -space-x-3">
                            <Image src="/pfp1.png" alt="pfp1" width={40} height={40} className="rounded-full" />
                            <Image src="/pfp2.png" alt="pfp2" width={40} height={40} className="rounded-full" />
                            <Image src="/pfp3.png" alt="pfp3" width={40} height={40} className="rounded-full" />
                        </div>
                        <span className="text-gray-600 font-medium">+120M Worldwide listeners</span>
                    </div>
                </div>

                {/* RIGHT COLUMN (audio player + floating circle) */}
                <div className="bg-[#1a1c28] rounded-3xl p-12 text-white shadow-xl relative overflow-hidden">
                    <nav className="flex gap-10 text-lg mb-10 opacity-80">
                        <span>HOME</span>
                        <span>ABOUT US</span>
                        <span>PRICING</span>
                        <span className="ml-auto">Sign up</span>
                    </nav>

                    <div className="bg-[#c5ff40] w-64 h-80 rounded-2xl overflow-hidden shadow-lg mb-8">
                        <Image src="/mic.jpg" alt="mic" width={300} height={400} className="w-full h-full object-cover" />
                    </div>

                    {/* AUDIO PLAYER */}
                    <div className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl w-[320px] flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold text-sm">Into the Depths</div>
                                <div className="text-xs opacity-70">Reply All</div>
                            </div>
                            <button
                                onClick={togglePlay}
                                className="bg-[#a1ff5c] text-black rounded-full px-3 py-2 text-lg"
                            >
                                {isPlaying ? "⏸" : "▶"}
                            </button>
                        </div>

                        {/* PROGRESS BAR */}
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-1 rounded-lg accent-[#a1ff5c] cursor-pointer"
                        />
                        <div className="flex justify-between text-xs opacity-70">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>

                        <audio
                            ref={audioRef}
                            src="https://admin.sebayu.my.id/listen/sebayubaru/radio.mp3"
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                        />
                    </div>

                    {/* Floating circle */}
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-lg">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                                ▶
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LOGO SECTION */}
            <section className="w-full flex items-center justify-center gap-20 py-12 opacity-70 text-lg">
                <span>Spotify</span>
                <span>Apple Podcasts</span>
                <span>Google Podcasts</span>
                <span>Audible</span>
            </section>
        </div>
    );
}
