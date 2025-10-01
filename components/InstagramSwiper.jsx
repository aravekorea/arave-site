'use client';

import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// 인스타 oEmbed 컴포넌트 (클라이언트 렌더 전용)
const InstagramEmbed = dynamic(
  () => import('react-social-media-embed').then(m => m.InstagramEmbed),
  { ssr: false }
);

function IgCard({ url }) {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200 overflow-hidden">
      <div className="p-2 sm:p-3">
        {/* width만 전달하면 콘텐츠 높이는 자동으로 맞춰집니다 */}
        <InstagramEmbed url={url} width="100%" />
      </div>

      {/* 하단 CTA - 임베드가 짧게 나오는 경우를 대비한 가이드 */}
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
  if (!urls?.length) return null;

  return (
    <Swiper
      modules={[Pagination, FreeMode]}
      freeMode={{ enabled: true, momentum: true }}
      grabCursor
      slidesPerView={1.02}                 // 모바일 거의 풀폭
      spaceBetween={12}
      pagination={{ clickable: true }}
      breakpoints={{
        640:  { slidesPerView: 2.05, spaceBetween: 14 },  // 태블릿
        1024: { slidesPerView: 3.05, spaceBetween: 16 },  // 데스크톱
      }}
    >
      {urls.map((u, i) => (
        <SwiperSlide key={i}>
          <IgCard url={u} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}