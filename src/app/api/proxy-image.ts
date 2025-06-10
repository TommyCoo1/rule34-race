import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const imageUrl = req.query.url as string;
  if (!imageUrl) {
    res.status(400).send('Fehlende URL');
    return;
  }
  // Fetch die Bild-URL (Web-ReadableStream)
  const imageRes = await fetch(imageUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Referer': 'https://rule34.xxx/'
    },
    redirect: 'follow'
  });
  if (!imageRes.ok || !imageRes.body) {
    res.status(imageRes.status).end(`Fehler: ${imageRes.status}`);
    return;
  }
  const contentType = imageRes.headers.get('content-type') || 'application/octet-stream';
  res.setHeader('Content-Type', contentType);

  const reader = imageRes.body.getReader();
  // Schleife, um alle Chunks zu lesen und weiterzuleiten
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(Buffer.from(value));
  }
  res.end();
}
