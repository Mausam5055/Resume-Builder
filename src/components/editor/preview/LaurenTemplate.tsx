import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { formatDateRange } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useMediaQuery } from '@/hooks/use-media-query';

const LaurenTemplate = () => {
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
    references = [],
    sections
  } = resumeData;
  
  const colorClass = `lauren-${resumeData.colorScheme || 'default'}`;
  const enabledSections = sections.filter(section => section.enabled).sort((a, b) => a.order - b.order);

  return (
    <div className={`w-full ${isMobile ? 'min-h-screen' : 'min-h-[297mm]'} bg-white`}>
      <motion.div 
        className={`mx-auto bg-white shadow-lg overflow-hidden ${colorClass}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: isMobile ? '100%' : '210mm',
          minHeight: isMobile ? 'auto' : '297mm'
        }}
      >
        <div className="flex flex-col lg:flex-row h-full min-h-full">
          {/* Left column */}
          <div className="w-full lg:w-2/5 bg-[hsl(var(--lauren-bg))] p-6 lg:p-10 flex flex-col">
            {/* Photo and name */}
            <div className="flex flex-col items-center mb-6 lg:mb-8">
              {personal.avatarUrl ? (
                <div className="w-32 h-32 lg:w-44 lg:h-44 mb-4 overflow-hidden rounded-full border-4 border-[hsl(var(--lauren-accent))]">
                  <img 
                    src={personal.avatarUrl} 
                    alt={personal.fullName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <Avatar className="w-32 h-32 lg:w-44 lg:h-44 mb-4 border-4 border-[hsl(var(--lauren-accent))]">
                  <AvatarFallback className="text-2xl lg:text-4xl">
                    {personal.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <h1 className="text-xl lg:text-2xl font-bold mt-2 text-[hsl(var(--lauren-text))] text-center break-words">{personal.fullName}</h1>
              <p className="text-[hsl(var(--lauren-accent))] font-medium text-center break-words text-sm lg:text-base">{personal.jobTitle}</p>
            </div>

            {/* Contact section */}
            <div className="mb-6 lg:mb-8">
              <h2 className="text-base lg:text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 lg:mb-4 text-[hsl(var(--lauren-text))]">Contact</h2>
              
              <div className="space-y-2 text-xs lg:text-sm">
                {personal.location && (
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--lauren-accent))]">Address</h3>
                    <p className="text-[hsl(var(--lauren-text))] break-words">{personal.location}</p>
                  </div>
                )}
                
                {personal.phone && (
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--lauren-accent))]">Phone</h3>
                    <p className="text-[hsl(var(--lauren-text))] break-words">{personal.phone}</p>
                  </div>
                )}
                
                {personal.email && (
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--lauren-accent))]">Email</h3>
                    <p className="text-[hsl(var(--lauren-text))] break-all">{personal.email}</p>
                  </div>
                )}
                
                {personal.website && (
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--lauren-accent))]">Website</h3>
                    <p className="text-[hsl(var(--lauren-text))] break-all">{personal.website}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Skills section */}
            {enabledSections.find(s => s.id === 'skills') && skills.length > 0 && (
              <div className="mb-6 lg:mb-8">
                <h2 className="text-base lg:text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 lg:mb-4 text-[hsl(var(--lauren-text))]">Skills</h2>
                <ul className="list-disc ml-5 space-y-1 text-xs lg:text-sm text-[hsl(var(--lauren-text))]">
                  {skills.flatMap(group => 
                    group.skills.map(skill => (
                      <li key={skill.id}>{skill.name}</li>
                    ))
                  )}
                </ul>
              </div>
            )}
            
            {/* Languages section */}
            {enabledSections.find(s => s.id === 'languages') && languages.length > 0 && (
              <div className="mb-6 lg:mb-8">
                <h2 className="text-base lg:text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 lg:mb-4 text-[hsl(var(--lauren-text))]">Languages</h2>
                <div className="space-y-1 text-xs lg:text-sm">
                  {languages.map(language => (
                    <div key={language.id}>
                      <span className="text-[hsl(var(--lauren-text))]">{language.name}</span>
                      <span className="ml-2 text-[hsl(var(--lauren-accent))]">— {language.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates section */}
            {enabledSections.find(s => s.id === 'certificates') && certificates.length > 0 && (
              <div>
                <h2 className="text-base lg:text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 lg:mb-4 text-[hsl(var(--lauren-text))]">Certificates</h2>
                <div className="space-y-2">
                  {certificates.map(cert => (
                    <div key={cert.id}>
                      <h3 className="font-medium text-xs lg:text-sm">{cert.name}</h3>
                      <p className="text-xs text-gray-600">{cert.issuer} • {formatDateRange(cert.issueDate, cert.expiryDate || '')}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right column */}
          <div className="w-full lg:w-3/5 p-6 lg:p-10">
            {/* Professional Summary */}
            {enabledSections.find(s => s.id === 'summary') && summary && summary.text && (
              <div className="mb-6 lg:mb-8">
                <h2 className="text-base lg:text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 text-[hsl(var(--lauren-accent))]">Professional Summary</h2>
                <p className="text-xs lg:text-sm">{summary.text}</p>
              </div>
            )}
            
            {/* Work Experience */}
            {enabledSections.find(s => s.id === 'experience') && experience.length > 0 && (
              <div className="mb-6 lg:mb-8">
                <h2 className="text-base lg:text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 text-[hsl(var(--lauren-accent))]">Work Experience</h2>
                <div className="space-y-4 lg:space-y-5">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline gap-1 lg:gap-0">
                        <div>
                          <h3 className="font-semibold text-sm lg:text-base">{exp.company}, {exp.position}</h3>
                        </div>
                        <span className="text-xs">
                          {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                        </span>
                      </div>
                      
                      {exp.bullets.map((bullet, i) => bullet && (
                        <div key={i} className="flex items-start mt-1">
                          <span className="text-xs lg:text-sm mr-2 text-[hsl(var(--lauren-accent))]">•</span>
                          <span className="text-xs lg:text-sm">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education */}
            {enabledSections.find(s => s.id === 'education') && education.length > 0 && (
              <div className="mb-6 lg:mb-8">
                <h2 className="text-base lg:text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 text-[hsl(var(--lauren-accent))]">Education</h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline gap-1 lg:gap-0">
                        <h3 className="font-semibold text-sm lg:text-base">{edu.institution}</h3>
                        <span className="text-xs">
                          {formatDateRange(edu.startDate, edu.endDate)}
                        </span>
                      </div>
                      <p className="text-xs lg:text-sm">
                        {edu.degree} in {edu.field}
                        {edu.gpa && ` (GPA: ${edu.gpa})`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Projects */}
            {enabledSections.find(s => s.id === 'projects') && projects.length > 0 && (
              <div className="mb-6 lg:mb-8">
                <h2 className="text-base lg:text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 text-[hsl(var(--lauren-accent))]">Projects</h2>
                <div className="space-y-4">
                  {projects.map(project => (
                    <div key={project.id}>
                      <h3 className="font-semibold text-sm lg:text-base">{project.name}</h3>
                      <p className="text-xs lg:text-sm">{project.description}</p>
                      
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech, idx) => tech && (
                            <span 
                              key={idx} 
                              className="text-xs bg-[hsl(var(--lauren-bg))] px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {enabledSections.find(s => s.id === 'references') && references.length > 0 && (
              <div>
                <h2 className="text-base lg:text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 text-[hsl(var(--lauren-accent))]">References</h2>
                <div className="space-y-3">
                  {references.map(reference => (
                    <div key={reference.id}>
                      <h3 className="font-semibold text-sm lg:text-base">{reference.name}</h3>
                      <p className="text-xs lg:text-sm">{reference.position} at {reference.company}</p>
                      {reference.email && <p className="text-xs text-gray-600">{reference.email}</p>}
                      {reference.phone && <p className="text-xs text-gray-600">{reference.phone}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LaurenTemplate;