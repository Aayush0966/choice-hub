import { Link, Copy, Share2, ArrowRight, Vote, Users } from 'lucide-react';
import { BackgroundLines } from './ui/background-lines';
import ResultBox from './ResultBox';
import ShareCard from './ShareCard';

const PollResult =  ({userId, pollId} : {userId:string, pollId:string}) => {
  
  return (
    <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Main Content */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <ShareCard pollId={pollId} />
          <ResultBox pollId={pollId} userId={userId} />
        </div>
    </div>
  );
};

export default PollResult;
