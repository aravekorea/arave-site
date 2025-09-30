'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function InstagramSwiper({ urls = [], height = 480 }) {
  const [swiper, setSwiper] = useState(null);
  const [hover, setHover] = useState(false);
  const [dir, setDir] = useState(null);
  const frameRef = useRef(null);

  const toEmbed = (u) => (u.endsWith('/') ? `${u}embed` : `${u}/embed`);

  // 호버 중이면 매 프레임마다 슬라이드
  useEffect(() => {
    if (!hover || !dir || !swiper) return;

    const step = () => {
      if (dir === 'left') swiper.slidePrev(700);   // ← 방향, 속도 300ms
      if (dir === 'right') swiper.slideNext(700);  // → 방향
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [hover, dir, swiper]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDir(null); }}
      onMouseMove={(e) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        if (x < width / 3) setDir('left');
        else if (x > (width * 2) / 3) setDir('right');
        else setDir(null);
      }}
    >
      <Swiper
        onSwiper={setSwiper}
        spaceBetween={24}
        slidesPerView={3.2}   // 3개 정확히 + 양옆 살짝
        centeredSlides={true}
        loop={true}
      >
        {urls.map((u, i) => (
          <SwiperSlide key={i}>
            <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
              <iframe
                src={toEmbed(u)}
                width="100%"
                height={height}
                frameBorder="0"
                scrolling="no"
                allow="encrypted-media; clipboard-write"
                title={`Instagram post ${i + 1}`}
                className="pointer-events-none"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
