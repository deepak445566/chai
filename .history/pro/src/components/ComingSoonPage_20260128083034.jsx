import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Refs for GSAP animations
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const descriptionRef = useRef(null);
  const formRef = useRef(null);
  const cupRef = useRef(null);
  const spicesRef = useRef([]);
  const socialRef = useRef(null);
  const containerRef = useRef(null);
  const steamRef = useRef(null);

  useEffect(() => {
    // Initial animations on page load
    const tl = gsap.timeline();
    
    // Fade in container
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    
    // Logo animation
    tl.fromTo(logoRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.5'
    );
    
    // Tagline animation
    tl.fromTo(taglineRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.3'
    );
    
    // Description animation
    tl.fromTo(descriptionRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );
    
    // Cup animation
    tl.fromTo(cupRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
      '-=0.5'
    );
    
    // Spices animation
    tl.fromTo(spicesRef.current,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'back.out(1.7)'
      },
      '-=0.8'
    );
    
    // Form animation
    tl.fromTo(formRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    );
    
    // Social icons animation
    tl.fromTo(socialRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );
    
    // Steam animation loop
    if (steamRef.current) {
      gsap.to(steamRef.current.children, {
        y: -20,
        opacity: 0,
        duration: 2,
        stagger: 0.3,
        repeat: -1,
        ease: 'power1.out'
      });
    }
    
    // Floating animation for cup
    gsap.to(cupRef.current, {
      y: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    // Floating animation for spices
    spicesRef.current.forEach((spice, index) => {
      if (spice) {
        gsap.to(spice, {
          y: 10,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        });
      }
    });
    
    // Clean up animations on unmount
    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    
    // Animate form submission
    const formTl = gsap.timeline();
    
    // Shrink form
    formTl.to(formRef.current, {
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.in'
    });
    
    // Expand and show success
    formTl.to(formRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'back.out(1.7)',
      onComplete: () => {
        // Simulate API call
        setTimeout(() => {
          setLoading(false);
          setSubmitted(true);
          setEmail('');
          
          // Success animation
          gsap.fromTo('.success-message',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
          );
        }, 800);
      }
    });
  };

  const handleSocialHover = (index) => {
    gsap.to(spicesRef.current[index], {
      scale: 1.2,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  };

  const handleSocialLeave = (index) => {
    gsap.to(spicesRef.current[index], {
      scale: 1,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 text-gray-800 overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glass morphism blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-amber-300/20 backdrop-blur-xl rounded-full mix-blend-overlay filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-amber-300/30 to-amber-400/20 backdrop-blur-xl rounded-full mix-blend-overlay filter blur-3xl opacity-60"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-amber-500/10 backdrop-blur-xl rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Header with Glass Morphism */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-20">
          {/* Logo with glass effect */}
          <div 
            ref={logoRef}
            className="flex items-center mb-6 md:mb-0"
            style={{ opacity: 0 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/40 to-amber-600/40 backdrop-blur-md rounded-2xl shadow-2xl"></div>
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/80 to-amber-700/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-amber-300/30">
                <svg className="w-8 h-8 text-amber-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl md:text-3xl font-bold text-amber-900 font-serif">Royal Chai</h1>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-600 to-amber-800 mt-1 rounded-full"></div>
            </div>
          </div>
          
          {/* Launching Soon Badge with glass effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-700/30 backdrop-blur-sm rounded-full"></div>
            <div className="relative px-6 py-3 bg-gradient-to-r from-amber-600/90 to-amber-800/90 backdrop-blur-md rounded-full shadow-xl border border-amber-400/30">
              <span className="text-amber-100 font-medium tracking-wide flex items-center">
                <span className="flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute h-3 w-3 rounded-full bg-amber-400/70 opacity-75"></span>
                  <span className="relative h-3 w-3 rounded-full bg-amber-300"></span>
                </span>
                Launching Soon
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col lg:flex-row items-center justify-between mb-16">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-10">
            {/* Tagline */}
            <div 
              ref={taglineRef}
              className="mb-8"
              style={{ opacity: 0 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 font-serif leading-tight mb-4">
                Brew the
                <span className="block text-amber-700 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  Royal Tradition
                </span>
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-amber-600 to-amber-800 mb-6 rounded-full"></div>
            </div>

            {/* Description */}
            <div 
              ref={descriptionRef}
              className="mb-10"
              style={{ opacity: 0 }}
            >
              <p className="text-lg md:text-xl text-amber-900 mb-6 leading-relaxed backdrop-blur-sm bg-amber-50/30 p-4 rounded-xl">
                Experience the authentic taste of royal Indian households with our premium instant chai tea remix. 
                Crafted from a centuries-old recipe passed down through generations of Indian nobility.
              </p>
              <p className="text-amber-800 leading-relaxed backdrop-blur-sm bg-amber-50/30 p-4 rounded-xl">
                Our blend combines the finest Assam tea leaves with traditional Indian spices like cardamom, ginger, and cinnamon, 
                delivering an exquisite cup of chai fit for royalty.
              </p>
            </div>

            {/* Email Signup with Glass Morphism */}
            <div 
              ref={formRef}
              style={{ opacity: 0 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 to-amber-200/30 backdrop-blur-xl rounded-2xl shadow-2xl"></div>
                <div className="relative bg-gradient-to-br from-amber-50/70 to-white/60 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-xl border border-amber-200/50">
                  <h3 className="text-2xl font-bold text-amber-900 mb-4 font-serif">Be the First to Experience Royalty</h3>
                  <p className="text-amber-800 mb-6">Join our exclusive list for early access and special launch offers.</p>
                  
                  {submitted ? (
                    <div className="success-message relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-100/40 to-emerald-100/30 backdrop-blur-sm rounded-lg"></div>
                      <div className="relative p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/70 backdrop-blur-sm rounded-lg border border-green-300/50">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <div>
                            <p className="font-medium text-green-800">Thank you for joining our royal journey!</p>
                            <p className="text-green-700 text-sm mt-1">We'll notify you as soon as we launch.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-grow relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/80 to-white/60 backdrop-blur-sm rounded-lg"></div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="relative w-full px-6 py-4 rounded-lg border border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-amber-900 placeholder-amber-600/70 bg-transparent"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="relative overflow-hidden group min-w-[140px]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 to-amber-800/90 backdrop-blur-sm group-hover:from-amber-700 group-hover:to-amber-900 rounded-lg shadow-lg"></div>
                          <span className="relative px-8 py-4 text-amber-50 font-medium flex items-center justify-center">
                            {loading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </>
                            ) : "Notify Me"}
                          </span>
                        </button>
                      </div>
                      <p className="text-amber-700/80 text-sm">We respect your privacy. No spam, ever.</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Visual with Glass Morphism */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glass background effect */}
              <div className="absolute -inset-6 bg-gradient-to-br from-amber-300/20 via-amber-400/10 to-amber-500/5 backdrop-blur-2xl rounded-3xl"></div>
              
              {/* Main cup container */}
              <div 
                ref={cupRef}
                className="relative p-8 rounded-2xl"
                style={{ opacity: 0 }}
              >
                {/* Chai cup with glass effect */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 to-amber-200/30 backdrop-blur-lg rounded-2xl"></div>
                  <div className="relative h-72 w-72 bg-gradient-to-b from-amber-900/90 to-amber-950/90 rounded-full flex items-center justify-center border border-amber-700/30 shadow-2xl overflow-hidden">
                    {/* Liquid surface */}
                    <div className="absolute top-1/2 left-0 right-0 h-1/2 bg-gradient-to-b from-amber-800/80 to-amber-900/90 rounded-t-full"></div>
                    
                    {/* Cup pattern */}
                    <div className="absolute inset-8 rounded-full border-4 border-amber-700/30"></div>
                    <div className="absolute inset-12 rounded-full border-2 border-amber-600/20"></div>
                    
                    {/* Steam animation */}
                    <div 
                      ref={steamRef}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="flex space-x-3">
                        <div className="w-3 h-10 bg-gradient-to-t from-amber-100/60 to-transparent rounded-full"></div>
                        <div className="w-4 h-12 bg-gradient-to-t from-amber-100/60 to-transparent rounded-full"></div>
                        <div className="w-3 h-10 bg-gradient-to-t from-amber-100/60 to-transparent rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spices with glass effect */}
                  <div 
                    ref={el => spicesRef.current[0] = el}
                    className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full cursor-pointer"
                    onMouseEnter={() => handleSocialHover(0)}
                    onMouseLeave={() => handleSocialLeave(0)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-700/40 to-amber-800/30 backdrop-blur-md rounded-full shadow-xl"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-amber-800/80 to-amber-900/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-700/30">
                      <span className="text-amber-100 text-sm font-bold">Cardamom</span>
                    </div>
                  </div>
                  
                  <div 
                    ref={el => spicesRef.current[1] = el}
                    className="absolute -top-4 right-8 w-16 h-16 rounded-full cursor-pointer"
                    onMouseEnter={() => handleSocialHover(1)}
                    onMouseLeave={() => handleSocialLeave(1)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-800/40 to-amber-900/30 backdrop-blur-md rounded-full shadow-xl"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-amber-900/80 to-amber-950/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-800/30">
                      <span className="text-amber-100 text-xs font-bold">Ginger</span>
                    </div>
                  </div>
                  
                  <div 
                    ref={el => spicesRef.current[2] = el}
                    className="absolute top-1/2 -right-6 w-14 h-14 rounded-full cursor-pointer"
                    onMouseEnter={() => handleSocialHover(2)}
                    onMouseLeave={() => handleSocialLeave(2)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-amber-700/30 backdrop-blur-md rounded-full shadow-xl"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-amber-700/80 to-amber-800/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-600/30">
                      <span className="text-amber-100 text-xs font-bold">Cinnamon</span>
                    </div>
                  </div>
                </div>
                
                {/* Product details with glass effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/10 backdrop-blur-lg rounded-2xl"></div>
                  <div className="relative p-6 bg-gradient-to-r from-amber-100/50 to-amber-200/40 backdrop-blur-md rounded-2xl border border-amber-300/30">
                    <h3 className="text-2xl font-bold text-amber-900 mb-2 font-serif text-center">Royal Blend</h3>
                    <p className="text-amber-800 mb-4 text-center">Premium Instant Chai Tea Remix</p>
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-600/20 backdrop-blur-sm rounded-full"></div>
                        <div className="relative px-6 py-2 bg-gradient-to-r from-amber-600/80 to-amber-800/70 backdrop-blur-sm rounded-full border border-amber-500/30">
                          <span className="text-amber-100 font-medium">Inspired by Royal Indian Households</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer with Social Icons */}
        <footer 
          ref={socialRef}
          className="pt-8 border-t border-amber-200/50"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-amber-800/90">
                &copy; {new Date().getFullYear()} Royal Chai. All rights reserved.
              </p>
              <p className="text-amber-700/80 text-sm mt-1">Crafting royal experiences, one cup at a time.</p>
            </div>
            
            {/* Social Icons with Glass Morphism */}
            <div className="flex space-x-4">
              {['twitter', 'instagram', 'facebook', 'github'].map((platform, index) => (
                <div 
                  key={platform}
                  className="relative cursor-pointer group"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.1,
                      y: -5,
                      duration: 0.3,
                      ease: 'back.out(1.7)'
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      y: 0,
                      duration: 0.3,
                      ease: 'back.out(1.7)'
                    });
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-amber-600/20 backdrop-blur-md rounded-full group-hover:from-amber-500/40 group-hover:to-amber-700/30"></div>
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-600/80 to-amber-800/70 backdrop-blur-sm flex items-center justify-center border border-amber-500/30 group-hover:border-amber-400/50 shadow-lg">
                    {platform === 'twitter' && (
                      <svg className="w-5 h-5 text-amber-100" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    )}
                    {platform === 'instagram' && (
                      <svg className="w-5 h-5 text-amber-100" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                    {platform === 'facebook' && (
                      <svg className="w-5 h-5 text-amber-100" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                      </svg>
                    )}
                    {platform === 'github' && (
                      <svg className="w-5 h-5 text-amber-100" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ComingSoonPage;