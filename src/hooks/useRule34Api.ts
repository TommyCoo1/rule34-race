import { Post } from '@/types'

export async function fetchPostByTag(tag: string): Promise<Post> {
  const url = `${process.env.NEXT_PUBLIC_RULE34_API}?page=dapi&s=post&q=index&tags=${encodeURIComponent(tag)}&limit=1&json=1`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Status ${res.status}`)
  const data: Post[] = await res.json()
  if (data.length === 0) throw new Error('No images found for tag')
  return data[0]
}
