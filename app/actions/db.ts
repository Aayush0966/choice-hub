'use server'
import { adminDb } from "@/lib/FirebaseAdmin";


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

export const getPollDetails = async(pollId: string, userId: string) => {
  if (!userId) {
    throw new Error("Some error has occurred. Please contact the developer")
  }
  const pollDoc = await adminDb.collection('polls').doc(pollId).get();

  if (pollDoc.exists) {
    const pollData = pollDoc.data();
    console.log("Poll data:", pollData);
    return pollData;
  } else {
    console.log("No poll found with the specified ID.");
    return null;
  }}