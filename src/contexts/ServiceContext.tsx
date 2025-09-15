import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Laptop, 
  Smartphone, 
  Zap, 
  Bot, 
  Settings2, 
  Sparkles,
  Shield,
  TrendingUp,
  Server,
  Users,
  Globe,
  Monitor,
  Palette,
  Database,
  FileText,
  Mail,
  CreditCard
} from 'lucide-react';

export interface Service {
  id: string;
  icon: string;
  lucideIcon?: any;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  startingPrice: string;
  timeline: string;
  color: string;
  borderColor: string;
  bgColor: string;
  popular: boolean;
  type: 'main' | 'additional';
  price?: string; // For additional services
  visible: boolean; // Controls visibility on public page
  category?: string; // Service category for better organization
}

interface ServiceContextType {
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceVisibility: (id: string) => void;
  getMainServices: (includeHidden?: boolean) => Service[];
  getAdditionalServices: (includeHidden?: boolean) => Service[];
  getVisibleServices: () => Service[];
  getHiddenServices: () => Service[];
  resetToDefaults: () => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

// Comprehensive default services data
const defaultServices: Service[] = [
  // MAIN SERVICES - Core Development Offerings
  {
    id: 'web-development',
    icon: '🌐',
    lucideIcon: Globe,
    title: 'Web Development',
    shortDescription: 'Modern responsive websites and web applications.',
    description: 'Custom web applications built with React, Next.js, and modern technologies for optimal performance, SEO, and user experience.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    startingPrice: '$2,500',
    timeline: '4-8 weeks',
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    popular: true,
    type: 'main',
    visible: true,
    category: 'Development'
  },
  {
    id: 'mobile-apps',
    icon: '📱',
    lucideIcon: Smartphone,
    title: 'Mobile App Development',
    shortDescription: 'Native iOS & Android apps and cross-platform solutions.',
    description: 'Native-quality mobile apps using React Native, Flutter, and Swift/Kotlin that work seamlessly across all platforms with app store deployment.',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
    startingPrice: '$5,000',
    timeline: '6-12 weeks',
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    popular: true,
    type: 'main',
    visible: true,
    category: 'Development'
  },
  {
    id: 'ecommerce-solutions',
    icon: '🛒',
    lucideIcon: Users,
    title: 'E-commerce Solutions',
    shortDescription: 'Complete online store development and optimization.',
    description: 'Full-featured e-commerce platforms with payment processing, inventory management, admin dashboards, and mobile optimization.',
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Next.js', 'MongoDB'],
    startingPrice: '$4,000',
    timeline: '6-10 weeks',
    color: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
    popular: true,
    type: 'main',
    visible: true,
    category: 'Development'
  },
  {
    id: 'saas-development',
    icon: '☁️',
    lucideIcon: Monitor,
    title: 'SaaS Development',
    shortDescription: 'Software as a Service platforms and web applications.',
    description: 'Complete SaaS solutions with user authentication, subscription billing, admin panels, analytics, and scalable architecture.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS', 'Docker'],
    startingPrice: '$8,000',
    timeline: '8-16 weeks',
    color: 'from-indigo-500 to-indigo-600',
    borderColor: 'border-indigo-200',
    bgColor: 'bg-indigo-50',
    popular: true,
    type: 'main',
    visible: true,
    category: 'Development'
  },
  {
    id: 'automation-tools',
    icon: '⚡',
    lucideIcon: Zap,
    title: 'Business Automation',
    shortDescription: 'Workflow automation and process optimization tools.',
    description: 'Custom automation solutions to streamline business processes, integrate APIs, automate repetitive tasks, and boost productivity.',
    technologies: ['Python', 'Node.js', 'Zapier', 'APIs', 'Webhooks', 'RPA'],
    startingPrice: '$1,500',
    timeline: '2-6 weeks',
    color: 'from-orange-500 to-orange-600',
    borderColor: 'border-orange-200',
    bgColor: 'bg-orange-50',
    popular: true,
    type: 'main',
    visible: true,
    category: 'Automation'
  },
  {
    id: 'ai-chatbots',
    icon: '🤖',
    lucideIcon: Bot,
    title: 'AI Chatbots & Assistants',
    shortDescription: 'Intelligent conversational AI and automated customer support.',
    description: 'Advanced AI-powered chatbots for customer support, lead generation, task automation across Telegram, Discord, WhatsApp, and websites.',
    technologies: ['OpenAI GPT', 'Telegram Bot API', 'Discord.js', 'NLP', 'Python', 'Webhook'],
    startingPrice: '$2,000',
    timeline: '3-8 weeks',
    color: 'from-purple-600 to-purple-700',
    borderColor: 'border-purple-300',
    bgColor: 'bg-purple-50',
    popular: true,
    type: 'main',
    visible: true,
    category: 'AI & Automation'
  },
  {
    id: 'backend-apis',
    icon: '🔧',
    lucideIcon: Settings2,
    title: 'Backend & API Development',
    shortDescription: 'Robust server infrastructure and RESTful API development.',
    description: 'Scalable backend systems with secure APIs, database design, authentication, real-time features, and cloud deployment.',
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker'],
    startingPrice: '$3,000',
    timeline: '4-8 weeks',
    color: 'from-slate-500 to-slate-600',
    borderColor: 'border-slate-200',
    bgColor: 'bg-slate-50',
    popular: false,
    type: 'main',
    visible: true,
    category: 'Development'
  },
  {
    id: 'dashboard-analytics',
    icon: '📊',
    lucideIcon: TrendingUp,
    title: 'Analytics Dashboards',
    shortDescription: 'Custom data visualization and business intelligence dashboards.',
    description: 'Interactive dashboards with real-time data visualization, business analytics, KPI tracking, and automated reporting systems.',
    technologies: ['React', 'D3.js', 'Chart.js', 'Python', 'SQL', 'Power BI', 'Tableau'],
    startingPrice: '$3,500',
    timeline: '4-8 weeks',
    color: 'from-blue-600 to-blue-700',
    borderColor: 'border-blue-300',
    bgColor: 'bg-blue-50',
    popular: false,
    type: 'main',
    visible: true,
    category: 'Development'
  },
  {
    id: 'portfolio-websites',
    icon: '🎨',
    lucideIcon: Palette,
    title: 'Portfolio Websites',
    shortDescription: 'Professional portfolio and personal brand websites.',
    description: 'Custom portfolio websites for professionals, creatives, and businesses with modern design, SEO optimization, and CMS integration.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Sanity CMS', 'Vercel'],
    startingPrice: '$1,200',
    timeline: '2-4 weeks',
    color: 'from-pink-500 to-pink-600',
    borderColor: 'border-pink-200',
    bgColor: 'bg-pink-50',
    popular: false,
    type: 'main',
    visible: true,
    category: 'Development'
  },
  {
    id: 'crm-systems',
    icon: '👥',
    lucideIcon: Users,
    title: 'CRM Systems',
    shortDescription: 'Customer relationship management and sales tracking systems.',
    description: 'Custom CRM solutions for managing leads, customers, sales pipelines, communication tracking, and business process automation.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Email APIs', 'Calendar APIs'],
    startingPrice: '$5,500',
    timeline: '8-12 weeks',
    color: 'from-teal-500 to-teal-600',
    borderColor: 'border-teal-200',
    bgColor: 'bg-teal-50',
    popular: false,
    type: 'main',
    visible: false,
    category: 'Development'
  },

  // ADDITIONAL SERVICES - Specialized and Support Services
  {
    id: 'ui-ux-design',
    icon: '🎨',
    lucideIcon: Palette,
    title: 'UI/UX Design',
    shortDescription: 'User interface and experience design for web and mobile.',
    description: 'Complete UI/UX design services including user research, wireframing, prototyping, visual design, and user testing.',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'InVision', 'User Research'],
    startingPrice: '$800',
    timeline: '2-4 weeks',
    color: 'from-rose-500 to-rose-600',
    borderColor: 'border-rose-200',
    bgColor: 'bg-rose-50',
    popular: true,
    type: 'additional',
    visible: true,
    category: 'Design'
  },
  {
    id: 'website-redesign',
    icon: '🔄',
    lucideIcon: Settings2,
    title: 'Website Redesign',
    shortDescription: 'Modernize and optimize existing websites for better performance.',
    description: 'Complete website overhaul with modern design, improved UX, mobile optimization, speed improvements, and SEO enhancement.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'SEO Tools', 'Performance Optimization'],
    startingPrice: '$1,800',
    timeline: '3-6 weeks',
    color: 'from-cyan-500 to-cyan-600',
    borderColor: 'border-cyan-200',
    bgColor: 'bg-cyan-50',
    popular: true,
    type: 'additional',
    visible: true,
    category: 'Development'
  },
  {
    id: 'seo-optimization',
    icon: '📈',
    lucideIcon: TrendingUp,
    title: 'SEO Optimization',
    shortDescription: 'Search engine optimization and digital marketing setup.',
    description: 'Complete SEO audit, on-page optimization, technical SEO, keyword research, content strategy, and analytics setup.',
    technologies: ['Google Analytics', 'Search Console', 'SEMrush', 'Ahrefs', 'Schema Markup'],
    startingPrice: '$600',
    timeline: '2-3 weeks',
    color: 'from-green-600 to-green-700',
    borderColor: 'border-green-300',
    bgColor: 'bg-green-50',
    popular: true,
    type: 'additional',
    visible: true,
    category: 'Marketing'
  },
  {
    id: 'performance-optimization',
    icon: '⚡',
    lucideIcon: Zap,
    title: 'Performance Optimization',
    shortDescription: 'Speed up websites and applications for better user experience.',
    description: 'Comprehensive performance audits, code optimization, image optimization, caching strategies, and CDN setup.',
    technologies: ['Lighthouse', 'GTmetrix', 'CDN', 'Caching', 'Code Splitting', 'Image Optimization'],
    startingPrice: '$800',
    timeline: '1-3 weeks',
    color: 'from-yellow-500 to-yellow-600',
    borderColor: 'border-yellow-200',
    bgColor: 'bg-yellow-50',
    popular: false,
    type: 'additional',
    visible: true,
    category: 'Development'
  },
  {
    id: 'security-audits',
    icon: '🛡️',
    lucideIcon: Shield,
    title: 'Security Audits',
    shortDescription: 'Comprehensive security reviews and vulnerability assessments.',
    description: 'Security analysis, penetration testing, code review, vulnerability assessments, and security recommendations implementation.',
    technologies: ['OWASP', 'Security Testing', 'Penetration Testing', 'Code Review', 'SSL/TLS'],
    startingPrice: '$1,000',
    timeline: '1-2 weeks',
    color: 'from-red-500 to-red-600',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    popular: false,
    type: 'additional',
    visible: true,
    category: 'Security'
  },
  {
    id: 'devops-deployment',
    icon: '🚀',
    lucideIcon: Server,
    title: 'DevOps & Deployment',
    shortDescription: 'CI/CD pipelines, cloud infrastructure, and deployment automation.',
    description: 'Complete DevOps setup with automated deployments, cloud infrastructure, monitoring, backup strategies, and scaling solutions.',
    technologies: ['Docker', 'AWS', 'Vercel', 'Netlify', 'CI/CD', 'GitHub Actions', 'Monitoring'],
    startingPrice: '$1,200',
    timeline: '2-4 weeks',
    color: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
    popular: false,
    type: 'additional',
    visible: true,
    category: 'Infrastructure'
  },
  {
    id: 'api-integration',
    icon: '🔌',
    lucideIcon: Settings2,
    title: 'API Integration',
    shortDescription: 'Third-party API integrations and custom API development.',
    description: 'Integration with payment processors, social media APIs, email services, CRM systems, and custom API development.',
    technologies: ['REST APIs', 'GraphQL', 'Stripe', 'PayPal', 'Social APIs', 'Email APIs'],
    startingPrice: '$500',
    timeline: '1-3 weeks',
    color: 'from-indigo-600 to-indigo-700',
    borderColor: 'border-indigo-300',
    bgColor: 'bg-indigo-50',
    popular: true,
    type: 'additional',
    visible: true,
    category: 'Development'
  },
  {
    id: 'database-design',
    icon: '🗄️',
    lucideIcon: Database,
    title: 'Database Design & Migration',
    shortDescription: 'Database architecture, optimization, and migration services.',
    description: 'Database design, optimization, migration between systems, data modeling, backup strategies, and performance tuning.',
    technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Database Migration', 'SQL Optimization'],
    startingPrice: '$900',
    timeline: '2-4 weeks',
    color: 'from-emerald-500 to-emerald-600',
    borderColor: 'border-emerald-200',
    bgColor: 'bg-emerald-50',
    popular: false,
    type: 'additional',
    visible: true,
    category: 'Database'
  },
  {
    id: 'team-training',
    icon: '🎓',
    lucideIcon: Users,
    title: 'Developer Training',
    shortDescription: 'Team training on modern technologies and development practices.',
    description: 'Comprehensive training programs for development teams on modern frameworks, best practices, code review, and project management.',
    technologies: ['React', 'Node.js', 'TypeScript', 'Git', 'Best Practices', 'Code Review'],
    price: '$500/day',
    startingPrice: '$500/day',
    timeline: '1-5 days',
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    popular: false,
    type: 'additional',
    visible: true,
    category: 'Training'
  },
  {
    id: 'maintenance-support',
    icon: '🔧',
    lucideIcon: Settings2,
    title: 'Website Maintenance',
    shortDescription: 'Ongoing website maintenance, updates, and technical support.',
    description: 'Regular website updates, security patches, content management, backup monitoring, and technical support services.',
    technologies: ['CMS Updates', 'Security Patches', 'Backup Systems', 'Monitoring', 'Content Updates'],
    price: '$200/month',
    startingPrice: '$200/month',
    timeline: 'Ongoing',
    color: 'from-gray-500 to-gray-600',
    borderColor: 'border-gray-200',
    bgColor: 'bg-gray-50',
    popular: true,
    type: 'additional',
    visible: true,
    category: 'Support'
  },
  {
    id: 'content-management',
    icon: '📝',
    lucideIcon: FileText,
    title: 'CMS Development',
    shortDescription: 'Custom content management systems and CMS integration.',
    description: 'Custom CMS solutions, WordPress development, Sanity integration, content strategy, and editorial workflow setup.',
    technologies: ['WordPress', 'Sanity', 'Strapi', 'Ghost', 'Custom CMS', 'Content Strategy'],
    startingPrice: '$1,500',
    timeline: '3-6 weeks',
    color: 'from-amber-500 to-amber-600',
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
    popular: false,
    type: 'additional',
    visible: false,
    category: 'Development'
  },
  {
    id: 'social-media-automation',
    icon: '📱',
    lucideIcon: Smartphone,
    title: 'Social Media Automation',
    shortDescription: 'Automated social media posting and engagement tools.',
    description: 'Custom social media automation tools, scheduled posting, engagement tracking, analytics dashboards, and multi-platform management.',
    technologies: ['Social APIs', 'Python', 'Automation', 'Analytics', 'Scheduling Tools'],
    startingPrice: '$800',
    timeline: '2-4 weeks',
    color: 'from-pink-500 to-pink-600',
    borderColor: 'border-pink-200',
    bgColor: 'bg-pink-50',
    popular: false,
    type: 'additional',
    visible: false,
    category: 'Marketing'
  },
  {
    id: 'landing-pages',
    icon: '📄',
    lucideIcon: FileText,
    title: 'Landing Page Development',
    shortDescription: 'High-converting landing pages for marketing campaigns.',
    description: 'Custom landing pages with A/B testing, conversion optimization, lead capture forms, analytics integration, and mobile optimization.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Analytics', 'A/B Testing', 'Form Handling'],
    startingPrice: '$400',
    timeline: '1-2 weeks',
    color: 'from-violet-500 to-violet-600',
    borderColor: 'border-violet-200',
    bgColor: 'bg-violet-50',
    popular: true,
    type: 'additional',
    visible: true,
    category: 'Marketing'
  },
  {
    id: 'email-marketing',
    icon: '✉️',
    lucideIcon: Mail,
    title: 'Email Marketing Setup',
    shortDescription: 'Email marketing automation and newsletter systems.',
    description: 'Complete email marketing setup with automation workflows, newsletter design, list management, analytics, and integration with CRM systems.',
    technologies: ['Mailchimp', 'SendGrid', 'Email Templates', 'Automation', 'Analytics', 'CRM Integration'],
    startingPrice: '$600',
    timeline: '1-3 weeks',
    color: 'from-red-500 to-red-600',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    popular: false,
    type: 'additional',
    visible: false,
    category: 'Marketing'
  },
  {
    id: 'payment-integration',
    icon: '💳',
    lucideIcon: CreditCard,
    title: 'Payment System Integration',
    shortDescription: 'Secure payment processing and e-commerce checkout systems.',
    description: 'Complete payment system integration with multiple providers, subscription billing, invoice generation, and financial reporting.',
    technologies: ['Stripe', 'PayPal', 'Square', 'Subscription Billing', 'Invoice Systems', 'Financial APIs'],
    startingPrice: '$700',
    timeline: '1-3 weeks',
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    popular: true,
    type: 'additional',
    visible: true,
    category: 'E-commerce'
  }
];

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(defaultServices); // Initialize with default services immediately

  useEffect(() => {
    // Load services from localStorage or use defaults
    console.log('ServiceProvider: Loading services...');
    const savedServices = localStorage.getItem('portfolio_services');
    if (savedServices) {
      try {
        const parsed = JSON.parse(savedServices);
        console.log('ServiceProvider: Loaded services from localStorage:', parsed.length);
        setServices(parsed);
      } catch (error) {
        console.error('Error loading services from localStorage:', error);
        console.log('ServiceProvider: Using default services due to error');
        setServices(defaultServices);
      }
    } else {
      console.log('ServiceProvider: No saved services, using defaults:', defaultServices.length);
      setServices(defaultServices);
    }
  }, []);

  useEffect(() => {
    // Save services to localStorage whenever services change
    localStorage.setItem('portfolio_services', JSON.stringify(services));
  }, [services]);

  const addService = (newService: Omit<Service, 'id'>) => {
    const id = `service-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const service: Service = {
      ...newService,
      id,
      visible: newService.visible !== undefined ? newService.visible : true // Default to visible
    };
    setServices(prev => [...prev, service]);
  };

  const updateService = (id: string, updatedService: Partial<Service>) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, ...updatedService } : service
    ));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const toggleServiceVisibility = (id: string) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, visible: !service.visible } : service
    ));
  };

  const getMainServices = (includeHidden: boolean = false) => {
    return services.filter(service => 
      service.type === 'main' && (includeHidden || service.visible)
    );
  };

  const getAdditionalServices = (includeHidden: boolean = false) => {
    return services.filter(service => 
      service.type === 'additional' && (includeHidden || service.visible)
    );
  };

  const getVisibleServices = () => services.filter(service => service.visible);

  const getHiddenServices = () => services.filter(service => !service.visible);

  const resetToDefaults = () => {
    console.log('ServiceProvider: Resetting to default services');
    localStorage.removeItem('portfolio_services');
    setServices(defaultServices);
  };

  return (
    <ServiceContext.Provider value={{
      services,
      addService,
      updateService,
      deleteService,
      toggleServiceVisibility,
      getMainServices,
      getAdditionalServices,
      getVisibleServices,
      getHiddenServices,
      resetToDefaults
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};