// useInfiniteScroll.ts
import { useEffect } from 'react'
import debounce from 'lodash.debounce'
export const useInfiniteScroll = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  delay: number = 200
) => {
  useEffect(() => {
    if (!ref.current) return
    const debouncedCallback = debounce(callback, delay)
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        debouncedCallback()
      }
    })
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
      debouncedCallback.cancel()
    }
  }, [ref, callback, delay])
}
