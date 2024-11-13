'use client'

import { doc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { onSnapshot } from 'firebase/firestore';
import { ArrowRight } from 'lucide-react'
import { Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Option  {
    text: string;         // The text of the option (e.g., "Brazil")
    votes: number;        // The number of votes for this option
    percentage: number;   // The calculated percentage of total votes
    color: string;        // The color associated with this option (as a string representing a gradient)
  };

function ResultBox({pollId, userId}: {pollId:string, userId:string}) {

    const [pollData, setPollData] = useState<any>(null);
    const [loading,setLoading] = useState(true);
    const colors: { [key: number]: string } = {
        0: "from-violet-500 to-violet-600",
        1: "from-fuchsia-500 to-fuchsia-600",
        2: "from-green-500 to-green-600",
      };
      
      const options = pollData?.options.map((option: Option, index: number) => {
        const percentage = pollData?.totalVotes > 0 ? (option.votes / pollData?.totalVotes) * 100 : 0;
      
        const color = colors[index] || "from-gray-500 to-gray-600"; // Default color if index doesn't exist
      
        return {
          ...option,
          percentage,
          color
        };
      });


    useEffect(() => {
        const pollRef = doc(db, 'polls', pollId);
    
        // Set up snapshot listener
        const unsubscribe = onSnapshot(pollRef, (snapshot: any) => {
          if (snapshot.exists()) {
            const poll = snapshot.data();
            if (poll.userId === userId) {
              setPollData(poll);
            } else {
              console.error('User does not have permission to view this poll');
            }
            setLoading(false);
          } else {
            console.log('Poll does not exist');
            setLoading(false);
          }
        });
    
        return () => unsubscribe();
      }, [pollId, userId]);
  return (
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
                 {pollData?.question}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                    <span className="text-zinc-600 dark:text-zinc-300">{pollData?.totalVotes} responses</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400">
                    Active
                  </span>
                </div>
              </div>

              <div className="space-y-8">
                { options && options?.map((option: Option, index:number) => (
                  <div key={index} className="relative group">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <span className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-lg font-medium text-zinc-900 dark:text-white">
                          {option.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
                          {Math.floor(option.percentage)}%
                        </span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          {option.votes} votes
                        </span>
                      </div>
                    </div>
                    <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${option.color} transform origin-left transition-all duration-500 ease-out group-hover:scale-x-105`}
                        style={{ width: `${option.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <button  className="group px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 flex items-center justify-center">
                  New Poll
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className="px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200">
                  Share Results
                </button>
              </div>
            </div>  )
}

export default ResultBox