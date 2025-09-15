import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectorOption {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  badge?: string;
  popular?: boolean;
}

interface EnhancedSelectorProps {
  options: SelectorOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  searchable?: boolean;
  className?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

const EnhancedSelector: React.FC<EnhancedSelectorProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  searchable = true,
  className,
  disabled = false,
  error,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectorRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(option => option.id === value);
  
  const filteredOptions = searchable && searchTerm
    ? options.filter(option =>
        option.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen, searchable]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 1, -1));
          break;
        case 'Enter':
          event.preventDefault();
          if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
            onChange(filteredOptions[focusedIndex].id);
            setIsOpen(false);
            setSearchTerm('');
            setFocusedIndex(-1);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          setFocusedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, filteredOptions, onChange]);

  const handleOptionSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
    setSearchTerm('');
    setFocusedIndex(-1);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  return (
    <div className={cn('relative w-full', className)} ref={selectorRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {/* Selector Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'relative w-full h-12 px-4 py-2 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'hover:border-gray-400 dark:hover:border-gray-500',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700',
          error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
          isOpen && 'ring-2 ring-blue-500 border-blue-500',
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {selectedOption ? (
              <>
                {selectedOption.icon && (
                  <selectedOption.icon className={cn('w-5 h-5 flex-shrink-0', selectedOption.color || 'text-gray-600')} />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white truncate">
                      {selectedOption.title}
                    </span>
                    {selectedOption.badge && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full flex-shrink-0">
                        {selectedOption.badge}
                      </span>
                    )}
                    {selectedOption.popular && (
                      <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full flex-shrink-0">
                        Popular
                      </span>
                    )}
                  </div>
                  {selectedOption.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {selectedOption.description}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                {placeholder}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {selectedOption && !disabled && (
              <button
                type="button"
                onClick={clearSelection}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            )}
            <ChevronDown 
              className={cn(
                'w-5 h-5 text-gray-400 transition-transform duration-200',
                isOpen && 'rotate-180'
              )} 
            />
          </div>
        </div>
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl max-h-80 overflow-hidden"
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setFocusedIndex(-1);
                    }}
                    placeholder="Search options..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                <div className="py-2">
                  {filteredOptions.map((option, index) => {
                    const isSelected = value === option.id;
                    const isFocused = index === focusedIndex;
                    const Icon = option.icon;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleOptionSelect(option.id)}
                        className={cn(
                          'w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 focus:outline-none group',
                          isSelected && 'bg-blue-50 dark:bg-blue-900/20',
                          isFocused && 'bg-gray-50 dark:bg-gray-700'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {Icon && (
                            <div className={cn(
                              'p-2 rounded-lg transition-colors duration-150',
                              isSelected 
                                ? 'bg-blue-100 dark:bg-blue-900/50' 
                                : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                            )}>
                              <Icon className={cn('w-5 h-5', option.color || 'text-gray-600 dark:text-gray-300')} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                'font-medium truncate',
                                isSelected ? 'text-blue-900 dark:text-blue-200' : 'text-gray-900 dark:text-white'
                              )}>
                                {option.title}
                              </span>
                              {option.badge && (
                                <span className={cn(
                                  'text-xs px-2 py-1 rounded-full flex-shrink-0',
                                  isSelected 
                                    ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200' 
                                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                )}>
                                  {option.badge}
                                </span>
                              )}
                              {option.popular && (
                                <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full flex-shrink-0">
                                  Popular
                                </span>
                              )}
                            </div>
                            {option.description && (
                              <p className={cn(
                                'text-sm mt-1 truncate',
                                isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'
                              )}>
                                {option.description}
                              </p>
                            )}
                          </div>
                          {isSelected && (
                            <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No options found matching "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default EnhancedSelector;