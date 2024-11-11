import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OptionSection from './OptionSection';
import { createPoll } from '@/app/actions/db';
import { getOrCreateUserId } from '@/lib/cookies';

const PollForm = () => {

  const handleForm = async (formData: FormData) => {
    'use server'
   const userId =  await getOrCreateUserId();
   const question = formData.get("question");
   const options: Record<string, string> = {};

  const optionsCount = 5; 

  for (let i = 0; i < optionsCount; i++) {
    const option = formData.get(`option${i}`);
    
    if (typeof option === 'string') {
      options[`option${i}`] = option;
    }
  }

  if (question && Object.keys(options).length > 0 && userId) {
    await createPoll(question, options, userId);
  } else {
    console.error("Form is incomplete. Please provide all fields.");
  }
    }

  return (
    <div className="min-h-screen relative bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
       <div className="absolute inset-0">
        <div className="absolute w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 via-transparent to-fuchsia-100/20 dark:from-violet-900/10 dark:to-fuchsia-900/10"></div>
        </div>
      </div>
      <form action={handleForm} className="relative max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create a Poll
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Design your perfect poll with custom options and settings.
            </p>
          </div>

          <div>
            <label htmlFor="question" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Question
            </label>
            <Input
              id="question"
              name="question"
              type="text"
              placeholder="What would you like to ask?"
              className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>

          <OptionSection />

          <Button type='submit' className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-md font-medium">
            Create Poll
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PollForm;