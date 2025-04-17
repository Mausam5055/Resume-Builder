import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, ResumeSection, ThemeMode } from '@/types';

// Default data for a new resume
export const DEFAULT_RESUME_DATA: ResumeData = {
  personal: {
    fullName: 'Your Name',
    jobTitle: 'Professional Title',
    email: 'email@example.com',
    phone: '(123) 456-7890',
    location: 'City, State',
    website: '',
    avatarUrl: '',
  },
  summary: {
    text: 'A brief summary highlighting your professional background and key strengths.'
  },
  experience: [
    {
      id: '1',
      company: 'Company Name',
      position: 'Job Title',
      startDate: '2020-01',
      endDate: '2023-01',
      isCurrentPosition: false,
      description: 'Brief description of your role and responsibilities',
      bullets: [
        'Key achievement or responsibility',
        'Another significant accomplishment',
        'Additional noteworthy contribution'
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University Name',
      degree: 'Degree Type',
      field: 'Field of Study',
      startDate: '2016-09',
      endDate: '2020-05',
      gpa: '3.8',
    },
  ],
  skills: [
    {
      id: '1',
      name: 'Technical Skills',
      skills: [
        { id: '1', name: 'Skill 1', level: 4 },
        { id: '2', name: 'Skill 2', level: 5 },
        { id: '3', name: 'Skill 3', level: 3 },
      ],
    },
    {
      id: '2',
      name: 'Soft Skills',
      skills: [
        { id: '1', name: 'Communication', level: 4 },
        { id: '2', name: 'Leadership', level: 3 },
        { id: '3', name: 'Problem Solving', level: 5 },
      ],
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Project Name',
      description: 'Brief description of your project',
      url: 'https://project-url.com',
      technologies: ['Tech 1', 'Tech 2', 'Tech 3'],
    },
  ],
  languages: [
    {
      id: '1',
      name: 'English',
      proficiency: 'Native',
    },
    {
      id: '2',
      name: 'Spanish',
      proficiency: 'Professional Working',
    },
  ],
  certificates: [
    {
      id: '1',
      name: 'Certificate Name',
      issuer: 'Issuing Organization',
      issueDate: '2022-06',
    },
  ],
  references: [
    {
      id: '1',
      name: 'Reference Name',
      company: 'Company',
      position: 'Position',
      email: 'reference@example.com',
      relation: 'Manager',
    },
  ],
  sections: [
    { id: 'personal', title: 'Personal Information', icon: 'user', enabled: true, order: 0 },
    { id: 'summary', title: 'Professional Summary', icon: 'file-text', enabled: true, order: 1 },
    { id: 'experience', title: 'Work Experience', icon: 'briefcase', enabled: true, order: 2 },
    { id: 'education', title: 'Education', icon: 'graduation-cap', enabled: true, order: 3 },
    { id: 'skills', title: 'Skills', icon: 'star', enabled: true, order: 4 },
    { id: 'projects', title: 'Projects', icon: 'folder', enabled: true, order: 5 },
    { id: 'languages', title: 'Languages', icon: 'globe', enabled: true, order: 6 },
    { id: 'certificates', title: 'Certificates', icon: 'award', enabled: true, order: 7 },
    { id: 'references', title: 'References', icon: 'users', enabled: true, order: 8 },
  ],
  activeTemplate: 'jamie',
  colorScheme: 'default',
};

interface ResumeContextProps {
  resumeData: ResumeData;
  updateResumeData: (newData: Partial<ResumeData>) => void;
  updateSection: <T>(section: ResumeSection, data: T) => void;
  toggleSection: (sectionId: ResumeSection) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  resetToDefault: () => void;
  changeTemplate: (template: 'jamie' | 'lauren' | 'juan' | 'richard') => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or default
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : DEFAULT_RESUME_DATA;
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    return savedTheme || 'amoled';
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'amoled');
    if (theme !== 'light') {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData(prevData => ({ ...prevData, ...newData }));
  };

  const updateSection = <T,>(section: ResumeSection, data: T) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: data
    }));
  };

  const toggleSection = (sectionId: ResumeSection) => {
    setResumeData(prevData => ({
      ...prevData,
      sections: prevData.sections.map(section => 
        section.id === sectionId 
          ? { ...section, enabled: !section.enabled } 
          : section
      )
    }));
  };

  const reorderSections = (startIndex: number, endIndex: number) => {
    const reorderedSections = [...resumeData.sections];
    const [removed] = reorderedSections.splice(startIndex, 1);
    reorderedSections.splice(endIndex, 0, removed);
    
    // Update order values
    const updatedSections = reorderedSections.map((section, index) => ({
      ...section,
      order: index
    }));

    setResumeData(prevData => ({
      ...prevData,
      sections: updatedSections
    }));
  };

  const resetToDefault = () => {
    setResumeData(DEFAULT_RESUME_DATA);
  };

  const changeTemplate = (template: 'jamie' | 'lauren' | 'juan' | 'richard') => {
    setResumeData(prevData => ({
      ...prevData,
      activeTemplate: template,
      colorScheme: 'default' // Reset color scheme when changing template
    }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updateResumeData,
      updateSection,
      toggleSection,
      reorderSections,
      resetToDefault,
      changeTemplate,
      theme,
      setTheme
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
