
import { votePoll } from "@/app/actions/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {pollId, userId, optionId} = await req.json();

        if (!pollId || !userId || !optionId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 400 });
        }

        const result = await votePoll(userId, pollId, optionId);
        if (!result) {
            return NextResponse.json({ error: 'Poll has ended' }, { status: 403 });
        }
        return NextResponse.json({ message: 'Success' }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
