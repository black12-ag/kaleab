import React from 'react';
import EnhancedSelector, { SelectorOption } from './enhanced-selector';
import {
  DollarSign,
  TrendingUp,
  Zap,
  Star,
  Crown,
  Clock,
  MessageSquare,
  Calculator
} from 'lucide-react';

const budgetRangeOptions: SelectorOption[] = [
  {
    id: 'under-5k',
    title: 'Under $5,000',
    description: 'Small projects, landing pages, simple apps',
    icon: DollarSign,
    color: 'text-green-600',
    badge: 'Starter',
    popular: true
  },
  {
    id: '5k-10k',
    title: '$5,000 - $10,000',
    description: 'Medium web apps, basic e-commerce, mobile apps',
    icon: TrendingUp,
    color: 'text-blue-600',
    popular: true
  },
  {
    id: '10k-25k',
    title: '$10,000 - $25,000',
    description: 'Complex web apps, advanced features, integrations',
    icon: Zap,
    color: 'text-purple-600',
    popular: true
  },
  {
    id: '25k-50k',
    title: '$25,000 - $50,000',
    description: 'Enterprise solutions, custom platforms, full-stack',
    icon: Star,
    color: 'text-orange-600',
    badge: 'Business'
  },
  {
    id: '50k-plus',
    title: '$50,000+',
    description: 'Large-scale systems, multiple platforms, long-term',
    icon: Crown,
    color: 'text-red-600',
    badge: 'Enterprise'
  },
  {
    id: 'hourly-rate',
    title: 'Hourly Rate',
    description: 'Consulting, maintenance, small tasks ($75-150/hr)',
    icon: Clock,
    color: 'text-cyan-600',
    badge: 'Flexible'
  },
  {
    id: 'lets-discuss',
    title: 'Let\'s Discuss',
    description: 'Not sure about budget? We\'ll find the best approach',
    icon: MessageSquare,
    color: 'text-gray-600'
  },
  {
    id: 'custom-quote',
    title: 'Custom Quote',
    description: 'Unique project requiring detailed cost analysis',
    icon: Calculator,
    color: 'text-indigo-600'
  }
];

interface BudgetRangeSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const BudgetRangeSelector: React.FC<BudgetRangeSelectorProps> = ({
  value,
  onChange,
  className,
  error,
  required = false,
  disabled = false
}) => {
  return (
    <EnhancedSelector
      options={budgetRangeOptions}
      value={value}
      onChange={onChange}
      placeholder="What's your budget range for this project?"
      label="Budget Range"
      searchable={true}
      className={className}
      error={error}
      required={required}
      disabled={disabled}
    />
  );
};

export default BudgetRangeSelector;