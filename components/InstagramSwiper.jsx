'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// 인스타 oEmbed (클라이언트 전용)
const InstagramEmbed = dynamic(
  () => import('react-social-media-embed').then(m => m.InstagramEmbed),
  { ssr: false }
);

function IgCard({ url }) {
  return (
    <div className="relative rounded-2xl bg-white border border-neutral-200 overflow-hidden select-none">
      {/* iframe은 포인터 이벤트를 막아 스와이프가 안 잡힘 → 아래에 pointer-events: none */}
      <div className="p-2 sm:p-3 pointer-events-none">
        <InstagramEmbed url={url} width="100%" />
      </div>

      {/* 전체 오버레이: 드래그/스와이프는 이 레이어가 받고, 클릭 시 인스타로 이동 */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 z-10"
        aria-label="Open on Instagram"
      />

      {/* 하단 CTA (접근성/가이드용) */}
      <div className="px-3 pb-3">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="block text-center text-xs md:text-sm rounded-xl px-3 py-2 bg-neutral-100 hover:bg-neutral-200 transition"
        >
          인스타그램에서 보기 →
        </a>
      </div>
    </div>
  );
}

export default function InstagramSwiper({ urls = [] }) {
  const [swiper, setSwiper] = useState(null);
  if (!urls?.length) return null;

  return (
    // 데스크톱: 호버 시 자동 슬라이드 시작, 벗어나면 정지
    <div
      onMouseEnter={() => swiper?.autoplay?.start()}
      onMouseLeave={() => swiper?.autoplay?.stop()}
    >
      <Swiper
        modules={[Pagination, FreeMode, Autoplay]}
        onSwiper={(s) => {
          setSwiper(s);
          // 자동재생 기본은 꺼두고(hover 때만 동작)
          s.autoplay?.stop();
        }}
        freeMode={{ enabled: true, momentum: true }}
        grabCursor
        slidesPerView={1.02}          // 모바일 거의 풀폭
        spaceBetween={12}
        pagination={{ clickable: true }}
        autoplay={{ delay: 1600, disableOnInteraction: false }}
        breakpoints={{
          640:  { slidesPerView: 2.05, spaceBetween: 14 }, // 태블릿
          1024: { slidesPerView: 3.05, spaceBetween: 16 }, // 데스크톱
        }}
        className="select-none"
      >
        {urls.map((u, i) => (
          <SwiperSlide key={i}>
            <IgCard url={u} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}