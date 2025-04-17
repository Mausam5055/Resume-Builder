import React from 'react';
import { motion } from 'framer-motion';
import { useResume } from '@/context/ResumeContext';
import { Star, Quote, Sparkles } from 'lucide-react';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'TechCorp',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'ResuAI helped me create a standout resume that landed me multiple job offers. The AI suggestions were incredibly helpful in highlighting my skills effectively.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Marketing Director',
    company: 'BrandVision',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'The templates are beautiful and the customization options are endless. I was able to create a resume that perfectly represents my personal brand.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    company: 'DesignHub',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: 'As a designer, I appreciate the attention to detail in every template. The export options are fantastic, and the ATS-friendly formats give me confidence.',
    rating: 5
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Product Manager',
    company: 'InnovateTech',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    content: 'The AI-powered content suggestions saved me hours of work. It helped me articulate my experience in ways I hadn\'t considered before.',
    rating: 5
  },
  {
    id: 5,
    name: 'Olivia Williams',
    role: 'Data Scientist',
    company: 'DataFlow',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
    content: 'I was skeptical about AI resume builders, but ResuAI exceeded my expectations. The analytics feature helped me optimize my resume for better results.',
    rating: 5
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Sales Executive',
    company: 'GlobalSales',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
    content: 'The professional templates and easy customization made creating my resume a breeze. I received compliments on my resume during interviews!',
    rating: 5
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  const { theme } = useResume();
  const isAmoled = theme === 'amoled';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "var(--primary)"
      }}
      className={`flex flex-col h-full p-8 rounded-xl bg-card border border-border/40 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 25px 25px, var(--primary) 2%, transparent 0%), radial-gradient(circle at 75px 75px, var(--primary) 2%, transparent 0%)',
          backgroundSize: '100px 100px'
        }} />
      </div>
      
      {/* Quote icon with glow effect */}
      <div className={`absolute -top-4 -right-4 w-24 h-24 text-primary/10 group-hover:text-primary/20 transition-colors duration-300`}>
        <Quote className="w-full h-full" />
      </div>
      
      <div className="flex items-center mb-6 relative z-10">
        <div className="relative mr-4">
          <div className={`w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-300 shadow-md group-hover:shadow-lg`}>
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Quote className="w-3 h-3 text-primary-foreground" />
          </div>
        </div>
        <div>
          <h3 className={`font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300`}>{testimonial.name}</h3>
          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{testimonial.role} at {testimonial.company}</p>
        </div>
      </div>
      
      <div className="flex mb-6 relative z-10">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ scale: 1.2 }}
          >
            <Star 
              className={`w-5 h-5 text-amber-500 fill-amber-500 group-hover:text-amber-400 group-hover:fill-amber-400 transition-colors duration-300`} 
            />
          </motion.div>
        ))}
      </div>
      
      <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 relative z-10 text-lg leading-relaxed italic">
        "{testimonial.content}"
      </p>
      
      {/* Decorative elements */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    </motion.div>
  );
};

const Testimonials = () => {
  const { theme } = useResume();
  const isAmoled = theme === 'amoled';
  
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl`} />
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`inline-flex items-center justify-center px-4 py-2 mb-4 rounded-full bg-primary/10 text-primary`}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="font-medium">Trusted by professionals worldwide</span>
          </motion.div>
          
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="text-foreground">What our users</span>
            <span className={`block mt-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              are saying
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of professionals who have created standout resumes with ResuAI
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className={`inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary shadow-md`}>
            <Star className={`w-6 h-6 mr-2 fill-primary`} />
            <span className="font-medium text-lg">4.9/5 average rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 