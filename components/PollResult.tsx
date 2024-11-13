import { Link, Copy, Share2, ArrowRight, Vote, Users } from 'lucide-react';
import { BackgroundLines } from './ui/background-lines';
import ResultBox from './ResultBox';
import ShareCard from './ShareCard';

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
          <ShareCard pollId={pollId} />


          <ResultBox pollId={pollId} userId={userId} />
        </div>
      </div>
    </BackgroundLines>
  );
};

export default PollResult;
