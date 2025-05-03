import { useState } from 'react'
import { Post } from '@/types'
import { fetchPostByTagViaProxy } from './useRule34Api'

export function useGame(initialPost: Post) {
  const [post, setPost] = useState<Post>(initialPost)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchByTag = async (tag: string) => {
    setLoading(true)
    setError(null)
    try {
      const newPost = await fetchPostByTagViaProxy(tag)
      setPost(newPost)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { post, loading, error, fetchByTag }
}
