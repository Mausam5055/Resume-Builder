
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const EducationForm = () => {
  const { resumeData, updateSection } = useResume();
  const { education } = resumeData;

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    updateSection('education', updatedEducation);
  };

  const addEducation = () => {
    const newEducation = {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    };
    updateSection('education', [...education, newEducation]);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    updateSection('education', updatedEducation);
  };

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['0']} className="space-y-4">
        {education.map((edu, eduIndex) => (
          <AccordionItem
            key={edu.id}
            value={eduIndex.toString()}
            className="border rounded-md overflow-hidden"
          >
            <div className="flex items-center px-4 py-2 bg-muted/30">
              <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-move" />
              <AccordionTrigger className="flex-1 hover:no-underline py-0">
                <span className="text-sm font-medium">
                  {edu.degree ? `${edu.degree} in ${edu.field}` : 'New Degree'}{edu.institution ? ` at ${edu.institution}` : ''}
                </span>
              </AccordionTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => removeEducation(eduIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => handleInputChange(eduIndex, 'institution', e.target.value)}
                      placeholder="University or School Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) => handleInputChange(eduIndex, 'degree', e.target.value)}
                      placeholder="Bachelor of Science, Master's, etc."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                  <Input
                    id={`field-${edu.id}`}
                    value={edu.field}
                    onChange={(e) => handleInputChange(eduIndex, 'field', e.target.value)}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${edu.id}`}
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => handleInputChange(eduIndex, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${edu.id}`}
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => handleInputChange(eduIndex, 'endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                  <Input
                    id={`gpa-${edu.id}`}
                    value={edu.gpa || ''}
                    onChange={(e) => handleInputChange(eduIndex, 'gpa', e.target.value)}
                    placeholder="3.8"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${edu.id}`}>Description (Optional)</Label>
                  <Textarea
                    id={`description-${edu.id}`}
                    value={edu.description || ''}
                    onChange={(e) => handleInputChange(eduIndex, 'description', e.target.value)}
                    placeholder="Relevant coursework, achievements, or other details about your education..."
                    className="resize-y"
                    rows={2}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addEducation}>
        <Plus className="mr-2 h-4 w-4" />
        Add Education
      </Button>
    </div>
  );
};

export default EducationForm;
