import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { formatDateRange } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, User, BookOpen, Award, Languages, Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useMediaQuery } from '@/hooks/use-media-query';

const JuanTemplate = () => {
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
  
  const colorClass = `juan-${resumeData.colorScheme || 'default'}`;
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
      <div className="flex flex-col h-full min-h-full">
        {/* Header */}
        <header className="bg-[hsl(var(--juan-header))] text-white p-8 flex-shrink-0">
          <div className="flex items-center gap-6">
            {personal.avatarUrl && (
              <img 
                src={personal.avatarUrl} 
                alt={personal.fullName}
                className="w-20 h-20 rounded-full object-cover border-2 border-white flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold break-words">{personal.fullName}</h1>
              <p className="text-lg text-gray-300 mt-1 break-words">{personal.jobTitle}</p>
              {enabledSections.find(s => s.id === 'summary') && summary?.text && (
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">{summary.text}</p>
              )}
            </div>
          </div>
        </header>
        
        <div className="flex flex-1">
          {/* Left Column */}
          <div className="w-1/3 bg-[hsl(var(--juan-bg))] p-6 flex flex-col">
            <div className="space-y-6">
              {/* Contact */}
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3 flex items-center text-[hsl(var(--juan-text))]">
                  <User className="w-5 h-5 mr-2 text-[hsl(var(--juan-accent))]" /> CONTACT
                </h2>
                <div className="space-y-3 text-sm">
                  {personal.phone && (
                    <div className="flex items-start">
                      <Phone className="w-4 h-4 mr-2 text-[hsl(var(--juan-accent))] mt-0.5 flex-shrink-0" />
                      <span className="text-[hsl(var(--juan-text))] break-words">{personal.phone}</span>
                    </div>
                  )}
                  {personal.email && (
                    <div className="flex items-start">
                      <Mail className="w-4 h-4 mr-2 text-[hsl(var(--juan-accent))] mt-0.5 flex-shrink-0" />
                      <span className="text-[hsl(var(--juan-text))] break-all">{personal.email}</span>
                    </div>
                  )}
                  {personal.location && (
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-2 text-[hsl(var(--juan-accent))] mt-0.5 flex-shrink-0" />
                      <span className="text-[hsl(var(--juan-text))] break-words">{personal.location}</span>
                    </div>
                  )}
                  {personal.website && (
                    <div className="flex items-start">
                      <Globe className="w-4 h-4 mr-2 text-[hsl(var(--juan-accent))] mt-0.5 flex-shrink-0" />
                      <span className="text-[hsl(var(--juan-text))] break-all">{personal.website}</span>
                    </div>
                  )}
                </div>
              </section>
              
              {/* Skills */}
              {enabledSections.find(s => s.id === 'skills') && skills.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3 flex items-center text-[hsl(var(--juan-text))]">
                    <Star className="w-5 h-5 mr-2 text-[hsl(var(--juan-accent))]" /> SKILLS
                  </h2>
                  <div className="space-y-3">
                    {skills.map(skillGroup => (
                      <div key={skillGroup.id}>
                        <h3 className="font-medium text-sm text-[hsl(var(--juan-accent))] mb-1">{skillGroup.name}</h3>
                        <ul className="mt-1 space-y-1">
                          {skillGroup.skills.map(skill => (
                            <li key={skill.id} className="text-sm flex items-center">
                              <span className="mr-2 text-[hsl(var(--juan-accent))]">•</span>
                              <span className="text-[hsl(var(--juan-text))]">{skill.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Languages */}
              {enabledSections.find(s => s.id === 'languages') && languages.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3 flex items-center text-[hsl(var(--juan-text))]">
                    <Languages className="w-5 h-5 mr-2 text-[hsl(var(--juan-accent))]" /> LANGUAGES
                  </h2>
                  <ul className="space-y-2">
                    {languages.map(language => (
                      <li key={language.id} className="text-sm">
                        <span className="font-medium text-[hsl(var(--juan-text))]">{language.name}</span>
                        <span className="ml-2 text-[hsl(var(--juan-accent))]">({language.proficiency})</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              
              {/* Certificates */}
              {enabledSections.find(s => s.id === 'certificates') && certificates.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3 flex items-center text-[hsl(var(--juan-text))]">
                    <Award className="w-5 h-5 mr-2 text-[hsl(var(--juan-accent))]" /> CERTIFICATES
                  </h2>
                  <div className="space-y-3">
                    {certificates.map(cert => (
                      <div key={cert.id} className="text-sm">
                        <p className="font-medium text-[hsl(var(--juan-text))] break-words">{cert.name}</p>
                        <p className="text-[hsl(var(--juan-accent))] break-words">{cert.issuer}</p>
                        <p className="text-xs text-gray-500">
                          {formatDateRange(cert.issueDate, cert.expiryDate || '')}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* References */}
              {enabledSections.find(s => s.id === 'references') && references.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3 flex items-center text-[hsl(var(--juan-text))]">
                    <User className="w-5 h-5 mr-2 text-[hsl(var(--juan-accent))]" /> REFERENCES
                  </h2>
                  <div className="space-y-3">
                    {references.map(reference => (
                      <div key={reference.id} className="text-sm">
                        <p className="font-medium text-[hsl(var(--juan-text))] break-words">{reference.name}</p>
                        <p className="text-[hsl(var(--juan-accent))] break-words">{reference.position}</p>
                        <p className="text-[hsl(var(--juan-text))/70] break-words">{reference.company}</p>
                        {reference.email && <p className="text-xs text-gray-500 break-all">{reference.email}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="w-2/3 p-6 flex flex-col">
            <div className="space-y-6">
              {/* Work Experience */}
              {enabledSections.find(s => s.id === 'experience') && experience.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 text-[hsl(var(--juan-accent))] uppercase">Work Experience</h2>
                  <div className="space-y-4">
                    {experience.map(exp => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start mb-1 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold break-words">{exp.position}</h3>
                            <p className="text-gray-700 font-medium break-words">{exp.company}</p>
                          </div>
                          <span className="text-sm text-gray-600 flex-shrink-0 ml-4">
                            {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-sm text-gray-600 mt-1 mb-2">{exp.description}</p>
                        )}
                        {exp.bullets.length > 0 && exp.bullets.some(bullet => bullet.trim()) && (
                          <ul className="mt-2 space-y-1">
                            {exp.bullets.filter(bullet => bullet.trim()).map((bullet, idx) => (
                              <li key={idx} className="text-sm flex items-start">
                                <span className="mr-2 text-[hsl(var(--juan-accent))] flex-shrink-0">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Education */}
              {enabledSections.find(s => s.id === 'education') && education.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 flex items-center text-[hsl(var(--juan-accent))] uppercase">
                    <BookOpen className="w-5 h-5 mr-2" /> Education
                  </h2>
                  <div className="space-y-4">
                    {education.map(edu => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start flex-wrap">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold break-words">{edu.degree} in {edu.field}</h3>
                            <p className="text-gray-700 break-words">{edu.institution}</p>
                            {edu.gpa && (
                              <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                            )}
                          </div>
                          <span className="text-sm text-gray-600 flex-shrink-0 ml-4">
                            {formatDateRange(edu.startDate, edu.endDate)}
                          </span>
                        </div>
                        {edu.description && (
                          <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Projects */}
              {enabledSections.find(s => s.id === 'projects') && projects.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 text-[hsl(var(--juan-accent))] uppercase">Projects</h2>
                  <div className="space-y-4">
                    {projects.map(project => (
                      <div key={project.id}>
                        <h3 className="font-bold break-words">{project.name}</h3>
                        <p className="text-sm text-gray-600 mt-1 mb-2">{project.description}</p>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.technologies.filter(tech => tech.trim()).map((tech, idx) => (
                              <span key={idx} className="text-xs bg-[hsl(var(--juan-bg))] px-2 py-1 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        {project.url && (
                          <p className="text-sm text-[hsl(var(--juan-accent))] break-all">{project.url}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JuanTemplate;