import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollableTabsList } from '@/components/ui/scrollable-tabs-list';
import { cn } from '@/lib/utils';

interface ModelSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  models: string[];
  modelDisplayNames: Record<string, string>;
  className?: string;
}

const ModelSelector = ({ 
  value, 
  onValueChange, 
  models, 
  modelDisplayNames, 
  className 
}: ModelSelectorProps) => {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={cn("w-full", className)}>
      <ScrollableTabsList>
        <TabsList className="inline-flex h-10 items-center justify-center rounded-[10px] bg-white border border-gray-300 p-1 text-gray-600 shadow-sm">
          {models.map((model) => (
            <TabsTrigger
              key={model}
              value={model}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-[8px] px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#36322F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#36322F] data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-gray-100 data-[state=active]:hover:bg-[#4a4542]"
            >
              {modelDisplayNames[model] || model}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollableTabsList>
    </Tabs>
  );
};

export { ModelSelector };