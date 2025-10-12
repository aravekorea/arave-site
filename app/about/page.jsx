"use client";

import dynamic from "next/dynamic";
import { Component } from "react";

// 클라이언트 전용 렌더 (SSR 끔)
const AraveAboutFade = dynamic(() => import("../components/AraveAboutFade"), {
  ssr: false,
  loading: () => (
    <main className="min-h-[60vh] grid place-items-center text-neutral-500">
      Loading…
    </main>
  ),
});

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
          <div className="text-neutral-900 font-semibold">About 페이지 렌더링 중 오류</div>
          <div className="text-neutral-500 text-sm mt-2">{this.state.message}</div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default function Page() {
  if (typeof window !== "undefined") console.log("[About] CSR render start");
  return (
    <ErrorBoundary>
      <AraveAboutFade />
    </ErrorBoundary>
  );
}
