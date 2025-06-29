import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  templateName: string;
}

const TemplatePreviewModal = ({ isOpen, onClose, imageUrl, templateName }: TemplatePreviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-background/95 backdrop-blur-sm border border-border/40 h-[90vh] overflow-hidden">
        <DialogTitle className="sr-only">
          {templateName} Template Preview
        </DialogTitle>
        
        <div className="relative h-full">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 rounded-full bg-background/80 hover:bg-background"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="min-h-full">
              <img
                src={imageUrl}
                alt={`${templateName} template preview`}
                className="w-full h-auto"
                style={{ minHeight: '100%' }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;