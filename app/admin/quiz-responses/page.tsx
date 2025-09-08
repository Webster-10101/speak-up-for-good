'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizResponsesAdmin() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to new coaching hub
    router.push('/admin/coaching-hub');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl">Redirecting to Coaching Hub...</div>
    </div>
  );
}


