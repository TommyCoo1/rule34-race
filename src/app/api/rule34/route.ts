// src/app/api/rule34/route.ts
import { NextResponse } from 'next/server'

// i think this one is needed to use to avoid CORS issues if they arise + to prevent leaking the API key, which is not needed in this case
export const defaultUrl = `${process.env.NEXT_PUBLIC_RULE34_API}?page=dapi&s=post&q=index&json=1&order=random`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tags = searchParams.get('tags') ?? ''
  const limit = searchParams.get('limit') ?? '1'

  const externalUrl = `${defaultUrl}&tags=${encodeURIComponent(tags)}&limit=${limit}`

  try {
    const res = await fetch(externalUrl)
    if (!res.ok) return NextResponse.json({ error: 'External API error' }, { status: res.status })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
