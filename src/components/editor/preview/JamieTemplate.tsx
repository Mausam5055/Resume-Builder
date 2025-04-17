import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { formatDateRange } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

const JamieTemplate = () => {
  const { resumeData } = useResume();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { 
    personal, 
    summary, 
    experience, 
    education, 
    skills, 
    projects = [], 
    languages = [], 
    certificates = [], 
    references = [] 
  } = resumeData;
  
  const colorClass = `jamie-${resumeData.colorScheme || 'default'}`;

  return (
    <motion.div 
      className={cn(
        "bg-white shadow-lg",
        colorClass,
        isMobile && "rounded-lg overflow-hidden"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: isMobile ? '100%' : '210mm',
        height: isMobile ? 'auto' : '297mm',
        maxWidth: '100%'
      }}
    >
      {/* Header */}
      <header className={cn(
        "bg-[hsl(var(--jamie-accent))] text-white px-4 sm:px-8 py-4 sm:py-6",
        isMobile && "flex flex-col items-center text-center"
      )}>
        <div className={cn(
          "flex gap-4 items-center",
          isMobile && "flex-col"
        )}>
          {personal.avatarUrl ? (
            <Avatar className={cn(
              "border-2 border-white/50",
              isMobile ? "h-16 w-16" : "h-20 w-20"
            )}>
              <AvatarImage src={personal.avatarUrl} alt={personal.fullName} />
              <AvatarFallback className="text-xl">
                {personal.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className={cn(
              "border-2 border-white/50",
              isMobile ? "h-16 w-16" : "h-20 w-20"
            )}>
              <AvatarFallback className="text-xl">
                {personal.fullName ? personal.fullName.split(' ').map(n => n[0]).join('') : <User className="h-10 w-10" />}
              </AvatarFallback>
            </Avatar>
          )}
          
          <div className={cn(
            isMobile && "mt-2"
          )}>
            <h1 className={cn(
              "font-bold",
              isMobile ? "text-xl" : "text-2xl"
            )}>{personal.fullName}</h1>
            <p className="text-white/90 mt-1">{personal.jobTitle}</p>
          </div>
        </div>
      </header>
      
      <div className={cn(
        "flex",
        isMobile ? "flex-col" : "h-full"
      )}>
        {/* Left Sidebar */}
        <div className={cn(
          "bg-[hsl(var(--jamie-bg))] p-4 sm:p-6 text-[hsl(var(--jamie-text))]",
          isMobile ? "w-full" : "w-1/3"
        )}>
          <section className="mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-bold border-b border-gray-300 pb-2 mb-3">Contact</h2>
            <div className="space-y-2">
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm break-all">{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{personal.location}</span>
                </div>
              )}
              {personal.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm break-all">{personal.website}</span>
                </div>
              )}
            </div>
          </section>
          
          {skills.length > 0 && (
            <section className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold border-b border-gray-300 pb-2 mb-3">Skills</h2>
              <div className="space-y-3">
                {skills.map(group => (
                  <div key={group.id}>
                    <h3 className="font-semibold text-[hsl(var(--jamie-accent))]">{group.name}</h3>
                    <div className="mt-1">
                      {group.skills.map(skill => (
                        <div key={skill.id} className="mb-1">
                          <div className="flex justify-between">
                            <span className="text-sm">{skill.name}</span>
                          </div>
                          {skill.level && (
                            <div className="w-full h-1.5 bg-gray-200 rounded overflow-hidden mt-1">
                              <div 
                                className="h-full bg-[hsl(var(--jamie-accent))]"
                                style={{ width: `${(skill.level / 5) * 100}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {languages.length > 0 && (
            <section className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold border-b border-gray-300 pb-2 mb-3">Languages</h2>
              <div className="space-y-2">
                {languages.map(language => (
                  <div key={language.id} className="flex justify-between items-center">
                    <span className="text-sm">{language.name}</span>
                    <span className="text-xs bg-[hsl(var(--jamie-accent))] text-white px-2 py-0.5 rounded-full">
                      {language.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {certificates.length > 0 && (
            <section>
              <h2 className="text-base sm:text-lg font-bold border-b border-gray-300 pb-2 mb-3">Certifications</h2>
              <div className="space-y-3">
                {certificates.map(cert => (
                  <div key={cert.id}>
                    <h3 className="font-medium text-sm">{cert.name}</h3>
                    <p className="text-xs text-gray-600">{cert.issuer} • {formatDateRange(cert.issueDate, cert.expiryDate)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Main Content */}
        <div className={cn(
          "p-4 sm:p-6 text-gray-800",
          isMobile ? "w-full" : "w-2/3"
        )}>
          {summary && summary.text && (
            <section className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold border-b border-gray-300 pb-2 mb-3">Professional Summary</h2>
              <p className="text-sm">{summary.text}</p>
            </section>
          )}
          
          {experience.length > 0 && (
            <section className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold border-b border-gray-300 pb-2 mb-3">Work Experience</h2>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className={cn(
                      "flex justify-between",
                      isMobile && "flex-col gap-1"
                    )}>
                      <h3 className="font-bold text-[hsl(var(--jamie-accent))]">{exp.position}</h3>
                      <span className="text-xs text-gray-600">
                        {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{exp.company}</p>
                    {exp.description && (
                      <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                    )}
                    {exp.bullets && exp.bullets.length > 0 && exp.bullets[0] !== "" && (
                      <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {education.length > 0 && (
            <section className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold border-b border-gray-300 pb-2 mb-3">Education</h2>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className={cn(
                      "flex justify-between",
                      isMobile && "flex-col gap-1"
                    )}>
                      <h3 className="font-bold text-[hsl(var(--jamie-accent))]">{edu.degree}</h3>
                      <span className="text-xs text-gray-600">
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </span>
                    </div>
                    <p className="text-sm"><span className="font-medium">{edu.institution}</span> | {edu.field}</p>
                    {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {projects.length > 0 && (
            <section>
              <h2 className="text-base sm:text-lg font-bold border-b border-gray-300 pb-2 mb-3">Projects</h2>
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id}>
                    <h3 className="font-bold text-[hsl(var(--jamie-accent))]">{project.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-[hsl(var(--jamie-bg))] px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-[hsl(var(--jamie-accent))] hover:underline mt-1 inline-block"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JamieTemplate;
