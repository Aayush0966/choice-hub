'use client'

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { ArrowRight, Users, Trophy, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { usePollContext } from '@/context/pollContext';
import { toast } from 'react-hot-toast';
import { Option } from '@/types/option';



function ResultBox({ pollId, userId }: { pollId: string; userId: string }) {
  const [pollData, setPollData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { setActivePoll } = usePollContext();
  const [timeLeft, setTimeLeft] = useState<string>('');

  const colors: { [key: number]: string } = {
    0: "from-violet-500 via-violet-600 to-violet-700",
    1: "from-fuchsia-500 via-fuchsia-600 to-fuchsia-700",
    2: "from-emerald-500 via-emerald-600 to-emerald-700",
    3: "from-blue-500 via-blue-600 to-blue-700",
    4: "from-amber-500 via-amber-600 to-amber-700",
  };

  const options = pollData?.options.map((option: Option, index: number) => {
    const percentage = pollData?.totalVotes > 0 ? (option.votes / pollData?.totalVotes) * 100 : 0;
    const color = colors[index] || "from-gray-500 via-gray-600 to-gray-700";
    return {
      ...option,
      percentage: Number(percentage.toFixed(1)),
      color,
    };
  });

  const winningOption = options?.reduce((prev: Option, current: Option) => 
    prev.percentage > current.percentage ? prev : current
  , options?.[0]);

  const handleNewPoll = async () => {
    try {
      const response = await fetch('/api/poll', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ pollId, userId })
      });
      
      if (response.ok) {
        setActivePoll(null);
        toast.success('Starting new poll!', {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error('Failed to create new poll', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const calculateTimeLeft = (endTime: number) => {
    const endTimeInMs = endTime * 1000;
    const now = Date.now();
    const diff = endTimeInMs - now;

    if (diff <= 0) {
      return 'Poll ended';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const pollRef = doc(db, 'polls', pollId);
    const unsubscribe = onSnapshot(pollRef, (snapshot: any) => {
      if (snapshot.exists()) {
        const poll = snapshot.data();
        if (poll.userId === userId) {
          setPollData(poll);
        } else {
          toast.error('Permission denied');
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [pollId, userId]);

  useEffect(() => {
    if (!pollData?.endTime) return;
     
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(pollData.endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [pollData?.endTime]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 animate-fade-in">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600 dark:text-violet-400" />
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
          {pollData?.question}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full">
            <Users className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
              {pollData?.totalVotes} {pollData?.totalVotes === 1 ? 'response' : 'responses'}
            </span>
          </div>
          {timeLeft && (
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                Time remaining: {timeLeft}
              </span>
            </div>
          )}
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 animate-pulse">
            Live Results
          </span>
        </div>
      </div>

      {pollData?.totalVotes > 0 && (
        <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <span className="font-medium text-violet-600 dark:text-violet-400">
              Leading: {winningOption?.text} ({Math.round(winningOption?.percentage)}%)
            </span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {options?.map((option: Option, index: number) => (
          <div key={index} className="relative group">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white font-medium text-sm">
                  {index + 1}
                </span>
                <span className="text-base font-medium text-zinc-900 dark:text-white">
                  {option.text}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
                  {option.percentage}%
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {option.votes} {option.votes === 1 ? 'vote' : 'votes'}
                </span>
              </div>
            </div>
            <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${option.color} transform origin-left transition-all duration-700 ease-out hover:brightness-110`}
                style={{ 
                  width: `${option.percentage}%`,
                  animation: 'grow 1s ease-out'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button 
          onClick={handleNewPoll}  
          className="w-full group px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 flex items-center justify-center gap-2"
        >
          Create New Poll
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

      <style jsx>{`
        @keyframes grow {
          from { width: 0; }
          to { width: ${options?.percentage}%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ResultBox;