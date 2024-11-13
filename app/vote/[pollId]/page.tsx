import { getPollDetails } from '@/app/actions/db';
import VotePage from '@/components/VotePage';

async function Page({ params }: { params: { pollId: string } }) {
  const pollId = await params.pollId;
    const pollInfo = await getPollDetails(pollId);
    return <VotePage pollInfo={pollInfo} pollId={pollId}  />;
}

export default Page;
