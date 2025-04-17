
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cta = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/90 to-primary/80 text-primary-foreground text-center shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to build your perfect resume?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-primary-foreground/90">
            Join thousands of job seekers who've created professional, ATS-friendly resumes that get results.
          </p>
          
          <Link to="/editor">
            <Button size="lg" variant="secondary" className="gap-2 group">
              Create Your Resume Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-10 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">4.9/5</div>
              <div className="text-sm text-primary-foreground/80">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-sm text-primary-foreground/80">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm text-primary-foreground/80">Templates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-primary-foreground/80">AI Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;
