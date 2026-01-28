import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
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

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Mobile-optimized animations
    const tl = gsap.timeline();
    
    // Fade in container
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 }
    );
    
    // Staggered animations for better mobile performance
    const animationSequence = [
      { ref: logoRef, y: -30, duration: 0.6 },
      { ref: taglineRef, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0, duration: 0.7 },
      { ref: cupRef, scale: 0.9, rotation: 0, duration: 0.8 },
      { ref: spicesRef.current, scale: 0, stagger: 0.1, duration: 0.5 },
      { ref: descriptionRef, y: 30, duration: 0.6 },
      { ref: formRef, y: 20, duration: 0.6 },
      { ref: socialRef, y: 10, duration: 0.5 }
    ];
    
    animationSequence.forEach((item, index) => {
      if (Array.isArray(item.ref)) {
        // Handle array of refs (spices)
        tl.fromTo(item.ref.filter(Boolean),
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: item.duration,
            stagger: item.stagger,
            ease: 'back.out(1.2)'
          },
          `-=${0.3}`
        );
      } else if (item.ref?.current) {
        tl.fromTo(item.ref.current,
          { 
            x: item.x || 0,
            y: item.y || 0,
            scale: item.scale || 1,
            rotation: item.rotation || 0,
            opacity: 0 
          },
          { 
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1, 
            duration: item.duration,
            ease: 'power2.out' 
          },
          `-=${index === 0 ? 0.1 : 0.2}`
        );
      }
    });
    
    // Steam animation - simplified for mobile
    if (steamRef.current) {
      const steamDuration = isMobile ? 1.5 : 2;
      gsap.to(steamRef.current.children, {
        y: -15,
        opacity: 0,
        duration: steamDuration,
        stagger: 0.2,
        repeat: -1,
        ease: 'power1.out'
      });
    }
    
    // Floating animation - reduced movement for mobile
    const floatDistance = isMobile ? 5 : 10;
    const floatDuration = isMobile ? 2 : 3;
    
    gsap.to(cupRef.current, {
      y: floatDistance,
      duration: floatDuration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    // Spices floating animation - lighter for mobile
    spicesRef.current.forEach((spice, index) => {
      if (spice) {
        gsap.to(spice, {
          y: floatDistance * 0.7,
          duration: floatDuration + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.1
        });
      }
    });
    
    return () => {
      tl.kill();
    };
  }, [isMobile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    
    // Mobile-optimized form animation
    const formTl = gsap.timeline();
    
    formTl.to(formRef.current, {
      scale: 0.98,
      duration: 0.2,
      ease: 'power2.in'
    }).to(formRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'back.out(1.5)',
      onComplete: () => {
        setTimeout(() => {
          setLoading(false);
          setSubmitted(true);
          setEmail('');
          
          // Success animation
          gsap.fromTo('.success-message',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
          );
        }, 600);
      }
    });
  };

  const handleSocialHover = (index) => {
    if (!isMobile) {
      gsap.to(spicesRef.current[index], {
        scale: 1.15,
        duration: 0.2,
        ease: 'back.out(1.7)'
      });
    }
  };

  const handleSocialLeave = (index) => {
    if (!isMobile) {
      gsap.to(spicesRef.current[index], {
        scale: 1,
        duration: 0.2,
        ease: 'back.out(1.7)'
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 text-gray-800 overflow-x-hidden"
      style={{ opacity: 0 }}
    >
      {/* Optimized background for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute ${isMobile ? 'top-10 left-5' : 'top-20 left-20'} w-64 h-64 bg-amber-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-30`}></div>
        <div className={`absolute ${isMobile ? 'bottom-10 right-5' : 'bottom-20 right-20'} w-56 h-56 bg-amber-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-30`}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
        {/* Mobile-optimized Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-10 sm:mb-16">
          {/* Logo - redesigned for mobile */}
          <div 
            ref={logoRef}
            className="flex flex-col sm:flex-row items-center mb-6 sm:mb-0 w-full sm:w-auto"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center mb-3 sm:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/40 to-amber-600/40 backdrop-blur-md rounded-xl sm:rounded-2xl"></div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/80 to-amber-700/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-amber-300/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-amber-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 font-serif">Royal Chai</h1>
                <div className="h-1 w-12 bg-gradient-to-r from-amber-600 to-amber-800 mt-1 rounded-full"></div>
              </div>
            </div>
            
            {/* Launching Soon Badge - mobile optimized */}
            <div className="relative mt-2 sm:mt-0 sm:ml-4">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-700/30 backdrop-blur-sm rounded-full"></div>
              <div className="relative px-4 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-amber-600/90 to-amber-800/90 backdrop-blur-md rounded-full shadow-lg border border-amber-400/30">
                <span className="text-amber-100 text-sm sm:text-base font-medium flex items-center">
                  <span className="flex h-2 w-2 sm:h-3 sm:w-3 mr-2">
                    <span className="animate-ping absolute h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-amber-400/70 opacity-75"></span>
                    <span className="relative h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-amber-300"></span>
                  </span>
                  Launching Soon
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Stacked on mobile, side-by-side on desktop */}
        <main className="flex flex-col lg:flex-row items-center justify-between mb-12 sm:mb-16">
          {/* Text Content - Full width on mobile */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-8">
            {/* Tagline - Mobile optimized */}
            <div 
              ref={taglineRef}
              className="mb-6 sm:mb-8"
              style={{ opacity: 0 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 font-serif leading-tight mb-3 sm:mb-4">
                Brew the
                <span className="block text-amber-700 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent mt-1 sm:mt-2">
                  Royal Tradition
                </span>
              </h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-amber-600 to-amber-800 mb-4 sm:mb-6 rounded-full"></div>
            </div>

            {/* Description - Mobile optimized */}
            <div 
              ref={descriptionRef}
              className="mb-8 sm:mb-10"
              style={{ opacity: 0 }}
            >
              <div className="space-y-4">
                <div className="backdrop-blur-sm bg-amber-50/40 p-4 rounded-xl border border-amber-200/30">
                  <p className="text-base sm:text-lg text-amber-900 leading-relaxed">
                    Experience the authentic taste of royal Indian households with our premium instant chai tea remix. 
                    Crafted from a centuries-old recipe passed down through generations.
                  </p>
                </div>
                <div className="backdrop-blur-sm bg-amber-50/40 p-4 rounded-xl border border-amber-200/30">
                  <p className="text-amber-800 leading-relaxed">
                    Our blend combines the finest Assam tea leaves with traditional Indian spices like cardamom, ginger, and cinnamon, 
                    delivering an exquisite cup of chai fit for royalty.
                  </p>
                </div>
              </div>
            </div>

            {/* Email Signup - Mobile optimized */}
            <div 
              ref={formRef}
              className="w-full"
              style={{ opacity: 0 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 to-amber-200/30 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg"></div>
                <div className="relative bg-gradient-to-br from-amber-50/70 to-white/60 backdrop-blur-lg p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-amber-200/50">
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-3 sm:mb-4 font-serif">
                    Join the Royal Waiting List
                  </h3>
                  <p className="text-amber-800 mb-4 sm:mb-6 text-sm sm:text-base">
                    Be the first to experience our premium chai. Get exclusive launch offers.
                  </p>
                  
                  {submitted ? (
                    <div className="success-message relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-100/40 to-emerald-100/30 backdrop-blur-sm rounded-lg"></div>
                      <div className="relative p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/70 backdrop-blur-sm rounded-lg border border-green-300/50">
                        <div className="flex items-start sm:items-center">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <div>
                            <p className="font-medium text-green-800 text-sm sm:text-base">Thank you for joining!</p>
                            <p className="text-green-700 text-xs sm:text-sm mt-1">We'll notify you as soon as we launch with exclusive offers.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <div className="flex-grow relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/80 to-white/60 backdrop-blur-sm rounded-lg"></div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="relative w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg border border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-amber-900 placeholder-amber-600/70 bg-transparent text-sm sm:text-base"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="relative overflow-hidden group min-w-[120px] sm:min-w-[140px]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 to-amber-800/90 backdrop-blur-sm group-hover:from-amber-700 group-hover:to-amber-900 rounded-lg shadow-md"></div>
                          <span className="relative px-5 sm:px-6 py-3 sm:py-4 text-amber-50 font-medium flex items-center justify-center text-sm sm:text-base">
                            {loading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                              </>
                            ) : "Notify Me"}
                          </span>
                        </button>
                      </div>
                      <p className="text-amber-700/80 text-xs sm:text-sm">We respect your privacy. No spam, ever.</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Visual - Mobile optimized */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative max-w-md w-full">
              {/* Glass background effect - simplified for mobile */}
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-amber-300/10 via-amber-400/5 to-amber-500/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl"></div>
              
              {/* Main cup container */}
              <div 
                ref={cupRef}
                className="relative p-4 sm:p-6 rounded-2xl"
                style={{ opacity: 0 }}
              >
                {/* Chai cup - scaled for mobile */}
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-amber-200/20 backdrop-blur-lg rounded-2xl"></div>
                  <div className={`relative ${isMobile ? 'h-56 w-56' : 'h-64 w-64 sm:h-72 sm:w-72'} mx-auto bg-gradient-to-b from-amber-900/90 to-amber-950/90 rounded-full flex items-center justify-center border border-amber-700/30 shadow-xl`}>
                    {/* Liquid surface */}
                    <div className="absolute top-1/2 left-0 right-0 h-1/2 bg-gradient-to-b from-amber-800/80 to-amber-900/90 rounded-t-full"></div>
                    
                    {/* Cup pattern */}
                    <div className="absolute inset-6 sm:inset-8 rounded-full border-3 sm:border-4 border-amber-700/30"></div>
                    
                    {/* Steam animation */}
                    <div 
                      ref={steamRef}
                      className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="flex space-x-2 sm:space-x-3">
                        <div className="w-2 h-6 sm:w-3 sm:h-8 bg-gradient-to-t from-amber-100/60 to-transparent rounded-full"></div>
                        <div className="w-3 h-8 sm:w-4 sm:h-10 bg-gradient-to-t from-amber-100/60 to-transparent rounded-full"></div>
                        <div className="w-2 h-6 sm:w-3 sm:h-8 bg-gradient-to-t from-amber-100/60 to-transparent rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spices - repositioned for mobile */}
                  <div className={`absolute ${isMobile ? 'bottom-2 left-2' : 'bottom-4 left-4'}`}>
                    <div 
                      ref={el => spicesRef.current[0] = el}
                      className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16 sm:w-20 sm:h-20'} rounded-full cursor-pointer`}
                      onMouseEnter={() => handleSocialHover(0)}
                      onMouseLeave={() => handleSocialLeave(0)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-700/40 to-amber-800/30 backdrop-blur-md rounded-full shadow-lg"></div>
                      <div className={`relative ${isMobile ? 'w-14 h-14' : 'w-16 h-16 sm:w-20 sm:h-20'} bg-gradient-to-br from-amber-800/80 to-amber-900/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-700/30`}>
                        <span className={`${isMobile ? 'text-xs' : 'text-sm sm:text-base'} text-amber-100 font-bold`}>Cardamom</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`absolute ${isMobile ? 'top-4 right-4' : 'top-6 right-6 sm:top-8 sm:right-8'}`}>
                    <div 
                      ref={el => spicesRef.current[1] = el}
                      className={`${isMobile ? 'w-12 h-12' : 'w-14 h-14 sm:w-16 sm:h-16'} rounded-full cursor-pointer`}
                      onMouseEnter={() => handleSocialHover(1)}
                      onMouseLeave={() => handleSocialLeave(1)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-800/40 to-amber-900/30 backdrop-blur-md rounded-full shadow-lg"></div>
                      <div className={`relative ${isMobile ? 'w-12 h-12' : 'w-14 h-14 sm:w-16 sm:h-16'} bg-gradient-to-br from-amber-900/80 to-amber-950/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-800/30`}>
                        <span className={`${isMobile ? 'text-xs' : 'text-xs sm:text-sm'} text-amber-100 font-bold`}>Ginger</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`absolute ${isMobile ? 'bottom-6 right-2' : 'bottom-8 right-4 sm:bottom-12 sm:right-6'}`}>
                    <div 
                      ref={el => spicesRef.current[2] = el}
                      className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'} rounded-full cursor-pointer`}
                      onMouseEnter={() => handleSocialHover(2)}
                      onMouseLeave={() => handleSocialLeave(2)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-amber-700/30 backdrop-blur-md rounded-full shadow-lg"></div>
                      <div className={`relative ${isMobile ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'} bg-gradient-to-br from-amber-700/80 to-amber-800/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-600/30`}>
                        <span className={`${isMobile ? 'text-xs' : 'text-xs sm:text-sm'} text-amber-100 font-bold`}>Cinnamon</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Product details - mobile optimized */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 to-amber-600/10 backdrop-blur-lg rounded-xl sm:rounded-2xl"></div>
                  <div className="relative p-4 sm:p-5 bg-gradient-to-r from-amber-100/50 to-amber-200/40 backdrop-blur-md rounded-xl sm:rounded-2xl border border-amber-300/30">
                    <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-1 sm:mb-2 font-serif text-center">Royal Blend</h3>
                    <p className="text-amber-800 mb-3 sm:mb-4 text-center text-sm sm:text-base">Premium Instant Chai Tea</p>
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/15 backdrop-blur-sm rounded-full"></div>
                        <div className="relative px-4 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-amber-600/80 to-amber-800/70 backdrop-blur-sm rounded-full border border-amber-500/30">
                          <span className="text-amber-100 font-medium text-xs sm:text-sm">Royal Indian Recipe</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer - Mobile optimized */}
        <footer 
          ref={socialRef}
          className="pt-6 sm:pt-8 border-t border-amber-200/50"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-6 sm:mb-0 text-center sm:text-left">
              <p className="text-amber-800/90 text-sm sm:text-base">
                &copy; {new Date().getFullYear()} Royal Chai
              </p>
              <p className="text-amber-700/80 text-xs sm:text-sm mt-1">
                Crafting royal experiences, one cup at a time.
              </p>
            </div>
            
            {/* Social Icons - mobile optimized */}
            <div className="flex space-x-3 sm:space-x-4">
              {[
                { name: 'twitter', icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                { name: 'instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'facebook', icon: 'M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z' },
                { name: 'youtube', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' }
              ].map((platform, index) => (
                <a
                  key={platform.name}
                  href="#"
                  className="relative block"
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      gsap.to(e.currentTarget, {
                        scale: 1.1,
                        y: -3,
                        duration: 0.2,
                        ease: 'back.out(1.7)'
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        y: 0,
                        duration: 0.2,
                        ease: 'back.out(1.7)'
                      });
                    }
                  }}
                  onClick={(e) => {
                    if (isMobile) {
                      e.preventDefault();
                      gsap.to(e.currentTarget, {
                        scale: 1.1,
                        y: -3,
                        duration: 0.1,
                        ease: 'back.out(1.7)',
                        yoyo: true,
                        repeat: 1
                      });
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/15 backdrop-blur-md rounded-full"></div>
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-600/80 to-amber-800/70 backdrop-blur-sm flex items-center justify-center border border-amber-500/30 shadow-md">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d={platform.icon} />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile-only CTA */}
          {isMobile && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  const formElement = formRef.current?.querySelector('input');
                  if (formElement) {
                    formElement.focus();
                    gsap.to(formElement, {
                      y: -5,
                      duration: 0.2,
                      yoyo: true,
                      repeat: 1
                    });
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-amber-600/90 to-amber-800/90 backdrop-blur-sm rounded-full text-amber-50 font-medium text-sm shadow-lg"
              >
                Join Waiting List
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default ComingSoonPage;