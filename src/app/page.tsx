// src/app/page.tsx
import ImageGame from '@/components/ImageGame'

interface Post { id: number; file_url: string; tags: string }

export default async function Page() {
  const START_TAG = 'cat_ears'
  const apiUrl = `${process.env.NEXT_PUBLIC_RULE34_API}` +
    `?page=dapi&s=post&q=index&tags=${encodeURIComponent(START_TAG)}` +
    `&limit=1&json=1`

  const res = await fetch(apiUrl, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`External API error: ${res.status}`)
  const data: Post[] = await res.json()

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Rule34-Race</h1>
      <ImageGame initialPost={data[0]} />
    </main>
  )
}
