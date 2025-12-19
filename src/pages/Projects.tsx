import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ProjectCard, { Project } from '@/components/portfolio/ProjectCard';
import PortfolioVideoShowcase from '@/components/portfolio/PortfolioVideoShowcase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Calendar,
  Code,
  ExternalLink,
  Github,
  Star,
  Clock,
  User
} from 'lucide-react';
import { munirProjects } from '@/data/munirProjects';

// Map munirProjects to Project interface format if necessary, or use directly
const allProjects: Project[] = munirProjects.map(project => ({
  ...project,
  // Ensure category matches the UI filter keys if simpler mapping is needed,
  // but existing keys like 'mobile', 'web', 'bot' seem compatible.
  // We'll normalize just in case.
  category: project.category.toLowerCase().includes('mobile') ? 'mobile' :
    project.category.toLowerCase().includes('bot') ? 'bot' :
      project.category.toLowerCase().includes('automation') ? 'automation' :
        project.category.toLowerCase().includes('design') ? 'design' :
          project.category.toLowerCase().includes('full') ? 'fullstack' : 'web',
  // Ensure status matches the Project type union
  status: (project.status === 'completed' || project.status === 'in-progress' || project.status === 'coming-soon') ? project.status : 'completed'
}));

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(allProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(allProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'All Projects', count: allProjects.length },
    { id: 'fullstack', name: 'Full Stack', count: allProjects.filter(p => p.category === 'fullstack').length },
    { id: 'web', name: 'Web Apps', count: allProjects.filter(p => p.category === 'web').length },
    { id: 'mobile', name: 'Mobile Apps', count: allProjects.filter(p => p.category === 'mobile').length },
    { id: 'bot', name: 'Telegram Bots', count: allProjects.filter(p => p.category === 'bot').length },
    { id: 'automation', name: 'Automation', count: allProjects.filter(p => p.category === 'automation').length },
    { id: 'design', name: 'Design', count: allProjects.filter(p => p.category === 'design').length }
  ];

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'completed', name: 'Completed' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'coming-soon', name: 'Coming Soon' }
  ];

  // Filter and sort projects
  useEffect(() => {
    let filtered = [...projects];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.technologies || []).some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.completedDate || '0');
        const dateB = new Date(b.completedDate || '0');
        return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      } else {
        return sortOrder === 'desc' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
      }
    });

    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder, projects]);

  const handleSortToggle = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              My Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore my portfolio of web applications, mobile apps, and digital solutions.
              Each project showcases different technologies and problem-solving approaches.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge className="bg-green-500 text-white px-4 py-2">
                <Code className="w-4 h-4 mr-2" />
                {allProjects.length} Total Projects
              </Badge>
              <Badge className="bg-blue-500 text-white px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                {allProjects.filter(p => p.featured).length} Featured
              </Badge>
              <Badge className="bg-purple-500 text-white px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Latest: {allProjects.sort((a, b) => new Date(b.completedDate || '0').getTime() - new Date(a.completedDate || '0').getTime())[0]?.completedDate}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search projects, technologies, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-10"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-10"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 items-center justify-between">

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="h-8"
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>

              {/* Status and Sort Controls */}
              <div className="flex items-center gap-4">
                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>

                {/* Sort Controls */}
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSortToggle}
                    className="h-8 w-8 p-0"
                  >
                    {sortOrder === 'desc' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* Results Count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600 dark:text-gray-300">
                Showing {filteredProjects.length} of {allProjects.length} projects
                {searchTerm && (
                  <span className="ml-2">
                    for "<span className="font-medium text-gray-900 dark:text-white">{searchTerm}</span>"
                  </span>
                )}
              </p>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Projects Display */}
            {filteredProjects.length > 0 ? (
              <div className={viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
              }>
                {filteredProjects.map((project) => (
                  viewMode === 'grid' ? (
                    <ProjectCard key={project.id} project={project} />
                  ) : (
                    <ProjectCard key={project.id} project={project} showFullDetails={true} />
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Filter className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No Projects Found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  No projects match your current filters. Try adjusting your search terms or filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Watch Demos Button */}
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('video-demos')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
              >
                🎬 Watch Project Demos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Video Demos */}
      <PortfolioVideoShowcase />

      {/* Project Stats */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Project Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{allProjects.length}</div>
                <div className="text-gray-700 dark:text-gray-300">Total Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {allProjects.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-gray-700 dark:text-gray-300">Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {[...new Set(allProjects.flatMap(p => p.technologies))].length}
                </div>
                <div className="text-gray-700 dark:text-gray-300">Technologies</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {allProjects.filter(p => p.testimonial).length}
                </div>
                <div className="text-gray-700 dark:text-gray-300">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Like What You See?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            I'm always working on new projects and would love to discuss your ideas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Project
            </Button>
            <Button
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              onClick={() => window.open('https://github.com/black12-ag', '_blank')}
            >
              <Github className="w-5 h-5 mr-2" />
              View All Code
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
