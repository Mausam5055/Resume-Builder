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
    languages = [], 
    references = [] 
  } = resumeData;

  return (
    <motion.div 
      className="bg-white shadow-lg print:shadow-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: isMobile ? '100%' : '210mm',
        minHeight: isMobile ? 'auto' : '297mm',
        maxWidth: '100%'
      }}
    >
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-[75mm] bg-slate-50 min-h-full p-6 print:p-6">
          {/* Profile Photo */}
          <div className="mb-8 flex justify-center">
            <Avatar className="w-44 h-44 border-4 border-white shadow-lg">
              {personal?.avatarUrl ? (
                <AvatarImage 
                  src={personal.avatarUrl} 
                  alt={personal?.fullName || ''} 
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="text-4xl bg-slate-200 text-slate-600">
                  {personal?.fullName ? personal.fullName.charAt(0) : '?'}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          {/* Contact Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-slate-800 uppercase border-b-2 border-slate-200 pb-2">
              CONTACT
            </h2>
            <div className="space-y-3">
              {personal?.phone && (
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="h-4 w-4 flex-shrink-0 text-slate-600" />
                  <span className="text-sm">{personal.phone}</span>
                </div>
              )}
              {personal?.email && (
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="h-4 w-4 flex-shrink-0 text-slate-600" />
                  <span className="text-sm break-all">{personal.email}</span>
                </div>
              )}
              {personal?.location && (
                <div className="flex items-center gap-3 text-slate-700">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-slate-600" />
                  <span className="text-sm">{personal.location}</span>
                </div>
              )}
              {personal?.website && (
                <div className="flex items-center gap-3 text-slate-700">
                  <Globe className="h-4 w-4 flex-shrink-0 text-slate-600" />
                  <span className="text-sm break-all">{personal.website}</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-slate-800 uppercase border-b-2 border-slate-200 pb-2">
              SKILLS
            </h2>
            <ul className="list-none space-y-2">
              {skills.map((skill) => (
                <li key={skill.id} className="text-sm text-slate-700">{skill.name}</li>
              ))}
            </ul>
          </section>

          {/* Languages Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-slate-800 uppercase border-b-2 border-slate-200 pb-2">
              LANGUAGES
            </h2>
            <ul className="list-none space-y-2">
              {languages.map((language) => (
                <li key={language.id} className="text-sm text-slate-700">
                  <span className="font-medium">{language.name}</span>
                  {language.proficiency && (
                    <span className="text-slate-600"> ({language.proficiency})</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* References Section */}
          {references.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4 text-slate-800 uppercase border-b-2 border-slate-200 pb-2">
                REFERENCE
              </h2>
              {references.map((reference) => (
                <div key={reference.id} className="mb-4 text-slate-700">
                  <h3 className="font-bold text-sm">{reference.name}</h3>
                  <p className="text-sm">{reference.position}</p>
                  {reference.phone && <p className="text-sm">Phone: {reference.phone}</p>}
                  {reference.email && <p className="text-sm">Email: {reference.email}</p>}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white">
          {/* Header */}
          <div className="bg-slate-800 text-white px-8 py-8">
            <h1 className="text-4xl font-bold tracking-tight">
              {personal?.fullName || 'FULL NAME'}
            </h1>
            <h2 className="text-2xl mt-2 text-slate-200">
              {personal?.jobTitle || 'JOB TITLE'}
            </h2>
          </div>

          {/* Content with Timeline */}
          <div className="relative p-8">
            {/* Vertical Timeline Line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-slate-200" />

            {/* Profile Section */}
            {summary?.text && (
              <section className="mb-8 relative">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-white z-10">
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
            {experience?.length > 0 && (
              <section className="mb-8 relative">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-white z-10">
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
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-slate-800">{exp.company}</h3>
                          <p className="text-base font-medium text-slate-600">{exp.position}</p>
                        </div>
                        <span className="text-sm font-medium text-slate-500">
                          {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                        </span>
                      </div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="list-disc ml-4 space-y-2">
                          {exp.bullets.map((bullet, idx) => (
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
            {education?.length > 0 && (
              <section className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-white z-10">
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
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-slate-800">{edu.degree}</h3>
                          <p className="text-base text-slate-600">{edu.institution}</p>
                          {edu.field && <p className="text-base text-slate-600">{edu.field}</p>}
                          {edu.gpa && <p className="text-base text-slate-600">GPA: {edu.gpa}</p>}
                        </div>
                        <span className="text-sm font-medium text-slate-500">
                          {formatDateRange(edu.startDate, edu.endDate)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JamieTemplate;
