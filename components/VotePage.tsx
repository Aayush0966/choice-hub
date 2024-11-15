import { Vote } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import VoteForm from './VoteForm';
import Header from './ui/Header';

async function VotePage({pollInfo, pollId}: {pollInfo: any, pollId:string}) {

  return (
    <div className="relative w-full min-h-screen bg-[#D9D9D9] dark:bg-black  items-center">
    {/* Background Gradient */}
    <div className="absolute inset-0">
      <div className="absolute w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 via-transparent to-fuchsia-100/20 dark:from-violet-900/10 dark:to-fuchsia-900/10"></div>
      </div>
    </div>

    {/* Navigation */}
    <Header />

    <VoteForm pollId={pollId} pollInfo={pollInfo} />
    </div>
  )
}

export default VotePage