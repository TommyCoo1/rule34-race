import { fetchJson } from "@/libs/apiClient";
import { Post as ImagePost } from "@/types";

export async function fetchPostByTagViaProxy(tag: string): Promise<ImagePost> {
  const data = await fetchJson<ImagePost[]>(`/api/rule34?tag=${encodeURIComponent(tag)}`)
  if (data.length === 0) {
    throw new Error('No images found for tag')
  }
  return data[0]
}

export async function fetchPostByTagDirectly(tag: string): Promise<ImagePost> {
  const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${encodeURIComponent(tag)}&limit=1&json=1`
  const data = await fetchJson<ImagePost[]>(url)
  if (data.length === 0) {
    throw new Error('No images found for tag')
  }
  return data[0]
}