import { useEffect, useState } from 'react'

/**
 * 간단한 viewport 감지 훅.
 * - 초기값은 클라이언트 여부 확인 후 `(min-width: 768px)` 결과로 설정
 * - 리사이즈 시 상태를 업데이트해서 반응형 분기에서 재사용
 */
export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(min-width: 768px)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(min-width: 768px)')
    const handle = () => setIsDesktop(mql.matches)
    handle()
    mql.addEventListener('change', handle)
    return () => mql.removeEventListener('change', handle)
  }, [])

  return isDesktop
}
