import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Summary } from '@/types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Wand2, Sparkles } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AIAssistant from './AIAssistant';

const SummaryForm = () => {
  const { resumeData, updateSection } = useResume();
  const summary = resumeData.summary || { text: '' };
  const [showAI, setShowAI] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedSummary: Summary = {
      ...summary,
      text: e.target.value
    };
    
    updateSection('summary', updatedSummary);
  };

  const handleAISuggestion = (suggestion: string) => {
    const updatedSummary: Summary = {
      ...summary,
      text: suggestion
    };
    
    updateSection('summary', updatedSummary);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="summary">Professional Summary</Label>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1.5"
          onClick={() => setShowAI(!showAI)}
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs">AI Assistant</span>
        </Button>
      </div>
      
      <Textarea
        id="summary"
        value={summary.text}
        onChange={handleTextChange}
        placeholder="Write a brief summary of your professional background, key skills, and career goals..."
        className="min-h-[120px] resize-y"
      />
      
      <Collapsible open={showAI} onOpenChange={setShowAI}>
        <CollapsibleContent>
          <AIAssistant
            section="summary"
            currentContent={summary.text}
            onSuggestionApply={handleAISuggestion}
          />
        </CollapsibleContent>
      </Collapsible>
      
      <div className="text-xs text-muted-foreground">
        Tip: Keep your summary concise (3-5 sentences) and focused on your most relevant qualifications.
      </div>
    </div>
  );
};

export default SummaryForm;