'use client'

import { getUserId } from '@/lib/utils';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import PollForm from './PollForm';
import PollResult from './PollResult';

function PollSection() {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [pollCreation, setPollCreation] = useState<boolean>(true);


    const createPoll = async (event: React.FormEvent<HTMLFormElement>, options: string[]) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        console.log("got here")
    
        const formData = new FormData(event.currentTarget);
        const userId = getUserId();
        const question = formData.get("question") as string | null;
    
        try {
          const payload = { userId, question, options };
    
          const response = await fetch('/api/poll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
    
          const data = await response.json();
          if (response.ok && data.message === 'Success') {
            const user = localStorage.getItem('user');
            if (user) {
              const parsedUser = JSON.parse(user);
              parsedUser.polls = parsedUser.polls || {};
              parsedUser.polls[`poll${Object.keys(parsedUser.polls).length + 1}`] = data.pollId;
              localStorage.setItem('user', JSON.stringify(parsedUser));
            }
            toast.success("Poll created successfully");
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
    <div className="min-h-screen relative bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 via-transparent to-fuchsia-100/20 dark:from-violet-900/10 dark:to-fuchsia-900/10"></div>
      {error && <div className="error-message">{error}</div>}
      {
        
        pollCreation &&
        <PollForm createPoll={createPoll} error={error} loading={loading} />
      }
      {
        !pollCreation &&
        <PollResult />
      }
      </div>
  )
}

export default PollSection