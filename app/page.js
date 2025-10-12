'use client';

export default function Home() {
  return (
    <main style={{minHeight:'100vh', background:'#FAF9F6', color:'#111'}}>
      <header style={{
        position:'sticky', top:0, zIndex:20, backdropFilter:'blur(6px)',
        background:'rgba(255,255,255,0.8)', borderBottom:'1px solid #e5e5e5'
      }}>
        <div style={{
          maxWidth:960, margin:'0 auto', padding:'12px 16px',
          display:'flex', alignItems:'center', justifyContent:'space-between'
        }}>
          <div style={{letterSpacing:'0.2em', fontWeight:600}}>ARAVE</div>
          <nav style={{display:'flex', gap:16, fontSize:14}}>
            <a href="/" style={{opacity:0.8}}>Home</a>
            <a href="/about" style={{opacity:0.8}}>About</a>
          </nav>
        </div>
      </header>

      <section style={{maxWidth:960, margin:'0 auto', padding:'40px 16px'}}>
        <h1 style={{fontSize:28, fontWeight:600, lineHeight:1.3, marginBottom:12}}>
          아라베의 시작<br/>ARA Night Mist
        </h1>
        <p style={{color:'#555', maxWidth:680}}>
          잠들기 전, 하루의 속도를 낮추는 간결한 나이트 리추얼.
          아라베는 미니멀한 성분과 차분한 향으로, 피부와 마음에 고요를 남깁니다.
        </p>
        <div style={{marginTop:16, display:'flex', gap:12}}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd9Ukamdx3iNsjK5z1fUquZ0SoJBQNAaYaSIPRab0g6R6XdJg/viewform?usp=header"
            target="_blank" rel="noreferrer"
            style={{
              display:'inline-flex', padding:'10px 14px', borderRadius:12,
              background:'#5A4633', color:'#fff', textDecoration:'none'
            }}
          >와디즈 알림 신청</a>
          <a
            href="#product"
            style={{
              display:'inline-flex', padding:'10px 14px', borderRadius:12,
              border:'1px solid #ddd', background:'#fff', color:'#5A4633', textDecoration:'none'
            }}
          >제품 보러가기</a>
        </div>
      </section>

      <footer style={{borderTop:'1px solid #e5e5e5', background:'rgba(255,255,255,0.8)'}}>
        <div style={{
          maxWidth:960, margin:'0 auto', padding:'20px 16px',
          fontSize:12, color:'#777', textAlign:'center'
        }}>
          © 2025 ARAVE. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
