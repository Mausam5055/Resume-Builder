import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { formatDateRange } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const JamieTemplate = () => {
  const { resumeData } = useResume();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { 
    personal, 
    summary, 
    experience, 
    education, 
    skills = [], 
    projects = [],
    languages = [], 
    certificates = [],
    references = [],
    sections
  } = resumeData;

  // Get enabled sections
  const enabledSections = sections.filter(section => section.enabled).sort((a, b) => a.order - b.order);

  // Calculate dynamic height based on content
  const calculateHeight = () => {
    let baseHeight = 400; // Base height for header and personal info
    
    if (summary?.text) baseHeight += 80;
    baseHeight += experience.length * 120;
    baseHeight += education.length * 80;
    baseHeight += projects.length * 100;
    baseHeight += certificates.length * 60;
    baseHeight += Math.ceil(skills.flatMap(group => group.skills).length / 3) * 40;
    baseHeight += Math.ceil(languages.length / 2) * 30;
    baseHeight += references.length * 80;
    
    return Math.max(baseHeight, 800); // Minimum height
  };

  const dynamicHeight = calculateHeight();

  return (
    <div className={`w-full ${isMobile ? 'overflow-x-auto' : ''} print:overflow-x-auto print:w-full`}>
      <motion.div 
        className="bg-white shadow-lg print:shadow-none print:w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: isMobile ? '100%' : '210mm',
          minHeight: isMobile ? 'auto' : `${dynamicHeight}px`,
          maxHeight: 'none'
        }}
      >
        <div className="flex print:w-full print:h-full min-h-full">
          {/* Left Sidebar */}
          <div className="w-[75mm] bg-slate-50 min-h-full p-6 print:p-6 print:w-[75mm] print:flex-shrink-0 flex flex-col">
            {/* Profile Photo */}
            {personal?.avatarUrl && (
              <div className="mb-8 flex justify-center">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage 
                    src={personal.avatarUrl} 
                    alt={personal?.fullName || ''} 
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl bg-slate-200 text-slate-600">
                    {personal?.fullName ? personal.fullName.charAt(0) : '?'}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}

            {/* Contact Section */}
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-slate-800 uppercase border-b-2 border-slate-200 pb-2">
                CONTACT
              </h2>
              <div className="space-y-3">
                {personal?.phone && (
                  <div className="flex items-start gap-3 text-slate-700">
                    <Phone className="h-4 w-4 flex-shrink-0 text-slate-600 mt-0.5" />
                    <span className="text-sm break-words">{personal.phone}</span>
                  </div>
                )}
                {personal?.email && (
                  <div className="flex items-start gap-3 text-slate-700">
                    <Mail className="h-4 w-4 flex-shrink-0 text-slate-600 mt-0.5" />
                    <span className="text-sm break-all">{personal.email}</span>
                  </div>
                )}
                {personal?.location && (
                  <div className="flex items-start gap-3 text-slate-700">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-slate-600 mt-0.5" />
                    <span className="text-sm break-words">{personal.location}</span>
                  </div>
                )}
                {personal?.website && (
                  <div className="flex items-start gap-3 text-slate-700">
                    <Globe className="h-4 w-4 flex-shrink-0 text-slate-600 mt-0.5" />
                    <span className="text-sm break-all">{personal.website}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Skills Section */}
            {enabledSections.find(s => s.id === 'skills') && skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-slate-800 uppercase border-b-2 border-slate-200 pb-2">
                  SKILLS
                </h2>
                <div className="space-y-4">
                  {skills.map((skillGroup) => (
                    <div key={skillGroup.id}>
                      <h3 className="font-semibold text-sm text-slate-700 mb-2">{skillGroup.name}</h3>
                      <ul className="list-none space-y-1">
                        {skillGroup.skills.map((skill) => (
                          <li key={skill.id} className="text-sm text-slate-600 flex items-center">
                            <span className="w-2 h-2 bg-slate-400 rounded-full mr-2 flex-shrink-0"></span>
                            {skill.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages Section */}
            {enabledSections.find(s => s.id === 'languages') && languages.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-slate-800 uppercase border-b-2 border-slate-200 pb-2">
                  LANGUAGES
                </h2>
                <ul className="list-none space-y-2">
                  {languages.map((language) => (
                    <li key={language.id} className="text-sm text-slate-700">
                      <span className="font-medium">{language.name}</span>
                      {language.proficiency && (
                        <span className="text-slate-600 block text-xs">{language.proficiency}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Certificates Section */}
            {enabledSections.find(s => s.id === 'certificates') && certificates.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-slate-800 uppercase border-b-2 border-slate-200 pb-2">
                  CERTIFICATES
                </h2>
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="text-slate-700">
                      <h3 className="font-semibold text-sm">{cert.name}</h3>
                      <p className="text-xs text-slate-600">{cert.issuer}</p>
                      <p className="text-xs text-slate-500">{formatDateRange(cert.issueDate, cert.expiryDate || '')}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* References Section */}
            {enabledSections.find(s => s.id === 'references') && references.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4 text-slate-800 uppercase border-b-2 border-slate-200 pb-2">
                  REFERENCES
                </h2>
                <div className="space-y-4">
                  {references.map((reference) => (
                    <div key={reference.id} className="text-slate-700">
                      <h3 className="font-semibold text-sm">{reference.name}</h3>
                      <p className="text-xs text-slate-600">{reference.position}</p>
                      <p className="text-xs text-slate-600">{reference.company}</p>
                      {reference.phone && <p className="text-xs text-slate-500">Phone: {reference.phone}</p>}
                      {reference.email && <p className="text-xs text-slate-500 break-all">Email: {reference.email}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white print:w-[calc(100%-75mm)] print:flex-shrink-0 flex flex-col">
            {/* Header */}
            <div className="bg-slate-800 text-white px-8 py-8 flex-shrink-0">
              <h1 className="text-4xl font-bold tracking-tight break-words">
                {personal?.fullName || 'FULL NAME'}
              </h1>
              <h2 className="text-2xl mt-2 text-slate-200 break-words">
                {personal?.jobTitle || 'JOB TITLE'}
              </h2>
            </div>

            {/* Content with Timeline */}
            <div className="relative p-8 flex-1">
              {/* Vertical Timeline Line */}
              <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-slate-200" />

              <div className="space-y-8">
                {/* Profile Section */}
                {enabledSections.find(s => s.id === 'summary') && summary?.text && (
                  <section className="relative">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-white z-10 flex-shrink-0">
                        <User className="w-7 h-7" />
                      </div>
                      <h2 className="text-xl font-bold uppercase ml-5 text-slate-800">
                        PROFILE
                      </h2>
                    </div>
                    <div className="ml-[72px]">
                      <p className="text-base text-slate-600 text-justify leading-relaxed">
                        {summary.text}
                      </p>
                    </div>
                  </section>
                )}

                {/* Work Experience Section */}
                {enabledSections.find(s => s.id === 'experience') && experience?.length > 0 && (
                  <section className="relative">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-white z-10 flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold uppercase ml-5 text-slate-800">
                        WORK EXPERIENCE
                      </h2>
                    </div>
                    <div className="ml-[72px] space-y-6">
                      {experience.map((exp) => (
                        <div key={exp.id} className="relative">
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-lg text-slate-800 break-words">{exp.company}</h3>
                              <p className="text-base font-medium text-slate-600 break-words">{exp.position}</p>
                            </div>
                            <span className="text-sm font-medium text-slate-500 flex-shrink-0 ml-4">
                              {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                            </span>
                          </div>
                          {exp.description && (
                            <p className="text-sm text-slate-600 mb-2">{exp.description}</p>
                          )}
                          {exp.bullets && exp.bullets.length > 0 && exp.bullets.some(bullet => bullet.trim()) && (
                            <ul className="list-disc ml-4 space-y-1">
                              {exp.bullets.filter(bullet => bullet.trim()).map((bullet, idx) => (
                                <li key={idx} className="text-base text-slate-600">
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education Section */}
                {enabledSections.find(s => s.id === 'education') && education?.length > 0 && (
                  <section className="relative">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-white z-10 flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold uppercase ml-5 text-slate-800">
                        EDUCATION
                      </h2>
                    </div>
                    <div className="ml-[72px] space-y-6">
                      {education.map((edu) => (
                        <div key={edu.id}>
                          <div className="flex justify-between items-start flex-wrap">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-lg text-slate-800 break-words">{edu.degree}</h3>
                              <p className="text-base text-slate-600 break-words">{edu.institution}</p>
                              {edu.field && <p className="text-base text-slate-600 break-words">{edu.field}</p>}
                              {edu.gpa && <p className="text-base text-slate-600">GPA: {edu.gpa}</p>}
                            </div>
                            <span className="text-sm font-medium text-slate-500 flex-shrink-0 ml-4">
                              {formatDateRange(edu.startDate, edu.endDate)}
                            </span>
                          </div>
                          {edu.description && (
                            <p className="text-sm text-slate-600 mt-2">{edu.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Projects Section */}
                {enabledSections.find(s => s.id === 'projects') && projects?.length > 0 && (
                  <section className="relative">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-white z-10 flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold uppercase ml-5 text-slate-800">
                        PROJECTS
                      </h2>
                    </div>
                    <div className="ml-[72px] space-y-6">
                      {projects.map((project) => (
                        <div key={project.id}>
                          <h3 className="font-bold text-lg text-slate-800 break-words">{project.name}</h3>
                          <p className="text-base text-slate-600 mb-2">{project.description}</p>
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {project.technologies.filter(tech => tech.trim()).map((tech, idx) => (
                                <span key={idx} className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {project.url && (
                            <p className="text-sm text-slate-500 break-all">{project.url}</p>
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
    </div>
  );
};

export default JamieTemplate;