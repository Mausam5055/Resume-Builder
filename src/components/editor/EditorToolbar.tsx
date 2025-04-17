import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Download,
  Undo,
  Redo,
  RefreshCw,
  Save,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import { ThemeMode } from '@/types';
import html2pdf from 'html2pdf.js';
import { toast } from 'sonner';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  isSidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

const EditorToolbar = ({ isSidebarOpen, onSidebarToggle }: EditorToolbarProps) => {
  const { resumeData, resetToDefault, theme, setTheme } = useResume();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleSave = () => {
    try {
      // Generate A4 PDF
      const element = document.querySelector('.resume-preview-container > div');
      if (!element) {
        toast.error('Could not find resume to save');
        return;
      }

      const opt = {
        margin: 0,
        filename: `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
      toast.success('Resume saved as PDF');
    } catch (error) {
      console.error('Failed to save PDF:', error);
      toast.error('Failed to save PDF');
    }
  };

  const handleExport = () => {
    try {
      // Export resume to PDF with higher quality
      const element = document.querySelector('.resume-preview-container > div');
      if (!element) {
        toast.error('Could not find resume to export');
        return;
      }

      const opt = {
        margin: 0,
        filename: `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 4, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
      toast.success('Resume exported as PDF');
    } catch (error) {
      console.error('Failed to export PDF:', error);
      toast.error('Failed to export PDF');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to default template? All your changes will be lost.')) {
      resetToDefault();
      toast.success('Resume reset to default');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'amoled' : 'light');
  };

  const ThemeIcon = () => {
    return theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />;
  };

  return (
    <div className="h-14 border-b border-border flex items-center justify-between px-2 sm:px-4 bg-background">
      <div className="flex items-center gap-2">
        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onSidebarToggle}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        ) : (
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <span className="font-medium hidden sm:inline">Resume Editor</span>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8"
          aria-label="Toggle theme"
        >
          <ThemeIcon />
        </Button>

        <div className="hidden sm:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="h-8 w-8"
          aria-label="Reset"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>

        <Button
          variant="secondary"
          className="h-8 gap-1.5"
          onClick={handleSave}
          aria-label="Save"
        >
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline-block">Save</span>
        </Button>

        <Button
          variant="default"
          className="h-8 gap-1.5"
          onClick={handleExport}
          aria-label="Export PDF"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline-block">Export PDF</span>
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
