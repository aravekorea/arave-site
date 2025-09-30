// app/api/instagram/route.js
export const revalidate = 3600; // 1시간 캐시

export async function GET() {
  try {
    const token = process.env.IG_TOKEN; // .env에 저장
    if (!token) {
      return new Response(JSON.stringify({ error: 'IG_TOKEN missing' }), { status: 500 });
    }

    const fields = [
      'id',
      'media_type',
      'media_url',
      'thumbnail_url',
      'permalink',
      'caption',
      'timestamp',
    ].join(',');

    // Basic Display API: 최근 미디어
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}&limit=6`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ error: 'IG API error', detail: text }), { status: 500 });
    }
    const data = await res.json();

    return new Response(JSON.stringify({ items: data.data ?? [] }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error', detail: String(e) }), { status: 500 });
  }
}
