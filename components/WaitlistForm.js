'use client';

import { useState, useTransition } from 'react';
import { addToWaitlist } from '@/app/api/waitlist/route';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    startTransition(async () => {
      const result = await addToWaitlist(email);

      if (result?.success) {
        setStatus('success');
        setMessage('You’ve been added to the waitlist!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result?.message || 'Failed to join.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        disabled={status === 'loading' || isPending}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        {isPending ? 'Joining...' : 'Join the Waitlist'}
      </button>
      {message && (
        <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
