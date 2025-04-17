import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useResume } from '@/context/ResumeContext';

const templates = [
  {
    id: 'jamie',
    name: 'Jamie Smith',
    description: 'Minimalist, clean grid layout',
    image: '/assets/templates/1.webp',
    color: 'bg-[hsl(var(--jamie))]',
    accent: 'bg-[hsl(var(--jamie-accent))]',
    textColor: 'text-[hsl(var(--jamie-text))]'
  },
  {
    id: 'lauren',
    name: 'Lauren Chen',
    description: 'Creative, soft color palette',
    image: '/assets/templates/2.avif',
    color: 'bg-[hsl(var(--lauren))]',
    accent: 'bg-[hsl(var(--lauren-accent))]',
    textColor: 'text-[hsl(var(--lauren-text))]'
  },
  {
    id: 'juan',
    name: 'Juan Hernandez',
    description: 'Corporate, formal, bold',
    image: '/assets/templates/3.jpg',
    color: 'bg-[hsl(var(--juan))]',
    accent: 'bg-[hsl(var(--juan-accent))]',
    textColor: 'text-[hsl(var(--juan-text))]'
  },
  {
    id: 'richard',
    name: 'Richard Sanchez',
    description: 'Stylish, visual-focused',
    image: '/assets/templates/4.webp',
    color: 'bg-[hsl(var(--richard))]',
    accent: 'bg-[hsl(var(--richard-accent))]',
    textColor: 'text-[hsl(var(--richard-text))]'
  }
];

const TemplateCard = ({ template, index }: { template: typeof templates[0], index: number }) => {
  const { theme } = useResume();
  const isAmoled = theme === 'amoled';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        y: -5,
        boxShadow: isAmoled 
          ? "0 0 15px rgba(0, 255, 0, 0.2), 0 10px 15px -5px rgba(0, 0, 0, 0.1)" 
          : "0 10px 15px -5px rgba(0, 0, 0, 0.1)"
      }}
      className={`flex flex-col overflow-hidden rounded-xl border border-border/40 shadow-sm transition-all duration-300 relative ${
        isAmoled ? 'hover:border-[rgba(0,255,0,0.3)]' : 'hover:shadow-md'
      }`}
    >
      {/* Neon glow effect for AMOLED mode */}
      {isAmoled && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -inset-1 bg-[rgba(0,255,0,0.05)] blur-xl rounded-xl" />
        </div>
      )}
      
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={template.image} 
          alt={template.name} 
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isAmoled 
            ? 'from-black/40 to-transparent hover:from-[rgba(0,255,0,0.1)]' 
            : 'from-black/40 to-transparent'
        } opacity-0 hover:opacity-100 transition-opacity`}>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Link to={`/editor?template=${template.id}`}>
              <Button 
                variant="outline" 
                className={`w-full backdrop-blur-sm transition-all duration-300 ${
                  isAmoled 
                    ? 'bg-white/80 hover:bg-[rgba(0,255,0,0.9)] text-black hover:text-black' 
                    : 'bg-white/80 hover:bg-white'
                }`}
              >
                Use This Template
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 relative z-10">
        <h3 className="text-lg font-semibold">{template.name}</h3>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </div>
      
      {/* Decorative corner accent */}
      {isAmoled && (
        <div className="absolute top-0 right-0 w-12 h-12 bg-[rgba(0,255,0,0.03)] rounded-tl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.div>
  );
};

const Templates = () => {
  const { theme } = useResume();
  const isAmoled = theme === 'amoled';
  
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
          isAmoled ? 'bg-[rgba(0,255,0,0.02)]' : 'bg-primary/5'
        } blur-3xl`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${
          isAmoled ? 'bg-[rgba(0,255,0,0.02)]' : 'bg-primary/5'
        } blur-3xl`} />
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Professional Resume Templates</h2>
            <p className="text-lg text-muted-foreground">
              Choose from our collection of professionally designed templates to make your resume stand out.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link to="/templates">
              <Button 
                variant="outline" 
                className={`gap-2 group ${
                  isAmoled ? 'hover:border-[rgba(0,255,0,0.5)] hover:text-[rgba(0,255,0,0.9)]' : ''
                }`}
              >
                View All Templates
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  isAmoled ? 'group-hover:text-[rgba(0,255,0,0.9)]' : ''
                }`} />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template, index) => (
            <TemplateCard key={template.id} template={template} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;
