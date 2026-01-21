"use client"; // 这是一个客户端组件

import { useState } from "react";
import Image from "next/image";
import { PlayCircle, X } from "lucide-react";

export default function VideoModal() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div 
          onClick={() => setIsVideoOpen(true)}
          className="h-96 relative rounded-sm overflow-hidden shadow-2xl group cursor-pointer border border-gray-200"
      >
          <Image 
              src="/images/video-cover.jpg" 
              alt="Brewing Video Cover"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                  <PlayCircle className="relative w-20 h-20 text-white drop-shadow-md group-hover:scale-110 transition-transform z-10" />
              </div>
          </div>
      </div>

      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-200">
            <button 
                onClick={(e) => { e.stopPropagation(); setIsVideoOpen(false); }}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
                <X className="w-10 h-10" />
            </button>

            <div className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
                <video 
                    src="/videos/intro.mp4" 
                    className="w-full h-full object-contain"
                    controls 
                    autoPlay 
                >
                    您的浏览器不支持视频播放。
                </video>
            </div>
        </div>
      )}
    </>
  );
}