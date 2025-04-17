
import React, { useRef, useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { PersonalInfo } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PersonalInfoForm = () => {
  const { resumeData, updateSection } = useResume();
  const { personal } = resumeData;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    const updatedPersonal: PersonalInfo = {
      ...personal,
      [name]: value
    };
    
    updateSection('personal', updatedPersonal);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      
      // Create a URL for the image file
      const imageUrl = URL.createObjectURL(file);
      
      // Update the avatar URL in the resume data
      const updatedPersonal: PersonalInfo = {
        ...personal,
        avatarUrl: imageUrl
      };
      
      updateSection('personal', updatedPersonal);
      toast.success('Profile photo updated successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4">
        <div className="relative">
          <Avatar className="h-24 w-24 border-2 border-border">
            <AvatarImage src={personal.avatarUrl} alt={personal.fullName} />
            <AvatarFallback className="text-xl">
              {personal.fullName ? getInitials(personal.fullName) : <User />}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 right-0">
            <Button 
              size="icon"
              variant="outline" 
              className="h-8 w-8 rounded-full shadow-sm"
              onClick={triggerFileUpload}
              disabled={isUploading}
            >
              {isUploading ? <span className="animate-spin">⏳</span> : <Camera className="h-4 w-4" />}
            </Button>
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        
        <div className="flex-1 space-y-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName"
                name="fullName"
                value={personal.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input 
                id="jobTitle"
                name="jobTitle"
                value={personal.jobTitle}
                onChange={handleInputChange}
                placeholder="Software Engineer"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            name="email"
            type="email"
            value={personal.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone"
            name="phone"
            value={personal.phone}
            onChange={handleInputChange}
            placeholder="(123) 456-7890"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location"
            name="location"
            value={personal.location}
            onChange={handleInputChange}
            placeholder="New York, NY"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input 
            id="website"
            name="website"
            value={personal.website || ''}
            onChange={handleInputChange}
            placeholder="https://johndoe.com"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
