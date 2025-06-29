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

  return (
    <div className={`w-full ${isMobile ? 'min-h-screen' : 'min-h-[297mm]'} bg-white`}>
      <motion.div 
        className="bg-white shadow-lg print:shadow-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: isMobile ? '100%' : '210mm',
          minHeight: isMobile ? 'auto' : 'auto',
          margin: '0 auto',
          fontSize: '14px',
          lineHeight: '1.4'
        }}
      >
        <div className="flex flex-col lg:flex-row min-h-full">
          {/* Left Sidebar */}
          <div className="w-full lg:w-[75mm] bg-slate-50 p-4 lg:p-6 flex flex-col">
            {/* Profile Photo */}
            {personal?.avatarUrl && (
              <div className="mb-4 lg:mb-6 flex justify-center">
                <Avatar className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-white shadow-lg">
                  <AvatarImage 
                    src={personal.avatarUrl} 
                    alt={personal?.fullName || ''} 
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xl lg:text-2xl bg-slate-200 text-slate-600">
                    {personal?.fullName ? personal.fullName.charAt(0) : '?'}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}

            {/* Contact Section */}
            <section className="mb-4 lg:mb-6">
              <h2 className="text-sm lg:text-base font-bold mb-2 lg:mb-3 text-slate-800 uppercase border-b-2 border-slate-200 pb-1">
                CONTACT
              </h2>
              <div className="space-y-1.5 lg:space-y-2">
                {personal?.phone && (
                  <div className="flex items-start gap-2 text-slate-700">
                    <Phone className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0 text-slate-600 mt-0.5" />
                    <span className="text-xs lg:text-sm break-words">{personal.phone}</span>
                  </div>
                )}
                {personal?.email && (
                  <div className="flex items-start gap-2 text-slate-700">
                    <Mail className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0 text-slate-600 mt-0.5" />
                    <span className="text-xs lg:text-sm break-all">{personal.email}</span>
                  </div>
                )}
                {personal?.location && (
                  <div className="flex items-start gap-2 text-slate-700">
                    <MapPin className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0 text-slate-600 mt-0.5" />
                    <span className="text-xs lg:text-sm break-words">{personal.location}</span>
                  </div>
                )}
                {personal?.website && (
                  <div className="flex items-start gap-2 text-slate-700">
                    <Globe className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0 text-slate-600 mt-0.5" />
                    <span className="text-xs lg:text-sm break-all">{personal.website}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Skills Section */}
            {enabledSections.find(s => s.id === 'skills') && skills.length > 0 && (
              <section className="mb-4 lg:mb-6">
                <h2 className="text-sm lg:text-base font-bold mb-2 lg:mb-3 text-slate-800 uppercase border-b-2 border-slate-200 pb-1">
                  SKILLS
                </h2>
                <div className="space-y-2 lg:space-y-3">
                  {skills.map((skillGroup) => (
                    <div key={skillGroup.id}>
                      <h3 className="font-semibold text-xs lg:text-sm text-slate-700 mb-1">{skillGroup.name}</h3>
                      <ul className="list-none space-y-0.5">
                        {skillGroup.skills.map((skill) => (
                          <li key={skill.id} className="text-xs lg:text-sm text-slate-600 flex items-center">
                            <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-slate-400 rounded-full mr-2 flex-shrink-0"></span>
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
              <section className="mb-4 lg:mb-6">
                <h2 className="text-sm lg:text-base font-bold mb-2 lg:mb-3 text-slate-800 uppercase border-b-2 border-slate-200 pb-1">
                  LANGUAGES
                </h2>
                <ul className="list-none space-y-1">
                  {languages.map((language) => (
                    <li key={language.id} className="text-xs lg:text-sm text-slate-700">
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
              <section className="mb-4 lg:mb-6">
                <h2 className="text-sm lg:text-base font-bold mb-2 lg:mb-3 text-slate-800 uppercase border-b-2 border-slate-200 pb-1">
                  CERTIFICATES
                </h2>
                <div className="space-y-2">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="text-slate-700">
                      <h3 className="font-semibold text-xs lg:text-sm">{cert.name}</h3>
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
                <h2 className="text-sm lg:text-base font-bold mb-2 lg:mb-3 text-slate-800 uppercase border-b-2 border-slate-200 pb-1">
                  REFERENCES
                </h2>
                <div className="space-y-3">
                  {references.map((reference) => (
                    <div key={reference.id} className="text-slate-700">
                      <h3 className="font-semibold text-xs lg:text-sm">{reference.name}</h3>
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
          <div className="flex-1 bg-white flex flex-col">
            {/* Header */}
            <div className="bg-slate-800 text-white px-4 lg:px-6 py-4 lg:py-6 flex-shrink-0">
              <h1 className="text-xl lg:text-3xl font-bold tracking-tight break-words">
                {personal?.fullName || 'FULL NAME'}
              </h1>
              <h2 className="text-base lg:text-xl mt-1 text-slate-200 break-words">
                {personal?.jobTitle || 'JOB TITLE'}
              </h2>
            </div>

            {/* Content with Timeline */}
            <div className="relative p-4 lg:p-6 flex-1">
              {/* Vertical Timeline Line - Hidden on mobile */}
              <div className="hidden lg:block absolute left-[22px] top-0 bottom-0 w-[2px] bg-slate-200" />

              <div className="space-y-4 lg:space-y-6">
                {/* Profile Section */}
                {enabledSections.find(s => s.id === 'summary') && summary?.text && (
                  <section className="relative">
                    <div className="flex items-center mb-2 lg:mb-3">
                      <div className="hidden lg:flex w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-800 items-center justify-center text-white z-10 flex-shrink-0">
                        <User className="w-4 h-4 lg:w-6 lg:h-6" />
                      </div>
                      <h2 className="text-base lg:text-lg font-bold uppercase lg:ml-4 text-slate-800">
                        PROFILE
                      </h2>
                    </div>
                    <div className="lg:ml-[56px]">
                      <p className="text-sm lg:text-base text-slate-600 text-justify leading-relaxed">
                        {summary.text}
                      </p>
                    </div>
                  </section>
                )}

                {/* Work Experience Section */}
                {enabledSections.find(s => s.id === 'experience') && experience?.length > 0 && (
                  <section className="relative">
                    <div className="flex items-center mb-3 lg:mb-4">
                      <div className="hidden lg:flex w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-800 items-center justify-center text-white z-10 flex-shrink-0">
                        <svg className="w-4 h-4 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h2 className="text-base lg:text-lg font-bold uppercase lg:ml-4 text-slate-800">
                        WORK EXPERIENCE
                      </h2>
                    </div>
                    <div className="lg:ml-[56px] space-y-3 lg:space-y-4">
                      {experience.map((exp) => (
                        <div key={exp.id} className="relative">
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-1 gap-1">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-sm lg:text-base text-slate-800 break-words">{exp.company}</h3>
                              <p className="text-sm lg:text-base font-medium text-slate-600 break-words">{exp.position}</p>
                            </div>
                            <span className="text-xs lg:text-sm font-medium text-slate-500 flex-shrink-0">
                              {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                            </span>
                          </div>
                          {exp.description && (
                            <p className="text-xs lg:text-sm text-slate-600 mb-1">{exp.description}</p>
                          )}
                          {exp.bullets && exp.bullets.length > 0 && exp.bullets.some(bullet => bullet.trim()) && (
                            <ul className="list-disc ml-3 space-y-0.5">
                              {exp.bullets.filter(bullet => bullet.trim()).map((bullet, idx) => (
                                <li key={idx} className="text-xs lg:text-sm text-slate-600">
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
                    <div className="flex items-center mb-3 lg:mb-4">
                      <div className="hidden lg:flex w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-800 items-center justify-center text-white z-10 flex-shrink-0">
                        <svg className="w-4 h-4 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      </div>
                      <h2 className="text-base lg:text-lg font-bold uppercase lg:ml-4 text-slate-800">
                        EDUCATION
                      </h2>
                    </div>
                    <div className="lg:ml-[56px] space-y-3 lg:space-y-4">
                      {education.map((edu) => (
                        <div key={edu.id}>
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-1">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-sm lg:text-base text-slate-800 break-words">{edu.degree}</h3>
                              <p className="text-sm lg:text-base text-slate-600 break-words">{edu.institution}</p>
                              {edu.field && <p className="text-sm lg:text-base text-slate-600 break-words">{edu.field}</p>}
                              {edu.gpa && <p className="text-sm lg:text-base text-slate-600">GPA: {edu.gpa}</p>}
                            </div>
                            <span className="text-xs lg:text-sm font-medium text-slate-500 flex-shrink-0">
                              {formatDateRange(edu.startDate, edu.endDate)}
                            </span>
                          </div>
                          {edu.description && (
                            <p className="text-xs lg:text-sm text-slate-600 mt-1">{edu.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Projects Section */}
                {enabledSections.find(s => s.id === 'projects') && projects?.length > 0 && (
                  <section className="relative">
                    <div className="flex items-center mb-3 lg:mb-4">
                      <div className="hidden lg:flex w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-800 items-center justify-center text-white z-10 flex-shrink-0">
                        <svg className="w-4 h-4 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h2 className="text-base lg:text-lg font-bold uppercase lg:ml-4 text-slate-800">
                        PROJECTS
                      </h2>
                    </div>
                    <div className="lg:ml-[56px] space-y-3 lg:space-y-4">
                      {projects.map((project) => (
                        <div key={project.id}>
                          <h3 className="font-bold text-sm lg:text-base text-slate-800 break-words">{project.name}</h3>
                          <p className="text-sm lg:text-base text-slate-600 mb-1">{project.description}</p>
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-1">
                              {project.technologies.filter(tech => tech.trim()).map((tech, idx) => (
                                <span key={idx} className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {project.url && (
                            <p className="text-xs lg:text-sm text-slate-500 break-all">{project.url}</p>
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