'use client';

import { PlusCircle, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function OptionSection() {
  const [options, setOptions] = useState<string[]>(['']); // Start with one empty option

  const addOption = () => {
    setOptions([...options, '']); // Add a new empty option
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };


  return (
    <div>
      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
        Options
      </label>
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <Input
              type="text"
              name={`option${index}`}
              value={option}
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
        type='button'
          variant="ghost"
          onClick={addOption}
          className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-violet-500 dark:hover:border-violet-400"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Option
        </Button>
      </div>
    </div>
  );
}

export default OptionSection;
