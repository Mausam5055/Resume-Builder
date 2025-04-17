
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ReferencesForm = () => {
  const { resumeData, updateSection } = useResume();
  const { references = [] } = resumeData;

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedReferences = [...references];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value,
    };
    updateSection('references', updatedReferences);
  };

  const addReference = () => {
    const newReference = {
      id: uuidv4(),
      name: '',
      company: '',
      position: '',
      email: '',
      phone: '',
      relation: '',
    };
    updateSection('references', [...references, newReference]);
  };

  const removeReference = (index: number) => {
    const updatedReferences = [...references];
    updatedReferences.splice(index, 1);
    updateSection('references', updatedReferences);
  };

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['0']} className="space-y-4">
        {references.map((reference, refIndex) => (
          <AccordionItem
            key={reference.id}
            value={refIndex.toString()}
            className="border rounded-md overflow-hidden"
          >
            <div className="flex items-center px-4 py-2 bg-muted/30">
              <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-move" />
              <AccordionTrigger className="flex-1 hover:no-underline py-0">
                <span className="text-sm font-medium">
                  {reference.name || 'New Reference'}{reference.company ? ` - ${reference.company}` : ''}
                </span>
              </AccordionTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => removeReference(refIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ref-name-${reference.id}`}>Full Name</Label>
                    <Input
                      id={`ref-name-${reference.id}`}
                      value={reference.name}
                      onChange={(e) => handleInputChange(refIndex, 'name', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-relation-${reference.id}`}>Relationship</Label>
                    <Input
                      id={`ref-relation-${reference.id}`}
                      value={reference.relation || ''}
                      onChange={(e) => handleInputChange(refIndex, 'relation', e.target.value)}
                      placeholder="Manager, Colleague, Professor, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ref-company-${reference.id}`}>Company</Label>
                    <Input
                      id={`ref-company-${reference.id}`}
                      value={reference.company}
                      onChange={(e) => handleInputChange(refIndex, 'company', e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-position-${reference.id}`}>Position</Label>
                    <Input
                      id={`ref-position-${reference.id}`}
                      value={reference.position}
                      onChange={(e) => handleInputChange(refIndex, 'position', e.target.value)}
                      placeholder="Job Title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ref-email-${reference.id}`}>Email</Label>
                    <Input
                      id={`ref-email-${reference.id}`}
                      type="email"
                      value={reference.email || ''}
                      onChange={(e) => handleInputChange(refIndex, 'email', e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-phone-${reference.id}`}>Phone (Optional)</Label>
                    <Input
                      id={`ref-phone-${reference.id}`}
                      value={reference.phone || ''}
                      onChange={(e) => handleInputChange(refIndex, 'phone', e.target.value)}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addReference}>
        <Plus className="mr-2 h-4 w-4" />
        Add Reference
      </Button>
    </div>
  );
};

export default ReferencesForm;
