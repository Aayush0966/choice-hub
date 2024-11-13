import { Link, Copy, Share2, ArrowRight, Vote, Users } from 'lucide-react';
import { BackgroundLines } from './ui/background-lines';
import ResultBox from './ResultBox';

const PollResult =  ({userId, pollId} : {userId:string, pollId:string}) => {
  
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
              <button  className="inline-flex items-center px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200">
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
                
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 font-mono text-sm border border-zinc-200 dark:border-zinc-700">
                https://pollify.com/polls/{pollId}
              </div>
              <button className="group px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>


          <ResultBox pollId={pollId} userId={userId} />
        </div>
      </div>
    </BackgroundLines>
  );
};

export default PollResult;
