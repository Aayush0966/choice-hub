'use server'
import { adminDb } from "@/lib/FirebaseAdmin";
import { FieldValue } from 'firebase-admin/firestore'


export const createPoll = async (question: FormDataEntryValue, options: string[], userId: string) => {
    try {
      const pollRef = await adminDb.collection('polls').add({
        question,
        options: options.map(option => ({
          text: option, 
          votes: 0       
        })),
        userId,
        activePoll: true,
        createdAt: new Date(),
      });
      console.log("Poll created with Poll Id", pollRef.id);
      return pollRef.id;
    } catch (error) {
      console.error("Something went wrong while creating the poll:", error);
    }
  };

export const getPollDetails = async(pollId: string) => {

  const pollDoc = await adminDb.collection('polls').doc(pollId).get();
  if (pollDoc.exists) {
    const pollData = pollDoc.data();
    delete pollData?.userId;
    delete pollData?.createdAt;
    return pollData;
  } else {
    console.log("No poll found with the specified ID.");
    return null;
  }}

export const removePoll = async( pollId:string) => {
  await adminDb.collection('polls').doc(pollId).update({activePoll: false});
  return ;
}

export const votePoll = async(userId:string, pollId:string, optionId:string) => {
  const voteRef = await adminDb.collection('polls').doc(pollId).update({
    totalVotes: FieldValue.increment(1),
    votes: FieldValue.arrayUnion({
      voterId: userId,
      votedTo: optionId,
    }),
  });
  return voteRef;
}

export const checkUser = async (userId: string, pollId: string) => {
  const pollDoc = await adminDb.collection('polls').doc(pollId).get();

  if (pollDoc.exists) {
    const userData = pollDoc.data();

    const isVoted = userData?.votes?.some((vote: { voterId: string }) => vote?.voterId === userId);
    return isVoted; 
  }

  return false;
}
