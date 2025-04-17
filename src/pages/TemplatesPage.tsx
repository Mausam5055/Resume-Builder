import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useResume } from '@/context/ResumeContext';
import TemplatePreviewModal from '@/components/ui/template-preview-modal';

const templates = [
  {
    id: 'jamie',
    name: 'Jamie Smith',
    description: 'Minimalist, clean grid layout. Perfect for corporate and traditional industries.',
    image: '/assets/templates/1.webp',
    color: 'bg-[hsl(var(--jamie))]',
    accent: 'bg-[hsl(var(--jamie-accent))]',
    textColor: 'text-[hsl(var(--jamie-text))]',
    bestFor: ['Business', 'Finance', 'Legal', 'Administration']
  },
  {
    id: 'lauren',
    name: 'Lauren Chen',
    description: 'Creative, soft color palette. Ideal for design and creative professionals.',
    image: '/assets/templates/2.avif',
    color: 'bg-[hsl(var(--lauren))]',
    accent: 'bg-[hsl(var(--lauren-accent))]',
    textColor: 'text-[hsl(var(--lauren-text))]',
    bestFor: ['Design', 'Art', 'Marketing', 'Fashion']
  },
  {
    id: 'juan',
    name: 'Juan Hernandez',
    description: 'Corporate, formal, bold. Excellent for management and executive positions.',
    image: '/assets/templates/3.jpg',
    color: 'bg-[hsl(var(--juan))]',
    accent: 'bg-[hsl(var(--juan-accent))]',
    textColor: 'text-[hsl(var(--juan-text))]',
    bestFor: ['Executive', 'Management', 'Consulting', 'Real Estate']
  },
  {
    id: 'richard',
    name: 'Richard Sanchez',
    description: 'Stylish, visual-focused. Great for modern industries and personal branding.',
    image: '/assets/templates/4.webp',
    color: 'bg-[hsl(var(--richard))]',
    accent: 'bg-[hsl(var(--richard-accent))]',
    textColor: 'text-[hsl(var(--richard-text))]',
    bestFor: ['Technology', 'Startups', 'Digital Media', 'Entertainment']
  }
];

const TemplateCard = ({ template, index }: { template: typeof templates[0], index: number }) => {
  const { changeTemplate } = useResume();
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const handleUseTemplate = () => {
    changeTemplate(template.id as 'jamie' | 'lauren' | 'juan' | 'richard');
    navigate(`/editor?template=${template.id}`);
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col overflow-hidden rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 hover:border-green-500/70 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-lg"
      >
        <div className="relative aspect-[3/4] overflow-hidden group">
          <img 
            src={template.image} 
            alt={template.name} 
            className="object-cover w-full h-full transition-transform hover:scale-105 duration-500 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-green-500/20 group-hover:from-green-500/10 group-hover:to-green-500/30 transition-all duration-300 mix-blend-overlay" />
        </div>
        <div className="p-6 group bg-background">
          <h3 className="text-2xl font-semibold mb-2 text-foreground">{template.name}</h3>
          <p className="text-muted-foreground mb-4">{template.description}</p>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2 text-foreground">Best For:</h4>
            <div className="flex flex-wrap gap-2">
              {template.bestFor.map((industry) => (
                <span 
                  key={industry}
                  className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              className="flex-1 group-hover:bg-green-500 group-hover:text-white group-hover:shadow-[0_0_10px_rgba(34,197,94,0.4)] transition-all duration-300"
              onClick={handleUseTemplate}
            >
              Use Template
            </Button>
            <Button 
              variant="outline" 
              className="group-hover:border-green-500 group-hover:text-green-400 group-hover:shadow-[0_0_5px_rgba(34,197,94,0.3)] transition-all duration-300"
              onClick={() => setIsPreviewOpen(true)}
            >
              Preview
            </Button>
          </div>
        </div>
      </motion.div>

      <TemplatePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageUrl={template.image}
        templateName={template.name}
      />
    </>
  );
};

const TemplatesPage = () => {
  const { theme } = useResume();
  const isAmoled = theme === 'amoled';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <Header />
      
      <main className="pt-28 pb-20 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Enhanced neon background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Additional neon accents */}
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </motion.div>

        <div className="container px-4 mx-auto relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Resume Templates</h1>
            <p className="text-xl text-muted-foreground">
              Choose from our professionally designed templates to make your resume stand out
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {templates.map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))}
          </div>
          
          <motion.div 
            className="mt-16 p-8 rounded-xl bg-muted/50 border border-border relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background gradient effect */}
            <motion.div 
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              {/* Additional neon accents */}
              <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Subtle grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </motion.div>
            
            <div className="relative z-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">Can't decide which template to use?</h2>
                <p className="text-muted-foreground">
                  Start with any template and you can switch between them at any time without losing your content.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Link to="/editor">
                  <Button size="lg">Start Building Your Resume</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TemplatesPage;
