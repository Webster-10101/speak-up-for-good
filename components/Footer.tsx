'use client'

import Image from 'next/image'
import { Mail, Heart } from 'lucide-react'

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container-max section-padding">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/speak_up_icon_.svg"
                alt="Speak Up For Good"
                width={40}
                height={40}
                className="rounded"
              />
              <span className="text-xl font-bold">Speak Up For Good</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Public speaking and confidence coaching to help you speak up, be heard, and make an impact.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('offers')}
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Coaching Options
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block text-slate-300 hover:text-white transition-colors"
              >
                About
              </button>

              <button
                onClick={() => scrollToSection('faq')}
                className="block text-slate-300 hover:text-white transition-colors"
              >
                FAQ
              </button>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@speakupforgood.com"
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>hello@speakupforgood.com</span>
              </a>
              <button
                onClick={() => scrollToSection('newsletter')}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Weekly Newsletter</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-slate-400 text-sm">
            © 2025 Speak Up For Good. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm">
            Ultraspeaking-certified coach
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 