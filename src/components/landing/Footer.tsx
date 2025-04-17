import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useResume } from '@/context/ResumeContext';

const Footer = () => {
  const { theme } = useResume();
  const isAmoled = theme === 'amoled';

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className={`py-12 ${isAmoled ? 'bg-black/50' : 'bg-muted/50'} border-t border-border relative overflow-hidden`}>
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
        <motion.div 
          className="grid gap-8 mb-8 md:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={footerVariants}
        >
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold">
                Resu<span className={`${isAmoled ? 'text-[rgba(0,255,0,0.9)]' : 'text-primary'} font-bold`}>AI</span>
              </h2>
            </Link>
            <p className="mb-4 text-muted-foreground">
              AI-powered resume builder with multiple templates and modern features.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className={`text-muted-foreground hover:text-foreground transition-colors ${
                  isAmoled ? 'hover:text-[rgba(0,255,0,0.9)]' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className={`text-muted-foreground hover:text-foreground transition-colors ${
                  isAmoled ? 'hover:text-[rgba(0,255,0,0.9)]' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className={`text-muted-foreground hover:text-foreground transition-colors ${
                  isAmoled ? 'hover:text-[rgba(0,255,0,0.9)]' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Product
            </h3>
            <ul className="space-y-2">
              {['Resume Builder', 'Templates', 'Pricing', 'Examples'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className={`text-muted-foreground hover:text-foreground transition-colors ${
                      isAmoled ? 'hover:text-[rgba(0,255,0,0.9)]' : ''
                    }`}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Resources
            </h3>
            <ul className="space-y-2">
              {['Blog', 'Resume Guides', 'FAQ', 'Support'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className={`text-muted-foreground hover:text-foreground transition-colors ${
                      isAmoled ? 'hover:text-[rgba(0,255,0,0.9)]' : ''
                    }`}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Contact', 'Privacy Policy'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className={`text-muted-foreground hover:text-foreground transition-colors ${
                      isAmoled ? 'hover:text-[rgba(0,255,0,0.9)]' : ''
                    }`}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="pt-8 mt-8 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ResuAI. All rights reserved.
            </p>
            <motion.div 
              className="flex items-center gap-2 text-sm text-muted-foreground"
              whileHover={{ scale: 1.05 }}
            >
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-red-500"
              >
                <Heart className="w-4 h-4 fill-current" />
              </motion.span>
              <span>by</span>
              <div className="flex items-center gap-2">
                <img 
                  src="/assets/mausam.jpeg" 
                  alt="Mausam Kar" 
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className={`font-medium ${isAmoled ? 'text-[rgba(0,255,0,0.9)]' : 'text-primary'}`}>Mausam Kar</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
