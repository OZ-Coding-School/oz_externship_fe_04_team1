import { useState, useEffect } from 'react'

export const useTimer = (initialTime: number = 300) => {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  useEffect(() => {
    if (timer <= 0) {
      setIsActive(false)
      return
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  const startTimer = () => {
    setTimer(initialTime)
    setIsActive(true)
  }

  const resetTimer = () => {
    setTimer(0)
    setIsActive(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return {
    timer,
    isActive,
    isExpired: timer === 0 && isActive === false && timer !== 0,
    formattedTime: formatTime(timer),
    startTimer,
    resetTimer,
  }
}
