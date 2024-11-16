import { getPollDetails } from '@/app/actions/db';
import VotePage from '@/components/VotePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Vote",
  description: "Generate and share polls with ease",
};

async function Page({ params }: { params: Promise<{ pollId: string }> }) {
  const pollId = (await params).pollId
  const pollInfo = await getPollDetails(pollId);
  return <VotePage pollInfo={pollInfo} pollId={pollId}  />;
}

export default Page;
