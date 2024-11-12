'use client'
import { useState } from 'react';
import { ArrowRight, PlusCircle, Trash2, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

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

  const quotes = [
    "Every voice matters. Make yours count.",
    "Better decisions start with better polls.",
    "Shape the conversation. Start a poll.",
  ];

  return (
    <div className="relative w-full min-h-screen bg-zinc-50 dark:bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 via-transparent to-fuchsia-100/20 dark:from-violet-900/10 dark:to-fuchsia-900/10"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative border-b border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl bg-zinc-50/80 dark:bg-zinc-900/80">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Vote className="w-8 h-8 text-zinc-900 dark:text-white" />
              <span className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">Pollify</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        
        <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800 space-y-8">
            {/* Random Quote */}
            <p className="text-xl italic text-zinc-600 dark:text-zinc-400 text-center">
              "{quotes[Math.floor(Math.random() * quotes.length)]}"
            </p>

            <div>
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
                Create Your Poll
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Design your perfect poll with custom options and settings.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="question" className="block text-zinc-900 dark:text-white font-medium">
                Question
              </label>
              <Input
                id="question"
                name="question"
                required
                type="text"
                placeholder="What would you like to ask?"
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-zinc-900 dark:text-white font-medium">
                Options
              </label>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="h-10 w-10 flex-shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white font-semibold">
                      {index + 1}
                    </span>
                    <Input
                      type="text"
                      name={`option${index}`}
                      value={option}
                      required
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus:border-violet-500 focus:ring-violet-500"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => removeOption(index)}
                      className="text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={addOption}
                  className="w-full h-14 border-2 border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-400 hover:border-violet-500 dark:hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-xl font-medium transition-all duration-200"
            >
              {loading ? "Creating Poll..." : "Create Poll"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PollForm;