import { adminDb } from "@/lib/FirebaseAdmin";


export const createPoll = async (question: FormDataEntryValue, options: Record<string, string>, userId: string) => {
    try {
      const pollRef = await adminDb.collection('polls').add({
        question,
        options,
        userId,
        createdAt: new Date(),
      });
  
      console.log("Poll created with Poll Id", pollRef.id);
      return pollRef.id;
    } catch (error) {
      console.error("Something went wrong while creating the poll:", error);
    }
  };