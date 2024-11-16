'use client'

import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Option } from '@/types/option';
import { toast } from 'react-hot-toast';
import { usePollContext } from '@/context/pollContext';
import { motion } from 'framer-motion';

interface VoteFormProps {
  pollInfo: any;
  pollId: string;
}

const VoteForm = ({ pollInfo, pollId }: VoteFormProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [voted, setVoted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { pollState } = usePollContext();

  const handleOptionChange = (id: string) => {
    setSelectedOption(id);
  };

  const checkUser = async () => {
    const userId = pollState?.user?.userId;
    if (!userId) return;

    setLoading(true);
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
        toast.error("Failed to check your vote status", {
          icon: '⚠️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedOption) {
      toast.error('Please select an option', {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        userId: localStorage.getItem('userId'),
        pollId,
        optionId: selectedOption
      };
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success('Vote submitted successfully!', {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setVoted(true);
      }
      else {
        if (response.statusText === 'Forbidden') {
          toast.error('Poll has ended', {
            icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            },
          });
        }
      }
    } catch (error) {
      toast.error('Failed to submit vote: ' + error, {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col items-center justify-center">
        {loading && (
          <div
           
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Checking vote status...</span>
          </div>
        )}

      {  !voted && !loading && pollInfo !== null && (
          <form
            onSubmit={handleFormSubmit}
            className="max-w-2xl w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800 space-y-8"
          >
            <div 
              className="text-center"
              
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
                {pollInfo.question}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">Cast your vote and see the results!</p>
            </div>

            <div className="space-y-4">
              {pollInfo.options.map((option: Option, index: number) => (
                <div
                  key={option.id}
                 
                >
                  <label
                    htmlFor={option.id}
                    className={`w-full ${
                      selectedOption === option.id
                        ? 'bg-violet-600 text-white border-violet-600'
                        : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    } h-14 border border-zinc-300 dark:border-zinc-700 hover:bg-violet-500 dark:hover:bg-violet-400 
                    font-medium rounded-xl flex items-center justify-between p-4 cursor-pointer transition-all duration-200
                    transform hover:scale-[1.02] active:scale-[0.98]`}
                    onClick={() => handleOptionChange(option.id)}
                  >
                    <span>{option.text}</span>
                    <span
                     className="text-white"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </span>
                  </label>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-14 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-xl font-medium transition-all duration-200 mt-6 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Vote
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        )}

        {voted && pollInfo !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block p-3 rounded-full bg-green-100 dark:bg-green-900/30"
            >
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </motion.div>
            
            <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-500">
              Thank you for your participation!
            </h2>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              We appreciate your vote. You've already cast your vote for this poll.
              <span className="font-medium"> Your opinion has been counted. </span>
              Stay tuned for the final results!
            </p>
          </motion.div>
        )}

        {
          !loading && pollInfo === null && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <h2 className="text-3xl font-semibold text-violet-700 dark:text-violet-500">
                Poll has ended
              </h2>
              <p className="text-2xl text-zinc-600 dark:text-zinc-400">
                Thank you for your participation!
              </p>
            </div>
          )
        }
      </div>
  );
};

export default VoteForm;