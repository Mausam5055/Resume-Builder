
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const SkillsForm = () => {
  const { resumeData, updateSection } = useResume();
  const { skills } = resumeData;

  const handleGroupNameChange = (groupIndex: number, name: string) => {
    const updatedSkills = [...skills];
    updatedSkills[groupIndex] = {
      ...updatedSkills[groupIndex],
      name,
    };
    updateSection('skills', updatedSkills);
  };

  const handleSkillChange = (groupIndex: number, skillIndex: number, field: string, value: any) => {
    const updatedSkills = [...skills];
    updatedSkills[groupIndex] = {
      ...updatedSkills[groupIndex],
      skills: [
        ...updatedSkills[groupIndex].skills.slice(0, skillIndex),
        {
          ...updatedSkills[groupIndex].skills[skillIndex],
          [field]: value,
        },
        ...updatedSkills[groupIndex].skills.slice(skillIndex + 1),
      ],
    };
    updateSection('skills', updatedSkills);
  };

  const addSkillGroup = () => {
    const newSkillGroup = {
      id: uuidv4(),
      name: 'New Skill Group',
      skills: [
        { id: uuidv4(), name: '', level: 3 },
      ],
    };
    updateSection('skills', [...skills, newSkillGroup]);
  };

  const removeSkillGroup = (groupIndex: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(groupIndex, 1);
    updateSection('skills', updatedSkills);
  };

  const addSkill = (groupIndex: number) => {
    const updatedSkills = [...skills];
    updatedSkills[groupIndex] = {
      ...updatedSkills[groupIndex],
      skills: [
        ...updatedSkills[groupIndex].skills,
        { id: uuidv4(), name: '', level: 3 },
      ],
    };
    updateSection('skills', updatedSkills);
  };

  const removeSkill = (groupIndex: number, skillIndex: number) => {
    const updatedSkills = [...skills];
    updatedSkills[groupIndex] = {
      ...updatedSkills[groupIndex],
      skills: [
        ...updatedSkills[groupIndex].skills.slice(0, skillIndex),
        ...updatedSkills[groupIndex].skills.slice(skillIndex + 1),
      ],
    };
    updateSection('skills', updatedSkills);
  };

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['0']} className="space-y-4">
        {skills.map((group, groupIndex) => (
          <AccordionItem
            key={group.id}
            value={groupIndex.toString()}
            className="border rounded-md overflow-hidden"
          >
            <div className="flex items-center px-4 py-2 bg-muted/30">
              <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-move" />
              <AccordionTrigger className="flex-1 hover:no-underline py-0">
                <span className="text-sm font-medium">
                  {group.name || 'New Skill Group'}
                </span>
              </AccordionTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => removeSkillGroup(groupIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`group-name-${group.id}`}>Skill Group Name</Label>
                  <Input
                    id={`group-name-${group.id}`}
                    value={group.name}
                    onChange={(e) => handleGroupNameChange(groupIndex, e.target.value)}
                    placeholder="Technical Skills, Soft Skills, etc."
                  />
                </div>

                <div className="space-y-4">
                  <Label>Skills</Label>
                  {group.skills.map((skill, skillIndex) => (
                    <div key={skill.id} className="flex items-center gap-3">
                      <Input
                        value={skill.name}
                        onChange={(e) => handleSkillChange(groupIndex, skillIndex, 'name', e.target.value)}
                        placeholder="Skill name"
                        className="flex-1"
                      />
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-12">Level: {skill.level}</span>
                        <Slider
                          value={[skill.level || 3]}
                          min={1}
                          max={5}
                          step={1}
                          onValueChange={([value]) => handleSkillChange(groupIndex, skillIndex, 'level', value)}
                          className="flex-1"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeSkill(groupIndex, skillIndex)}
                        disabled={group.skills.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => addSkill(groupIndex)}
                >
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Add Skill
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addSkillGroup}>
        <Plus className="mr-2 h-4 w-4" />
        Add Skill Group
      </Button>
    </div>
  );
};

export default SkillsForm;
