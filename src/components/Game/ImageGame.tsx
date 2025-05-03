// src/components/ImageGame.tsx
'use client'

import { useState } from 'react'
import type { Post } from '@/types'


interface Props {
  initialPost: Post
}

export default function ImageGame({ initialPost }: Props) {
  const [post, setPost] = useState<Post>(initialPost)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchByTag = async (tag: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/handler?tags=${encodeURIComponent(tag)}`)
      if (!res.ok) throw new Error(`Status ${res.status}`)
      const data: Post[] = await res.json()
      if (data.length === 0) throw new Error('Keine Bilder gefunden')
      setPost(data[0])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const tags = post.tags.split(' ')

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {loading && <p>Lädt…</p>}
      {error && <p style={{ color: 'red' }}>Fehler: {error}</p>}
      {!loading && !error && (
        <>
          <img
            src={post.file_url}
            alt="Rule34 Post"
            style={{
              width: '100%',
              borderRadius: 8,
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            }}
          />
          <section style={{ marginTop: 20 }}>
            <h2>Wähle einen Tag:</h2>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              {tags.map((tag) => (
                <li key={tag}>
                  <button
                    onClick={() => fetchByTag(tag)}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #ccc',
                      borderRadius: 4,
                      background: '#1d2d44',
                      cursor: 'pointer',
                    }}
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  )
}
