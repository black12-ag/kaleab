import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioGlareCards from '@/components/portfolio/PortfolioGlareCards';
import PortfolioVideoShowcase from '@/components/portfolio/PortfolioVideoShowcase';
import ProjectCard, { Project } from '@/components/portfolio/ProjectCard';
import { TextArcEffect } from '@/components/ui/text-arc-effect';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Footer from '@/components/Footer';
import SkillsMarquee from '@/components/skills-marquee';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Code,
  Smartphone,
  Globe,
  Palette,
  ChevronRight,
  Star,
  Award,
  Users,
  Coffee,
  Zap,
  Heart
} from 'lucide-react';

import { kaleabProjects } from '@/data/kaleabProjects';

type ProjectStatus = Project['status'];
type ProjectCategory = Project['category'];

/**
 * @param {unknown} rawStatus The raw status value from data.
 * @returns {ProjectStatus} A normalized project status.
 */
function normalizeProjectStatus(rawStatus: unknown): ProjectStatus {
  if (rawStatus === 'completed' || rawStatus === 'in-progress' || rawStatus === 'coming-soon') {
    return rawStatus;
  }
  return 'completed';
}

/**
 * @param {string} rawCategory The raw category label from data.
 * @returns {ProjectCategory} A normalized project category.
 */
function normalizeProjectCategory(rawCategory: string): ProjectCategory {
  const value = rawCategory.toLowerCase();

  if (value.includes('mobile')) return 'mobile';
  if (value.includes('ai')) return 'ai';
  if (value.includes('bot')) return 'bot';
  if (value.includes('trade')) return 'trading';
  if (value.includes('auto')) return 'automation';
  if (value.includes('design')) return 'design';
  if (value.includes('full')) return 'fullstack';
  if (value.includes('web')) return 'web';

  return 'other';
}

// All projects for home page - Map to include completedDate for ProjectCard compatibility
const allHomeProjects = kaleabProjects
  .map(project => ({
    ...project,
    completedDate: project.completionDate || 'In Progress',
    category: normalizeProjectCategory(project.category),
    status: normalizeProjectStatus(project.status)
  }));

// Services overview for home page (unused but kept for potential future use)
// const services = [
//   {
//     icon: Globe,
//     title: 'Web Development',
//     description: 'Modern, responsive web applications built with React, Next.js, and TypeScript.',
//     color: 'bg-blue-500'
//   },
//   {
//     icon: Smartphone,
//     title: 'Mobile Apps',
//     description: 'Cross-platform mobile applications using React Native and Flutter.',
//     color: 'bg-green-500'
//   },
//   {
//     icon: Code,
//     title: 'Full Stack Solutions',
//     description: 'Complete end-to-end solutions with backend APIs, databases, and deployment.',
//     color: 'bg-purple-500'
//   },
//   {
//     icon: Palette,
//     title: 'UI/UX Design',
//     description: 'User-centered design with modern interfaces and seamless experiences.',
//     color: 'bg-pink-500'
//   }
// ];

// Why choose me section
const highlights = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Quick turnaround times without compromising on quality.',
    color: 'text-yellow-500'
  },
  {
    icon: Users,
    title: 'Client-Focused',
    description: 'Clear communication and collaboration throughout the project.',
    color: 'text-blue-500'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Clean, maintainable code following industry best practices.',
    color: 'text-green-500'
  },
  {
    icon: Coffee,
    title: 'Always Available',
    description: 'Responsive support and maintenance for all projects.',
    color: 'text-orange-500'
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Kaleab delivered an exceptional booking system that transformed our business operations. The attention to detail and user experience is outstanding.",
      author: "Sarah Johnson",
      position: "CEO, TravelPro",
      rating: 5
    },
    {
      text: "Working with Kaleab was a pleasure. He understood our requirements perfectly and delivered beyond expectations.",
      author: "Mike Chen",
      position: "CTO, TechStart",
      rating: 5
    },
    {
      text: "The mobile app Kaleab built for us has received amazing feedback from our users. Highly recommended!",
      author: "Lisa Rodriguez",
      position: "Product Manager, FitLife",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <PortfolioHero />

      {/* Interactive Skills Cards */}
      <PortfolioGlareCards />

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Check out some of my recent work and the technologies I've used.
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {allHomeProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={project} className="mb-4 sm:mb-0" />
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="text-center flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button size="lg" onClick={() => navigate('/projects')}>
              View All Projects
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('video-demos')?.scrollIntoView({ behavior: 'smooth' })}>
              🎬 Watch Demos
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Project Video Demos */}
      <PortfolioVideoShowcase />

      {/* Why Choose Me */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Work With Me?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I bring passion, expertise, and dedication to every project.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto mb-12"
          >
            <SkillsMarquee className="py-2" />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {highlights.map((highlight, index) => (
              <motion.div 
                key={index} 
                className="text-center px-4 sm:px-0"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.5 }}
              >
                <div className={`inline-flex p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4`}>
                  <highlight.icon className={`w-8 h-8 ${highlight.color}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white leading-tight">{highlight.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-slate-100 dark:from-gray-900 via-gray-850 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Client Testimonials</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              What my clients say about working with me.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white dark:bg-gray-800 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-6">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="text-gray-900 dark:text-white">
                  <div className="font-semibold text-lg">{testimonials[currentTestimonial].author}</div>
                  <div className="text-gray-600 dark:text-gray-400">{testimonials[currentTestimonial].position}</div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial
                      ? 'bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">Ready to Start Your Project?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Let's discuss your ideas and build something great.</p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate('/contact')}
          >
            Let's Work Together
          </Button>
        </div>
      </section>

      {/* Thank You Arc Effect */}
      <TextArcEffect
        text=" THANK YOU • FOR VISITING • KALEAB M •"
        logoUrl="/images/profile-photo.jpg"
        logoAlt="Kaleab M"
      />

      <Footer />
      <ScrollToTop />
    </div>
  );
}
