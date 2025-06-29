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
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="bg-[hsl(var(--richard))] text-[hsl(var(--richard-text))] py-8 lg:py-12 px-6 lg:px-10 flex flex-col items-center">
            <h1 className="text-3xl lg:text-5xl font-bold tracking-wider text-center">{personal.fullName}</h1>
            <h2 className="text-lg lg:text-xl mt-2 font-light tracking-wide">{personal.jobTitle}</h2>
          </header>
          
          <div className="flex flex-col lg:flex-row flex-1">
            {/* Left Column */}
            <div className="w-full lg:w-1/3 bg-gray-200 p-6 lg:p-8">
              {/* Avatar */}
              <div className="flex justify-center mb-6 lg:mb-8">
                {personal.avatarUrl ? (
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white">
                    <img 
                      src={personal.avatarUrl} 
                      alt={personal.fullName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Avatar className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white">
                    <AvatarFallback className="text-2xl lg:text-3xl bg-[hsl(var(--richard))] text-[hsl(var(--richard-text))]">
                      {personal.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              
              {/* Contact section */}
              <section className="mb-6 lg:mb-8">
                <h2 className="text-lg lg:text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-4 lg:mb-6 uppercase">Contact</h2>
                <div className="space-y-3 lg:space-y-4">
                  {personal.phone && (
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-[hsl(var(--richard))]" />
                      <span className="text-sm lg:text-base">{personal.phone}</span>
                    </div>
                  )}
                  
                  {personal.email && (
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-[hsl(var(--richard))]" />
                      <span className="text-sm lg:text-base break-all">{personal.email}</span>
                    </div>
                  )}
                  
                  {personal.location && (
                    <div className="flex items-center gap-2 lg:gap-3">
                      <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-[hsl(var(--richard))]" />
                      <span className="text-sm lg:text-base">{personal.location}</span>
                    </div>
                  )}
                  
                  {personal.website && (
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Globe className="h-4 w-4 lg:h-5 lg:w-5 text-[hsl(var(--richard))]" />
                      <span className="text-sm lg:text-base break-all">{personal.website}</span>
                    </div>
                  )}
                </div>
              </section>
              
              {/* Skills */}
              {skills.length > 0 && (
                <section className="mb-6 lg:mb-8">
                  <h2 className="text-lg lg:text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-4 lg:mb-6 uppercase">Skills</h2>
                  <ul className="space-y-2">
                    {skills.flatMap(group => 
                      group.skills.map(skill => (
                        <li key={skill.id} className="flex items-center text-sm lg:text-base">
                          <span className="mr-2 text-[hsl(var(--richard))]">•</span>
                          <span>{skill.name}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </section>
              )}
              
              {/* Languages */}
              {languages.length > 0 && (
                <section className="mb-6 lg:mb-8">
                  <h2 className="text-lg lg:text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-4 lg:mb-6 uppercase">Languages</h2>
                  <ul className="space-y-2">
                    {languages.map(language => (
                      <li key={language.id} className="text-sm lg:text-base">
                        <span className="font-medium">{language.name}</span>
                        <span className="ml-2 text-gray-600">({language.proficiency})</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              
              {/* References */}
              {references.length > 0 && (
                <section>
                  <h2 className="text-lg lg:text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-4 lg:mb-6 uppercase">Reference</h2>
                  <div className="space-y-4">
                    {references.map(reference => (
                      <div key={reference.id}>
                        <p className="font-bold text-sm lg:text-base">{reference.name}</p>
                        <p className="text-sm lg:text-base">{reference.position} / {reference.company}</p>
                        {reference.phone && <p className="text-sm">Phone: {reference.phone}</p>}
                        {reference.email && <p className="text-sm break-all">Email: {reference.email}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
            
            {/* Right Column */}
            <div className="w-full lg:w-2/3 p-6 lg:p-8">
              {/* Profile */}
              {summary && summary.text && (
                <section className="mb-6 lg:mb-8">
                  <div className="flex items-center mb-3 lg:mb-4">
                    <User className="h-5 w-5 lg:h-6 lg:w-6 text-[hsl(var(--richard))] mr-3" />
                    <h2 className="text-lg lg:text-2xl font-bold uppercase">Profile</h2>
                  </div>
                  <div className="border-l-4 border-[hsl(var(--richard))] pl-4 lg:pl-6 ml-3">
                    <p className="text-sm lg:text-base">{summary.text}</p>
                  </div>
                </section>
              )}
              
              {/* Work Experience */}
              {experience.length > 0 && (
                <section className="mb-6 lg:mb-8">
                  <div className="flex items-center mb-3 lg:mb-4">
                    <Briefcase className="h-5 w-5 lg:h-6 lg:w-6 text-[hsl(var(--richard))] mr-3" />
                    <h2 className="text-lg lg:text-2xl font-bold uppercase">Work Experience</h2>
                  </div>
                  
                  <div className="border-l-4 border-[hsl(var(--richard))] pl-4 lg:pl-6 ml-3">
                    <div className="space-y-6 lg:space-y-8">
                      {experience.map((exp, index) => (
                        <div key={exp.id} className="relative">
                          {index !== experience.length - 1 && (
                            <div className="absolute h-full w-px bg-gray-300 left-[-25px] top-6"></div>
                          )}
                          <div className="absolute w-3 h-3 rounded-full bg-[hsl(var(--richard))] left-[-27px] top-2"></div>
                          
                          <div>
                            <div className="flex flex-col lg:flex-row lg:justify-between gap-1 lg:gap-0">
                              <h3 className="font-bold text-base lg:text-lg">{exp.company}</h3>
                              <span className="text-sm lg:text-base text-gray-600">
                                {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                              </span>
                            </div>
                            <p className="text-gray-700 italic mb-2 text-sm lg:text-base">{exp.position}</p>
                            
                            <ul className="list-disc list-inside space-y-1">
                              {exp.bullets.map((bullet, i) => bullet && (
                                <li key={i} className="text-sm lg:text-base">{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
              
              {/* Education */}
              {education.length > 0 && (
                <section className="mb-6 lg:mb-8">
                  <div className="flex items-center mb-3 lg:mb-4">
                    <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-[hsl(var(--richard))] mr-3" />
                    <h2 className="text-lg lg:text-2xl font-bold uppercase">Education</h2>
                  </div>
                  
                  <div className="border-l-4 border-[hsl(var(--richard))] pl-4 lg:pl-6 ml-3">
                    <div className="space-y-6 lg:space-y-8">
                      {education.map((edu, index) => (
                        <div key={edu.id} className="relative">
                          {index !== education.length - 1 && (
                            <div className="absolute h-full w-px bg-gray-300 left-[-25px] top-6"></div>
                          )}
                          <div className="absolute w-3 h-3 rounded-full bg-[hsl(var(--richard))] left-[-27px] top-2"></div>
                          
                          <div>
                            <div className="flex flex-col lg:flex-row lg:justify-between gap-1 lg:gap-0">
                              <h3 className="font-bold text-base lg:text-lg">{edu.degree} of {edu.field}</h3>
                              <span className="text-sm lg:text-base text-gray-600">
                                {formatDateRange(edu.startDate, edu.endDate)}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-1 text-sm lg:text-base">
                              {edu.institution}
                            </p>
                            {edu.gpa && (
                              <p className="text-sm lg:text-base">GPA: {edu.gpa} / 4.0</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
              
              {/* Projects */}
              {projects.length > 0 && (
                <section className="mb-6 lg:mb-8">
                  <div className="flex items-center mb-3 lg:mb-4">
                    <Briefcase className="h-5 w-5 lg:h-6 lg:w-6 text-[hsl(var(--richard))] mr-3" />
                    <h2 className="text-lg lg:text-2xl font-bold uppercase">Projects</h2>
                  </div>
                  
                  <div className="border-l-4 border-[hsl(var(--richard))] pl-4 lg:pl-6 ml-3">
                    <div className="space-y-4 lg:space-y-6">
                      {projects.map((project, index) => (
                        <div key={project.id} className="relative">
                          {index !== projects.length - 1 && (
                            <div className="absolute h-full w-px bg-gray-300 left-[-25px] top-6"></div>
                          )}
                          <div className="absolute w-3 h-3 rounded-full bg-[hsl(var(--richard))] left-[-27px] top-2"></div>
                          
                          <div>
                            <h3 className="font-bold text-base lg:text-lg">{project.name}</h3>
                            <p className="text-gray-700 mb-2 text-sm lg:text-base">{project.description}</p>
                            
                            {project.technologies && project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {project.technologies.map((tech, idx) => tech && (
                                  <span 
                                    key={idx} 
                                    className="text-xs bg-gray-200 px-2 py-1 rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Certificates */}
              {certificates.length > 0 && (
                <section>
                  <div className="flex items-center mb-3 lg:mb-4">
                    <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-[hsl(var(--richard))] mr-3" />
                    <h2 className="text-lg lg:text-2xl font-bold uppercase">Certificates</h2>
                  </div>
                  
                  <div className="border-l-4 border-[hsl(var(--richard))] pl-4 lg:pl-6 ml-3">
                    <div className="space-y-4 lg:space-y-6">
                      {certificates.map((cert, index) => (
                        <div key={cert.id} className="relative">
                          {index !== certificates.length - 1 && (
                            <div className="absolute h-full w-px bg-gray-300 left-[-25px] top-6"></div>
                          )}
                          <div className="absolute w-3 h-3 rounded-full bg-[hsl(var(--richard))] left-[-27px] top-2"></div>
                          
                          <div>
                            <h3 className="font-bold text-base lg:text-lg">{cert.name}</h3>
                            <p className="text-gray-700 text-sm lg:text-base">{cert.issuer}</p>
                            <p className="text-sm text-gray-600">
                              {formatDateRange(cert.issueDate, cert.expiryDate || '')}
                            </p>
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
      </motion.div>
    </div>
  );
};

export default RichardTemplate;