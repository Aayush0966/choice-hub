'use server'
import { adminDb } from "@/lib/FirebaseAdmin";
import { FieldValue } from 'firebase-admin/firestore'


export const createPoll = async (question: FormDataEntryValue, options: string[], userId: string, endTime: Date | null) => {
    try {
      const pollRef = await adminDb.collection('polls').add({
        question,
        options: options.map((option, index) => ({
          text: option, 
          votes: 0,
          id: `option${index}`       
        })),
        userId,
        activePoll: true,
        createdAt: new Date(),
        endTime,
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
    const endTime = pollData?.endTime;
    if (endTime && endTime < new Date()) {
      await adminDb.collection('polls').doc(pollId).update({activePoll: false});
    }
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
  const pollRef = adminDb.collection('polls').doc(pollId);

  const pollDoc = await pollRef.get();
  if (!pollDoc.exists) throw new Error("Poll does not exist");

  const pollData = pollDoc.data();
  const endTime = pollData?.endTime;
  if (endTime && endTime < new Date()) {
    await adminDb.collection('polls').doc(pollId).update({activePoll: false});
    return;
  }
  const updatedOptions = pollData?.options.map((option: any) =>
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
  return;
}

export const checkUser = async (userId: string, pollId: string) => {
  const pollDoc = await adminDb.collection('polls').doc(pollId).get();

  if (pollDoc.exists) {
    const userData = pollDoc.data();
    const endTime = userData?.endTime;
    if (endTime && endTime < new Date()) {
      await adminDb.collection('polls').doc(pollId).update({activePoll: false});
    }
    const isVoted = userData?.votes?.some((vote: { voterId: string }) => vote?.voterId === userId);
    return isVoted; 
  }

  return false;
}
