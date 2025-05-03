import { Post } from "@/types";

export async function fetchPostByTagViaProxy(tag: string): Promise<Post> {
  const res = await fetch(`/api/rule34?tag=${encodeURIComponent(tag)}`)
  if (!res.ok) throw new Error(`Proxy API error: ${res.status}`)

  const data: Post[] = await res.json()
  if (data.length === 0) throw new Error('No images found for tag')
  return data[0]
}

export async function fetchPostByTagDirectly(tag: string): Promise<Post> {
  const url = `${process.env.NEXT_PUBLIC_RULE34_API}?page=dapi&s=post&q=index&tags=${encodeURIComponent(tag)}&limit=1&json=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Rule34 API error: ${res.status}`)

  const data: Post[] = await res.json()
  if (data.length === 0) throw new Error('No images found for tag')
  return data[0]
}