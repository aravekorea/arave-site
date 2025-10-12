"use client";
import dynamic from "next/dynamic";
import { Component } from "react";
const AraveAboutFade = dynamic(() => import("../components/AraveAboutFade"), {
  ssr:false,
  loading: () => (
    <main className="min-h-[60vh] grid place-items-center text-neutral-500">
      About Loading…
    </main>
  ),
});
class ErrorBoundary extends Component {
  constructor(p){super(p); this.state={hasError:false,message:""};}
  static getDerivedStateFromError(e){return {hasError:true,message:e?.message||"Render error"};}
  componentDidCatch(e,i){if(typeof window!=="undefined") console.error("[About ErrorBoundary]",e,i);}
  render(){return this.state.hasError
    ? (<main className="min-h-[60vh] grid place-items-center text-center px-6">
         <div className="text-neutral-900 font-semibold">About 렌더링 오류</div>
         <div className="text-neutral-500 text-sm mt-2">{this.state.message}</div>
       </main>)
    : this.props.children;}
}
export default function ClientAbout(){
  return (<ErrorBoundary><AraveAboutFade/></ErrorBoundary>);
}
