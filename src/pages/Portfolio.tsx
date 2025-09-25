import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import ProjectCard, { Project } from '@/components/portfolio/ProjectCard';
import VideoShowcase, { VideoProject } from '@/components/portfolio/VideoShowcase';
import InteractivePortfolio from '@/components/portfolio/InteractivePortfolio';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Code, 
  Smartphone, 
  Globe, 
  Palette, 
  Users,
  Star,
  Award,
  ChevronRight,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Monitor,
  Cog,
  Database,
  Video
} from 'lucide-react';
import { parseVideoUrl } from '@/utils/videoUtils';

const BASE_URL = import.meta.env.BASE_URL || '/';

// Video Project Data - Real projects with actual videos
const videoProjects: VideoProject[] = [
  {
    id: 'munir-demo-chat-short',
    title: 'Munir Demo Chat - Short Demo',
    description: 'Quick showcase of cross-platform chat app built with React Native and Expo. Features modern UI, media sharing demos, and responsive design that works across web, iOS, and Android.',
    videoUrl: parseVideoUrl('https://youtube.com/shorts/C48THcA7eXY?si=1NiAibFxLW0Gfz1V').embedUrl,
    thumbnailUrl: parseVideoUrl('https://youtube.com/shorts/C48THcA7eXY?si=1NiAibFxLW0Gfz1V').thumbnailUrl,
    category: 'Mobile App Demo',
    technologies: ['React Native', 'Expo', 'TypeScript', 'React', 'React Native Web', 'Netlify', 'PWA'],
    duration: 'Short Demo',
    fileSize: 'YouTube Short',
    completedDate: 'Sep 2025',
    featured: true,
    githubUrl: 'https://github.com/black12-ag/munir-demo-chat'
  },
  {
    id: 'project-full-demo',
    title: 'Project Demo - Full Walkthrough',
    description: 'Complete demonstration of Gemini Telegram chat bot with AI integration. Watch the full development process, code explanations, and bot functionality implementation.',
    videoUrl: parseVideoUrl('https://youtu.be/SwsIXmBqdAA').embedUrl,
    thumbnailUrl: parseVideoUrl('https://youtu.be/SwsIXmBqdAA').thumbnailUrl,
    category: 'AI Bot Demo',
    technologies: ['Python', 'Telegram API', 'Google Gemini', 'AI Integration', 'Bot Development'],
    duration: 'Full Demo',
    fileSize: 'YouTube Video',
    completedDate: 'Dec 2024',
    featured: true,
    githubUrl: 'https://github.com/black12-ag/Gemin-telegram-chat-bot'
  },
  {
    id: 'portfolio-showcase',
    title: 'Portfolio Project Showcase',
    description: 'Detailed showcase of portfolio projects with live demonstrations, code explanations, and technical implementation details. See various projects in action. [Private Client Project]',
    videoUrl: parseVideoUrl('https://youtu.be/mJqAAGYGUDk').embedUrl,
    thumbnailUrl: parseVideoUrl('https://youtu.be/mJqAAGYGUDk').thumbnailUrl,
    category: 'Private Project',
    technologies: ['Portfolio', 'Web Development', 'React', 'TypeScript', 'Private Client Work'],
    duration: 'Showcase',
    fileSize: 'YouTube Video',
    completedDate: 'Dec 2024',
    featured: true,
    isPrivate: true
  },
  {
    id: 'flutter-movies-app-demo',
    title: 'Flutter Movies App - Full Demo',
    description: 'Complete walkthrough of Munir Movies Flutter app featuring movie discovery, clean architecture with BLoC, beautiful Material Design UI, and smooth animations. Built with Flutter 3.0+ and modern development practices.',
    videoUrl: parseVideoUrl('https://www.youtube.com/watch?v=JlsN8xb195A').embedUrl,
    thumbnailUrl: parseVideoUrl('https://www.youtube.com/watch?v=JlsN8xb195A').thumbnailUrl,
    category: 'Flutter Mobile Demo',
    technologies: ['Flutter', 'Dart', 'BLoC', 'Material Design', 'Clean Architecture', 'GetIt', 'Dio', 'Hive'],
    duration: 'Full Demo',
    fileSize: 'YouTube Video',
    completedDate: 'Jan 2025',
    featured: true,
    githubUrl: 'https://github.com/black12-ag/movies-app'
  },
  {
    id: 'smm-bot-demo',
    title: 'SMM Service Seller Bot - Live Demo',
    description: 'Live demonstration of automated SMM service selling bot (Ethio Viral). Watch how the bot handles orders, payments, and service delivery automatically on Telegram.',
    videoUrl: parseVideoUrl('https://youtube.com/shorts/ufyfoqJa04U?feature=share').embedUrl,
    thumbnailUrl: parseVideoUrl('https://youtube.com/shorts/ufyfoqJa04U?feature=share').thumbnailUrl,
    category: 'Telegram Bot Demo',
    technologies: ['Python', 'Telegram Bot API', 'SQLite', 'Payment API', 'SMM Services', 'Automation'],
    duration: 'Short Demo',
    fileSize: 'YouTube Short',
    completedDate: 'Jan 2025',
    featured: true,
    githubUrl: 'https://t.me/Ethio_viral_bot'
  }
];

