import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useResume } from '@/context/ResumeContext';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import EditorToolbar from '@/components/editor/EditorToolbar';
import EditorSidebar from '@/components/editor/EditorSidebar';
import TemplateColorPicker from '@/components/editor/TemplateColorPicker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Sparkles, Eye, Pencil, Palette } from 'lucide-react';
import PersonalInfoForm from '@/components/editor/forms/PersonalInfoForm';
import SummaryForm from '@/components/editor/forms/SummaryForm';
import ExperienceForm from '@/components/editor/forms/ExperienceForm';
import EducationForm from '@/components/editor/forms/EducationForm';
import SkillsForm from '@/components/editor/forms/SkillsForm';
import ProjectsForm from '@/components/editor/forms/ProjectsForm';
import LanguagesForm from '@/components/editor/forms/LanguagesForm';
import CertificatesForm from '@/components/editor/forms/CertificatesForm';
import ReferencesForm from '@/components/editor/forms/ReferencesForm';
import ResumePreview from '@/components/editor/preview/ResumePreview';

const EditorPage = () => {
  const { resumeData, changeTemplate } = useResume();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('edit');
  const [activeSection, setActiveSection] = useState('personal');
  const [activeEditTab, setActiveEditTab] = useState('content');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Handle template from URL parameter
  useEffect(() => {
    const template = searchParams.get('template');
    if (template && ['jamie', 'lauren', 'juan', 'richard'].includes(template)) {
      changeTemplate(template as any);
    }
  }, [searchParams, changeTemplate]);

  // Close sidebar on mobile when section changes
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [activeSection, isMobile]);

  // Reset sidebar state when screen size changes
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleSectionSelect = (section: string | null) => {
    if (section) {
      setActiveSection(section);
      setActiveEditTab('content');
    }
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const renderFormSection = () => {
    if (activeEditTab === 'design') {
      return (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Template Design</h2>
          <div className="bg-card p-6 rounded-lg border border-border">
            <TemplateColorPicker />
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'personal':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <PersonalInfoForm />
            </div>
          </div>
        );
      case 'summary':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <SummaryForm />
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <ExperienceForm />
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <EducationForm />
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <SkillsForm />
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <ProjectsForm />
            </div>
          </div>
        );
      case 'languages':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Languages</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <LanguagesForm />
            </div>
          </div>
        );
      case 'certificates':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Certificates</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <CertificatesForm />
            </div>
          </div>
        );
      case 'references':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">References</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <ReferencesForm />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center p-12">
            <p className="text-muted-foreground">Select a section from the sidebar to edit</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <EditorToolbar 
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex-1 overflow-hidden">
        {isMobile ? (
          <div className="h-full flex flex-col">
            <EditorSidebar 
              onSectionSelect={handleSectionSelect}
              isOpen={isSidebarOpen}
            />
            
            <div className={cn(
              "flex-1 h-[calc(100vh-3.5rem)] overflow-hidden flex flex-col",
              isSidebarOpen && "opacity-50 pointer-events-none"
            )}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <div className="border-b border-border px-2 flex-shrink-0">
                  <TabsList className="h-12">
                    <TabsTrigger value="edit" className="gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="edit" className="flex-1 overflow-hidden data-[state=active]:flex flex-col">
                  <div className="p-3 border-b border-border bg-muted/30 flex-shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <p className="text-sm text-muted-foreground">
                        Currently editing the <span className="font-medium text-foreground">
                          {resumeData.activeTemplate === 'jamie' ? 'Jamie Smith' : 
                           resumeData.activeTemplate === 'lauren' ? 'Lauren Chen' : 
                           resumeData.activeTemplate === 'juan' ? 'Juan Hernandez' : 'Richard Sanchez'} 
                        </span> template
                      </p>
                      
                      <Tabs value={activeEditTab} onValueChange={setActiveEditTab} className="w-auto">
                        <TabsList>
                          <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
                          <TabsTrigger value="design" className="text-xs gap-1">
                            <Palette className="h-3.5 w-3.5" />
                            Design
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <Button variant="outline" className="gap-2 mt-2 w-full sm:w-auto" size="sm">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      Ask AI for suggestions
                    </Button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto">
                    <div className="max-w-3xl mx-auto p-4">
                      {renderFormSection()}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="flex-1 overflow-y-auto p-0 data-[state=active]:block">
                  <div className="w-full min-h-full bg-muted/30">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full resume-preview-container"
                    >
                      <ResumePreview />
                    </motion.div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <EditorSidebar 
                onSectionSelect={handleSectionSelect}
                isOpen={isSidebarOpen}
              />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={80}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <div className="border-b border-border px-4">
                  <TabsList className="h-12">
                    <TabsTrigger value="edit" className="gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="edit" className="flex-1 overflow-auto p-0 data-[state=active]:flex flex-col">
                  <div className="p-4 border-b border-border bg-muted/30">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Currently editing the <span className="font-medium text-foreground">
                          {resumeData.activeTemplate === 'jamie' ? 'Jamie Smith' : 
                           resumeData.activeTemplate === 'lauren' ? 'Lauren Chen' : 
                           resumeData.activeTemplate === 'juan' ? 'Juan Hernandez' : 'Richard Sanchez'} 
                        </span> template
                      </p>
                      
                      <Tabs value={activeEditTab} onValueChange={setActiveEditTab} className="w-auto">
                        <TabsList>
                          <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
                          <TabsTrigger value="design" className="text-xs gap-1">
                            <Palette className="h-3.5 w-3.5" />
                            Design
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <Button variant="outline" className="gap-2" size="sm">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      Ask AI for suggestions
                    </Button>
                  </div>
                  
                  <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-3xl mx-auto">
                      {renderFormSection()}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="flex-1 overflow-auto p-0 data-[state=active]:block">
                  <div className="w-full h-full bg-muted/30">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full resume-preview-container"
                    >
                      <ResumePreview />
                    </motion.div>
                  </div>
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};

export default EditorPage;
