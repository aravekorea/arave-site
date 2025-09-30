// C:\Users\User\arave-site\components\InstagramManualGrid.jsx
'use client';

export default function InstagramManualGrid({ urls = [], height = 480 }) {
  if (!urls.length) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white/80 p-6 text-sm text-neutral-600">
        인스타그램 게시물 링크를 추가해 주세요.
      </div>
    );
  }
  const toEmbed = (u) => (u.endsWith('/') ? `${u}embed` : `${u}/embed`);
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {urls.map((u, i) => (
        <div key={i} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
          <iframe
            src={toEmbed(u)}
            width="100%"
            height={height}
            frameBorder="0"
            scrolling="no"
            allow="encrypted-media; clipboard-write"
            title={`Instagram post ${i + 1}`}
          />
        </div>
      ))}
    </div>
  );
}
