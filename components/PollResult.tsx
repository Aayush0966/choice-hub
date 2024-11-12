import React, { useState } from 'react';
import { Link, Copy, Share2, ArrowRight, Vote, Users } from 'lucide-react';
import { BackgroundLines } from './ui/background-lines';
import { usePollContext } from '@/context/pollContext';

const PollResult = () => {
  const [showResults, setShowResults] = useState(false);
  const { pollState, setActivePoll} = usePollContext()

  const handleNewPoll = () => setActivePoll(null)


  return (
    <BackgroundLines className="relative min-h-screen bg-zinc-50 dark:bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 via-transparent to-fuchsia-100/20 dark:from-violet-900/10 dark:to-fuchsia-900/10"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative">
        {/* Navigation */}
        <nav className="border-b border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl bg-zinc-50/80 dark:bg-zinc-900/80">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <Vote className="w-8 h-8 text-zinc-900 dark:text-white" />
                <span className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">Pollify</span>
              </Link>
              <button onClick={handleNewPoll} className="inline-flex items-center px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200">
                Create Poll
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Share Card */}
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Link className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Share Your Poll</h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/50 text-violet-600 dark:text-violet-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                {!showResults && <button
                  onClick={() => setShowResults((prev) => !prev)}
                  className="p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 dark:hover:bg-violet-500 transition-all"
                >
                  {showResults ? '' : 'Show Results'}
                </button>}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 font-mono text-sm border border-zinc-200 dark:border-zinc-700">
                https://pollify.com/polls/xyz123
              </div>
              <button className="group px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>

          {/* Results Card */}
          {showResults && (
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
                  What do you wanna do?
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                    <span className="text-zinc-600 dark:text-zinc-300">1,234 responses</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400">
                    Active
                  </span>
                </div>
              </div>

              <div className="space-y-8">
                {/* Poll Options */}
                {[
                  { name: 'Dance', votes: 556, percentage: 45, color: 'from-violet-500 to-violet-600' },
                  { name: 'Swim', votes: 371, percentage: 30, color: 'from-fuchsia-500 to-fuchsia-600' },
                  { name: 'Movie', votes: 307, percentage: 25, color: 'from-pink-500 to-pink-600' }
                ].map((option, index) => (
                  <div key={index} className="relative group">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <span className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-lg font-medium text-zinc-900 dark:text-white">
                          {option.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
                          {option.percentage}%
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
                <button onClick={handleNewPoll} className="group px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 flex items-center justify-center">
                  New Poll
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className="px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200">
                  Share Results
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </BackgroundLines>
  );
};

export default PollResult;
