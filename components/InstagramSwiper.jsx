'use client';

import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

/** Instagram 카드: 모바일 크게, 가로 스와이프, 이미지 실패 시 대체 카드 */
function IgCard({ url }) {
  // /p/SHORTCODE/ 형태에서 shortcode만 추출
  const shortcode = useMemo(() => {
    try {
      const m = url.match(/\/p\/([^/]+)/);
      return m ? m[1] : null;
    } catch { return null; }
  }, [url]);

  // 인스타는 공개 계정/게시물일 경우 /media/?size=l 로 정적 이미지 제공
  const img = shortcode ? `https://www.instagram.com/p/${shortcode}/media/?size=l` : null;

  return (
    <a href={url} target="_blank" rel="noreferrer" className="block group">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-200">
        {/* 4:5 비율(인스타 기본) - 화면 너비에 맞춰 자동 확대 */}
        <div className="aspect-[4/5]">
          {img ? (
            <img
              src={img}
              alt="Instagram post"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : null}
          {/* 이미지 실패/비공개 대응용 대체 뷰 */}
          {!img && (
            <div className="w-full h-full grid place-items-center text-neutral-500 text-sm">
              Open on Instagram
            </div>
          )}
        </div>

        {/* 하단 오버레이 CTA */}
        <div className="absolute inset-x-0 bottom-0 p-2">
          <div className="rounded-xl px-3 py-2 text-center text-xs md:text-sm
                          bg-white/90 backdrop-blur shadow-sm
                          group-hover:bg-white">
            인스타그램에서 보기 →
          </div>
        </div>
      </div>
    </a>
  );
}

export default function InstagramSwiper({ urls = [] }) {
  if (!urls?.length) return null;

  return (
    <Swiper
      modules={[Pagination, FreeMode]}
      freeMode={{ enabled: true, momentum: true }}
      grabCursor
      // 모바일은 1.1장(거의 풀폭), 태블릿 2.2장, 데스크톱 3.2장
      slidesPerView={1.1}
      spaceBetween={12}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 2.2, spaceBetween: 14 },
        1024:{ slidesPerView: 3.2, spaceBetween: 16 },
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