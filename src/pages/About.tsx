import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Calendar,
  Mail,
  Phone,
  Globe,
  Download,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  GraduationCap,
  Heart,
  Coffee,
  Zap,
  Users,
  Star,
  ExternalLink,
  TrendingUp,
  CheckCircle2,
  Rocket,
  Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Database, Server, Smartphone } from 'lucide-react';

// Experience data - Realistic 3-year journey
const experience = [
  {
    id: '1',
    title: 'Full Stack Developer & Freelancer',
    company: 'Freelance',
    location: 'Remote / Ethiopia',
    period: '2023 - Present',
    description: 'Building custom web and mobile applications for international clients. Specializing in modern web technologies, automation tools, and AI-powered solutions.',
    achievements: [
      'Successfully delivered 15+ projects across different industries',
      'Built e-commerce platforms, booking systems, and business tools',
      'Developed Telegram bots and automation solutions',
      'Maintained excellent client relationships with repeat business'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Python']
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Local Tech Agency',
    location: 'Addis Ababa, Ethiopia',
    period: '2022 - 2023',
    description: 'Worked on various web development projects for local businesses and startups. Gained experience in full-stack development and client communication.',
    achievements: [
      'Developed responsive websites for 8+ local businesses',
      'Built custom CMS solutions and admin dashboards',
      'Collaborated with design team to implement pixel-perfect UIs',
      'Learned modern deployment and hosting solutions'
    ],
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'MySQL', 'HTML/CSS']
  },
  {
    id: '3',
    title: 'Self-Taught Developer & Student',
    company: 'Personal Learning Journey',
    location: 'Ethiopia',
    period: '2022 - 2022',
    description: 'Started my coding journey with online courses and tutorials. Built personal projects and learned the fundamentals of web development.',
    achievements: [
      'Completed comprehensive web development courses',
      'Built first portfolio website and personal projects',
      'Learned HTML, CSS, JavaScript, and React fundamentals',
      'Created first full-stack application with database integration'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB']
  }
];

// Education data - Realistic self-taught journey
const education = [
  {
    id: '1',
    degree: 'Self-Taught Full Stack Developer',
    institution: 'Online Learning Platforms',
    location: 'Remote Learning',
    period: '2022 - 2024',
    description: 'Comprehensive self-study through various online platforms including FreeCodeCamp, YouTube, Udemy, and official documentation. Focused on practical project-based learning.',
    courses: [
      'JavaScript Fundamentals & ES6+',
      'React.js & Next.js Development',
      'Node.js & Express Backend',
      'Database Design (MongoDB, PostgreSQL)',
      'Version Control with Git & GitHub',
      'Deployment & Hosting Solutions'
    ]
  },
  {
    id: '2',
    degree: 'Modern Web Development',
    institution: 'FreeCodeCamp & YouTube University',
    location: 'Online',
    period: '2022 - 2023',
    description: 'Completed comprehensive web development curriculum with focus on responsive design, modern JavaScript, and full-stack development.',
    courses: [
      'Responsive Web Design',
      'JavaScript Algorithms & Data Structures',
      'Frontend Libraries (React)',
      'APIs & Microservices',
      'Python & Automation',
      'Project Portfolio Development'
    ]
  },
  {
    id: '3',
    degree: 'Continuous Learning & Specialization',
    institution: 'Various Online Platforms',
    location: 'Online',
    period: '2023 - Present',
    description: 'Ongoing learning in advanced topics including TypeScript, cloud services, mobile development, and AI integration.',
    courses: [
      'TypeScript Advanced Patterns',
      'React Native Mobile Development',
      'Cloud Services (AWS, Vercel)',
      'AI Integration (OpenAI APIs)',
      'Telegram Bot Development',
      'Business Automation Tools'
    ]
  }
];

// Certifications - Realistic online achievements
const certifications = [
  { name: 'Responsive Web Design', issuer: 'FreeCodeCamp', year: '2022' },
  { name: 'JavaScript Algorithms and Data Structures', issuer: 'FreeCodeCamp', year: '2022' },
  { name: 'Frontend Development Libraries', issuer: 'FreeCodeCamp', year: '2023' },
  { name: 'APIs and Microservices', issuer: 'FreeCodeCamp', year: '2023' },
  { name: 'React - The Complete Guide', issuer: 'Udemy', year: '2023' },
  { name: 'Node.js - The Complete Guide', issuer: 'Udemy', year: '2024' }
];

// Journey timeline data - Realistic 3-year journey
const journeyMilestones = [
  {
    year: '2022',
    title: 'Started Coding Journey',
    description: 'Began self-teaching web development through online resources, started with HTML, CSS, and JavaScript basics',
    type: 'education',
    icon: GraduationCap,
    color: 'bg-blue-500'
  },
  {
    year: '2022',
    title: 'First React Project',
    description: 'Built my first React application and discovered my passion for modern web development',
    type: 'milestone',
    icon: Code2,
    color: 'bg-green-500'
  },
  {
    year: '2022',
    title: 'First Paid Project',
    description: 'Completed first freelance project - a simple business website, marking the start of my career',
    type: 'career',
    icon: Briefcase,
    color: 'bg-purple-500'
  },
  {
    year: '2023',
    title: 'Full Stack Development',
    description: 'Mastered backend development with Node.js and databases, became a complete full-stack developer',
    type: 'milestone',
    icon: Server,
    color: 'bg-indigo-600'
  },
  {
    year: '2023',
    title: 'Local Agency Experience',
    description: 'Joined a local tech agency, gained experience working with teams and larger projects',
    type: 'career',
    icon: Users,
    color: 'bg-purple-600'
  },
  {
    year: '2024',
    title: 'Freelance Success',
    description: 'Became full-time freelancer, built reputation for quality work and client satisfaction',
    type: 'career',
    icon: Rocket,
    color: 'bg-slate-600'
  },
  {
    year: '2024',
    title: 'AI & Automation Specialist',
    description: 'Expanded into AI integration and automation tools, including Telegram bots and business automation',
    type: 'achievement',
    icon: Bot,
    color: 'bg-blue-700'
  },
  {
    year: '2025',
    title: '67+ Projects Delivered',
    description: 'Successfully delivered diverse projects from e-commerce to automation tools with excellent client feedback',
    type: 'achievement',
    icon: Award,
    color: 'bg-green-700'
  }
];

// Skills categories - Realistic levels for 3-year self-taught developer
const skillCategories = [
  {
    category: 'Frontend Development',
    icon: Code2,
    color: 'text-blue-600',
    skills: [
      { name: 'React/Next.js', level: 85, color: 'bg-blue-500' },
      { name: 'JavaScript/ES6+', level: 88, color: 'bg-yellow-500' },
      { name: 'TypeScript', level: 75, color: 'bg-blue-400' },
      { name: 'HTML/CSS', level: 90, color: 'bg-purple-500' },
      { name: 'Tailwind CSS', level: 85, color: 'bg-purple-400' }
    ]
  },
  {
    category: 'Backend Development',
    icon: Server,
    color: 'text-purple-600',
    skills: [
      { name: 'Node.js', level: 80, color: 'bg-purple-600' },
      { name: 'Express.js', level: 78, color: 'bg-slate-600' },
      { name: 'Python', level: 70, color: 'bg-blue-700' },
      { name: 'REST APIs', level: 82, color: 'bg-purple-500' },
      { name: 'Authentication', level: 75, color: 'bg-slate-500' }
    ]
  },
  {
    category: 'Database & Cloud',
    icon: Database,
    color: 'text-purple-600',
    skills: [
      { name: 'MongoDB', level: 78, color: 'bg-purple-700' },
      { name: 'PostgreSQL', level: 72, color: 'bg-blue-700' },
      { name: 'Firebase', level: 75, color: 'bg-orange-500' },
      { name: 'Vercel/Netlify', level: 80, color: 'bg-slate-600' },
      { name: 'Basic AWS', level: 60, color: 'bg-blue-400' }
    ]
  },
  {
    category: 'Tools & Others',
    icon: Smartphone,
    color: 'text-blue-600',
    skills: [
      { name: 'Git/GitHub', level: 85, color: 'bg-slate-800' },
      { name: 'VS Code', level: 90, color: 'bg-blue-600' },
      { name: 'React Native', level: 65, color: 'bg-blue-500' },
      { name: 'Telegram Bots', level: 80, color: 'bg-blue-400' },
      { name: 'UI/UX Basics', level: 70, color: 'bg-purple-600' }
    ]
  }
];

// Animated Skill Bar Component
interface AnimatedSkillBarProps {
  skill: {
    name: string;
    level: number;
    color: string;
  };
  inView: boolean;
}

const AnimatedSkillBar: React.FC<AnimatedSkillBarProps> = ({ skill, inView }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedLevel(skill.level);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView, skill.level]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-900 dark:text-white text-sm">{skill.name}</span>
        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${skill.color}`}
          style={{ width: `${animatedLevel}%` }}
        ></div>
      </div>
    </div>
  );
};

// Timeline Component
interface TimelineItemProps {
  milestone: {
    year: string;
    title: string;
    description: string;
    type: string;
    icon: React.ComponentType<any>;
    color: string;
  };
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ milestone, index }) => {
  const Icon = milestone.icon;

  return (
    <div className="flex items-center group hover:scale-105 transition-all duration-300">
      <div className="flex flex-col items-center mr-6">
        <div className={`w-12 h-12 ${milestone.color} rounded-full flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="w-1 h-12 bg-gray-300 dark:bg-gray-600 mt-2 last:hidden" />
      </div>
      <div className="flex-1 pb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Badge className={`${milestone.color} text-white text-xs`}>
              {milestone.year}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {milestone.type}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {milestone.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {milestone.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'journey' | 'experience' | 'education' | 'skills'>('journey');
  const [skillsInView, setSkillsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const skillsSection = document.getElementById('skills-section');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  const personalInfo = {
    name: 'Kaleab M',
    title: 'Full Stack Developer & Digital Solutions Expert',
    location: 'Ethiopia',
    email: 'kaleab.dev@example.com',
    phone: '+251 90 780 6267',
    website: 'https://kaleab-portfolio.dev',
    yearsOfExperience: 3,
    projectsCompleted: 67,
    happyClients: 34
  };

  const tabs = [
    { id: 'journey', label: 'Journey', icon: TrendingUp },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code2 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-purple-50 to-slate-100 dark:from-gray-900 via-gray-850 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-600">M</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              About {personalInfo.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {personalInfo.title}
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>{personalInfo.yearsOfExperience}+ years experience</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Award className="w-4 h-4" />
                <span>{personalInfo.projectsCompleted}+ projects completed</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('/Kaleab_Ayub_CV.pdf', '_blank')}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">My Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
              <p className="mb-6">
                I'm a passionate self-taught full-stack developer from Ethiopia with 3 years of hands-on experience
                creating digital solutions for clients worldwide. My journey began in 2022 when I discovered the
                world of programming through online resources and fell in love with building things that solve real problems.
              </p>
              <p className="mb-6">
                Starting from absolute zero with no formal computer science background, I dedicated myself to learning
                web development through platforms like FreeCodeCamp, YouTube, and countless hours of practice.
                What began as curiosity quickly turned into a career as I built my first paid website just months after
                writing my first line of code.
              </p>
              <p className="mb-6">
                Today, I specialize in building modern web applications, e-commerce platforms, business automation tools,
                and AI-powered solutions. I've worked with local businesses in Ethiopia and international clients,
                delivering everything from simple business websites to complex booking systems and Telegram bots.
              </p>
              <p>
                My journey proves that with determination, consistent learning, and passion for problem-solving,
                anyone can build a successful career in tech. I'm always excited to take on new challenges and
                help businesses grow through technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{personalInfo.yearsOfExperience}+</div>
              <div className="text-gray-700 dark:text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">{personalInfo.projectsCompleted}+</div>
              <div className="text-gray-700 dark:text-gray-300">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">{personalInfo.happyClients}+</div>
              <div className="text-gray-700 dark:text-gray-300">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-700 dark:text-gray-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-md font-medium transition-all ${activeTab === tab.id
                          ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Journey Tab */}
            {activeTab === 'journey' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">My Journey</h3>
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-0">
                    {journeyMilestones.map((milestone, index) => (
                      <TimelineItem key={index} milestone={milestone} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Professional Experience</h3>
                {experience.map((exp) => (
                  <Card key={exp.id} className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                          <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                          <p className="text-gray-600 dark:text-gray-400">{exp.location}</p>
                        </div>
                        <Badge variant="outline" className="mt-2 md:mt-0 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          {exp.period}
                        </Badge>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements:</h5>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <Star className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Technologies Used:</h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Education & Learning</h3>
                {education.map((edu) => (
                  <Card key={edu.id} className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{edu.degree}</h4>
                          <p className="text-lg text-blue-600 font-medium">{edu.institution}</p>
                          <p className="text-gray-600 dark:text-gray-400">{edu.location}</p>
                          {(edu as any).gpa && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">GPA: {(edu as any).gpa}</p>
                          )}
                        </div>
                        <Badge variant="outline" className="mt-2 md:mt-0 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          {edu.period}
                        </Badge>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{edu.description}</p>

                      {/* Relevant Courses */}
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Relevant Courses:</h5>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course, index) => (
                            <Badge key={index} variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Certifications */}
                <Card className="border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Certifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <Award className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{cert.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer} • {cert.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-8" id="skills-section">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {skillCategories.map((category, index) => {
                    const CategoryIcon = category.icon;
                    return (
                      <Card key={index} className="border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-6">
                            <CategoryIcon className={`w-6 h-6 ${category.color}`} />
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{category.category}</h4>
                          </div>
                          <div className="space-y-4">
                            {category.skills.map((skill, skillIndex) => (
                              <AnimatedSkillBar
                                key={skillIndex}
                                skill={skill}
                                inView={skillsInView}
                              />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Personal Interests */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Beyond Coding</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Continuous Learner</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Always exploring new technologies and frameworks. Currently diving deep into AI integration,
                  TypeScript patterns, and mobile development.
                </p>
              </div>
              <div className="text-center">
                <Code2 className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Problem Solver</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  I love turning complex business problems into elegant technical solutions.
                  Each project is a new puzzle to solve creatively.
                </p>
              </div>
              <div className="text-center">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Helping Businesses Grow</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Passionate about helping small businesses and entrepreneurs leverage technology
                  to reach their goals and serve their customers better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-slate-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => navigate('/contact')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
            <Button
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              onClick={() => navigate('/portfolio')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View My Work
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
