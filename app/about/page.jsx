"use client";

import dynamic from "next/dynamic";
import { Component } from "react";

// 클라이언트 전용 렌더 (SSR 비활성화)
const AraveAboutFade = dynamic(() => import("../components/AraveAboutFade"), {
  ssr: false,
  loading: () => (
    <main className="min-h-[60vh] grid place-items-center text-neutral-500">
      About Loading… (v3)
    </main>
  ),
});

// 런타임 오류 잡는 간단 에러 바운더리
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, message: err?.message || "Render error" };
  }
  componentDidCatch(err, info) {
    if (typeof window !== "undefined") {
      console.error("[About ErrorBoundary]", err, info);
    }
  }
  render() {
    if (this.state.hasError) {
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

export default function Page() {
  if (typeof window !== "undefined") {
    console.log("[About] CSR render start (v3)");
  }
  return (
    <ErrorBoundary>
      <AraveAboutFade />
    </ErrorBoundary>
  );
}
