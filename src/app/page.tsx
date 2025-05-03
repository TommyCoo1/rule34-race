import ImageGame from '@/components/Game/ImageGame'
import { fetchPostByTagDirectly } from '@/hooks/useRule34Api'

export default async function Page() {
  const START_TAG = 'cat_ears'
  const post = await fetchPostByTagDirectly(START_TAG)

  return (
    <main className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4">Rule34-Race</h1>
      <ImageGame initialPost={post} />
    </main>
  )
}
