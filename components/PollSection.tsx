'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import PollForm from './PollForm';
import PollResult from './PollResult';
import { usePollContext } from '@/context/pollContext';
import { BackgroundLines } from './ui/background-lines';
import Header from './ui/Header';

function PollSection() {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [pollCreation, setPollCreation] = useState<boolean>(true);
    const { setActivePoll, pollState } = usePollContext();
    const userId = pollState?.user?.userId;
    const pollId = pollState?.activePollId;

    const createPoll = async (event: React.FormEvent<HTMLFormElement>, options: string[], endTime: number) => {
        event.preventDefault();
        setLoading(true);
        setError('');
    
        const formData = new FormData(event.currentTarget);
        const userId = localStorage.getItem('userId');
        const question = formData.get("question") as string | null;
        const description = formData.get("description") as string | null;
    
        try {
          const payload = { userId, question, options, endTime, description };
    
          const response = await fetch('/api/poll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
    
          const data = await response.json();
          if (response.ok && data.message === 'Success') {
            toast.success("Poll created successfully");
            setActivePoll(data?.pollId)

            setPollCreation(false);
          } else {
            setError(data.error || "Failed to create poll.");
          }
        } catch (error) {
          console.error("Error:", error);
          setError("An unexpected error occurred.");
        } finally {
          setLoading(false);
        }
    };
    



  return (
   <BackgroundLines className="relative w-full h-screen overflow-hidden bg-[#D9D9D9] dark:bg-black">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 via-transparent to-fuchsia-100/20 dark:from-violet-900/10 dark:to-fuchsia-900/10"></div>
        </div>
      </div>

      <div className="relative h-full overflow-auto">
        <Header />      
        {error && <div className="error-message">{error}</div>}
        {
          pollState.activePollId === null &&
          <PollForm createPoll={createPoll} error={error} loading={loading} />
        }
        {
          userId && pollId &&
          <PollResult userId={userId} pollId={pollId} />
        }
      </div>
    </BackgroundLines>
  )
}

export default PollSection