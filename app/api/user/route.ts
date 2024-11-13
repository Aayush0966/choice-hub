import { checkUser } from "@/app/actions/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        // Parse the URL parameters from the request object
        const url = new URL(req.url);  // Get the full URL
        const userId = url.searchParams.get('userId');  // Get query parameters
        const pollId = url.searchParams.get('pollId');  // Get query parameters

        if (!userId || !pollId) {
          return NextResponse.json({ error: 'All fields are required' }, {status: 400});
        }

        // Call your checkUser function to determine if the user has voted
        const isVoted = await checkUser(userId, pollId);

        // Return the result
        return NextResponse.json({ message: 'Success', isVoted }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
