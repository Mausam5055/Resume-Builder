import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useResume } from '@/context/ResumeContext';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

// Pricing tiers data
const pricingTiers = [
  {
    name: 'Free',
    price: '₹0',
    description: 'Perfect for trying out our resume builder',
    features: [
      '1 resume template',
      'Basic AI suggestions',
      'PDF export',
      'Community support',
      'Limited storage (1 resume)'
    ],
    cta: 'Get Started',
    ctaLink: '/editor',
    popular: false
  },
  {
    name: 'Pro',
    price: '₹765',
    period: 'per month',
    description: 'For job seekers who want to stand out',
    features: [
      'All resume templates',
      'Advanced AI content suggestions',
      'Unlimited PDF exports',
      'Priority support',
      'Unlimited storage',
      'Custom color schemes',
      'Resume analytics'
    ],
    cta: 'Start Free Trial',
    ctaLink: '/editor?plan=pro',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom branding',
      'Dedicated account manager',
      'API access',
      'Advanced analytics',
      'Custom integrations'
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    popular: false
  }
];

// Feature categories
const featureCategories = [
  {
    title: 'AI-Powered Content',
    description: 'Get smart suggestions for your job descriptions, summaries, and skills with advanced AI assistance.',
    icon: <Sparkles className="w-10 h-10 text-primary [.amoled_&]:text-[hsl(143,100%,50%)] [.neon_&]:text-[hsl(300,100%,50%)]" />,
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
    icon: <Crown className="w-10 h-10 text-primary [.amoled_&]:text-[hsl(143,100%,50%)] [.neon_&]:text-[hsl(300,100%,50%)]" />,
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
    icon: <Zap className="w-10 h-10 text-primary [.amoled_&]:text-[hsl(143,100%,50%)] [.neon_&]:text-[hsl(300,100%,50%)]" />,
    features: [
      'Drag & drop editor',
      'Real-time preview',
      'PDF export',
      'Version history'
    ]
  }
];

const PricingPage = () => {
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
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Pricing Plans</h1>
            <p className="text-xl text-muted-foreground">
              Choose the perfect plan for your needs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 hover:shadow-lg ${
                  tier.popular 
                    ? 'bg-primary text-primary-foreground shadow-xl scale-105 z-10' 
                    : 'bg-card border border-border/40 hover:border-primary/50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[hsl(143,100%,50%)] text-black px-4 py-1 rounded-full text-sm font-semibold [.neon_&]:bg-[hsl(300,100%,50%)]">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    {tier.period && (
                      <span className="ml-1 text-muted-foreground">{tier.period}</span>
                    )}
                  </div>
                  <p className="mt-2 text-muted-foreground">{tier.description}</p>
                </div>
                
                <ul className="mb-8 space-y-3 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start group">
                      <Check className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-primary group-hover:text-[hsl(143,100%,50%)] [.neon_&]:group-hover:text-[hsl(300,100%,50%)]" />
                      <span className="group-hover:text-primary [.amoled_&]:group-hover:text-[hsl(143,100%,50%)] [.neon_&]:group-hover:text-[hsl(300,100%,50%)] transition-colors duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={tier.ctaLink} className="mt-auto">
                  <Button 
                    size="lg" 
                    className={`w-full gap-2 ${
                      tier.popular 
                        ? 'bg-white text-primary hover:bg-white/90' 
                        : ''
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
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
                <h2 className="text-2xl font-semibold mb-2">Not sure which plan is right for you?</h2>
                <p className="text-muted-foreground">
                  Start with our free plan and upgrade anytime. All plans include our full suite of features.
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

export default PricingPage; 