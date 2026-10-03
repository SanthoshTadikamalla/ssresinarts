import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ResinCustomizer3D from './components/ResinCustomizer3D';
import ClientShowcase from './components/ClientShowcase';
import VideoVisualizer from './components/VideoVisualizer';
import ContactFooter from './components/ContactFooter';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-white text-black selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      {/* Top Glass Header Navbar */}
      <Navbar />

      {/* Main Hero Section */}
      <Hero />


      {/* Client View & Showcase Gallery */}
      <ClientShowcase />

      {/* Video Visualizer Workshop Section */}
      <VideoVisualizer />
      <ResinCustomizer3D />
      {/* Contact & Footer Section */}
      <ContactFooter />
    </div>
  );
}
