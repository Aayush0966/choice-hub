import { Vote } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import VoteForm from './VoteForm';
import { checkUser } from '@/app/actions/db';

async function VotePage({pollInfo, pollId}: {pollInfo: any, pollId:string}) {

    const handleVote = async (formData: FormData) => {
        'use server';
        const selectedOption = formData.get('voteOption');
        console.log('Selected Option:', selectedOption);
    
      };

  return (
    <div className="relative w-full min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center">
    {/* Background Gradient */}
    <div className="absolute inset-0">
      <div className="absolute w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 via-transparent to-fuchsia-100/20 dark:from-violet-900/10 dark:to-fuchsia-900/10"></div>
      </div>
    </div>

    {/* Navigation */}
    <nav className="relative border-b border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl bg-zinc-50/80 dark:bg-zinc-900/80 w-full">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Vote className="w-8 h-8 text-zinc-900 dark:text-white" />
            <span className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">Pollify</span>
          </Link>
        </div>
      </div>
    </nav>

    <VoteForm pollId={pollId} handleVote={handleVote}  pollInfo={pollInfo} />
    </div>
  )
}

export default VotePage