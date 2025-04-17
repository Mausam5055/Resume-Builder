import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Zap, 
  Crown, 
  FileText, 
  Palette, 
  Download, 
  ArrowRight,
  CheckCircle,
  BarChart,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useResume } from '@/context/ResumeContext';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

// Feature categories
const featureCategories = [
  {
    title: 'AI-Powered Content',
    description: 'Get smart suggestions for your job descriptions, summaries, and skills with advanced AI assistance.',
    icon: <Sparkles className="w-10 h-10 text-blue-500 [.amoled_&]:text-blue-400 [.neon_&]:text-blue-400" />,
    features: [
      'Smart content suggestions',
      'Industry-specific terminology',
      'Action verb recommendations',
      'Skill gap analysis'
    ]
  },
  {
    title: 'Professional Templates',
    description: 'Choose from professionally designed templates to match your style and industry.',
    icon: <Crown className="w-10 h-10 text-purple-500 [.amoled_&]:text-purple-400 [.neon_&]:text-purple-400" />,
    features: [
      'Multiple design options',
      'ATS-friendly layouts',
      'Customizable sections',
      'Color scheme options'
    ]
  },
  {
    title: 'Advanced Features',
    description: 'Powerful tools to make your resume creation process simple, fast, and professional.',
    icon: <Zap className="w-10 h-10 text-yellow-500 [.amoled_&]:text-yellow-400 [.neon_&]:text-yellow-400" />,
    features: [
      'Drag & drop editor',
      'Real-time preview',
      'PDF export',
      'Version history'
    ]
  }
];

// Detailed features
const detailedFeatures = [
  {
    title: 'Smart Content Editor',
    description: 'Our AI-powered editor helps you write compelling job descriptions and professional summaries.',
    icon: <FileText className="w-8 h-8 text-indigo-500 [.amoled_&]:text-indigo-400 [.neon_&]:text-indigo-400" />,
    benefits: [
      'AI-powered content suggestions',
      'Industry-specific terminology',
      'Action verb recommendations',
      'Grammar and style improvements'
    ]
  },
  {
    title: 'Customizable Design',
    description: 'Personalize your resume with custom colors, fonts, and layouts to match your style.',
    icon: <Palette className="w-8 h-8 text-pink-500 [.amoled_&]:text-pink-400 [.neon_&]:text-pink-400" />,
    benefits: [
      'Multiple color schemes',
      'Custom font options',
      'Flexible layout adjustments',
      'Theme presets'
    ]
  },
  {
    title: 'Export Options',
    description: 'Export your resume in multiple formats for different job applications.',
    icon: <Download className="w-8 h-8 text-green-500 [.amoled_&]:text-green-400 [.neon_&]:text-green-400" />,
    benefits: [
      'PDF export',
      'Word document export',
      'Plain text export',
      'Share via link'
    ]
  },
  {
    title: 'Resume Analytics',
    description: 'Get insights into how your resume performs and suggestions for improvement.',
    icon: <BarChart className="w-8 h-8 text-orange-500 [.amoled_&]:text-orange-400 [.neon_&]:text-orange-400" />,
    benefits: [
      'ATS compatibility score',
      'Keyword analysis',
      'Readability metrics',
      'Improvement suggestions'
    ]
  },
  {
    title: 'Collaboration Tools',
    description: 'Work with mentors, career counselors, or hiring managers to perfect your resume.',
    icon: <Users className="w-8 h-8 text-teal-500 [.amoled_&]:text-teal-400 [.neon_&]:text-teal-400" />,
    benefits: [
      'Share for feedback',
      'Comment and annotate',
      'Track changes',
      'Role-based permissions'
    ]
  },
  {
    title: 'Version Control',
    description: 'Keep track of all your resume versions and easily switch between them.',
    icon: <CheckCircle className="w-8 h-8 text-red-500 [.amoled_&]:text-red-400 [.neon_&]:text-red-400" />,
    benefits: [
      'Unlimited versions',
      'Version comparison',
      'Restore previous versions',
      'Version notes'
    ]
  }
];

const FeaturesPage = () => {
  const { theme } = useResume();
  const isAmoled = theme === 'amoled';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
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
        
        <div className="container relative z-10 px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <motion.span 
                className="block text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Powerful features for
              </motion.span>
              <motion.span 
                className="block mt-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                professional resumes
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Our resume builder comes packed with everything you need to create a standout resume that gets you noticed.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-20 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Enhanced neon background elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Additional neon accents */}
          <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </motion.div>
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Everything you need to build the perfect resume</h2>
            <p className="text-lg text-muted-foreground">
              Our powerful tools make resume creation simple, fast, and professional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {featureCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div 
                  className="p-4 mb-6 rounded-full bg-card/80 group-hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {category.icon}
                </motion.div>
                
                <h3 className="mb-4 text-xl font-semibold group-hover:text-primary transition-colors duration-300">{category.title}</h3>
                <p className="mb-6 text-muted-foreground">{category.description}</p>
                
                <ul className="space-y-2 text-left">
                  {category.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start group/item"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-primary group-hover/item:scale-110 transition-transform duration-300 [.amoled_&]:text-[hsl(143,100%,50%)] [.neon_&]:text-[hsl(300,100%,50%)]" />
                      <span className="group-hover/item:text-primary transition-colors duration-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Enhanced neon background elements */}
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Additional neon accents */}
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </motion.div>
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Explore our features in detail</h2>
            <p className="text-lg text-muted-foreground">
              Discover how our tools can help you create a resume that stands out.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {detailedFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-card border border-border/40 group hover:border-primary/50 transition-all duration-300"
              >
                <motion.div 
                  className="p-3 mb-4 rounded-full bg-card/80 w-fit group-hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="mb-4 text-muted-foreground">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start group/item"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary group-hover/item:scale-110 transition-transform duration-300 [.amoled_&]:text-[hsl(143,100%,50%)] [.neon_&]:text-[hsl(300,100%,50%)]" />
                      <span className="text-sm group-hover/item:text-primary transition-colors duration-300">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Enhanced neon background elements */}
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/2 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Additional neon accents */}
          <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </motion.div>
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/90 to-primary/80 text-primary-foreground text-center shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, hover: { duration: 0.3 } }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to build your perfect resume?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-primary-foreground/90">
              Join thousands of job seekers who've created professional, ATS-friendly resumes that get results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/editor">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="gap-2 group hover:scale-105 transition-transform duration-300"
                >
                  Create Your Resume Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link to="/pricing">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 group bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
                >
                  View Pricing
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage; 