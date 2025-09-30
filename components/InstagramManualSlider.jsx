'use client';

import { useState } from 'react';

export default function InstagramManualSlider({ urls = [], visible = 3, height = 480 }) {
  const [start, setStart] = useState(0);

  const toEmbed = (u) => (u.endsWith('/') ? `${u}embed` : `${u}/embed`);

  const handlePrev = () => {
    setStart((prev) => Math.max(prev - visible, 0));
  };

  const handleNext = () => {
    setStart((prev) => Math.min(prev + visible, urls.length - visible));
  };

  const slice = urls.slice(start, start + visible);

  return (
    <div className="relative">
      <div className="grid md:grid-cols-3 gap-4">
        {slice.map((u, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 bg-white overflow-hidden"
          >
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

      {/* Controls */}
      {urls.length > visible && (
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={start === 0}
            className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-sm hover:bg-neutral-50 disabled:opacity-40"
          >
            ← Prev
          </button>
          <button
            onClick={handleNext}
            disabled={start + visible >= urls.length}
            className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-sm hover:bg-neutral-50 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
