import { VideoPlayer } from '@/components/ui/video-thumbnail-player';
import { motion } from 'framer-motion';
import { parseVideoUrl } from '@/utils/videoUtils';
import { munirProjects } from '@/data/munirProjects';
import { Play, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Videos page - Displays all project demo videos
 * Shows videos from both the showcase list and projects with videoUrl
 */
export default function Videos() {
  // Showcase videos from PortfolioVideoShowcase
  const showcaseVideos = [
    {
      title: "EllaTech Inventory - Modern Stock Management",
      description: "Comprehensive inventory management system with real-time stock tracking, barcode scanning, and sales reporting. Built with React, TypeScript, and Node.js for efficient warehouse management.",
      videoUrl: "https://youtube.com/shorts/XcciGPpc63s",
      tags: ["React", "TypeScript", "Node.js", "MongoDB", "Inventory"],
      thumbnailUrl: "/images/ellatech-inventory.png",
      liveUrl: "https://ellatech-inventory-munir.netlify.app/",
      githubUrl: "https://github.com/black12-ag/ellatech.git"
    },
    {
      title: "ShegerPay - Live Production Platform",
      description: "Ethiopia's leading payment gateway enabling businesses to accept payments via CBE Birr, Telebirr, Dashen Bank, PayPal, and Cryptocurrency. A modern, secure payment solution designed specifically for the Ethiopian market.",
      videoUrl: "https://youtu.be/6Gr_YJy7yek",
      tags: ["React", "FastAPI", "Fintech", "Payment Gateway"],
      thumbnailUrl: "https://res.cloudinary.com/dnmolkncw/image/upload/v1770037157/portfolio_assets/wsd652g87vixajsl6moj.png",
      liveUrl: "https://shegerpay.com",
      githubUrl: "https://github.com/black12-ag/shegerpay-sdk"
    },
    {
      title: "FINDY Navigation - Live Demo",
      description: "Experience the Netflix-inspired navigation platform with real-time GPS tracking, AI-powered route planning, and beautiful dark UI. See the PWA in action with offline capabilities.",
      videoUrl: "https://youtu.be/RxOCL3Utcsk",
      tags: ["React", "TypeScript", "Google Maps", "PWA", "Navigation"]
    },
    {
      title: "Munir Demo Chat - Short Demo",
      description: "Quick showcase of cross-platform chat app built with React Native and Expo. Features modern UI, media sharing demos, and responsive design.",
      videoUrl: "https://youtube.com/shorts/C48THcA7eXY?si=1NiAibFxLW0Gfz1V",
      tags: ["React Native", "Expo", "TypeScript", "PWA"]
    },
    {
      title: "Project Demo - Full Walkthrough",
      description: "Complete demonstration of project features, functionality, and user interface. Watch the full development process and final result.",
      videoUrl: "https://youtu.be/SwsIXmBqdAA",
      tags: ["Full Demo", "React", "TypeScript", "Development"]
    },
    {
      title: "Portfolio Project Showcase",
      description: "Detailed showcase of portfolio projects with live demonstrations, code explanations, and technical implementation details.",
      videoUrl: "https://youtu.be/mJqAAGYGUDk",
      tags: ["Portfolio", "Showcase", "Web Development", "Projects"]
    },
    {
      title: "Flutter Movies App - Full Demo",
      description: "Complete walkthrough of Munir Movies Flutter app featuring movie discovery, clean architecture with BLoC, beautiful Material Design UI, and smooth animations. Built with Flutter 3.0+ and modern development practices.",
      videoUrl: "https://www.youtube.com/watch?v=JlsN8xb195A",
      tags: ["Flutter", "Dart", "BLoC", "Material Design", "Clean Architecture", "Mobile"]
    },
    {
      title: "SMM Service Seller Bot Demo",
      description: "Live demonstration of automated SMM service selling bot (Ethio Viral). Watch how the bot handles orders, payments, and service delivery automatically.",
      videoUrl: "https://youtube.com/shorts/ufyfoqJa04U?feature=share",
      tags: ["Telegram Bot", "SMM Services", "Automation", "Python"]
    }
  ];

  // Get videos from projects that have videoUrl
  const projectVideos = munirProjects
    .filter(project => project.videoUrl)
    .map(project => ({
      title: project.title,
      description: project.description,
      videoUrl: project.videoUrl!,
      tags: project.technologies.slice(0, 4),
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      // Pass image as thumbnail if available to preserve it
      thumbnailUrl: project.image
    }));

  // Combine and deduplicate videos by URL
  const allVideosRaw = [...showcaseVideos, ...projectVideos];
  const seenUrls = new Set<string>();
  const allVideos = allVideosRaw.filter(video => {
    const videoInfo = parseVideoUrl(video.videoUrl);
    const key = videoInfo.embedUrl;
    if (seenUrls.has(key)) return false;
    seenUrls.add(key);
    return true;
  });

  // Process videos to get proper embed URLs and thumbnails
  const processedVideos = allVideos.map(video => {
    const videoInfo = parseVideoUrl(video.videoUrl);
    return {
      ...video,
      videoUrl: videoInfo.embedUrl,
      // STRATEGY: Use manual thumbnail if provided (like from Cloudinary), otherwise fallback to auto-generated one
      thumbnailUrl: (video as any).thumbnailUrl || videoInfo.thumbnailUrl || "/images/projects/portfolio.png"
    };
  });

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="container mx-auto px-4">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Play className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
              All Project Demos
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Watch all {processedVideos.length} video demonstrations of my projects. See real features, functionality, and user experience in action.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedVideos.map((video, index) => (
              <motion.div
                key={`${video.title}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <VideoPlayer
                  thumbnailUrl={video.thumbnailUrl}
                  videoUrl={video.videoUrl}
                  title={video.title}
                  description={video.description}
                  className="mb-4 transform transition-all duration-300 group-hover:-translate-y-2"
                  aspectRatio="16/9"
                />
                
                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2 justify-center mb-3">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded-full border border-neutral-200 dark:border-neutral-700 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-200 dark:hover:border-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                {'liveUrl' in video && (video.liveUrl || video.githubUrl) && (
                  <div className="flex gap-3 justify-center">
                    {video.liveUrl && (
                      <a
                        href={video.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Live Demo →
                      </a>
                    )}
                    {video.githubUrl && (
                      <a
                        href={video.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">
              Like what you see?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 mb-8 max-w-xl mx-auto">
              Let's discuss how I can help bring your project ideas to life with the same quality and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get In Touch
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
