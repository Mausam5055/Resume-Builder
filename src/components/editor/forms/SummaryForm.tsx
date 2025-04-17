
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Summary } from '@/types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

const SummaryForm = () => {
  const { resumeData, updateSection } = useResume();
  const summary = resumeData.summary || { text: '' };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedSummary: Summary = {
      ...summary,
      text: e.target.value
    };
    
    updateSection('summary', updatedSummary);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="summary">Professional Summary</Label>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Wand2 className="h-3.5 w-3.5" />
          <span className="text-xs">AI Suggestions</span>
        </Button>
      </div>
      
      <Textarea
        id="summary"
        value={summary.text}
        onChange={handleTextChange}
        placeholder="Write a brief summary of your professional background, key skills, and career goals..."
        className="min-h-[120px] resize-y"
      />
      
      <div className="text-xs text-muted-foreground">
        Tip: Keep your summary concise (3-5 sentences) and focused on your most relevant qualifications.
      </div>
    </div>
  );
};

export default SummaryForm;
