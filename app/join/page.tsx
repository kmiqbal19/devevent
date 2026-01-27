'use client';

import React, { useState } from 'react';

const JoinPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const baseUrl =
  process.env.VERCEL_URL ||
  'http://localhost:3000';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setEmail('');
      setMessage('');
        setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 z-1">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-transparent rounded-xl border border-border p-6 shadow-sm flex flex-col gap-5"
      >
        <h2 className="text-2xl font-semibold text-center">Share your interest and JOIN US!</h2>
{isSuccess && (
          <div className="rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            ✅ Your message has been sent successfully!
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="rounded-md border border-border px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Write your interest here..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 cursor-pointer rounded-md bg-primary px-4 py-2 font-semibold text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default JoinPage;
