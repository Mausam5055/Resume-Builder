
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, GripVertical, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ProjectsForm = () => {
  const { resumeData, updateSection } = useResume();
  const { projects = [] } = resumeData;

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    updateSection('projects', updatedProjects);
  };

  const handleTechChange = (projectIndex: number, techIndex: number, value: string) => {
    const updatedProjects = [...projects];
    const technologies = [...(updatedProjects[projectIndex].technologies || [])];
    technologies[techIndex] = value;
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      technologies,
    };
    updateSection('projects', updatedProjects);
  };

  const addTechnology = (projectIndex: number) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      technologies: [...(updatedProjects[projectIndex].technologies || []), ''],
    };
    updateSection('projects', updatedProjects);
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const updatedProjects = [...projects];
    const technologies = [...(updatedProjects[projectIndex].technologies || [])];
    technologies.splice(techIndex, 1);
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      technologies,
    };
    updateSection('projects', updatedProjects);
  };

  const addProject = () => {
    const newProject = {
      id: uuidv4(),
      name: '',
      description: '',
      url: '',
      technologies: [''],
    };
    updateSection('projects', [...projects, newProject]);
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    updateSection('projects', updatedProjects);
  };

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['0']} className="space-y-4">
        {projects.map((project, projectIndex) => (
          <AccordionItem
            key={project.id}
            value={projectIndex.toString()}
            className="border rounded-md overflow-hidden"
          >
            <div className="flex items-center px-4 py-2 bg-muted/30">
              <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-move" />
              <AccordionTrigger className="flex-1 hover:no-underline py-0">
                <span className="text-sm font-medium">
                  {project.name || 'New Project'}
                </span>
              </AccordionTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => removeProject(projectIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`project-name-${project.id}`}>Project Name</Label>
                  <Input
                    id={`project-name-${project.id}`}
                    value={project.name}
                    onChange={(e) => handleInputChange(projectIndex, 'name', e.target.value)}
                    placeholder="Portfolio Website, Mobile App, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`project-desc-${project.id}`}>Description</Label>
                  <Textarea
                    id={`project-desc-${project.id}`}
                    value={project.description}
                    onChange={(e) => handleInputChange(projectIndex, 'description', e.target.value)}
                    placeholder="Brief description of the project, its purpose, and your role..."
                    className="resize-y"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`project-url-${project.id}`}>Project URL (Optional)</Label>
                  <Input
                    id={`project-url-${project.id}`}
                    value={project.url || ''}
                    onChange={(e) => handleInputChange(projectIndex, 'url', e.target.value)}
                    placeholder="https://myproject.com"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Technologies Used</Label>
                  {(project.technologies || []).map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center gap-2">
                      <Input
                        value={tech}
                        onChange={(e) => handleTechChange(projectIndex, techIndex, e.target.value)}
                        placeholder="React, Python, etc."
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeTechnology(projectIndex, techIndex)}
                        disabled={(project.technologies || []).length <= 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => addTechnology(projectIndex)}
                  >
                    <Plus className="mr-2 h-3.5 w-3.5" />
                    Add Technology
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addProject}>
        <Plus className="mr-2 h-4 w-4" />
        Add Project
      </Button>
    </div>
  );
};

export default ProjectsForm;
