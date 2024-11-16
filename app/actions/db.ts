'use server'
import { adminDb } from "@/lib/FirebaseAdmin";
import { FieldValue } from 'firebase-admin/firestore'

type PollOption = {
  text: string;
  votes: number;
  id: string;
}

type PollData = {
  question: string;
  options: PollOption[];
  userId?: string;
  activePoll: boolean;
  createdAt?: number;
  endTime: number;
  votes?: Array<{ voterId: string; votedTo: string }>;
  totalVotes?: number;
}

const validatePollStatus = async (pollDoc: FirebaseFirestore.DocumentSnapshot) => {
  if (!pollDoc.exists) return null;
  
  const pollData = pollDoc.data() as PollData;
  if (!pollData?.activePoll) return null;

  const currentTime = Math.floor(Date.now() / 1000);
  if (pollData.endTime < currentTime) {
    await pollDoc.ref.update({ activePoll: false });
    return null;
  }

  return pollData;
};

export const createPoll = async (question: FormDataEntryValue, options: string[], userId: string, endTime: number, description?: string) => {
    try {
      const pollRef = await adminDb.collection('polls').add({
        question,
        options: options.map((option, index) => ({
          text: option, 
          votes: 0,
          id: `option${index}`       
        })),
        userId,
        description,
        activePoll: true,
        createdAt: Math.floor(Date.now() / 1000),
        endTime,
      });
      return pollRef.id;
    } catch (error) {
      console.error("Something went wrong while creating the poll:", error);
    }
  };

export const getPollDetails = async (pollId: string) => {
  const pollDoc = await adminDb.collection('polls').doc(pollId).get();
  const pollData = await validatePollStatus(pollDoc);
  
  if (!pollData) return null;
  
  const { userId, createdAt, ...publicPollData } = pollData;
  return publicPollData;
};

export const removePoll = async (pollId: string) => {
  await adminDb.collection('polls').doc(pollId).update({ activePoll: false });
};

export const votePoll = async (userId: string, pollId: string, optionId: string) => {
  const pollRef = adminDb.collection('polls').doc(pollId);
  const pollDoc = await pollRef.get();
  
  const pollData = await validatePollStatus(pollDoc);
  if (!pollData) return null;

  const updatedOptions = pollData.options.map((option) =>
    option.id === optionId
      ? { ...option, votes: (option.votes || 0) + 1 }
      : option
  );

  await pollRef.update({
    totalVotes: FieldValue.increment(1),
    options: updatedOptions,
    votes: FieldValue.arrayUnion({
      voterId: userId,
      votedTo: optionId,
    }),
  });
};

export const checkUser = async (userId: string, pollId: string) => {
  const pollDoc = await adminDb.collection('polls').doc(pollId).get();
  const pollData = await validatePollStatus(pollDoc);
  
  if (!pollData) return null;
  
  return pollData.votes?.some((vote) => vote.voterId === userId) ?? false;
};
