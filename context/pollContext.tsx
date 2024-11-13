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
  const [pollState, setPollState] = useState<PollState>({
    activePollId: null,
    user: { userId: null }, // Initial state for userId is null
  });
  
  const [isClient, setIsClient] = useState(false); // Flag to track if client-side

  // Function to get userId from localStorage
  const getUserId = (): string => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = crypto.randomUUID();  // Generate a unique ID
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  // Load poll state from localStorage on client side
  const loadPollStateFromStorage = () => {
    const storedPollState = localStorage.getItem('user');
    if (storedPollState) {
      setPollState(JSON.parse(storedPollState));
    }
  };

  useEffect(() => {
    // Set the client-side flag and load userId and poll state after mount
    setIsClient(true);  // This ensures that we only set state after the component mounts

    const userId = getUserId(); // Fetch or generate the userId
    setPollState((prevState) => ({
      ...prevState,
      user: { userId },
    }));

    loadPollStateFromStorage(); // Optionally load poll state from storage

  }, []); // Empty dependency array means this runs only once, after the first render

  // Save poll state to localStorage whenever it changes
  useEffect(() => {
    if (pollState.user.userId !== null) { // Ensure userId is set
      localStorage.setItem('user', JSON.stringify(pollState));
    }
  }, [pollState]);

  // Function to set the active poll ID
  const setActivePoll = (pollId: any) => {
    setPollState((prevState) => ({
      ...prevState,
      activePollId: pollId,
    }));
  };

  // Render a loading state until the component is mounted and the state is set
  if (!isClient) {
    return null; // Prevents any rendering until the client-side state is initialized
  }

  return (
    <PollContext.Provider value={{ pollState, setActivePoll }}>
      {children}
    </PollContext.Provider>
  );
};
