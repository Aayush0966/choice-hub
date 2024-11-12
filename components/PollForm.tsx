'use client'
import { useState } from 'react';
import { ArrowRight, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PollFormProps {
  createPoll: (event: React.FormEvent<HTMLFormElement>, options: string[]) => void;
  error: string;
  loading: boolean;
}

const PollForm: React.FC<PollFormProps> = ({ createPoll, error, loading }) => {  
  const [options, setOptions] = useState<string[]>(['']); 

  const addOption = () => {
    setOptions([...options, '']);
  };



  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
   createPoll(event, options)
  }


  return (
    <div className="min-h-screen relative bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 via-transparent to-fuchsia-100/20 dark:from-violet-900/10 dark:to-fuchsia-900/10"></div>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleFormSubmit} className="relative max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create a Poll</h2>
          <p className="text-gray-600 dark:text-gray-400">Design your perfect poll with custom options and settings.</p>

          <div>
            <label htmlFor="question" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Question</label>
            <Input
              id="question"
              name="question"
              required
              type="text"
              placeholder="What would you like to ask?"
              className="w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Options</label>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    type="text"
                    name={`option${index}`}
                    value={option}
                    required
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 dark:border-gray-600 focus:border-violet-500 focus:ring-violet-500"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => removeOption(index)}
                    className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                onClick={addOption}
                className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-violet-500 dark:hover:border-violet-400"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-md font-medium"
          >
            {loading ? "Creating Poll..." : "Create Poll"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PollForm;
