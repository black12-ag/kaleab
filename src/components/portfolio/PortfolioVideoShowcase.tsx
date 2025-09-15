import { VideoPlayer } from '@/components/ui/video-thumbnail-player';
import { motion } from 'framer-motion';
import { parseVideoUrl } from '@/utils/videoUtils';

export default function PortfolioVideoShowcase() {
  // Real project videos - Your actual project demonstrations
  const rawProjectVideos = [
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
      title: "SMM Service Seller Bot Demo",
      description: "Live demonstration of automated SMM service selling bot (Ethio Viral). Watch how the bot handles orders, payments, and service delivery automatically.",
      videoUrl: "https://youtube.com/shorts/ufyfoqJa04U?feature=share",
      tags: ["Telegram Bot", "SMM Services", "Automation", "Python"]
    }
  ];

  // Process videos to get proper embed URLs and thumbnails
  const projectVideos = rawProjectVideos.map(video => {
    const videoInfo = parseVideoUrl(video.videoUrl);
    return {
      ...video,
      videoUrl: videoInfo.embedUrl,
      thumbnailUrl: videoInfo.thumbnailUrl || "/images/projects/portfolio.png"
    };
  });

  return (
    <section className="py-20 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
            Project Demos
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Watch real demonstrations of my projects in action. See the actual features, functionality, and user experience.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectVideos.map((video, index) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
              <div className="flex flex-wrap gap-2 justify-center">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded-full border border-neutral-200 dark:border-neutral-700 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-200 dark:hover:border-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
              Want to see more?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
              These are just a few examples of my work. I'd love to discuss your project and show you how I can help bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
              >
                Get In Touch
              </motion.button>
              <motion.button
                className="border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/portfolio'}
              >
                View All Projects
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
