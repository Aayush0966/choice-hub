import { createPoll } from '@/app/actions/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId, question, options } = await req.json();

    if (!userId || !question || !options) {
        return NextResponse.json({ error: 'All fields are required' }, {status: 400});
    }

    const pollId = await createPoll(question, options, userId);

    return NextResponse.json({ message: 'Success', pollId }, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, {status: 500});
  }
}
