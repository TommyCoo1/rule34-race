import { defaultUrl } from "@/app/api/rule34/route";
import { fetchJson } from "@/lib/apiClient";
import { Post as Post } from "@/types";

export async function fetchPostByTagViaProxy(tag: string): Promise<Post> {
  const data = await fetchJson<Post[]>(`/api/rule34?tags=${encodeURIComponent(tag)}&limit=1`)
  if (data.length === 0) {
    throw new Error('No images found for tag')
  }
  return data[0]
}

export async function fetchRndPostByTagViaProxy(tag: string): Promise<Post | null> {// not needed anymore, because in route.ts we call random api
  const data = await fetchJson<Post[]>(`/api/rule34?tags=${encodeURIComponent(tag)}&limit=10`)
  if (data.length === 0) {
    throw new Error('No images found for tag')
  }
  const randomIndex = Math.floor(Math.random() * data.length)
  return data[randomIndex]
}
// TODO getNeighbourPosts() kann ähnlich implementiert werden – z.B. alle Tags aktuell Post nehmen --> zufällig einen davon anfragen, Aggregation in deadEndOptions

export async function fetchPostByTagDirectly(tag: string): Promise<Post> {
  const url = `${defaultUrl}&tags=${encodeURIComponent(tag)}&limit=1`
  const data = await fetchJson<Post[]>(url)
  if (data.length === 0) {
    throw new Error('No images found for tag')
  }
  return data[0]
}