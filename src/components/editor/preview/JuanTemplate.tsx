
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { formatDateRange } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, User, BookOpen, Award, Languages, Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const JuanTemplate = () => {
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
    references = []
  } = resumeData;
  
  const colorClass = `juan-${resumeData.colorScheme || 'default'}`;

  return (
    <motion.div 
      className={`w-[210mm] h-[297mm] mx-auto bg-white shadow-lg overflow-hidden ${colorClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="bg-[hsl(var(--juan-header))] text-white p-8">
          <div className="flex items-center gap-6">
            {personal.avatarUrl ? (
              <img 
                src={personal.avatarUrl} 
                alt={personal.fullName}
                className="w-20 h-20 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <Avatar className="w-20 h-20 rounded-full border-2 border-white">
                <AvatarFallback className="text-xl">
                  {personal.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <h1 className="text-3xl font-bold">{personal.fullName}</h1>
              <p className="text-lg text-gray-300 mt-1">{personal.jobTitle}</p>
              <p className="text-sm text-gray-400 mt-2">{summary?.text}</p>
            </div>
          </div>
        </header>
        
        <div className="flex flex-1">
          {/* Left Column */}
          <div className="w-1/3 bg-[hsl(var(--juan-bg))] p-6">
            <div className="space-y-6">
              {/* Contact */}
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3 flex items-center text-[hsl(var(--juan-text))]">
                  <User className="w-5 h-5 mr-2 text-[hsl(var(--juan-accent))]" /> CONTACT
                </h2>
                <div className="space-y-3 text-sm">
                  {personal.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-[hsl(var(--juan-accent))]" />
                      <span className="text-[hsl(var(--juan-text))]">{personal.phone}</span>
                    </div>
                  )}
                  {personal.email && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-[hsl(var(--juan-accent))]" />
                      <span className="text-[hsl(var(--juan-text))]">{personal.email}</span>
                    </div>
                  )}
                  {personal.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-[hsl(var(--juan-accent))]" />
                      <span className="text-[hsl(var(--juan-text))]">{personal.location}</span>
                    </div>
                  )}
                  {personal.website && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-[hsl(var(--juan-accent))]" />
                      <span className="text-[hsl(var(--juan-text))]">{personal.website}</span>
                    </div>
                  )}
                </div>
              </section>
              
              {/* Skills */}
              {skills.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3 flex items-center text-[hsl(var(--juan-text))]">
                    <Star className="w-5 h-5 mr-2 text-[hsl(var(--juan-accent))]" /> SKILLS
                  </h2>
                  <div className="space-y-3">
                    {skills.map(skillGroup => (
                      <div key={skillGroup.id}>
                        <h3 className="font-medium text-sm text-[hsl(var(--juan-accent))]">{skillGroup.name}</h3>
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
              {languages.length > 0 && (
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
              {certificates.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3 flex items-center text-[hsl(var(--juan-text))]">
                    <Award className="w-5 h-5 mr-2 text-[hsl(var(--juan-accent))]" /> CERTIFICATES
                  </h2>
                  <div className="space-y-3">
                    {certificates.map(cert => (
                      <div key={cert.id} className="text-sm">
                        <p className="font-medium text-[hsl(var(--juan-text))]">{cert.name}</p>
                        <p className="text-[hsl(var(--juan-accent))]">{cert.issuer}</p>
                        <p className="text-xs text-gray-500">
                          {formatDateRange(cert.issueDate, cert.expiryDate)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="w-2/3 p-6">
            {/* Work Experience */}
            {experience.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 text-[hsl(var(--juan-accent))] uppercase">Work Experience</h2>
                <div className="space-y-4">
                  {experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between">
                        <h3 className="font-bold">{exp.position}</h3>
                        <span className="text-sm text-gray-600">
                          {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                      {exp.bullets.length > 0 && exp.bullets[0] !== '' && (
                        <ul className="mt-2 space-y-1">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-sm flex">
                              <span className="mr-2 text-[hsl(var(--juan-accent))]">•</span>
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
            {education.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 flex items-center text-[hsl(var(--juan-accent))] uppercase">
                  <BookOpen className="w-5 h-5 mr-2" /> Education
                </h2>
                <div className="space-y-4">
                  {education.map(edu => (
                    <div key={edu.id}>
                      <div className="flex justify-between">
                        <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                        <span className="text-sm text-gray-600">
                          {formatDateRange(edu.startDate, edu.endDate)}
                        </span>
                      </div>
                      <p className="text-gray-700">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 text-[hsl(var(--juan-accent))] uppercase">Projects</h2>
                <div className="space-y-4">
                  {projects.map(project => (
                    <div key={project.id}>
                      <h3 className="font-bold">{project.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech, idx) => tech && (
                            <span key={idx} className="text-xs bg-[hsl(var(--juan-bg))] px-2 py-1 rounded">
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
                          className="text-sm text-[hsl(var(--juan-accent))] hover:underline mt-1 inline-block"
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
      </div>
    </motion.div>
  );
};

export default JuanTemplate;
