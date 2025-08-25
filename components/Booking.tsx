'use client'

import { useEffect } from 'react'

const Booking = () => {
  useEffect(() => {
    // TODO: Replace with your actual Calendly URL
    // Example: https://calendly.com/your-username/speak-up-for-good
    
    // Load Calendly script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <section id="booking" className="py-20 bg-white/50">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Book In Minutes
            </h2>
            <p className="text-lg text-slate-600">
              Choose a time that works — payment handled securely at booking.
            </p>
          </div>
          
          {/* Calendly Embed Placeholder */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 min-h-[600px] flex items-center justify-center">
            <div className="text-center">
              <div className="bg-slate-100 rounded-lg p-8 mb-4">
                <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">Calendly Integration</h3>
                <p className="text-slate-600">
                  TODO: Replace the placeholder below with your Calendly embed code
                </p>
              </div>
              
              {/* TODO: Replace this div with actual Calendly widget */}
              <div 
                className="calendly-inline-widget"
                data-url="https://calendly.com/YOUR-USERNAME/speak-up-for-good"
                style={{ minWidth: '320px', height: '630px' }}
              >
                {/* Calendly widget will render here */}
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Setup Instructions:</strong><br />
                  1. Sign up for Calendly if you haven&apos;t already<br />
                  2. Create an event type called &quot;speak-up-for-good&quot;<br />
                  3. Replace &quot;YOUR-USERNAME&quot; in the data-url above with your Calendly username<br />
                  4. The widget will automatically load when you visit the page
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Booking 