// Portfolio projects - Mix of real and sample projects for demonstration
// Real projects are clearly marked, samples are for portfolio showcase purposes
const sampleProjects: Project[] = [
  {
    id: 'fitness-workout-app',
    title: 'Fitness Workout Tracker',
    description: 'Comprehensive fitness tracking application with workout plans, progress monitoring, and health analytics. Still under development with advanced features being added.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Firebase', 'Health APIs', 'Chart.js', 'TypeScript'],
    category: 'mobile',
    featured: true,
    completedDate: 'In Progress',
    status: 'in-progress',
    keyFeatures: [
      'Workout plan creation and tracking',
      'Progress visualization charts',
      'Health data integration',
      'Social sharing features',
      'Custom exercise library'
    ]
  },
  {
    id: 'hotel-booking-platform',
    title: 'Hotel Booking Platform',
    description: 'Advanced hotel reservation system with real-time availability, payment processing, and comprehensive admin dashboard. 90% complete with final testing phase.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Express'],
    category: 'fullstack',
    featured: true,
    completedDate: '90% Complete',
    status: 'in-progress',
    keyFeatures: [
      'Real-time room availability system',
      'Secure payment processing with Stripe',
      'Multi-language support (5+ languages)',
      'Advanced search and filtering',
      'Comprehensive admin dashboard'
    ]
  },
  {
    id: 'web-development-service',
    title: 'Web Development Service Platform',
    description: 'Professional web development service platform showcasing portfolio, client management, and project delivery system. Currently in development phase.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Stripe'],
    category: 'web',
    featured: true,
    completedDate: 'In Progress',
    status: 'in-progress',
    keyFeatures: [
      'Dynamic portfolio showcase',
      'Client project management',
      'Service booking system',
      'Payment integration',
      'Responsive design'
    ]
  },
  {
    id: 'smm-service-platform',
    title: 'SMM Service Management Platform',
    description: 'Social Media Marketing service platform with client management, campaign tracking, and analytics dashboard. 90% development complete.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Social APIs', 'Analytics', 'Dashboard'],
    category: 'web',
    featured: true,
    completedDate: '90% Complete',
    status: 'in-progress',
    keyFeatures: [
      'Campaign management system',
      'Social media analytics',
      'Client dashboard',
      'Performance tracking',
      'Automated reporting'
    ]
  },
  {
    id: 'ios-chat-app',
    title: 'iOS Chat Application',
    description: 'Native iOS chat application built with SwiftUI, featuring real-time messaging, media sharing, and push notifications. Complete source code available on GitHub.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    technologies: ['SwiftUI', 'Swift', 'Firebase', 'Core Data', 'Push Notifications', 'CloudKit'],
    category: 'mobile',
    githubUrl: 'https://github.com/black12-ag/chat-ios-app-',
    featured: true,
    completedDate: '2025-01',
    status: 'completed',
    keyFeatures: [
      'Real-time messaging with Firebase',
      'Media sharing (photos, videos)',
      'Push notifications',
      'SwiftUI modern interface',
      'Core Data local storage',
      'Open source on GitHub'
    ]
  },
  {
    id: 'android-chat-app',
    title: 'Android Chat Application',
    description: 'Native Android chat application built with Kotlin and Material Design 3, featuring modern UI and seamless messaging experience. Full source code available.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    technologies: ['Kotlin', 'Material Design 3', 'Firebase', 'Room Database', 'Jetpack Compose'],
    category: 'mobile',
    githubUrl: 'https://github.com/black12-ag/chat-andorid-app',
    featured: true,
    completedDate: '2025-01',
    status: 'completed',
    keyFeatures: [
      'Material Design 3 interface',
      'Real-time messaging',
      'Jetpack Compose UI',
      'Room database integration',
      'Firebase backend',
      'Open source on GitHub'
    ]
  },
  {
    id: 'flutter-movies-app',
    title: 'Munir Movies - Flutter App',
    description: 'Modern Flutter app for discovering movies and TV shows with clean architecture, beautiful UI, and smooth animations using Material Design.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    technologies: ['Flutter', 'Dart', 'BLoC', 'GetIt', 'Dio', 'Hive', 'Material Design'],
    category: 'mobile',
    liveUrl: 'https://movies-app-munir.netlify.app/',
    githubUrl: 'https://github.com/black12-ag/movies-app',
    videoUrl: 'https://www.youtube.com/watch?v=JlsN8xb195A',
    featured: true,
    completedDate: '2025-01',
    status: 'completed',
    keyFeatures: [
      'Modern Material Design UI with smooth animations',
      'Movie and TV show discovery with TMDB API',
      'Clean Architecture with BLoC state management',
      'Offline storage with Hive database',
      'Advanced search and filtering capabilities',
      'Open source on GitHub'
    ]
  },
  {
    id: 'smm-service-seller-bot',
    title: 'SMM Service Seller Bot (Ethio Viral)',
    description: 'Automated SMM (Social Media Marketing) service selling bot for Telegram. Complete automation for social media services with payment integration and order management. Fully functional and live.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    technologies: ['Python', 'Telegram Bot API', 'SQLite', 'Payments API', 'Automation', 'SMM Services'],
    category: 'bot',
    liveUrl: 'https://t.me/Ethio_viral_bot',
    videoUrl: 'https://youtube.com/shorts/ufyfoqJa04U?feature=share',
    featured: true,
    completedDate: '2025-01',
    status: 'completed',
    keyFeatures: [
      'Automated SMM service selling',
      'Payment processing integration',
      'Order management system',
      'Real-time service delivery',
      'User-friendly Telegram interface',
      'Multi-service support'
    ],
    telegramAccess: {
      botUsername: 'Ethio_viral_bot',
      startCommand: '/start',
      demoPrompts: ['/services', '/help', '/order', '/balance'],
      liveDemoAvailable: true,
      requiresAuthentication: false,
      responseTime: '< 1 second',
      availablePlugins: ['Payment Gateway', 'Service API', 'Order Tracking', 'User Management']
    }
  }
];

