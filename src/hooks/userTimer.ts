import { useEffect, useRef, useState } from 'react'

type OptionProps = {
  defaultSeconds?: number
  onExpire?: () => void
}

export type TimerProps = {
  seconds: number
  formatted: string
  isActive: boolean
  start: (sec?: number) => void
  stop: () => void
}

export function useTimer(options: OptionProps = {}): TimerProps {
  const defaultSeconds = options.defaultSeconds ?? 0

  const [seconds, setSeconds] = useState(0)

  const endAtRef = useRef(0)
  const intervalRef = useRef<number | null>(null)
  const firedRef = useRef(false)
  const onExpireRef = useRef(options.onExpire)

  useEffect(() => {
    onExpireRef.current = options.onExpire
  }, [options.onExpire])

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [])

  const start = (sec: number = defaultSeconds) => {
    if (!sec || sec <= 0) return

    firedRef.current = false
    setSeconds(sec)
    endAtRef.current = Date.now() + sec * 1000

    if (intervalRef.current) window.clearInterval(intervalRef.current)

    intervalRef.current = window.setInterval(() => {
      const next = Math.max(
        0,
        Math.ceil((endAtRef.current - Date.now()) / 1000)
      )
      setSeconds(next)

      if (next === 0) {
        if (intervalRef.current) window.clearInterval(intervalRef.current)
        intervalRef.current = null

        if (!firedRef.current) {
          firedRef.current = true
          onExpireRef.current?.()
        }
      }
    }, 250)
  }

  const stop = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    intervalRef.current = null
    firedRef.current = false
    setSeconds(0)
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return {
    seconds,
    formatted: `${mm}:${ss}`,
    isActive: seconds > 0,
    start,
    stop,
  }
}
