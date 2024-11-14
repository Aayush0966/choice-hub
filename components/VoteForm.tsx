'use client';

import { ArrowRight, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Option } from './ResultBox';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { usePollContext } from '@/context/pollContext';

interface VoteFormProps {
  pollInfo: any;
  pollId: string;
}

const VoteForm = ({ pollInfo, pollId }: VoteFormProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // State to track selected option
  const [voted, setVoted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Loading state to track the user check
  const { pollState } = usePollContext();

  const handleOptionChange = (id:string) => {
    console.log(id)
    setSelectedOption(id); 
  };
  

  const checkUser = async () => {
    const userId = pollState?.user?.userId;
    if (!userId) return;

    setLoading(true); // Start loading
    
    try {
      const response = await fetch(`/api/user?userId=${encodeURIComponent(userId)}&pollId=${encodeURIComponent(pollId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVoted(data?.isVoted); 
      } else {
        console.log("Failed to check user vote status");
        toast.error("Failed to check your vote status. Please try again later.");
      }
    } catch (error) {
      console.log("Something went wrong: ", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedOption) {
      try {
        const payload = {
        userId: localStorage.getItem('userId'),
        pollId,
        optionId: selectedOption
        }
        const response = await fetch('/api/vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
        const data = response.json();
        if (response.ok) {
          toast.success('Your vote has been successfully submitted!', {
            duration: 3000,
          });
          setVoted(true); 
        }
      } catch (error) {
        console.log("Something wrong happened: ", error)
      }
    } else {
      toast.error('Please select an option before submitting your vote.', {
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    checkUser(); 
  }, []);

  return (
    <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col items-center justify-center">
      {loading && (
        <div className="text-center text-zinc-600 dark:text-zinc-400">Checking your vote status...</div>
      )}

      {!voted && !loading && (
        <form
          onSubmit={handleFormSubmit} // Change the action to onSubmit
          className="max-w-2xl w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800 space-y-8"
        >
          {/* Poll Question */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
              {pollInfo.question}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">Cast your vote and see the results!</p>
          </div>

          {/* Options */}
          <div className="space-y-4">
          {pollInfo.options.map((option: Option) => (
            <div key={option.id} className="flex items-center gap-3">
              <input
                type="radio"
                id={option.id} // Set the id as the option's unique id
                name="voteOption"
                value={option.id} 
                checked={selectedOption === option.id}
                className="hidden"
              />
              <label
                htmlFor={option.id} 
                className={`w-full ${selectedOption === option.id ? 'bg-violet-600 text-white border-violet-600' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'} 
                h-14 border border-zinc-300 dark:border-zinc-700 hover:bg-violet-500 dark:hover:bg-violet-400 
                font-medium rounded-xl flex items-center justify-between p-4 cursor-pointer transition-colors duration-200`}
                              onClick={() => handleOptionChange(option.id)} 
              >
                {option.text}
                <span className="text-xs text-zinc-400 dark:text-zinc-500">{selectedOption === option.id ? 'selected' : 'select'}</span>
              </label>
            </div>
          ))}
          </div>

          {/* Submit Vote Button */}
          <Button
            type="submit"
            className="w-full h-14 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-xl font-medium transition-all duration-200 mt-6"
          >
            Submit Vote
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-200" />
          </Button>
        </form>
      )}

      {voted && (
        <div className="text-center text-zinc-600 dark:text-zinc-400">
          <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-500 mb-4">
            Thank you for your participation!
          </h2>
          <p className="text-lg">
            We appreciate your vote. You've already cast your vote for this poll. 
            <span className="font-medium"> Your opinion has been counted. </span> 
            Stay tuned for the final results once voting ends!
          </p>
        </div>
      )}

    </div>
  );
};

export default VoteForm;
