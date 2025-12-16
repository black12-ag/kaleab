// Portfolio projects data
export const munirProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    longDescription: 'A comprehensive e-commerce platform built with React and Node.js, featuring product management, shopping cart, payment processing, and order tracking.',
    image: '/images/project1.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Web Development',
    githubUrl: 'https://github.com/black12-ag/ecommerce',
    liveUrl: 'https://demo-ecommerce.com',
    featured: true,
    status: 'completed',
    completionDate: '2024-01-15',
    client: 'Tech Startup Inc.',
    testimonial: {
      text: 'Excellent work! The platform exceeded our expectations.',
      author: 'John Doe',
      role: 'CEO',
      rating: 5
    },
    features: [
      'Product catalog with search and filters',
      'Shopping cart and checkout',
      'Payment integration with Stripe',
      'Order tracking and management',
      'Admin dashboard'
    ]
  },
  {
    id: '2',
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking application',
    longDescription: 'A React Native mobile app for tracking workouts, nutrition, and fitness goals with real-time progress monitoring.',
    image: '/images/project2.jpg',
    technologies: ['React Native', 'Firebase', 'TypeScript'],
    category: 'Mobile Development',
    githubUrl: 'https://github.com/black12-ag/fitness-app',
    liveUrl: 'https://apps.apple.com/fitness-tracker',
    featured: true,
    status: 'completed',
    completionDate: '2024-02-20',
    features: [
      'Workout tracking',
      'Nutrition logging',
      'Progress charts',
      'Social features',
      'Push notifications'
    ]
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Modern portfolio website with admin panel',
    longDescription: 'A sleek portfolio website built with React and TypeScript, featuring an admin panel for easy content management.',
    image: '/images/project3.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: 'Web Development',
    githubUrl: 'https://github.com/black12-ag/portfolio',
    liveUrl: 'https://yourportfolio.com',
    featured: true,
    status: 'completed',
    completionDate: '2024-03-10',
    features: [
      'Responsive design',
      'Dark mode',
      'Admin panel',
      'Video support',
      'Multi-language'
    ]
  },
  {
    id: '4',
    title: 'Task Management System',
    description: 'Collaborative project management tool',
    longDescription: 'A comprehensive task management system with team collaboration features, built for modern agile teams.',
    image: '/images/project4.jpg',
    technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'TailwindCSS'],
    category: 'Web Development',
    githubUrl: 'https://github.com/black12-ag/task-manager',
    featured: false,
    status: 'completed',
    completionDate: '2023-12-05',
    features: [
      'Kanban boards',
      'Team collaboration',
      'Time tracking',
      'File attachments',
      'Real-time updates'
    ]
  },
  {
    id: '5',
    title: 'Weather Dashboard',
    description: 'Real-time weather monitoring application',
    longDescription: 'A beautiful weather dashboard that provides real-time weather data and forecasts for multiple locations.',
    image: '/images/project5.jpg',
    technologies: ['React', 'OpenWeather API', 'Chart.js'],
    category: 'Web Development',
    githubUrl: 'https://github.com/black12-ag/weather-dashboard',
    liveUrl: 'https://weather-dash.com',
    featured: false,
    status: 'completed',
    completionDate: '2023-11-20',
    features: [
      'Real-time weather data',
      '7-day forecast',
      'Multiple locations',
      'Weather charts',
      'Responsive design'
    ]
  },
  {
    id: '6',
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media metrics',
    longDescription: 'A comprehensive analytics dashboard for tracking social media performance across multiple platforms.',
    image: '/images/project6.jpg',
    technologies: ['Vue.js', 'D3.js', 'Node.js', 'Express'],
    category: 'Web Development',
    githubUrl: 'https://github.com/black12-ag/social-dashboard',
    featured: true,
    status: 'in-progress',
    completionDate: 'In Progress',
    features: [
      'Multi-platform integration',
      'Real-time analytics',
      'Custom reports',
      'Data visualization',
      'Export functionality'
    ]
  },
  {
    id: '7',
    title: 'NaturaSkin AI',
    description: 'AI-powered skin texture restoration tool',
    longDescription: 'The first AI that fixes the "plastic look" of generated images. Add realistic pores, micro-details, and film grain directly in your browser with offline client-side processing.',
    image: '/images/naturaskin.jpg',
    videoUrl: 'https://youtu.be/kpAZdAl43KE',
    technologies: ['React', 'TypeScript', 'AI/ML', 'Flux.1 Model', 'WebAssembly'],
    category: 'AI/ML',
    githubUrl: 'https://github.com/black12-ag/naturaskin-ai',
    liveUrl: 'https://naturaskin-ai.pages.dev/',
    featured: true,
    status: 'completed',
    completionDate: '2024-12-15',
    features: [
      'Offline client-side AI processing',
      'Automatic skin region segmentation',
      'Flux.1 model texture re-sampling',
      'Micropore and film grain injection',
      'Supports PNG, JPG, WEBP formats',
      'Before/after comparison view'
    ]
  }
];

// Helper functions
export const getFeaturedProjects = () => {
  return munirProjects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string) => {
  return munirProjects.filter(project => project.category === category);
};

export const getProjectById = (id: string) => {
  return munirProjects.find(project => project.id === id);
};

export const projectStats = {
  total: munirProjects.length,
  completed: munirProjects.filter(p => p.status === 'completed').length,
  inProgress: munirProjects.filter(p => p.status === 'in-progress').length,
  featured: munirProjects.filter(p => p.featured).length
};
