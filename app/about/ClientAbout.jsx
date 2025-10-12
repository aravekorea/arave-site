"use client";

import { motion } from "framer-motion";
import { Component } from "react";

// ----- 에러 바운더리 -----
class ErrorBoundary extends Component {
  constructor(props){ super(props); this.state={ hasError:false, message:"" }; }
  static getDerivedStateFromError(err){ return { hasError:true, message: err?.message || "Render error" }; }
  componentDidCatch(err, info){ if (typeof window !== "undefined") console.error("[About ErrorBoundary]", err, info); }
  render(){
    if (this.state.hasError){
      return (
        <main className="min-h-[60vh] grid place-items-center text-center px-6">
          <div className="text-neutral-900 font-semibold">About 렌더링 오류</div>
          <div className="text-neutral-500 text-sm mt-2">{this.state.message}</div>
        </main>
      );
    }
    return this.props.children;
  }
}

// ----- 콘텐츠 데이터 -----
const sections = [
  {
    id: "intro",
    ko: [
      "Essential Beauty, Essential Value.",
      "아름다움은 많을 필요가 없습니다.",
      "오직 필요한 순간에, 필요한 것만 남기는 것.",
      "그것이 ARAVE의 방식입니다.",
    ],
    en: [
      "Essential Beauty, Essential Value.",
      "Beauty doesn’t need to be excessive.",
      "Keep only what truly serves the moment.",
      "This is the ARAVE way.",
    ],
  },
  {
    id: "why-night",
    ko: [
      "낮에는 해야 할 역할이 많습니다.",
      "하지만 밤만큼은, 다시 ‘하나의 나’로 돌아오는 시간입니다.",
      "ARAVE는 그 순간에 집중합니다.",
    ],
    en: ["In daylight, we play many roles.", "At night, we return to ourselves.", "ARAVE exists for that moment."],
  },
  {
    id: "ritual",
    ko: [
      "미스트를 뿌리는 행동 하나에도 의식(ritual)이 깃들 수 있습니다.",
      "향이 퍼지고, 호흡이 천천히 정돈됩니다.",
      "그 짧은 호흡이 하루를 정리합니다.",
    ],
    en: [
      "Even a single spray can become a ritual.",
      "Scent floats, breath slows, thoughts settle.",
      "In that brief exhale, the day finds closure.",
    ],
  },
  {
    id: "scent",
    ko: ["향은 꾸미기 위한 요소가 아닙니다.", "감정을 가라앉히는 정서의 속도입니다.", "ARAVE의 향은 조용히 오래 남습니다."],
    en: ["Scent isn’t a decoration.", "It is the tempo of emotion.", "ARAVE scents linger quietly and persistently."],
  },
  {
    id: "minimal",
    ko: [
      "미니멀리즘은 덜어내는 것이 아니라, 남겨야 할 것을 고르는 과정입니다.",
      "ARAVE의 모든 디자인은 ‘밤에 필요한가?’에서 시작됩니다.",
    ],
    en: ["Minimalism isn’t removal; it’s precise selection.", "Every design begins with: Does this serve the night?"],
  },
  {
    id: "founder",
    ko: [
      "밤이 오면, 하루 중 가장 조용한 대화가 시작됩니다.",
      "그때 가장 먼저 나를 위로해주는 무언가가 있었으면 했습니다.",
      "그래서 ARAVE를 만들었습니다. — Founder, J.D.Y",
    ],
    en: [
      "When night falls, the quietest conversation begins.",
      "I wanted something to comfort me before sleep.",
      "That is why ARAVE was created. — Founder, J.D.Y",
    ],
  },
  {
    id: "future",
    ko: [
      "ARAVE는 낮을 위한 화장품을 만들지 않습니다.",
      "모든 제품은 밤의 감정에서 출발합니다.",
      "우리는 앞으로도 밤을 위한 라이프스타일만 제안합니다.",
    ],
    en: [
      "ARAVE does not create for daytime.",
      "Every product begins from the emotion of night.",
      "We will continue crafting only for the night ritual.",
    ],
  },
];

// ----- 애니메이션 설정 -----
const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

// 시스템 '움직임 감소' 설정 감지
const prefersReduced =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Section({ item, index }) {
  return (
    <section
      id={item.id}
      className="relative min-h-[100svh] md:min-h-screen w-full grid place-items-center px-6 py-24 bg-[#FAF9F6]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.06),transparent_60%)]" />

      <motion.div
        initial={prefersReduced || index === 0 ? "show" : "hidden"}
        animate={prefersReduced ? "show" : undefined}
        whileInView={prefersReduced ? undefined : "show"}
        viewport={prefersReduced ? undefined : { once: true, amount: 0.2 }}
        variants={fade}
        className="relative mx-auto max-w-4xl text-center"
      >
        {/* Korean */}
        <div className="space-y-3 md:space-y-4">
          {item.ko.map((line, i) => (
            <motion.p
              key={`ko-${index}-${i}`}
              variants={fade}
              className="text-[clamp(18px,2.2vw,28px)] leading-relaxed tracking-[-0.01em] text-neutral-900"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 md:my-8 opacity-25">
          <div className="mx-auto h-px w-24 bg-neutral-400" />
        </div>

        {/* English */}
        <div className="space-y-2">
          {item.en.map((line, i) => (
            <motion.p
              key={`en-${index}-${i}`}
              variants={fade}
              className="text-[clamp(13px,1.4vw,16px)] leading-relaxed tracking-[0.02em] text-neutral-500"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default function ClientAbout() {
  return (
    <ErrorBoundary>
      <main className="bg-[#FAF9F6] text-neutral-900">
        <div className="pt-4 md:pt-8" />
        {/* ✅ 모바일에서도 항상 보이는 네비게이션 (hidden 제거) */}
        <header className="sticky top-0 z-10 backdrop-blur bg-[#FAF9F6]/70 border-b border-neutral-200/50">
          <div className="mx-auto max-w-5xl px-6 py-3 flex items-center justify-between">
            <a href="/" className="font-medium tracking-[0.18em] text-sm md:text-base">ARAVE</a>
            <nav className="flex items-center gap-4 text-xs text-neutral-700">
              <a href="/" className="hover:opacity-70">Home</a>
              <a href="/about" className="hover:opacity-70">About</a>
              <span className="hidden sm:inline opacity-40">|</span>
              <a href="#intro" className="hover:opacity-70">Intro</a>
              <a href="#why-night" className="hover:opacity-70">Night</a>
              <a href="#ritual" className="hover:opacity-70">Ritual</a>
            </nav>
          </div>
        </header>

        {sections.map((s, idx) => (
          <Section key={s.id} item={s} index={idx} />
        ))}

        <footer className="border-t border-neutral-200/60">
          <div className="mx-auto max-w-5xl px-6 py-10 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} ARAVE — Essential Beauty, Essential Value.
          </div>
        </footer>
      </main>
    </ErrorBoundary>
  );
}
