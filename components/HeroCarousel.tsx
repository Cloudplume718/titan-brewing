"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  slides: any[];
}

export default function HeroCarousel({ slides }: HeroProps) {
  const [current, setCurrent] = useState(0);

  if (!slides || slides.length === 0) return null;

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative h-[65vh] md:h-[95vh] w-full overflow-hidden bg-gray-900 group">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* 背景图 */}
          <div className="absolute inset-0">
             {/* 🟢 安全检查：确保 image 是字符串且不是空 */}
             {slide.image && typeof slide.image === 'string' && (
                 <Image 
                    src={slide.image} 
                    alt={slide.title || "Banner"}
                    fill 
                    className="object-cover"
                    priority={index === 0} 
                    sizes="100vw"
                 />
             )}
          </div>
          
          {/* 遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

          {/* 文字内容 */}
          <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 z-20 max-w-4xl">
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight uppercase drop-shadow-md">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-10 font-light drop-shadow-sm border-l-4 border-primary pl-4">
              {slide.subtitle}
            </p>
            <Link 
                href="/shop" 
                className="bg-primary hover:bg-red-700 text-white font-bold py-4 px-10 text-lg rounded-sm uppercase tracking-widest transition-transform hover:-translate-y-1 shadow-xl"
            >
              {slide.buttonText || "立即购买"}
            </Link>
          </div>
        </div>
      ))}

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white text-white hover:text-black p-3 rounded-full transition-all backdrop-blur-sm">
        <ChevronLeft className="w-8 h-8" />
      </button>
      
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white text-white hover:text-black p-3 rounded-full transition-all backdrop-blur-sm">
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
          {slides.map((_, idx) => (
              <button 
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${current === idx ? "w-12 bg-primary" : "w-3 bg-white/70"}`}
              />
          ))}
      </div>
    </div>
  );
}