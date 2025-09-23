const SocialProof = () => {
  const testimonials = [
    {
      quote: "The way you stayed at ease and heard my questions inspired me to do the same — to take my time and own my speaking. This was one of the most impactful coaching sessions I've had.",
      author: "Evelyn Q",
      role: ""
    },
    {
      quote: "You gave me personalised feedback that really helped. I actually spoke for the entire hour, which I'm not used to, and it felt great! You helped me believe more in my own skills as a speaker.",
      author: "Liudmila",
      role: ""
    },
    {
      quote: "Through thoughtful questions and a very human approach, I've got a simple plan with steps for what I can do in my situation starting immediately.",
      author: "Nailya B",
      role: ""
    }
  ]

  return (
    <section className="py-20 bg-white/50">
      <div className="container-max section-padding">
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-extra-wide text-slate-500 mb-6 font-medium">
            From Past Clients
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent">
              Find Your Voice
            </span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 rounded-xl shadow-sm border border-blue-100 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
              <blockquote className="text-slate-700 leading-relaxed mb-6 text-lg">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <div className="text-sm text-slate-600">
                <span className="font-medium">— {testimonial.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof 