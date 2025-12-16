import { forwardRef, useImperativeHandle } from 'react'
import { useTimer } from '@/hooks/userTimer'

export type TimerRefProps = {
  start: (sec?: number) => void
  stop: () => void
}

type TimerProps = {
  seconds?: number // 기본 300
  onExpire?: () => void
  className?: string //  타이머 텍스트 스타일
}

export const Timer = forwardRef<TimerRefProps, TimerProps>(function TimerSuffix(
  {
    seconds = 300,
    onExpire,
    className = 'pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm tabular-nums text-danger-500',
  },
  ref
) {
  const timer = useTimer({ defaultSeconds: seconds, onExpire })

  useImperativeHandle(ref, () => ({
    start: (sec?: number) => timer.start(sec ?? seconds),
    stop: timer.stop,
  }))

  if (!timer.isActive) return null
  return <span className={className}>{timer.formatted}</span>
})
