// src/app/api/rule34/route.ts
import { NextResponse } from 'next/server'

// export const defaultUrl = `${process.env.NEXT_PUBLIC_RULE34_API}?page=dapi&s=post&q=index&json=1&order=random`
export const defaultUrl = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&order=random` // replace this with above if api key is needed

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tags = searchParams.get('tags') ?? ''
  const limit = searchParams.get('limit') ?? '1'

  const externalUrl = `${defaultUrl}&tags=${encodeURIComponent(`${tags} -loli -child sort:random`)}${limit ? `&limit=${limit}` : ''}`

  try {
    const res = await fetch(externalUrl)
    if (!res.ok) return NextResponse.json({ error: 'External API error' }, { status: res.status })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
