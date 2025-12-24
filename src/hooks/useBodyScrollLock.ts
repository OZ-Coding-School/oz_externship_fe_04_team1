import { useEffect } from 'react'

export function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])
}
