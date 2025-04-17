import React from 'react';
import { motion } from 'framer-motion';
import { useResume } from '@/context/ResumeContext';
import { 
  Brain, 
  Layout, 
  FileDown, 
  MoveHorizontal, 
  SunMoon, 
  ImagePlus,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-8 h-8 text-blue-500" />,
    title: 'AI-Powered Content',
    description: 'Get smart suggestions for your job descriptions, summaries, and skills with advanced AI assistance.'
  },
  {
    icon: <Layout className="w-8 h-8 text-purple-500" />,
    title: 'Multiple Templates',
    description: 'Choose from professionally designed templates to match your style and industry.'
  },
  {
    icon: <MoveHorizontal className="w-8 h-8 text-green-500" />,
    title: 'Drag & Drop Editor',
    description: 'Easily rearrange sections, customize content, and personalize your resume structure.'
  },
  {
    icon: <FileDown className="w-8 h-8 text-red-500" />,
    title: 'PDF Export',
    description: 'Export high-quality, ATS-friendly PDFs in A4 format with perfect formatting.'
  },
  {
    icon: <SunMoon className="w-8 h-8 text-amber-500" />,
    title: 'Light & Dark Mode',
    description: 'Work in your preferred environment with multiple theme options.'
  },
  {
    icon: <ImagePlus className="w-8 h-8 text-indigo-500" />,
    title: 'Avatar Upload',
    description: 'Add a professional photo with easy cropping and filter options.'
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
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
      className={`flex flex-col p-6 bg-card rounded-xl shadow-sm border border-border/40 transition-all duration-300 relative overflow-hidden ${
        isAmoled ? 'hover:border-[rgba(0,255,0,0.3)]' : 'hover:shadow-md'
      }`}
    >
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isAmoled 
          ? 'from-[rgba(0,255,0,0.03)] to-transparent group-hover:from-[rgba(0,255,0,0.05)]' 
          : 'from-primary/5 to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Neon glow effect for AMOLED mode */}
      {isAmoled && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -inset-1 bg-[rgba(0,255,0,0.05)] blur-xl rounded-xl" />
        </div>
      )}
      
      <div className={`p-3 mb-4 rounded-full bg-card/80 w-fit relative z-10 ${
        isAmoled ? 'group-hover:bg-[rgba(0,255,0,0.05)]' : ''
      }`}>
        {feature.icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold relative z-10">{feature.title}</h3>
      <p className="text-muted-foreground relative z-10">{feature.description}</p>
      
      {/* Decorative corner accent */}
      {isAmoled && (
        <div className="absolute top-0 right-0 w-12 h-12 bg-[rgba(0,255,0,0.03)] rounded-tl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.div>
  );
};

const Features = () => {
  const { theme } = useResume();
  const isAmoled = theme === 'amoled';
  
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Enhanced neon background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Additional neon accents */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={`flex items-center justify-center gap-2 mb-4 ${
            isAmoled ? 'text-[rgba(0,255,0,0.9)]' : 'text-primary'
          }`}>
            <Sparkles className={`w-5 h-5 ${isAmoled ? 'text-[rgba(0,255,0,0.9)]' : 'text-primary'}`} />
            <h2 className={`text-sm font-semibold uppercase tracking-wider ${
              isAmoled ? 'text-[rgba(0,255,0,0.9)]' : 'text-primary'
            }`}>Features</h2>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Everything you need to build the perfect resume</h2>
          <p className="text-lg text-muted-foreground">
            Our powerful tools make resume creation simple, fast, and professional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
