
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const proficiencyLevels = [
  { value: 'Elementary', label: 'Elementary' },
  { value: 'Limited Working', label: 'Limited Working' },
  { value: 'Professional Working', label: 'Professional Working' },
  { value: 'Full Professional', label: 'Full Professional' },
  { value: 'Native', label: 'Native' },
];

const LanguagesForm = () => {
  const { resumeData, updateSection } = useResume();
  const { languages = [] } = resumeData;

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value,
    };
    updateSection('languages', updatedLanguages);
  };

  const addLanguage = () => {
    const newLanguage = {
      id: uuidv4(),
      name: '',
      proficiency: 'Professional Working',
    };
    updateSection('languages', [...languages, newLanguage]);
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    updateSection('languages', updatedLanguages);
  };

  return (
    <div className="space-y-6">
      {languages.map((language, index) => (
        <div 
          key={language.id} 
          className="flex flex-col gap-4 p-4 border rounded-md"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-move" />
              <span className="font-medium">
                {language.name || 'New Language'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => removeLanguage(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`lang-name-${language.id}`}>Language</Label>
              <Input
                id={`lang-name-${language.id}`}
                value={language.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                placeholder="English, Spanish, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`lang-prof-${language.id}`}>Proficiency Level</Label>
              <Select
                value={language.proficiency}
                onValueChange={(value) => handleInputChange(index, 'proficiency', value)}
              >
                <SelectTrigger id={`lang-prof-${language.id}`}>
                  <SelectValue placeholder="Select proficiency level" />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full" onClick={addLanguage}>
        <Plus className="mr-2 h-4 w-4" />
        Add Language
      </Button>
    </div>
  );
};

export default LanguagesForm;
