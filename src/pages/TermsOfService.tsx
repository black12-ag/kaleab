import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="rounded-xl">
          <CardContent className="prose dark:prose-invert max-w-none p-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >Terms of Service</motion.h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>Agreement to Terms</h2>
            <p>By accessing this portfolio website, you agree to be bound by these Terms of Service and accept that you are responsible for the agreement with any applicable local laws.</p>
            
            <h2>Use License</h2>
            <p>Permission is granted to temporarily download one copy of this portfolio website for personal, non-commercial transitory viewing only.</p>
            
            <h2>Disclaimer</h2>
            <p>All the materials on this portfolio website are provided "as is". The portfolio owner makes no warranties, may it be expressed or implied, therefore negates all other warranties.</p>
            
            <h2>Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us through the contact form on this website.</p>
          </CardContent>
        </Card>
      </motion.div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
