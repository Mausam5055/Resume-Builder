import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90">
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
      
      <div className="container relative z-10 px-4 pt-32 pb-20 mx-auto text-center md:pt-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <span className="block text-foreground">Your resume,</span>
            <span className="block mt-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-powered perfection
            </span>
          </h1>
          
          <motion.p 
            className="max-w-2xl mx-auto mb-10 text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create stunning, ATS-friendly resumes with AI assistance.
            Multiple templates, drag-and-drop editor, and PDF export.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link to="/editor">
              <Button size="lg" className="text-base gap-2 group">
                Get Started
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link to="/templates">
              <Button size="lg" variant="outline" className="text-base">
                View Templates
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative mx-auto mt-16 max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {/* Neon corner effects */}
          <div className="absolute -top-2 -left-2 w-24 h-24 bg-blue-500/20 rounded-full filter blur-xl animate-pulse"></div>
          <div className="absolute -top-2 -right-2 w-24 h-24 bg-purple-500/20 rounded-full filter blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-cyan-500/20 rounded-full filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-pink-500/20 rounded-full filter blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

          <div className="relative flex justify-center rounded-xl overflow-hidden shadow-2xl border border-slate-200/10 backdrop-blur-sm">
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl"></div>
            <div className="absolute inset-0 rounded-xl ring-1 ring-white/5 backdrop-blur-sm"></div>
            
            <img
              src="/assets/preview.png"
              alt="Resume Template Example"
              className="relative w-full h-auto object-cover z-10"
            />
          </div>
          
          {/* Enhanced floating tag */}
          <div className="absolute -top-4 -right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-semibold border border-white/10">
            PDF Export Ready
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
