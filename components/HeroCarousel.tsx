"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  _id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  if (!slides || slides.length === 0) return null;

  return (
    // 🟢 修改点：手机端高度调整为 h-[70vh]，电脑端 h-screen
    <div className="relative h-[70vh] md:h-screen w-full overflow-hidden bg-gray-900 group">
      
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          
          {/* 🟢 修改点：加深了遮罩层，从底部往上渐变，防止文字看不清 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* 🟢 核心修改点：内容布局适配 */}
          <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-center md:items-start text-center md:text-left px-6 pb-20 md:pb-0 md:pl-20 max-w-7xl mx-auto">
            
            <h2 className="text-white text-3xl md:text-6xl font-heading font-bold mb-2 md:mb-4 drop-shadow-lg transform transition-transform duration-700 translate-y-0">
              {slide.title}
            </h2>
            
            <p className="text-gray-200 text-sm md:text-2xl mb-6 md:mb-8 font-light tracking-wide drop-shadow-md">
              {slide.subtitle}
            </p>
            
            <Link
              href="/shop"
              className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest transition-all transform hover:scale-105 shadow-lg shadow-red-900/50"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}

      {/* 左右切换按钮 (只在电脑端显示，手机端隐藏以防遮挡) */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-primary/80 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-primary/80 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 底部指示点 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-primary w-8" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}