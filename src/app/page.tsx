import ImageGame from '@/components/Game/ImageGame'
import type { Post } from '@/types'

export default async function Page() {
  const START_TAG = 'cat_ears'
  const apiUrl = `${process.env.NEXT_PUBLIC_RULE34_API}?page=dapi&s=post&q=index&tags=${encodeURIComponent(START_TAG)}&limit=1&json=1`

  const res = await fetch(apiUrl, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`External API error: ${res.status}`)
  const data: Post[] = await res.json()

  return (
    <main className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4">Rule34-Race</h1>
      <ImageGame initialPost={data[0]} />
    </main>
  )
}