// Services data - Expanded to include more comprehensive offerings
const services = [
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Modern, responsive web applications with complex business logic and real-time features.',
    technologies: ['React', 'Vue.js', 'TypeScript', 'Next.js'],
    color: 'bg-blue-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform and native mobile applications for iOS and Android platforms.',
    technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
    color: 'bg-green-500'
  },
  {
    icon: Database,
    title: 'Backend & APIs',
    description: 'Robust server architecture, RESTful APIs, database design, and cloud deployment.',
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
    color: 'bg-purple-500'
  },
  {
    icon: Monitor,
    title: 'Desktop Applications',
    description: 'Cross-platform desktop applications using Electron and modern web technologies.',
    technologies: ['Electron', 'React', 'TypeScript', 'Node.js'],
    color: 'bg-orange-500'
  },
  {
    icon: Cog,
    title: 'Process Automation',
    description: 'Custom automation tools, scripts, and workflow optimization solutions.',
    technologies: ['Python', 'Node.js', 'Automation', 'Scripting'],
    color: 'bg-red-500'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design with modern interfaces and seamless user experiences.',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    color: 'bg-pink-500'
  }
];

// Skills data
const skills = [
  { name: 'React/Next.js', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'language' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'React Native', level: 80, category: 'mobile' },
  { name: 'Python', level: 75, category: 'language' },
  { name: 'UI/UX Design', level: 70, category: 'design' },
  { name: 'AWS/Cloud', level: 75, category: 'devops' },
  { name: 'PostgreSQL', level: 80, category: 'database' }
];

