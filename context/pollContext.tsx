'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  userId: string | null;
}

interface PollState {
  activePollId: string | null;
  user: User;
}

interface PollContextType {
  pollState: PollState;
  setActivePoll: (pollId: any) => void;
}

const PollContext = createContext<PollContextType | undefined>(undefined);

export const usePollContext = (): PollContextType => {
  const context = useContext(PollContext);
  if (!context) {
    throw new Error('usePollContext must be used within a PollProvider');
  }
  return context;
};

interface PollProviderProps {
  children: ReactNode;
}

export const PollProvider: React.FC<PollProviderProps> = ({ children }) => {
  // Function to generate or retrieve the unique userId
  const getUserId = (): string => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = crypto.randomUUID();  // Generate a unique ID
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  const [pollState, setPollState] = useState<PollState>({
    activePollId: null,
    user: {
      userId: getUserId(),
    },
  });

  // Load poll state from localStorage on first load
  const loadPollStateFromStorage = () => {
    const storedPollState = localStorage.getItem('user');
    if (storedPollState) {
      setPollState(JSON.parse(storedPollState));
    }
  };

  useEffect(() => {
    loadPollStateFromStorage();
  }, []);

  // Save poll state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(pollState));
  }, [pollState]);

  // Function to set the active poll ID
  const setActivePoll = (pollId: any) => {
    setPollState((prevState) => ({
      ...prevState,
      activePollId: pollId,
    }));
  };

  return (
    <PollContext.Provider value={{ pollState, setActivePoll }}>
      {children}
    </PollContext.Provider>
  );
};
