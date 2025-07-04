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
  X,
  Printer,
  Share2
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
      // Save to localStorage
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      toast.success('Resume saved successfully');
    } catch (error) {
      console.error('Failed to save resume:', error);
      toast.error('Failed to save resume');
    }
  };

  const handleExport = async () => {
    try {
      const element = document.querySelector('.resume-preview-container > div');
      if (!element) {
        toast.error('Could not find resume to export');
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading('Generating PDF...');

      // Calculate dynamic page size based on content
      const elementHeight = element.scrollHeight;
      const elementWidth = element.scrollWidth;
      
      // A4 dimensions in mm
      const a4Width = 210;
      const a4Height = 297;
      
      // Calculate required height based on content
      const aspectRatio = elementWidth / elementHeight;
      let pdfWidth = a4Width;
      let pdfHeight = Math.max(a4Height, pdfWidth / aspectRatio);

      const opt = {
        margin: [5, 5, 5, 5],
        filename: `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: elementWidth,
          height: elementHeight
        },
        jsPDF: { 
          unit: 'mm', 
          format: [pdfWidth, pdfHeight], 
          orientation: 'portrait',
          compress: true
        }
      };

      await html2pdf().set(opt).from(element).save();
      
      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Resume exported as PDF successfully');
    } catch (error) {
      console.error('Failed to export PDF:', error);
      toast.error('Failed to export PDF. Please try again.');
    }
  };

  const handlePrint = () => {
    try {
      const element = document.querySelector('.resume-preview-container > div');
      if (!element) {
        toast.error('Could not find resume to print');
        return;
      }

      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error('Please allow popups to print');
        return;
      }

      // Get the HTML content
      const htmlContent = element.outerHTML;
      
      // Create print-friendly HTML
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Resume - ${resumeData.personal.fullName}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: Arial, sans-serif; }
              @media print {
                body { margin: 0; }
                .resume-preview-container > div {
                  width: 100% !important;
                  height: auto !important;
                  box-shadow: none !important;
                }
              }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      
      // Wait for content to load then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
      
      toast.success('Print dialog opened');
    } catch (error) {
      console.error('Failed to print:', error);
      toast.error('Failed to open print dialog');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${resumeData.personal.fullName} - Resume`,
          text: `Check out ${resumeData.personal.fullName}'s resume`,
          url: window.location.href,
        });
        toast.success('Shared successfully');
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Failed to share:', error);
      toast.error('Failed to share');
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
    <div className="h-14 border-b border-border flex items-center justify-between px-2 sm:px-4 bg-background/95 backdrop-blur-sm">
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
          variant="ghost"
          size="icon"
          onClick={handleShare}
          className="h-8 w-8"
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrint}
          className="h-8 w-8"
          aria-label="Print"
        >
          <Printer className="h-4 w-4" />
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