export default function Portfolio() {
  const navigate = useNavigate();
  // Initialize with sample projects immediately to prevent empty state
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>(sampleProjects.filter(p => p.featured));
  const [allProjects, setAllProjects] = useState<Project[]>(sampleProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load projects from localStorage (managed by admin)
  const loadProjects = () => {
    const storedProjects = localStorage.getItem('portfolio_projects');
    if (storedProjects) {
      const projects = JSON.parse(storedProjects);
      const featured = projects.filter((p: any) => p.featured);
      console.log('Loaded from localStorage:', projects.length, 'projects,', featured.length, 'featured');
      setAllProjects(projects);
      setFeaturedProjects(featured);
    } else {
      // Use sample projects as fallback
      const featured = sampleProjects.filter(p => p.featured);
      console.log('Using sample projects:', sampleProjects.length, 'projects,', featured.length, 'featured');
      setFeaturedProjects(featured);
      setAllProjects(sampleProjects);
    }
  };

  useEffect(() => {
    loadProjects();

    // Listen for project updates from admin panel
    const handleProjectsUpdate = () => {
      loadProjects();
    };

    window.addEventListener('projectsUpdated', handleProjectsUpdate);
    return () => {
      window.removeEventListener('projectsUpdated', handleProjectsUpdate);
    };
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Projects', count: allProjects.length },
    { id: 'fullstack', name: 'Full Stack', count: allProjects.filter(p => p.category === 'fullstack').length },
    { id: 'bot', name: 'Telegram Bots', count: allProjects.filter(p => p.category === 'bot').length },
    { id: 'ai', name: 'AI Tools', count: allProjects.filter(p => p.category === 'ai').length },
    { id: 'trading', name: 'Trading Tools', count: allProjects.filter(p => p.category === 'trading').length },
    { id: 'automation', name: 'Automation', count: allProjects.filter(p => p.category === 'automation').length },
    { id: 'mobile', name: 'Mobile Apps', count: allProjects.filter(p => p.category === 'mobile').length },
    { id: 'web', name: 'Web Apps', count: allProjects.filter(p => p.category === 'web').length }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <PortfolioHero />

      {/* Video Showcase Section - Hotel Booking Website */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Video className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Project Showcase</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Watch real demonstrations of my actual projects in action.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {videoProjects.map((project) => (
              <VideoShowcase key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Portfolio Section */}
      <InteractivePortfolio />

      {/* Featured Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A selection of my best work showcasing different technologies and approaches.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {featuredProjects.length > 0 ? (
              featuredProjects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} className="mb-4 sm:mb-0" />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                <p>Loading featured projects...</p>
              </div>
            )}
          </div>
          <div className="text-center">
            <Button size="lg" onClick={() => navigate('/projects')}>
              View All Projects
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">About Me</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              I'm a passionate full-stack developer with over 3 years of experience creating 
              comprehensive digital solutions. From booking systems to e-commerce platforms, 
              I specialize in building scalable applications that solve real-world problems.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center py-4">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Projects</div>
              </div>
              <div className="text-center py-4">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">25+</div>
                <div className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Clients</div>
              </div>
              <div className="text-center py-4">
                <div className="text-2xl sm:text-3xl font-bold text-purple-700">3+</div>
                <div className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Years</div>
              </div>
              <div className="text-center py-4">
                <div className="text-2xl sm:text-3xl font-bold text-slate-600">100%</div>
                <div className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I offer a comprehensive range of development services to bring your ideas to life.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-0">
                <CardContent className="p-4 sm:p-6 text-center space-y-4">
                  <div className={`inline-flex p-4 rounded-full ${service.color} text-white mb-4`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white leading-tight">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {service.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Skills & Technologies</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Technologies I work with to create amazing digital experiences.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-slate-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life. I'm available for freelance projects and consulting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white hover:text-blue-600 transition-all duration-300" onClick={() => navigate('/contact')}>
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white hover:text-blue-600 transition-all duration-300" onClick={() => window.open(`${import.meta.env.BASE_URL}resume.pdf`, '_blank')}>
              <ExternalLink className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
