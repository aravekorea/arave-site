"use client";

// ⛔ 이 라우트는 항상 동적으로 렌더 (정적 캐시/ISR 방지)
export const revalidate = 0;       // Next가 HTML을 캐시하지 않게 함
export const dynamic = "force-dynamic";

import dynamicImport from "next/dynamic";
import { Component } from "react";

// 🔒 클라이언트 전용 렌더 (SSR 비활성화)
const AraveAboutFade = dynamicImport(() => import("../components/AraveAboutFade"), {
  ssr: false,
  loading: () => (
    <main className="min-h-[60vh] grid place-items-center text-neutral-500">
      About Loading… v4
    </main>
  ),
});

// 간단 에러 바운더리
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, message: err?.message || "Render error" };
  }
  componentDidCatch(err, info) {
    if (typeof window !== "undefined") console.error("[About ErrorBoundary]", err, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-[60vh] grid place-items-center text-center px-6">
          <div className="text-neutral-900 font-semibold">About 렌더링 오류 (v4)</div>
          <div className="text-neutral-500 text-sm mt-2">{this.state.message}</div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default function Page() {
  if (typeof window !== "undefined") console.log("[About] CSR render start (v4)");
  return (
    <ErrorBoundary>
      <div className="sr-only">About v4 marker</div>
      <AraveAboutFade />
    </ErrorBoundary>
  );
}
