// src/components/Game/TagList.tsx

'use client'
import { useState } from 'react'

interface TagListProps {
  tags: string[]
  onTagSelect: (tag: string) => void
  maxVisible?: number
}

export function TagList({
  tags,
  onTagSelect,
  maxVisible = 10,
}: TagListProps) {
  const [expanded, setExpanded] = useState(false)
  const unique = Array.from(new Set(tags))
  const visible = expanded ? unique : unique.slice(0, maxVisible)

  return (
    <div>
      <ul className="flex flex-wrap gap-2 mt-2">
        {visible.map((tag, i) => (
          <li key={`${tag}-${i}`}>
            <button
              onClick={() => onTagSelect(tag)}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-primary-foreground hover:text-primary transition"
            >
              {tag}
            </button>
          </li>
        ))}
        {!expanded && unique.length > maxVisible && (
          <li>
            <button
              onClick={() => setExpanded(true)}
              className="text-primary underline px-2"
            >
              +{unique.length - maxVisible} more
            </button>
          </li>
        )}
      </ul>
      {expanded && unique.length > maxVisible && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-2 text-primary underline"
        >
          Show less
        </button>
      )}
    </div>
  )
}
