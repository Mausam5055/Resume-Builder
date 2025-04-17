import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Bot, Brain, Rocket, Target, Award, Zap, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AiFeatures = () => {
  const aiFeatures = [
    {
      title: "Smart Job Description Generator",
      description: "Transform basic role information into compelling job descriptions with appropriate keywords.",
      icon: Brain,
      color: "text-blue-500"
    },
    {
      title: "Professional Summary Writer",
      description: "Generate tailored professional summaries highlighting your unique skills and experience.",
      icon: Rocket,
      color: "text-purple-500"
    },
    {
      title: "Skills Recommender",
      description: "Get personalized skill recommendations based on your industry, role, and experience.",
      icon: Target,
      color: "text-green-500"
    },
    {
      title: "Achievement Enhancer",
      description: "Turn basic achievements into impactful, quantified accomplishments with metrics.",
      icon: Award,
      color: "text-yellow-500"
    },
    {
      title: "Grammar & Style Checker",
      description: "Ensure your resume is free of errors and uses consistent, professional language.",
      icon: Shield,
      color: "text-red-500"
    },
    {
      title: "Industry-Specific Optimization",
      description: "Tailor your resume to specific industries with targeted keywords and formats.",
      icon: Zap,
      color: "text-orange-500"
    }
  ];
  
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Enhanced neon background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Additional neon accents */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-green-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-green-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
      
      <div className="container relative z-10 px-4 mx-auto">
        <motion.div 
          className="max-w-2xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-green-400/80" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-green-400/80">AI Power</h2>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-foreground">
            Let AI Supercharge Your Resume
          </h2>
          <p className="text-lg text-muted-foreground">
            Our smart assistant helps you craft perfect content for every section of your resume
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <Card className="h-full bg-background/40 backdrop-blur-sm hover:bg-background/60 transition-all duration-300 group relative overflow-hidden border border-border/40 hover:border-[rgba(0,255,0,0.3)]">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,0,0.03)] to-transparent group-hover:from-[rgba(0,255,0,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardContent className="p-6 relative">
                    <motion.div 
                      className="flex mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`p-2 rounded-full bg-${feature.color.split('-')[1]}/20 ${feature.color} group-hover:bg-[rgba(0,255,0,0.05)] transition-all duration-300 relative z-10`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </motion.div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors duration-300 relative z-10">{feature.title}</h3>
                    <p className="text-muted-foreground/80 transition-colors duration-300 relative z-10">{feature.description}</p>
                    
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[rgba(0,255,0,0.03)] rounded-tl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="max-w-4xl mx-auto mt-16 p-6 md:p-8 rounded-xl bg-background/40 backdrop-blur-sm border border-border/40 hover:border-[rgba(0,255,0,0.3)] transition-all duration-300 group relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ 
            y: -5,
            boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)"
          }}
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,0,0.03)] to-transparent group-hover:from-[rgba(0,255,0,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                className="p-3 rounded-full bg-[rgba(0,255,0,0.05)] group-hover:bg-[rgba(0,255,0,0.1)] transition-all duration-300 relative z-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Bot className="w-6 h-6 text-[rgba(0,255,0,0.9)] transition-colors duration-300" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-foreground transition-colors duration-300 relative z-10">AI Resume Assistant</h3>
            </div>
            
            <div className="grid gap-4 mb-6 md:grid-cols-2">
              <motion.div 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-5 h-5 mt-0.5 text-[rgba(0,255,0,0.9)] shrink-0 transition-colors duration-300 relative z-10" />
                <p className="text-muted-foreground/80 transition-colors duration-300 relative z-10">Real-time content suggestions as you type</p>
              </motion.div>
              <motion.div 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-5 h-5 mt-0.5 text-[rgba(0,255,0,0.9)] shrink-0 transition-colors duration-300 relative z-10" />
                <p className="text-muted-foreground/80 transition-colors duration-300 relative z-10">ATS-friendly keyword optimization</p>
              </motion.div>
              <motion.div 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-5 h-5 mt-0.5 text-[rgba(0,255,0,0.9)] shrink-0 transition-colors duration-300 relative z-10" />
                <p className="text-muted-foreground/80 transition-colors duration-300 relative z-10">Industry-specific phrase recommendations</p>
              </motion.div>
              <motion.div 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-5 h-5 mt-0.5 text-[rgba(0,255,0,0.9)] shrink-0 transition-colors duration-300 relative z-10" />
                <p className="text-muted-foreground/80 transition-colors duration-300 relative z-10">Automatic grammar and style correction</p>
              </motion.div>
            </div>
            
            <p className="text-muted-foreground/80 italic group-hover:text-muted-foreground transition-colors duration-300 relative z-10">
              "Our AI is powered by GPT-4, providing you with tailored, job-specific content to make your resume stand out."
            </p>
            
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-[rgba(0,255,0,0.03)] rounded-tl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiFeatures;
