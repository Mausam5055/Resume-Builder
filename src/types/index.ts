// Resume Section Types
export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  avatarUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrentPosition?: boolean;
  description: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: number; // 1-5
}

export interface SkillGroup {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  technologies?: string[];
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Elementary' | 'Limited Working' | 'Professional Working' | 'Full Professional' | 'Native';
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  url?: string;
}

export interface Reference {
  id: string;
  name: string;
  company: string;
  position: string;
  email?: string;
  phone?: string;
  relation?: string;
}

export interface Summary {
  text: string;
}

export type ResumeSection = 
  | 'personal' 
  | 'summary' 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'projects' 
  | 'languages' 
  | 'certificates' 
  | 'references';

export interface SectionConfig {
  id: ResumeSection;
  title: string;
  icon: string;
  enabled: boolean;
  order: number;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary?: Summary;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  projects?: Project[];
  languages?: Language[];
  certificates?: Certificate[];
  references?: Reference[];
  sections: SectionConfig[];
  activeTemplate: 'jamie' | 'lauren' | 'juan' | 'richard';
  colorScheme?: string;
}

// Theme Types
export type ThemeMode = 'light' | 'amoled' | 'neon';
