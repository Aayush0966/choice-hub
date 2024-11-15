'use client'
import { useState } from 'react';
import { ArrowRight, PlusCircle, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PollFormProps {
  createPoll: (event: React.FormEvent<HTMLFormElement>, options: string[], endTime: Date | null) => void;
  error: string;
  loading: boolean;
}

const PollForm: React.FC<PollFormProps> = ({ createPoll, error, loading }) => {  
  const [options, setOptions] = useState<string[]>(['', '']); 
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<string>('1h');

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    const now = new Date();
    
    switch (value) {
      case '1h':
        setEndTime(new Date(now.getTime() + 60 * 60 * 1000));
        break;
      case '6h':
        setEndTime(new Date(now.getTime() + 6 * 60 * 60 * 1000));
        break;
      case '12h':
        setEndTime(new Date(now.getTime() + 12 * 60 * 60 * 1000));
        break;
      case '24h':
        setEndTime(new Date(now.getTime() + 24 * 60 * 60 * 1000));
        break;
      case '48h':
        setEndTime(new Date(now.getTime() + 48 * 60 * 60 * 1000));
        break;
      case '1w':
        setEndTime(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000));
        break;
      default:
        setEndTime(null);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createPoll(event, options, endTime)
  }

  return (
    <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 animate-shake">
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0">⚠️</span>
              {error}
            </div>
          </div>
        )}
        
        <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 space-y-8">
            {/* Form Header */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Create Your
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
                  Perfect Poll
                </span>
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">
                Design polls that inspire meaningful engagement and drive results.
              </p>
            </div>

            <div className="space-y-3">
              <label htmlFor="question" className="block text-zinc-900 dark:text-white font-medium text-lg">
                Your Question
              </label>
              <Input
                id="question"
                name="question"
                required
                type="text"
                placeholder="What would you like to ask?"
                className="w-full text-lg h-14 bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl transition-all duration-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-zinc-900 dark:text-white font-medium text-lg">
                Poll Duration
              </label>
              <Select value={duration} onValueChange={handleDurationChange}>
                <SelectTrigger className="w-full h-14 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl transition-all duration-200">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-violet-500 dark:text-violet-400" />
                    <SelectValue placeholder="Select duration" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                  <SelectItem className="hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:bg-zinc-100 dark:focus:bg-zinc-700 cursor-pointer transition-colors duration-200" value="1h">1 hour</SelectItem>
                  <SelectItem className="hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:bg-zinc-100 dark:focus:bg-zinc-700 cursor-pointer transition-colors duration-200" value="6h">6 hours</SelectItem>
                  <SelectItem className="hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:bg-zinc-100 dark:focus:bg-zinc-700 cursor-pointer transition-colors duration-200" value="12h">12 hours</SelectItem>
                  <SelectItem className="hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:bg-zinc-100 dark:focus:bg-zinc-700 cursor-pointer transition-colors duration-200" value="24h">24 hours</SelectItem>
                  <SelectItem className="hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:bg-zinc-100 dark:focus:bg-zinc-700 cursor-pointer transition-colors duration-200" value="48h">48 hours</SelectItem>
                  <SelectItem className="hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:bg-zinc-100 dark:focus:bg-zinc-700 cursor-pointer transition-colors duration-200" value="1w">1 week</SelectItem>
                </SelectContent>
              </Select>
              {endTime && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Poll will end on: {endTime.toLocaleString()}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-zinc-900 dark:text-white font-medium text-lg">
                Poll Options
              </label>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div 
                    key={index} 
                    className="group flex items-center gap-3 animate-fade-in"
                  >
                    <span className="h-14 w-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-400/10 dark:to-fuchsia-400/10 flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold text-lg">
                      {index + 1}
                    </span>
                    <Input
                      type="text"
                      name={`option${index}`}
                      value={option}
                      required
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="flex-1 h-14 bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl transition-all duration-200"
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => removeOption(index)}
                      className="h-14 w-14 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 transition-all duration-200"
                      disabled={options.length <= 2}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={addOption}
                  className="w-full h-14 border-2 border-dashed border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-violet-500 dark:hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 rounded-xl transition-all duration-200 hover:bg-gradient-to-br hover:from-violet-500/5 hover:to-fuchsia-500/5"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-lg font-medium transition-all duration-200 group"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Poll...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Create Poll
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
  );
};

export default PollForm;