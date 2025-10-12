'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// ✅ 브라우저 전용 컴포넌트는 SSR 비활성화(클라이언트에서만 렌더)
const InstagramSwiper = dynamic(
  () => import('./components/InstagramSwiper'), // 경로 주의: app/page.js 기준
  {
    ssr: false,
    loading: () => (
      <div className="h-[480px] rounded-2xl bg-neutral-100 border border-neutral-200 grid place-items-center text-neutral-500">
        Loading…
      </div>
    ),
  }
);

// 이미지 안전 로더
function SafeImg({ src, alt, className, fallback }) {
  const [fail, setFail] = useState(false);
  if (fail) {
    return (
      <div className={`grid place-items-center bg-neutral-100 ${fallback || ''}`}>
        <div className="text-neutral-400 text-sm">{src} 를 /public 에 추가하세요</div>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setFail(true)} />;
}

export default function AraveLanding() {
  const dict = {
    KR: {
      heroTitle: (
        <>
          아라베의 시작
          <br />
          ARA Night Mist
        </>
      ),
      heroDesc:
        '잠들기 전, 하루의 속도를 낮추는 간결한 나이트 리추얼. 아라베는 미니멀한 성분과 차분한 향으로, 피부와 마음에 고요를 남깁니다.',
      cta1: '와디즈 알림 신청',
      cta2: '제품 보러가기',
      release: '출시 예정: 2025년 12월',
      news: '아라베 소식 & 언급',
      newsDesc: '출시, 와디즈, 체험단 등 모든 소식은 인스타그램에서 확인하세요.',
      igPosts: [
        'https://www.instagram.com/p/DO8ZQPPkoUy/',
        'https://www.instagram.com/p/BBBBBBB/',
        'https://www.instagram.com/p/CCCCCCC/',
        'https://www.instagram.com/p/DDDDDDD/',
        'https://www.instagram.com/p/EEEEEEE/',
        'https://www.instagram.com/p/FFFFFFF/',
        'https://www.instagram.com/p/GGGGGGG/',
        'https://www.instagram.com/p/HHHHHHH/',
        'https://www.instagram.com/p/IIIIIII/',
        'https://www.instagram.com/p/JJJJJJJ/',
      ],
      reviewTitle: '첫 반응',
      reviews: [
        { quote: '향이 진득하게 남지 않아 좋았어요. 밤 루틴에 부담이 없어요.', author: '서*현' },
        { quote: '분사감이 섬세해서 스킨케어 사이에 쓰기 좋네요.', author: '김*윤' },
        { quote: '침구 향이 아니라 피부에 얹히는 느낌이라 더 편안했어요.', author: '이*민' },
      ],
    },
    EN: {
      heroTitle: (
        <>
          Beginning of ARAVE
          <br />
          ARA Night Mist
        </>
      ),
      heroDesc:
        'A simple night ritual to slow down the pace before sleep. ARAVE leaves calmness on your skin and mind with minimal ingredients and soothing scents.',
      cta1: 'Wadiz Notify Me',
      cta2: 'See Product',
      release: 'Planned Launch: Dec 2025',
      news: 'ARAVE News & Mentions',
      newsDesc: 'Check out all updates on Instagram: launch, Wadiz, and testers.',
      igPosts: [
        'https://www.instagram.com/p/DO8ZQPPkoUy/',
        'https://www.instagram.com/p/LLLLLLL/',
        'https://www.instagram.com/p/MMMMMMM/',
        'https://www.instagram.com/p/NNNNNNN/',
        'https://www.instagram.com/p/OOOOOOO/',
        'https://www.instagram.com/p/PPPPPPP/',
        'https://www.instagram.com/p/QQQQQQQ/',
        'https://www.instagram.com/p/RRRRRRR/',
        'https://www.instagram.com/p/SSSSSSS/',
        'https://www.instagram.com/p/TTTTTTT/',
      ],
      reviewTitle: 'Early Reactions',
      reviews: [
        { quote: 'Subtle scent that doesn’t linger—perfect for nights.', author: 'S. Seo' },
        { quote: 'Fine mist works nicely between skincare steps.', author: 'Y. Kim' },
        { quote: 'Calm on skin; it feels like part of my ritual.', author: 'M. Lee' },
      ],
    },
  };

  const [lang, setLang] = useState('KR');
  const t = dict[lang];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900">
      {/* Header (About 링크 포함) */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/80 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold tracking-[0.2em] text-xl">
            <Link href="/">ARAVE</Link>
          </div>

          <div className="flex items-center gap-6">
            {/* Nav */}
            <nav className="hidden md:flex items-center gap-5 text-sm text-neutral-700">
              <Link className="hover:opacity-70" href="/">Home</Link>
              <Link className="hover:opacity-70" href="/about">About</Link>
            </nav>

            {/* Lang Toggle */}
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setLang('KR')}
                className={`px-3 py-1.5 rounded-xl hover:bg-black/5 ${lang === 'KR' ? 'font-bold' : ''}`}
              >
                KR
              </button>
              <span className="opacity-40">/</span>
              <button
                onClick={() => setLang('EN')}
                className={`px-3 py-1.5 rounded-xl hover:bg-black/5 ${lang === 'EN' ? 'font-bold' : ''}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Background */}
      <div className="w-full h-[55vh] min-h-[320px]">
        <SafeImg
          src="/mainlogo.png"
          alt="ARAVE Hero"
          className="w-full h-full object-cover"
          fallback="w-full h-[55vh] min-h-[320px]"
        />
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-neutral-600 max-w-prose">{t.heroDesc}</p>
            <div className="mt-6 flex gap-3">
              <a
                className="inline-flex items-center justify-center font-medium transition-all rounded-2xl px-5 py-2.5 text-sm bg-[#5A4633] hover:bg-[#4E3D2D] text-white focus:outline-none focus:ring-2 focus:ring-[#5A4633]/20"
                href="https://docs.google.com/forms/d/e/1FAIpQLSd9Ukamdx3iNsjK5z1fUquZ0SoJBQNAaYaSIPRab0g6R6XdJg/viewform?usp=header"
                target="_blank"
                rel="noreferrer"
              >
                {t.cta1}
              </a>
              <a
                className="inline-flex items-center justify-center font-medium transition-all rounded-2xl px-5 py-2.5 text-sm border border-neutral-300 bg-white text-[#5A4633] hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#5A4633]/20"
                href="#product"
              >
                {t.cta2}
              </a>
            </div>
            <p className="mt-3 text-xs text-neutral-500">{t.release}</p>
          </div>

          {/* Product Mock */}
          <div className="rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-sm">
            <div className="w-full h-[420px] grid place-items-center bg-white">
              <SafeImg
                src="/pd.png"
                alt="ARAVE Sleeping Mist mockup"
                className="object-contain w-full h-full p-24" // p-25 → p-24 로 수정
                fallback="w-full h-full"
              />
            </div>
            <div className="p-6 text-center text-neutral-600">
              <div className="font-medium tracking-wide text-neutral-900">ARAVE</div>
              <div className="opacity-60 mt-1">ARA Night Mist 80ml</div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="mb-4 text-xs uppercase tracking-wide text-neutral-500">
          {t.news}
        </div>
        <p className="mb-6 text-sm text-neutral-600">{t.newsDesc}</p>
        <InstagramSwiper urls={t.igPosts} height={480} />
      </section>

      {/* Review Teasers */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h3 className="text-base font-semibold mb-4">{t.reviewTitle}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {t.reviews.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-700"
            >
              <p className="leading-relaxed">“{r.quote}”</p>
              <p className="mt-2 text-xs text-neutral-500">— {r.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-neutral-600 grid md:grid-cols-2 gap-4">
          <div>
            <div className="font-semibold tracking-[0.2em] text-neutral-900">ARAVE</div>
            <p className="mt-2 max-w-prose">Beyond Skincare, A Healing Ritual.</p>
          </div>
          <div className="flex items-start md:justify-end gap-3">
            <a
              className="inline-flex items-center gap-1 hover:text-neutral-900"
              href="https://www.instagram.com/aravekorea/"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <span>📸</span> Instagram
            </a>
            <a
              className="hover:text-neutral-900"
              href="https://www.wadiz.kr/web/campaign/detail/363309"
              target="_blank"
              rel="noreferrer"
            >
              Wadiz
            </a>
            <a className="hover:text-neutral-900" href="mailto:aravekorea@gmail.com">
              Contact
            </a>
          </div>
        </div>
        <div className="text-xs text-neutral-500 text-center pb-6">
          © {new Date().getFullYear()} ARAVE. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
