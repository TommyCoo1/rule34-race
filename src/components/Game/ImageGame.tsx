'use client'

import { useGame } from '@/hooks/useGame'
import type { Post } from '@/types'

interface Props {
  initialPost: Post
}

export default function ImageGame({ initialPost }: Props) {
  const { post, loading, error, fetchByTag } = useGame(initialPost)
  const tags = post.tags.split(' ')

  return (
    <div className="max-w-xl mx-auto">
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <>
          <img src={post.file_url} alt="Rule34 Post" className="w-full rounded shadow-md" />
          <section className="mt-5">
            <h2 className="font-bold">Choose a Tag:</h2>
            <ul className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <button onClick={() => fetchByTag(tag)} className="bg-blue-900 text-white px-3 py-1 rounded">
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
