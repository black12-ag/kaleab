import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  Eye,
  Star,
  Github,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoProject {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category: string;
  technologies: string[];
  duration: string;
  fileSize: string;
  completedDate: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  isPrivate?: boolean;
}

interface VideoShowcaseProps {
  project: VideoProject;
  className?: string;
}

export default function VideoShowcase({ project, className }: VideoShowcaseProps) {

  const getTechColor = (tech: string) => {
    const colors: Record<string, string> = {
      'React': 'bg-blue-500',
      'TypeScript': 'bg-blue-600',
      'Node.js': 'bg-green-600',
      'MongoDB': 'bg-green-700',
      'Stripe': 'bg-purple-600',
      'Tailwind CSS': 'bg-teal-500',
      'Express': 'bg-gray-600',
      'JWT': 'bg-orange-500',
      'Booking System': 'bg-indigo-500',
    };
    return colors[tech] || 'bg-gray-500';
  };

  return (
    <Card className={cn("group hover:shadow-2xl transition-all duration-300", className)}>
      <div className="relative">
        {/* Video Player - YouTube Embed */}
        <div 
          className="relative aspect-video bg-black rounded-t-lg overflow-hidden"
        >
          <iframe
            src={project.videoUrl}
            title={project.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />


          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}

          {/* Duration Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-black/70 text-white">
              <Clock className="w-3 h-3 mr-1" />
              {project.duration}
            </Badge>
          </div>
        </div>

        {/* Project Info */}
        <CardContent className="p-6">
          {/* Category & Date */}
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {project.category}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-3 h-3" />
              {project.completedDate}
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`${getTechColor(tech)} text-white text-xs px-2 py-1`}
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Video Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>Video Demo</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{project.fileSize}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {project.isPrivate ? (
              <Button
                variant="outline"
                className="w-full cursor-not-allowed opacity-60"
                disabled
              >
                <Lock className="w-4 h-4 mr-2" />
                Private Project - No Source Code
              </Button>
            ) : project.githubUrl ? (
              <Button
                variant="default"
                className="w-full"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                View Source Code
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full cursor-not-allowed opacity-60"
                disabled
              >
                <Github className="w-4 h-4 mr-2" />
                No Source Available
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export type { VideoProject };
