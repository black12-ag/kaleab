import React from 'react';
import EnhancedSelector, { SelectorOption } from './enhanced-selector';
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Calendar,
  BarChart3,
  Code,
  Palette,
  MessageSquare,
  Zap,
  Building,
  Database,
  Shield
} from 'lucide-react';

const projectTypeOptions: SelectorOption[] = [
  {
    id: 'web-application',
    title: 'Web Application',
    description: 'Modern responsive web apps with React, Next.js',
    icon: Globe,
    color: 'text-blue-600',
    popular: true
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    description: 'iOS & Android apps with React Native, Flutter',
    icon: Smartphone,
    color: 'text-green-600',
    popular: true
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'Online stores with payment integration & admin',
    icon: ShoppingCart,
    color: 'text-purple-600',
    popular: true
  },
  {
    id: 'booking-system',
    title: 'Booking System',
    description: 'Reservation systems for hotels, services, events',
    icon: Calendar,
    color: 'text-orange-600'
  },
  {
    id: 'dashboard-admin',
    title: 'Dashboard/Admin Panel',
    description: 'Analytics dashboards and management systems',
    icon: BarChart3,
    color: 'text-indigo-600'
  },
  {
    id: 'api-development',
    title: 'API Development',
    description: 'REST APIs, GraphQL, microservices architecture',
    icon: Database,
    color: 'text-teal-600'
  },
  {
    id: 'enterprise-solution',
    title: 'Enterprise Solution',
    description: 'Large-scale business applications & integrations',
    icon: Building,
    color: 'text-slate-600',
    badge: 'Complex'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User interface design and user experience optimization',
    icon: Palette,
    color: 'text-pink-600'
  },
  {
    id: 'consulting',
    title: 'Technical Consulting',
    description: 'Code review, architecture planning, tech strategy',
    icon: MessageSquare,
    color: 'text-cyan-600'
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    description: 'Speed up existing applications, SEO improvements',
    icon: Zap,
    color: 'text-yellow-600'
  },
  {
    id: 'security-audit',
    title: 'Security Audit',
    description: 'Security assessment and vulnerability fixes',
    icon: Shield,
    color: 'text-red-600'
  },
  {
    id: 'other',
    title: 'Other/Custom Project',
    description: 'Let\'s discuss your unique requirements',
    icon: Code,
    color: 'text-gray-600'
  }
];

interface ProjectTypeSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const ProjectTypeSelector: React.FC<ProjectTypeSelectorProps> = ({
  value,
  onChange,
  className,
  error,
  required = false,
  disabled = false
}) => {
  return (
    <EnhancedSelector
      options={projectTypeOptions}
      value={value}
      onChange={onChange}
      placeholder="What type of project do you have in mind?"
      label="Project Type"
      searchable={true}
      className={className}
      error={error}
      required={required}
      disabled={disabled}
    />
  );
};

export default ProjectTypeSelector;