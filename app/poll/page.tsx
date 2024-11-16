import PollSection from '@/components/PollSection'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Poll",
  description: "Generate and share polls with ease",
};

function PollPage() {
  return (
      <PollSection />
  )
}

export default PollPage