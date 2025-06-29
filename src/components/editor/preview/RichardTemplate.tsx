import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { formatDateRange } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, User, Briefcase, GraduationCap, Languages } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const RichardTemplate = () => {
  const { resumeData } = useResume();
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
    <motion.div 
      className={`w-[210mm] h-[297mm] mx-auto bg-white shadow-lg overflow-hidden ${colorClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="bg-[hsl(var(--richard))] text-[hsl(var(--richard-text))] py-12 px-10 flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-wider text-center">{personal.fullName}</h1>
          <h2 className="text-xl mt-2 font-light tracking-wide">{personal.jobTitle}</h2>
        </header>
        
        <div className="flex flex-1">
          {/* Left Column */}
          <div className="w-1/3 bg-gray-200 p-8">
            {/* Avatar */}
            <div className="flex justify-center mb-8">
              {personal.avatarUrl ? (
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white">
                  <img 
                    src={personal.avatarUrl} 
                    alt={personal.fullName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <Avatar className="w-40 h-40 rounded-full border-4 border-white">
                  <AvatarFallback className="text-3xl bg-[hsl(var(--richard))] text-[hsl(var(--richard-text))]">
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
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[hsl(var(--richard))]" />
                    <span>{personal.phone}</span>
                  </div>
                )}
                
                {personal.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[hsl(var(--richard))]" />
                    <span>{personal.email}</span>
                  </div>
                )}
                
                {personal.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[hsl(var(--richard))]" />
                    <span>{personal.location}</span>
                  </div>
                )}
                
                {personal.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-[hsl(var(--richard))]" />
                    <span>{personal.website}</span>
                  </div>
                )}
              </div>
            </section>
            
            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-6 uppercase">Skills</h2>
                <ul className="space-y-2">
                  {skills.flatMap(group => 
                    group.skills.map(skill => (
                      <li key={skill.id} className="flex items-center">
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
            
            {/* References */}
            {references.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-2 mb-6 uppercase">Reference</h2>
                <div className="space-y-4">
                  {references.map(reference => (
                    <div key={reference.id}>
                      <p className="font-bold">{reference.name}</p>
                      <p>{reference.position} / {reference.company}</p>
                      {reference.phone && <p>Phone: {reference.phone}</p>}
                      {reference.email && <p>Email: {reference.email}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {/* Right Column */}
          <div className="w-2/3 p-8">
            {/* Profile */}
            {summary && summary.text && (
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <User className="h-6 w-6 text-[hsl(var(--richard))] mr-3" />
                  <h2 className="text-2xl font-bold uppercase">Profile</h2>
                </div>
                <div className="border-l-4 border-[hsl(var(--richard))] pl-6 ml-3">
                  <p>{summary.text}</p>
                </div>
              </section>
            )}
            
            {/* Work Experience */}
            {experience.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <Briefcase className="h-6 w-6 text-[hsl(var(--richard))] mr-3" />
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
                          <div className="flex justify-between">
                            <h3 className="font-bold text-lg">{exp.company}</h3>
                            <span className="text-gray-600">
                              {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                            </span>
                          </div>
                          <p className="text-gray-700 italic mb-2">{exp.position}</p>
                          
                          <ul className="list-disc list-inside space-y-1">
                            {exp.bullets.map((bullet, i) => bullet && (
                              <li key={i}>{bullet}</li>
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
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-6 w-6 text-[hsl(var(--richard))] mr-3" />
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
                          <div className="flex justify-between">
                            <h3 className="font-bold text-lg">{edu.degree} of {edu.field}</h3>
                            <span className="text-gray-600">
                              {formatDateRange(edu.startDate, edu.endDate)}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-1">
                            {edu.institution}
                          </p>
                          {edu.gpa && (
                            <p>GPA: {edu.gpa} / 4.0</p>
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
              <section>
                <div className="flex items-center mb-4">
                  <Briefcase className="h-6 w-6 text-[hsl(var(--richard))] mr-3" />
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
                          <h3 className="font-bold text-lg">{project.name}</h3>
                          <p className="text-gray-700 mb-2">{project.description}</p>
                          
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
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RichardTemplate;