import { Mail } from 'lucide-react'

const Newsletter = () => {
  return (
    <section id="newsletter" className="py-20">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Subscribe to my public speaking substack newsletter
            </h2>
            <p className="text-lg text-slate-600">
              I share short, practical insights on public speaking — from my coaching sessions and my own experience learning to speak with confidence. Think of it as a little coaching note in your inbox.
            </p>
          </div>
          
          {/* Substack Embed */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="mb-6">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-slate-600 mb-6">
                  Join readers getting practical insights on presence, confidence, and speaking with impact.
                </p>
              </div>
              
              {/* Substack Embed */}
              <div className="w-full flex justify-center">
                <iframe 
                  src="https://speakupforgood.substack.com/embed" 
                  width="100%" 
                  height="320" 
                  style={{
                    border: '1px solid #e2e8f0',
                    background: 'white',
                    borderRadius: '8px',
                    maxWidth: '480px'
                  }}
                  frameBorder="0" 
                  scrolling="no"
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter 