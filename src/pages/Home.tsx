import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioGlareCards from '@/components/portfolio/PortfolioGlareCards';
import PortfolioVideoShowcase from '@/components/portfolio/PortfolioVideoShowcase';
import ProjectCard, { Project } from '@/components/portfolio/ProjectCard';
import { TextArcEffect } from '@/components/ui/text-arc-effect';
import Footer from '@/components/Footer';
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

// Featured projects for home page - Using the same projects as Portfolio page
const featuredProjects: Project[] = [
  {
    id: 'findy-navigation',
    title: 'FINDY - Advanced Navigation Platform',
    description: 'Netflix-inspired navigation app with real-time GPS tracking, AI-powered route planning, and beautiful dark-themed UI. Progressive Web App with offline support.',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Google Maps API', 'PWA'],
    category: 'fullstack',
    liveUrl: 'https://findy-navigation-app.netlify.app/',
    githubUrl: 'https://github.com/black12-ag/findy',
    featured: true,
    completedDate: '2025-01',
    status: 'completed'
  },
  {
    id: 'ios-chat-app',
    title: 'iOS Chat Application',
    description: 'Native iOS chat application built with SwiftUI, featuring real-time messaging, media sharing, and push notifications. Fully completed and deployed.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    technologies: ['SwiftUI', 'Swift', 'Firebase', 'Core Data', 'Push Notifications'],
    category: 'mobile',
    githubUrl: 'https://github.com/black12-ag/chat-ios-app-',
    featured: true,
    completedDate: '2025-01',
    status: 'completed'
  },
  {
    id: 'android-chat-app',
    title: 'Android Chat Application',
    description: 'Native Android chat application built with Kotlin and Material Design 3, featuring modern UI and seamless messaging experience. Fully completed.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    technologies: ['Kotlin', 'Material Design 3', 'Firebase', 'Room Database'],
    category: 'mobile',
    githubUrl: 'https://github.com/black12-ag/chat-andorid-app',
    featured: true,
    completedDate: '2025-01',
    status: 'completed'
  },
  {
    id: 'flutter-movies-app',
    title: 'Munir Movies - Flutter App',
    description: 'Modern Flutter app for discovering movies and TV shows with clean architecture, beautiful UI, and smooth animations using Material Design.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    technologies: ['Flutter', 'Dart', 'BLoC', 'Material Design'],
    category: 'mobile',
    liveUrl: 'https://movies-app-munir.netlify.app/',
    githubUrl: 'https://github.com/black12-ag/movies-app',
    videoUrl: 'https://www.youtube.com/watch?v=JlsN8xb195A',
    featured: true,
    completedDate: '2025-01',
    status: 'completed'
  },
  {
    id: 'hotel-booking-platform',
    title: 'Hotel Booking Platform',
    description: 'Advanced hotel reservation system with real-time availability, payment processing, and comprehensive admin dashboard. 90% complete with final testing phase.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'fullstack',
    featured: true,
    completedDate: '90% Complete',
    status: 'in-progress'
  }
];

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
      text: "Munir delivered an exceptional booking system that transformed our business operations. The attention to detail and user experience is outstanding.",
      author: "Sarah Johnson",
      position: "CEO, TravelPro",
      rating: 5
    },
    {
      text: "Working with Munir was a pleasure. He understood our requirements perfectly and delivered beyond expectations.",
      author: "Mike Chen", 
      position: "CTO, TechStart",
      rating: 5
    },
    {
      text: "The mobile app Munir built for us has received amazing feedback from our users. Highly recommended!",
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Check out some of my recent work and the technologies I've used.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} className="mb-4 sm:mb-0" />
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" onClick={() => navigate('/portfolio')}>
              View All Projects
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Project Video Demos */}
      <PortfolioVideoShowcase />

      {/* Why Choose Me */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Work With Me?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I bring passion, expertise, and dedication to every project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center px-4 sm:px-0">
                <div className={`inline-flex p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4`}>
                  <highlight.icon className={`w-8 h-8 ${highlight.color}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white leading-tight">{highlight.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
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
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial 
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
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-slate-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your ideas and create something amazing together.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => navigate('/contact')}
          >
            <Heart className="w-5 h-5 mr-2" />
            Let's Work Together
          </Button>
        </div>
      </section>

      {/* Thank You Arc Effect */}
      <TextArcEffect 
        text=" THANK YOU • FOR VISITING • MUNIR AYUB •"
        logoUrl="/images/profile-photo.jpg"
        logoAlt="Munir Ayub"
      />

      <Footer />
    </div>
  );
}
