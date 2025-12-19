// Portfolio projects data
export const munirProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    longDescription: 'A comprehensive e-commerce platform built with React and Node.js, featuring product management, shopping cart, payment processing, and order tracking.',
    image: '/images/ecommerce-platform-showcase.png',
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
    image: '/images/fitness-app-mobile.png',
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
    image: '/images/portfolio-website-showcase.png',
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
    image: '/images/task-manager-showcase.png',
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
    image: '/images/weather-dashboard-showcase.jpg',
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
    image: '/images/naturaskin.png',
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
  },
  {
    id: '8',
    title: 'Ethio Viral',
    description: 'All-in-one SMM services platform',
    longDescription: 'A comprehensive social media marketing platform with instant start, fair pricing, and professional support. Trusted by 54,000+ active users including creators, businesses, and influencers to boost their social media presence.',
    image: '/images/ethio-viral-showcase.png',
    technologies: ['React', 'Node.js', 'Payment Integration', 'API', 'Database'],
    category: 'Web Development',
    githubUrl: 'https://github.com/black12-ag/ethio-viral',
    featured: true,
    status: 'completed',
    completionDate: '2024-11-20',
    features: [
      '54,000+ active users',
      '100+ secure payment methods',
      '24/7 customer support',
      'Auto-refill functionality',
      'Money back guarantee',
      'Real/high quality services'
    ]
  },
  {
    id: '9',
    title: 'Metah - Hotel Booking',
    description: 'Modern hotel search and booking platform',
    longDescription: 'A sleek hotel booking platform featuring curated recommendations from top destinations worldwide including Paris, Bangkok, London, New York, Singapore, Rome, Bali, Tokyo, and Istanbul.',
    image: '/images/metah-booking-showcase.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'API Integration'],
    category: 'Web Development',
    githubUrl: 'https://github.com/black12-ag/metah-booking',
    liveUrl: 'https://book-8rv.pages.dev/',
    featured: true,
    status: 'completed',
    completionDate: '2024-12-10',
    features: [
      'Hotel search functionality',
      'Curated destination recommendations',
      'Trending hotels by city',
      'Best value selections',
      'Top rated properties',
      'Luxury and romantic getaways'
    ]
  },
  {
    id: '10',
    title: 'Abstract - Culinary Excellence',
    description: 'Modern recipe discovery platform with chef-curated content',
    longDescription: 'A beautifully designed culinary platform that transforms recipes into experiences. Features chef-curated content from 12 expert chefs across 18 countries, category browsing, newsletter integration, and a stunning modern UI with smooth animations.',
    image: '/images/abstract-culinary.png',
    videoUrl: 'https://youtu.be/3OI1w50p0ts',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    category: 'Web Development',
    githubUrl: 'https://github.com/black12-ag/abstract-culinary',
    liveUrl: 'https://abstract-82t.pages.dev/',
    featured: true,
    status: 'completed',
    completionDate: '2024-12-18',
    features: [
      '250+ curated recipes from 18 countries',
      'Chef-selected featured recipes',
      'Quick category browsing',
      'Newsletter subscription system',
      'Responsive modern design',
      'Smooth animations and transitions'
    ]
  },
  {
    id: '11',
    title: 'WholeCase - Document Verification',
    description: 'Remote document verification platform for Ethiopia',
    longDescription: 'A professional remote document verification and authentication platform designed for Ethiopia. Features secure document upload, verification workflows, and a modern luxury-themed UI with smooth animations.',
    image: '/images/wholecase.png',
    videoUrl: 'https://youtu.be/eSOB2tai8hc',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Authentication'],
    category: 'Web Development',
    githubUrl: 'https://github.com/black12-ag/wholecase',
    liveUrl: 'https://wholecase.pages.dev/',
    featured: true,
    status: 'completed',
    completionDate: '2024-12-18',
    features: [
      'Remote document verification',
      'Secure authentication system',
      'Document upload and processing',
      'Luxury-themed modern UI',
      'Ethiopian market focused',
      'Responsive design with animations'
    ]
  },
  {
    id: '12',
    title: 'Warp Bypass - Identity Reset Tool',
    description: 'Identity reset & complete removal tools for Warp terminal',
    longDescription: 'Warp Bypass provides two powerful tools: Identity Reset (keeps app installed, resets machine identity) and Complete Removal (removes app and all traces). Cross-platform support for macOS, Windows, and Linux with one-liner installation commands.',
    image: '/images/warp-bypass.png',
    videoUrl: 'https://youtu.be/Fh5IQUv8XBU',
    technologies: ['Python', 'Shell', 'Bash', 'Cross-Platform'],
    category: 'Automation',
    githubUrl: 'https://github.com/black12-ag/warp-bypass',
    featured: true,
    status: 'completed',
    completionDate: '2024-12-18',
    features: [
      'Identity Reset - keeps app, resets machine ID',
      'Complete Removal - removes all traces',
      'Cross-platform (macOS, Windows, Linux)',
      'One-liner installation commands',
      'Linux standalone bash scripts',
      'Video tutorial included'
    ]
  },
  {
    id: '13',
    title: 'Cursor Bypass Tool',
    description: 'Professional account management tool for Cursor AI with auto-registration',
    longDescription: 'A powerful cross-platform automation tool for Cursor AI account management. Features Machine ID Reset, Smart Registration (automatic & manual modes), secure account handling, and 15 language support. Bulletproof installation that never fails.',
    image: '/images/cursor-bypass.png',
    videoUrl: 'https://youtu.be/xWOLAMmtvd4',
    technologies: ['Python', 'Browser Automation', 'Cross-Platform', 'Multi-Language'],
    category: 'Automation',
    githubUrl: 'https://github.com/black12-ag/cursor-bypass-tool',
    featured: true,
    status: 'completed',
    completionDate: '2024-12-18',
    features: [
      'Machine ID Reset',
      'Auto & Manual registration modes',
      'Temp email auto-generation',
      '15 language support',
      'Bulletproof one-line installer',
      'Cross-platform (Windows, macOS, Linux)'
    ]
  },
  {
    id: '14',
    title: 'Windsurf Bypass Tool',
    description: 'Professional automation suite for Windsurf AI Editor',
    longDescription: 'Complete automation suite for Windsurf AI Editor featuring Machine ID Reset, Auto Account Creation with temp email, and Total Reset for fresh start. Zero config, cross-platform, completes in under 60 seconds.',
    image: '/images/windsurf-bypass.png',
    videoUrl: 'https://youtu.be/hQPsczoqfAY',
    technologies: ['Python', 'Browser Automation', 'Cross-Platform', 'Temp Email'],
    category: 'Automation',
    githubUrl: 'https://github.com/black12-ag/windsurf-bypass',
    featured: true,
    status: 'completed',
    completionDate: '2024-12-18',
    features: [
      'Reset Machine ID (5-10 seconds)',
      'Auto Account Creation with temp email',
      'Total Reset for fresh start',
      'Zero configuration needed',
      'Cross-platform support',
      'Completes in under 60 seconds'
    ]
  },
  {
    id: '15',
    title: 'Apple.com High-Fidelity Clone',
    description: 'Pixel-perfect Apple.com clone with 60+ pages and responsive design',
    longDescription: 'A high-fidelity clone of Apple.com featuring pixel-perfect components, responsive design, and over 60 dedicated pages mirroring the official structure. Includes global navigation, hero sections, product highlight cards, call-to-action banners, and layouts that adapt from desktop to mobile.',
    image: '/images/apple-clone.png',
    videoUrl: 'https://youtu.be/fCDqxrsjnVk',
    technologies: ['React', 'TypeScript', 'Vite', 'Styled Components', 'Framer Motion', 'React Router'],
    category: 'Web Development',
    githubUrl: 'https://github.com/black12-ag/apple.com',
    liveUrl: 'https://apple-com-clw.pages.dev/',
    featured: true,
    status: 'completed',
    completionDate: '2024-12-18',
    features: [
      '60+ dedicated pages mirroring Apple structure',
      'Pixel-perfect responsive design',
      'Global navigation bar',
      'Hero sections with product highlights',
      'Product tile grids and promo cards',
      'Cloudflare Pages deployment ready'
    ]
  },
  {
    id: '16',
    title: 'iOS Chat Application',
    description: 'Native iOS chat application built with SwiftUI',
    longDescription: 'A premium native iOS chat application built with SwiftUI, featuring real-time messaging, media sharing, and Core Data persistence. Designed with a clean, modern aesthetic focusing on user experience and performance.',
    image: '/images/ios-chat-app-showcase.png',
    technologies: ['SwiftUI', 'Swift', 'Firebase', 'Core Data', 'Combine'],
    category: 'Mobile Development',
    githubUrl: 'https://github.com/black12-ag/ios-chat-app',
    featured: true,
    status: 'completed',
    completionDate: '2025-01-10',
    features: [
      'Real-time messaging with Firebase',
      'Offline persistence using Core Data',
      'Modern SwiftUI interface',
      'Media sharing capability',
      'Push notifications implementation',
      'Dark mode support'
    ]
  },
  {
    id: '17',
    title: 'Android Chat Application',
    description: 'Native Android chat application built with Kotlin and Material Design 3',
    longDescription: 'A modern native Android chat application leveraging Kotlin and Jetpack Compose with Material Design 3. Features real-time messaging, local caching with Room Database, and dynamic coloring support.',
    image: '/images/android-chat-app-showcase.png',
    technologies: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Room Database', 'Material Design 3'],
    category: 'Mobile Development',
    githubUrl: 'https://github.com/black12-ag/android-chat-app',
    featured: true,
    status: 'completed',
    completionDate: '2025-01-15',
    features: [
      'Real-time messaging system',
      'Local caching with Room Database',
      'Material Design 3 (Material You)',
      'MVVM Architecture',
      'Image and file sharing',
      'Group chat functionality'
    ]
  }
  {
    id: '13',
    title: 'Findy - Advanced Navigation',
    description: 'Intelligent navigation companion with smart routing',
    longDescription: 'An advanced navigation application featuring real-time traffic updates, smart route optimization, and offline maps. Designed as a reliable companion for seamless travel experiences.',
    image: '/images/findy-showcase.png',
    technologies: ['React', 'Leaflet', 'Geolocation API', 'PWA'],
    category: 'Web Development',
    githubUrl: 'https://github.com/black12-ag/findy-navigation',
    liveUrl: 'https://findy-navigation-app.netlify.app/',
    featured: true,
    status: 'completed',
    completionDate: '2024-12-19',
    features: [
      'Smart route optimization',
      'Real-time traffic updates',
      'Offline maps availability',
      'Turn-by-turn guidance',
      'Location sharing',
      'Interactive map interface'
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
