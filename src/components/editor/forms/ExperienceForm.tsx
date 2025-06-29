import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Experience } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus, GripVertical, Wand2, Sparkles } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AIAssistant from './AIAssistant';

const ExperienceForm = () => {
  const { resumeData, updateSection } = useResume();
  const { experience } = resumeData;
  const [showAI, setShowAI] = useState<{ [key: string]: boolean }>({});

  const handleInputChange = (index: number, field: keyof Experience, value: string | boolean) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    
    // If current position is toggled on, we need to clear the end date
    if (field === 'isCurrentPosition' && value === true) {
      updatedExperience[index].endDate = '';
    }
    
    updateSection('experience', updatedExperience);
  };

  const handleBulletChange = (experienceIndex: number, bulletIndex: number, value: string) => {
    const updatedExperience = [...experience];
    const updatedBullets = [...updatedExperience[experienceIndex].bullets];
    updatedBullets[bulletIndex] = value;
    
    updatedExperience[experienceIndex] = {
      ...updatedExperience[experienceIndex],
      bullets: updatedBullets
    };
    
    updateSection('experience', updatedExperience);
  };

  const addBullet = (experienceIndex: number) => {
    const updatedExperience = [...experience];
    updatedExperience[experienceIndex] = {
      ...updatedExperience[experienceIndex],
      bullets: [...updatedExperience[experienceIndex].bullets, '']
    };
    
    updateSection('experience', updatedExperience);
  };

  const removeBullet = (experienceIndex: number, bulletIndex: number) => {
    const updatedExperience = [...experience];
    const updatedBullets = [...updatedExperience[experienceIndex].bullets];
    updatedBullets.splice(bulletIndex, 1);
    
    updatedExperience[experienceIndex] = {
      ...updatedExperience[experienceIndex],
      bullets: updatedBullets
    };
    
    updateSection('experience', updatedExperience);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentPosition: false,
      description: '',
      bullets: ['']
    };
    
    updateSection('experience', [...experience, newExperience]);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    updateSection('experience', updatedExperience);
  };

  const handleAISuggestion = (experienceIndex: number, suggestion: string) => {
    const updatedExperience = [...experience];
    updatedExperience[experienceIndex] = {
      ...updatedExperience[experienceIndex],
      description: suggestion
    };
    updateSection('experience', updatedExperience);
  };

  const toggleAI = (experienceId: string) => {
    setShowAI(prev => ({
      ...prev,
      [experienceId]: !prev[experienceId]
    }));
  };

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['0']} className="space-y-4">
        {experience.map((exp, expIndex) => (
          <AccordionItem 
            key={exp.id} 
            value={expIndex.toString()}
            className="border rounded-md overflow-hidden"
          >
            <div className="flex items-center px-4 py-2 bg-muted/30">
              <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-move" />
              <AccordionTrigger className="flex-1 hover:no-underline py-0">
                <span className="text-sm font-medium">
                  {exp.position ? exp.position : 'New Position'}
                  {exp.company ? ` at ${exp.company}` : ''}
                </span>
              </AccordionTrigger>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive hover:text-destructive" 
                onClick={() => removeExperience(expIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`position-${exp.id}`}>Position</Label>
                    <Input 
                      id={`position-${exp.id}`}
                      value={exp.position}
                      onChange={(e) => handleInputChange(expIndex, 'position', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                    <Input 
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={(e) => handleInputChange(expIndex, 'company', e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                    <Input 
                      id={`startDate-${exp.id}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleInputChange(expIndex, 'startDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs">Current</span>
                        <Switch 
                          checked={exp.isCurrentPosition} 
                          onCheckedChange={(checked) => handleInputChange(expIndex, 'isCurrentPosition', checked)}
                        />
                      </div>
                    </div>
                    <Input 
                      id={`endDate-${exp.id}`}
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleInputChange(expIndex, 'endDate', e.target.value)}
                      disabled={exp.isCurrentPosition}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`description-${exp.id}`}>Role Description</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 gap-1"
                      onClick={() => toggleAI(exp.id)}
                    >
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      <span className="text-xs">AI Help</span>
                    </Button>
                  </div>
                  <Textarea 
                    id={`description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) => handleInputChange(expIndex, 'description', e.target.value)}
                    placeholder="Briefly describe your role and responsibilities..."
                    className="resize-y"
                    rows={2}
                  />
                  
                  <Collapsible open={showAI[exp.id]} onOpenChange={() => toggleAI(exp.id)}>
                    <CollapsibleContent>
                      <AIAssistant
                        section="experience"
                        currentContent={exp.description}
                        onSuggestionApply={(suggestion) => handleAISuggestion(expIndex, suggestion)}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Key Achievements</Label>
                    <Button variant="ghost" size="sm" className="h-7 gap-1">
                      <Wand2 className="h-3 w-3" />
                      <span className="text-xs">Generate</span>
                    </Button>
                  </div>
                  
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="flex items-start gap-2">
                      <div className="mt-2.5 min-w-[6px] h-[6px] rounded-full bg-primary" />
                      <Input 
                        value={bullet}
                        onChange={(e) => handleBulletChange(expIndex, bulletIndex, e.target.value)}
                        placeholder="Specific achievement or responsibility..."
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 text-destructive hover:text-destructive"
                        onClick={() => removeBullet(expIndex, bulletIndex)}
                        disabled={exp.bullets.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full"
                    onClick={() => addBullet(expIndex)}
                  >
                    <Plus className="mr-2 h-3.5 w-3.5" />
                    Add Bullet Point
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <Button 
        variant="outline"
        className="w-full"
        onClick={addExperience}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Work Experience
      </Button>
    </div>
  );
};

export default ExperienceForm;