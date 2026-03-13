import type { Metadata } from 'next'
import FreelancingForGoodContent from './FreelancingForGoodContent'

export const metadata: Metadata = {
  title: 'Speaking Coaching for Freelancers | Speak Up For Good',
  description: 'Discover your speaker type and get a personalised plan to pitch better, present with confidence, and land more of the work that matters.',
  openGraph: {
    title: 'Speaking Coaching for Freelancers | Speak Up For Good',
    description: 'Discover your speaker type and get a personalised plan to pitch better, present with confidence, and land more of the work that matters.',
  },
}

export default function FreelancingForGoodPage() {
  return <FreelancingForGoodContent />
}
