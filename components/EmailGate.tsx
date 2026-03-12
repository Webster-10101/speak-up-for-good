'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface EmailGateProps {
  children: React.ReactNode
}

export default function EmailGate({ children }: EmailGateProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user already has access via localStorage
    const drillsAccess = localStorage.getItem('sufg_drills_access')
    if (drillsAccess === 'true') {
      setHasAccess(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!firstName.trim() || !email.trim()) {
      setError('Please fill in both fields.')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)

    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from('quiz_responses')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .limit(1)

      if (existing && existing.length > 0) {
        // Update existing record to note they accessed drills
        await supabase
          .from('quiz_responses')
          .update({
            updated_at: new Date().toISOString(),
          })
          .eq('email', email.toLowerCase().trim())
      } else {
        // Insert new contact
        await supabase.from('quiz_responses').insert({
          email: email.toLowerCase().trim(),
          first_name: firstName.trim(),
          signup_source: 'Speaking Drills',
          status: 'Lead',
        })
      }

      // Grant access
      localStorage.setItem('sufg_drills_access', 'true')
      setHasAccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return null
  }

  if (hasAccess) {
    return <>{children}</>
  }

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-xl p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Get Free Access to Speaking Drills
        </h2>
        <p className="text-slate-300 leading-relaxed mb-8">
          Enter your name and email to unlock all the drills. You&apos;ll only need to do this once.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-400 disabled:bg-blue-500/50 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isSubmitting ? 'Unlocking...' : 'Unlock Speaking Drills'}
          </button>
        </form>

        <p className="text-slate-500 text-xs mt-6">
          No spam, no sales emails. Just access to the drills.
        </p>
      </div>
    </div>
  )
}
