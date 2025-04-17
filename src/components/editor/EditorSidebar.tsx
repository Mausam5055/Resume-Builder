import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { ResumeSection } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { 
  FileText, 
  UserCircle, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Folder, 
  Globe, 
  Award, 
  Users,
  Download,
  Save,
  Undo,
} from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface EditorSidebarProps {
  onSectionSelect?: (section: ResumeSection) => void;
  isOpen?: boolean;
}

const EditorSidebar = ({ onSectionSelect, isOpen = true }: EditorSidebarProps) => {
  const { resumeData, toggleSection } = useResume();
  const { sections } = resumeData;
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Sort sections by their order property
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);
  
  // Get icon component for section
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'user': return <UserCircle className="h-4 w-4" />;
      case 'file-text': return <FileText className="h-4 w-4" />;
      case 'briefcase': return <Briefcase className="h-4 w-4" />;
      case 'graduation-cap': return <GraduationCap className="h-4 w-4" />;
      case 'star': return <Star className="h-4 w-4" />;
      case 'folder': return <Folder className="h-4 w-4" />;
      case 'globe': return <Globe className="h-4 w-4" />;
      case 'award': return <Award className="h-4 w-4" />;
      case 'users': return <Users className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <>
      <div className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col",
        isMobile ? [
          "fixed top-14 left-0 z-40 w-64 h-[calc(100vh-3.5rem)]",
          "transform transition-transform duration-300 ease-in-out",
          !isOpen && "-translate-x-full"
        ] : "h-full w-full relative"
      )}>
        <div className="p-4 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Resume Builder</h2>
          <p className="text-xs text-sidebar-foreground/70">Build your professional resume</p>
        </div>
        
        <div className="flex-1 px-2 py-2 overflow-y-auto">
          <div className="mb-1 px-3 py-1.5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">Sections</h3>
          </div>
          
          <div className="space-y-1">
            {sortedSections.map((section) => (
              <div key={section.id} className="flex items-center justify-between px-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start gap-2 rounded px-2 py-1 text-sidebar-foreground font-normal",
                    !section.enabled && "opacity-60"
                  )}
                  onClick={() => onSectionSelect?.(section.id)}
                >
                  {getIconComponent(section.icon)}
                  <span className="truncate">{section.title}</span>
                </Button>
                
                <Toggle
                  size="sm"
                  pressed={section.enabled}
                  onPressedChange={() => toggleSection(section.id)}
                  aria-label={`Toggle ${section.title}`}
                >
                  <div className={cn(
                    "h-3 w-3 rounded-full",
                    section.enabled ? "bg-sidebar-primary" : "bg-sidebar-border"
                  )} />
                </Toggle>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Save className="h-4 w-4" />
              <span>Save</span>
            </Button>
            
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="w-full gap-2 text-sidebar-foreground/70 col-span-2">
              <Undo className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          </div>
        </div>
      </div>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          style={{ top: '3.5rem' }}
          onClick={() => onSectionSelect?.(null)}
        />
      )}
    </>
  );
};

export default EditorSidebar;
