import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { formatDateRange } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
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

  // Calculate dynamic height based on content
  const calculateHeight = () => {
    let baseHeight = 400;
    
    if (summary?.text) baseHeight += 80;
    baseHeight += experience.length * 120;
    baseHeight += education.length * 80;
    baseHeight += projects.length * 100;
    baseHeight += certificates.length * 60;
    baseHeight += Math.ceil(skills.flatMap(group => group.skills).length / 3) * 40;
    baseHeight += Math.ceil(languages.length / 2) * 30;
    baseHeight += references.length * 80;
    
    return Math.max(baseHeight, 800);
  };

  const dynamicHeight = calculateHeight();

  return (
    <motion.div 
      className={`mx-auto bg-white shadow-lg overflow-hidden ${colorClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: isMobile ? '100%' : '210mm',
        minHeight: isMobile ? 'auto' : `${dynamicHeight}px`,
        maxHeight: 'none'
      }}
    >
      <div className="flex h-full min-h-full">
        {/* Left column */}
        <div className="w-2/5 bg-[hsl(var(--lauren-bg))] p-8 flex flex-col">
          {/* Photo and name */}
          <div className="flex flex-col items-center mb-8">
            {personal.avatarUrl ? (
              <div className="w-36 h-36 mb-4 overflow-hidden rounded-full border-4 border-[hsl(var(--lauren-accent))]">
                <img 
                  src={personal.avatarUrl} 
                  alt={personal.fullName} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <Avatar className="w-36 h-36 mb-4 border-4 border-[hsl(var(--lauren-accent))]">
                <AvatarFallback className="text-3xl">
                  {personal.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            <h1 className="text-2xl font-bold mt-2 text-[hsl(var(--lauren-text))] text-center break-words">{personal.fullName}</h1>
            <p className="text-[hsl(var(--lauren-accent))] font-medium text-center break-words">{personal.jobTitle}</p>
          </div>

          {/* Contact section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-4 text-[hsl(var(--lauren-text))]">Contact</h2>
            
            <div className="space-y-3 text-sm">
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
            <div className="mb-8">
              <h2 className="text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-4 text-[hsl(var(--lauren-text))]">Skills</h2>
              <div className="space-y-3">
                {skills.map(skillGroup => (
                  <div key={skillGroup.id}>
                    <h3 className="font-medium text-sm text-[hsl(var(--lauren-accent))] mb-1">{skillGroup.name}</h3>
                    <ul className="list-disc ml-4 space-y-1 text-sm text-[hsl(var(--lauren-text))]">
                      {skillGroup.skills.map(skill => (
                        <li key={skill.id}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Languages section */}
          {enabledSections.find(s => s.id === 'languages') && languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-4 text-[hsl(var(--lauren-text))]">Languages</h2>
              <div className="space-y-1 text-sm">
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
            <div className="mb-8">
              <h2 className="text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-4 text-[hsl(var(--lauren-text))]">Certificates</h2>
              <div className="space-y-2">
                {certificates.map(cert => (
                  <div key={cert.id}>
                    <h3 className="font-medium text-sm text-[hsl(var(--lauren-text))]">{cert.name}</h3>
                    <p className="text-xs text-[hsl(var(--lauren-accent))]">{cert.issuer}</p>
                    <p className="text-xs text-[hsl(var(--lauren-text))/70]">{formatDateRange(cert.issueDate, cert.expiryDate || '')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References section */}
          {enabledSections.find(s => s.id === 'references') && references.length > 0 && (
            <div>
              <h2 className="text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-4 text-[hsl(var(--lauren-text))]">References</h2>
              <div className="space-y-3">
                {references.map(reference => (
                  <div key={reference.id}>
                    <h3 className="font-medium text-sm text-[hsl(var(--lauren-text))]">{reference.name}</h3>
                    <p className="text-xs text-[hsl(var(--lauren-accent))]">{reference.position}</p>
                    <p className="text-xs text-[hsl(var(--lauren-text))/70]">{reference.company}</p>
                    {reference.email && <p className="text-xs text-[hsl(var(--lauren-text))/70] break-all">{reference.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right column */}
        <div className="w-3/5 p-8 flex flex-col">
          <div className="space-y-8">
            {/* Professional Summary */}
            {enabledSections.find(s => s.id === 'summary') && summary && summary.text && (
              <div>
                <h2 className="text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 text-[hsl(var(--lauren-accent))]">Professional Summary</h2>
                <p className="text-sm leading-relaxed">{summary.text}</p>
              </div>
            )}
            
            {/* Work Experience */}
            {enabledSections.find(s => s.id === 'experience') && experience.length > 0 && (
              <div>
                <h2 className="text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 text-[hsl(var(--lauren-accent))]">Work Experience</h2>
                <div className="space-y-5">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-2 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold break-words">{exp.company}, {exp.position}</h3>
                        </div>
                        <span className="text-xs flex-shrink-0 ml-4">
                          {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                        </span>
                      </div>
                      
                      {exp.description && (
                        <p className="text-sm mb-2 text-gray-600">{exp.description}</p>
                      )}
                      
                      {exp.bullets.filter(bullet => bullet.trim()).map((bullet, i) => (
                        <div key={i} className="flex items-start mt-1">
                          <span className="text-sm mr-2 text-[hsl(var(--lauren-accent))] flex-shrink-0">•</span>
                          <span className="text-sm">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education */}
            {enabledSections.find(s => s.id === 'education') && education.length > 0 && (
              <div>
                <h2 className="text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 text-[hsl(var(--lauren-accent))]">Education</h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start flex-wrap">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold break-words">{edu.institution}</h3>
                          <p className="text-sm">
                            {edu.degree} in {edu.field}
                            {edu.gpa && ` (GPA: ${edu.gpa})`}
                          </p>
                        </div>
                        <span className="text-xs flex-shrink-0 ml-4">
                          {formatDateRange(edu.startDate, edu.endDate)}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Projects */}
            {enabledSections.find(s => s.id === 'projects') && projects.length > 0 && (
              <div>
                <h2 className="text-lg font-bold border-b border-[hsl(var(--lauren-accent))/30] pb-1 mb-3 text-[hsl(var(--lauren-accent))]">Projects</h2>
                <div className="space-y-4">
                  {projects.map(project => (
                    <div key={project.id}>
                      <h3 className="font-semibold break-words">{project.name}</h3>
                      <p className="text-sm mb-2">{project.description}</p>
                      
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.technologies.filter(tech => tech.trim()).map((tech, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs bg-[hsl(var(--lauren-bg))] px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {project.url && (
                        <p className="text-sm text-[hsl(var(--lauren-accent))] break-all">{project.url}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LaurenTemplate;