'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  _id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const length = slides.length;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delay = 5000;

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrent((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1)),
      delay
    );
    return () => resetTimeout();
  }, [current, length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); 
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) nextSlide();
    else if (distance < -minSwipeDistance) prevSlide();
  };

  if (!Array.isArray(slides) || slides.length <= 0) return null;

  return (
    // 🟢 修改高度：
    // 手机端：h-[600px] (保持原样)
    // 电脑端：md:h-[100vh] (拉高，占屏幕100%)
    <section 
      className="relative h-[600px] md:h-[100vh] min-h-[600px] w-full overflow-hidden bg-gray-900 group"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {index === current && (
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover brightness-50"
                priority
              />
            </div>
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-sm md:text-lg font-bold uppercase tracking-[0.2em] mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {slide.subtitle}
            </h2>
            <h1 className="text-4xl md:text-7xl font-heading font-bold mb-8 uppercase tracking-wide animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              {slide.title}
            </h1>
            <Link 
              href="/shop" 
              className="bg-primary hover:bg-red-700 text-white font-bold py-4 px-10 rounded-sm transition-all duration-300 uppercase tracking-widest text-sm animate-in fade-in zoom-in duration-700 delay-300 pointer-events-auto"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}

      {/* 箭头 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 p-3 rounded-full text-white hover:bg-primary transition-colors opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 p-3 rounded-full text-white hover:bg-primary transition-colors opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* 指示点 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}