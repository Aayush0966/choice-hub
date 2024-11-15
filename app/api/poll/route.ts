import { createPoll, removePoll } from '@/app/actions/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId, question, options, endTime   } = await req.json();

    if (!userId || !question || !options || !endTime) {
        return NextResponse.json({ error: 'All fields are required' }, {status: 400});
    }

    const pollId = await createPoll(question, options, userId, endTime);

    return NextResponse.json({ message: 'Success', pollId }, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, {status: 500});
  }
}
export async function DELETE(req: Request) {
  try {
    const {userId, pollId} = await req.json();
    if (!userId || !pollId) {
      return NextResponse.json({ error: 'All fields are required' }, {status: 400});
  }
    await removePoll(pollId);
    return NextResponse.json({ message: 'Success' }, {status: 200});

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, {status: 500});
  }
}
