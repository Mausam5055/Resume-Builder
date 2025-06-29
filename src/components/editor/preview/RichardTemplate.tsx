import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { formatDateRange } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, User, Briefcase, GraduationCap, Languages } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useMediaQuery } from '@/hooks/use-media-query';

const RichardTemplate = () => {
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
  
  const colorClass = `richard-${resumeData.colorScheme || 'default'}`;
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
        <header className="bg-[hsl(var(--richard))] text-[hsl(var(--richard-text))] py-12 px-10 flex flex-col items-center flex-shrink-0">
          <h1 className="text-5xl font-bold tracking-wider text-center break-words">{personal.fullName}</h1>
          <h2 className="text-xl mt-2 font-light tracking-wide text-center break-words">{personal.jobTitle}</h2>
        </header>
        
        <div className="flex flex-1">
          {/* Left Column */}
          <div className="w-1/3 bg-gray-200 p-8 flex flex-col">
            {/* Avatar */}
            <div className="flex justify-center mb-8">
              {personal.avatarUrl ? (
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                  <img 
                    src={personal.avatarUrl} 
                    alt={personal.fullName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <Avatar className="w-32 h-32 rounded-full border-4 border-white">
                  <AvatarFallback className="text-2xl bg-[hsl(var(--richard))] text-[hsl(var(--richard-text))]">
                    {personal.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            
            {/* Contact section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-6 uppercase">Contact</h2>
              <div className="space-y-4">
                {personal.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[hsl(var(--richard))] mt-0.5 flex-shrink-0" />
                    <span className="break-words">{personal.phone}</span>
                  </div>
                )}
                
                {personal.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[hsl(var(--richard))] mt-0.5 flex-shrink-0" />
                    <span className="break-all">{personal.email}</span>
                  </div>
                )}
                
                {personal.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[hsl(var(--richard))] mt-0.5 flex-shrink-0" />
                    <span className="break-words">{personal.location}</span>
                  </div>
                )}
                
                {personal.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[hsl(var(--richard))] mt-0.5 flex-shrink-0" />
                    <span className="break-all">{personal.website}</span>
                  </div>
                )}
              </div>
            </section>
            
            {/* Skills */}
            {enabledSections.find(s => s.id === 'skills') && skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-6 uppercase">Skills</h2>
                <div className="space-y-4">
                  {skills.map(skillGroup => (
                    <div key={skillGroup.id}>
                      <h3 className="font-semibold text-sm mb-2">{skillGroup.name}</h3>
                      <ul className="space-y-2">
                        {skillGroup.skills.map(skill => (
                          <li key={skill.id} className="flex items-center">
                            <span className="mr-2 text-[hsl(var(--richard))]">•</span>
                            <span>{skill.name}</span>
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
              <section className="mb-8">
                <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-6 uppercase">Languages</h2>
                <ul className="space-y-2">
                  {languages.map(language => (
                    <li key={language.id}>
                      <span className="font-medium">{language.name}</span>
                      <span className="ml-2 text-gray-600">({language.proficiency})</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Certificates */}
            {enabledSections.find(s => s.id === 'certificates') && certificates.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-6 uppercase">Certificates</h2>
                <div className="space-y-3">
                  {certificates.map(cert => (
                    <div key={cert.id}>
                      <p className="font-semibold break-words">{cert.name}</p>
                      <p className="text-sm text-gray-600 break-words">{cert.issuer}</p>
                      <p className="text-xs text-gray-500">{formatDateRange(cert.issueDate, cert.expiryDate || '')}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* References */}
            {enabledSections.find(s => s.id === 'references') && references.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-6 uppercase">References</h2>
                <div className="space-y-4">
                  {references.map(reference => (
                    <div key={reference.id}>
                      <p className="font-bold break-words">{reference.name}</p>
                      <p className="break-words">{reference.position} / {reference.company}</p>
                      {reference.phone && <p className="text-sm">Phone: {reference.phone}</p>}
                      {reference.email && <p className="text-sm break-all">Email: {reference.email}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {/* Right Column */}
          <div className="w-2/3 p-8 flex flex-col">
            <div className="space-y-8">
              {/* Profile */}
              {enabledSections.find(s => s.id === 'summary') && summary && summary.text && (
                <section>
                  <div className="flex items-center mb-4">
                    <User className="h-6 w-6 text-[hsl(var(--richard))] mr-3 flex-shrink-0" />
                    <h2 className="text-2xl font-bold uppercase">Profile</h2>
                  </div>
                  <div className="border-l-4 border-[hsl(var(--richard))] pl-6 ml-3">
                    <p className="leading-relaxed">{summary.text}</p>
                  </div>
                </section>
              )}
              
              {/* Work Experience */}
              {enabledSections.find(s => s.id === 'experience') && experience.length > 0 && (
                <section>
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-6 w-6 text-[hsl(var(--richard))] mr-3 flex-shrink-0" />
                    <h2 className="text-2xl font-bold uppercase">Work Experience</h2>
                  </div>
                  
                  <div className="border-l-4 border-[hsl(var(--richard))] pl-6 ml-3">
                    <div className="space-y-8">
                      {experience.map((exp, index) => (
                        <div key={exp.id} className="relative">
                          {index !== experience.length - 1 && (
                            <div className="absolute h-full w-px bg-gray-300 left-[-25px] top-6"></div>
                          )}
                          <div className="absolute w-3 h-3 rounded-full bg-[hsl(var(--richard))] left-[-27px] top-2"></div>
                          
                          <div>
                            <div className="flex justify-between items-start mb-2 flex-wrap">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg break-words">{exp.company}</h3>
                                <p className="text-gray-700 italic break-words">{exp.position}</p>
                              </div>
                              <span className="text-gray-600 flex-shrink-0 ml-4">
                                {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                              </span>
                            </div>
                            
                            {exp.description && (
                              <p className="text-sm text-gray-600 mb-2">{exp.description}</p>
                            )}
                            
                            {exp.bullets.length > 0 && exp.bullets.some(bullet => bullet.trim()) && (
                              <ul className="list-disc list-inside space-y-1">
                                {exp.bullets.filter(bullet => bullet.trim()).map((bullet, i) => (
                                  <li key={i}>{bullet}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
              
              {/* Education */}
              {enabledSections.find(s => s.id === 'education') && education.length > 0 && (
                <section>
                  <div className="flex items-center mb-4">
                    <GraduationCap className="h-6 w-6 text-[hsl(var(--richard))] mr-3 flex-shrink-0" />
                    <h2 className="text-2xl font-bold uppercase">Education</h2>
                  </div>
                  
                  <div className="border-l-4 border-[hsl(var(--richard))] pl-6 ml-3">
                    <div className="space-y-8">
                      {education.map((edu, index) => (
                        <div key={edu.id} className="relative">
                          {index !== education.length - 1 && (
                            <div className="absolute h-full w-px bg-gray-300 left-[-25px] top-6"></div>
                          )}
                          <div className="absolute w-3 h-3 rounded-full bg-[hsl(var(--richard))] left-[-27px] top-2"></div>
                          
                          <div>
                            <div className="flex justify-between items-start flex-wrap">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg break-words">{edu.degree} of {edu.field}</h3>
                                <p className="text-gray-700 mb-1 break-words">{edu.institution}</p>
                                {edu.gpa && (
                                  <p>GPA: {edu.gpa} / 4.0</p>
                                )}
                              </div>
                              <span className="text-gray-600 flex-shrink-0 ml-4">
                                {formatDateRange(edu.startDate, edu.endDate)}
                              </span>
                            </div>
                            {edu.description && (
                              <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
              
              {/* Projects */}
              {enabledSections.find(s => s.id === 'projects') && projects.length > 0 && (
                <section>
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-6 w-6 text-[hsl(var(--richard))] mr-3 flex-shrink-0" />
                    <h2 className="text-2xl font-bold uppercase">Projects</h2>
                  </div>
                  
                  <div className="border-l-4 border-[hsl(var(--richard))] pl-6 ml-3">
                    <div className="space-y-6">
                      {projects.map((project, index) => (
                        <div key={project.id} className="relative">
                          {index !== projects.length - 1 && (
                            <div className="absolute h-full w-px bg-gray-300 left-[-25px] top-6"></div>
                          )}
                          <div className="absolute w-3 h-3 rounded-full bg-[hsl(var(--richard))] left-[-27px] top-2"></div>
                          
                          <div>
                            <h3 className="font-bold text-lg break-words">{project.name}</h3>
                            <p className="text-gray-700 mb-2">{project.description}</p>
                            
                            {project.technologies && project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {project.technologies.filter(tech => tech.trim()).map((tech, idx) => (
                                  <span 
                                    key={idx} 
                                    className="text-xs bg-gray-200 px-2 py-1 rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {project.url && (
                              <p className="text-sm text-[hsl(var(--richard))] break-all">{project.url}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
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

export default RichardTemplate;