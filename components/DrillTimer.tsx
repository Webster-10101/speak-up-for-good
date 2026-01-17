'use client'

import { useState, useEffect, useCallback } from 'react'

interface DrillTimerProps {
  duration: number // duration in seconds
  isActive: boolean
  onComplete: () => void
  onReset?: () => void
}

export default function DrillTimer({ duration, isActive, onComplete, onReset }: DrillTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)

  // Reset timer when duration changes or reset is called
  useEffect(() => {
    setTimeLeft(duration)
    setIsRunning(false)
  }, [duration])

  // Handle timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false)
            onComplete()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, onComplete])

  // Start/stop timer based on isActive prop
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      setIsRunning(true)
    } else if (!isActive) {
      setIsRunning(false)
    }
  }, [isActive, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = ((duration - timeLeft) / duration) * 100

  const handleReset = () => {
    setTimeLeft(duration)
    setIsRunning(false)
    onReset?.()
  }

  return (
    <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-6">
      {/* Timer Display */}
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-white mb-2 font-mono">
          {formatTime(timeLeft)}
        </div>
        <div className="text-gray-400">
          {timeLeft === 0 ? 'Complete!' : isRunning ? 'Speaking...' : 'Ready to start'}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Reset Button */}
      <div className="flex justify-center">
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Reset Timer</span>
        </button>
      </div>

      {/* Completion Message */}
      {timeLeft === 0 && (
        <div className="mt-6 text-center">
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
            <p className="text-green-300 font-semibold">🎉 Step Complete!</p>
          </div>
        </div>
      )}
    </div>
  )
}
