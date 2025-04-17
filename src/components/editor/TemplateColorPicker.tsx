
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const TemplateColorPicker = () => {
  const { resumeData, updateResumeData } = useResume();

  const colorSchemes = {
    jamie: [
      { id: 'default', name: 'Default Blue', primary: '#1E3A8A', secondary: '#E0E7FF' },
      { id: 'green', name: 'Forest Green', primary: '#166534', secondary: '#DCFCE7' },
      { id: 'purple', name: 'Royal Purple', primary: '#581C87', secondary: '#F3E8FF' },
      { id: 'red', name: 'Ruby Red', primary: '#9F1239', secondary: '#FFE4E6' },
      { id: 'orange', name: 'Sunset Orange', primary: '#9A3412', secondary: '#FFEDD5' },
    ],
    lauren: [
      { id: 'default', name: 'Pink Accent', primary: '#BE185D', secondary: '#FCE7F3' },
      { id: 'blue', name: 'Ocean Blue', primary: '#1E40AF', secondary: '#DBEAFE' },
      { id: 'green', name: 'Emerald', primary: '#047857', secondary: '#D1FAE5' },
      { id: 'purple', name: 'Lavender', primary: '#7E22CE', secondary: '#F3E8FF' },
      { id: 'amber', name: 'Golden', primary: '#B45309', secondary: '#FEF3C7' },
    ],
    juan: [
      { id: 'default', name: 'Corporate Blue', primary: '#1E3A8A', secondary: '#111827' },
      { id: 'emerald', name: 'Emerald Green', primary: '#047857', secondary: '#064E3B' },
      { id: 'violet', name: 'Deep Purple', primary: '#6D28D9', secondary: '#4C1D95' },
      { id: 'rose', name: 'Rose Red', primary: '#BE123C', secondary: '#881337' },
      { id: 'slate', name: 'Slate Gray', primary: '#475569', secondary: '#1E293B' },
    ],
    richard: [
      { id: 'default', name: 'Navy Blue', primary: '#2c3e50', secondary: '#34495e' },
      { id: 'charcoal', name: 'Charcoal', primary: '#2d3436', secondary: '#636e72' },
      { id: 'maroon', name: 'Maroon', primary: '#6D0F0F', secondary: '#8B0000' },
      { id: 'forest', name: 'Forest Green', primary: '#1B4332', secondary: '#2D6A4F' },
      { id: 'indigo', name: 'Indigo', primary: '#3730A3', secondary: '#4F46E5' },
    ]
  };

  const handleColorChange = (colorId: string) => {
    updateResumeData({
      colorScheme: colorId
    });
  };

  // Get the current template's color schemes
  const currentColorSchemes = colorSchemes[resumeData.activeTemplate];
  
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-2 block">Template Color Scheme</Label>
        <RadioGroup 
          defaultValue={resumeData.colorScheme || 'default'} 
          onValueChange={handleColorChange}
          className="flex flex-wrap gap-3"
        >
          {currentColorSchemes.map((scheme) => (
            <div key={scheme.id} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={scheme.id} 
                id={`color-${scheme.id}`} 
                className="peer sr-only" 
              />
              <Label 
                htmlFor={`color-${scheme.id}`} 
                className="flex items-center space-x-2 rounded-md border-2 border-muted p-2 cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-muted/50"
              >
                <div className="flex gap-1">
                  <div 
                    className="h-5 w-5 rounded-full" 
                    style={{ backgroundColor: scheme.primary }}
                  />
                  <div 
                    className="h-5 w-5 rounded-full" 
                    style={{ backgroundColor: scheme.secondary }}
                  />
                </div>
                <span className="text-sm font-medium">{scheme.name}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default TemplateColorPicker;
