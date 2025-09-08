'use client'

import { useState, useEffect } from 'react'
import DrillTimer from './DrillTimer'

interface DrillStep {
  id: string
  title: string
  duration: number // in seconds
  instructions: string[]
  explanation?: string
  type: 'warmup' | 'challenge' | 'reflection'
}

interface DrillSessionProps {
  drill: {
    title: string
    description: string
    totalDuration: number
    steps: DrillStep[]
  }
  onComplete: () => void
}

export default function DrillSession({ drill, onComplete }: DrillSessionProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isStepActive, setIsStepActive] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [sessionStarted, setSessionStarted] = useState(false)

  const currentStep = drill.steps[currentStepIndex]
  const isLastStep = currentStepIndex === drill.steps.length - 1

  const handleStepComplete = () => {
    setIsStepActive(false)
    setCompletedSteps(prev => {
      if (!prev.includes(currentStep.id)) {
        return [...prev, currentStep.id]
      }
      return prev
    })
    
    if (isLastStep) {
      onComplete()
    }
  }

  const handleStartStep = () => {
    if (!sessionStarted) {
      setSessionStarted(true)
    }
    setIsStepActive(true)
  }

  const handleNextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1)
      setIsStepActive(false)
    }
  }

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
      setIsStepActive(false)
    }
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'warmup':
        return '🎵'
      case 'challenge':
        return '💪'
      case 'reflection':
        return '🤔'
      default:
        return '📝'
    }
  }

  const getStepColor = (type: string) => {
    switch (type) {
      case 'warmup':
        return 'from-green-500 to-green-400'
      case 'challenge':
        return 'from-blue-500 to-blue-400'
      case 'reflection':
        return 'from-purple-500 to-purple-400'
      default:
        return 'from-gray-500 to-gray-400'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Session Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">{drill.title}</h1>
        <p className="text-xl text-gray-300 mb-6">{drill.description}</p>
        
        {/* Progress Bar */}
        <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Session Progress</span>
            <span className="text-gray-400 text-sm">
              {currentStepIndex + 1} of {drill.steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStepIndex + (isStepActive ? 0.5 : 0)) / drill.steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps Overview */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {drill.steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => {
                setCurrentStepIndex(index)
                setIsStepActive(false)
              }}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:opacity-80 ${
                index === currentStepIndex
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-400/30'
                  : completedSteps.includes(step.id)
                  ? 'bg-green-500/30 text-green-300 border border-green-400/30'
                  : 'bg-gray-700/30 text-gray-400 border border-gray-600/30 hover:bg-gray-600/30'
              }`}
            >
              <span>{getStepIcon(step.type)}</span>
              <span>{step.title}</span>
              {completedSteps.includes(step.id) && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className={`text-3xl font-bold bg-gradient-to-r ${getStepColor(currentStep.type)} bg-clip-text text-transparent mb-2`}>
              {getStepIcon(currentStep.type)} {currentStep.title}
            </h2>
            <div className="flex items-center space-x-4 text-gray-400">
              <span>Duration: {Math.floor(currentStep.duration / 60)}:{(currentStep.duration % 60).toString().padStart(2, '0')}</span>
              <span>•</span>
              <span className="capitalize">{currentStep.type}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-4">Instructions:</h3>
          <div className="space-y-3">
            {currentStep.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300 leading-relaxed">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {currentStep.explanation && (
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4 mb-6">
            <p className="text-blue-200">
              <strong>Why this matters:</strong> {currentStep.explanation}
            </p>
          </div>
        )}

        {/* Timer */}
        <DrillTimer
          duration={currentStep.duration}
          isActive={isStepActive}
          onComplete={handleStepComplete}
          onReset={() => setIsStepActive(false)}
        />

        {/* Step Controls */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={handlePreviousStep}
            disabled={currentStepIndex === 0}
            className="bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>

          {!isStepActive && (
            <button
              onClick={handleStartStep}
              className={`bg-gradient-to-r ${getStepColor(currentStep.type)} hover:opacity-90 text-white px-8 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
              </svg>
              <span>{completedSteps.includes(currentStep.id) ? 'Restart' : 'Start'} {currentStep.title}</span>
            </button>
          )}

          {!isLastStep && (
            <button
              onClick={handleNextStep}
              disabled={currentStepIndex >= drill.steps.length - 1}
              className="bg-green-500 hover:bg-green-400 disabled:bg-gray-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <span>Next Step</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Session Complete */}
      {completedSteps.length === drill.steps.length && (
        <div className="bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-400/30 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            🎉 Drill Complete!
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Excellent work! You&apos;ve completed the {drill.title}.
          </p>
          <p className="text-gray-400 mb-6">
            Regular practice builds lasting confidence. Come back tomorrow for another session!
          </p>
        </div>
      )}
    </div>
  )
}
