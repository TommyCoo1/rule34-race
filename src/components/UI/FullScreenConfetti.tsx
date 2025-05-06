import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export function FullScreenConfetti() {
  const [mounted, setMounted] = useState(false)
  const { width, height } = useWindowSize()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return ReactDOM.createPortal(
    <Confetti width={width} height={height} recycle={false} />,
    document.body
  )
}
