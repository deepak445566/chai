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
  const heroRef = useRef(null);

  useEffect(() => {
    // Mobile-first animations
    const tl = gsap.timeline();
    
    // Hero section animations
    tl.fromTo(heroRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
    
    // Logo animation
    tl.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.4'
    );
    
    // Tagline animation
    tl.fromTo(taglineRef.current?.children,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out'
      },
      '-=0.3'
    );
    
    // Cup animation - simplified for mobile
    tl.fromTo(cupRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
      '-=0.4'
    );
    
    // Spices animation - staggered
    tl.fromTo(spicesRef.current.filter(Boolean),
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(1.5)'
      },
      '-=0.3'
    );
    
    // Description animation
    tl.fromTo(descriptionRef.current?.children,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.1
      },
      '-=0.3'
    );
    
    // Form animation
    tl.fromTo(formRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );
    
    // Social icons animation
    if (socialRef.current) {
      tl.fromTo(socialRef.current.children,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.5)'
        },
        '-=0.2'
      );
    }
    
    // Continuous animations
    // Gentle floating for cup
    gsap.to(cupRef.current, {
      y: 8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    // Steam animation
    if (steamRef.current) {
      const steamParticles = steamRef.current.children;
      gsap.to(steamParticles, {
        y: -20,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        repeat: -1,
        ease: 'power1.out'
      });
    }
    
    return () => tl.kill();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    
    // Form submission animation
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
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
          );
        }, 800);
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/90 to-amber-50 text-[#422006]"
    >
      {/* Royal Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C6926' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '300px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Hero Section - Mobile First */}
        <div 
          ref={heroRef}
          className="flex flex-col items-center mb-8 sm:mb-12"
        >
          {/* Logo & Tagline Combined */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div 
              ref={logoRef}
              className="flex flex-col items-center mb-4"
            >
              {/* Logo with Crown */}
              <div className="relative mb-3">
                {/* Crown */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Main Logo */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-sm opacity-60"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-xl">
                    <span className="text-amber-50 font-bold text-xl sm:text-2xl font-serif">RC</span>
                  </div>
                </div>
              </div>
              
              {/* Brand Name */}
              <h1 className="text-2xl sm:text-3xl font-bold text-[#422006] font-serif">
                Royal Chai
              </h1>
              <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mt-2 rounded-full"></div>
            </div>
            
            {/* Tagline */}
            <div 
              ref={taglineRef}
              className="text-center"
            >
              <h2 className="text-5xl font-bold text-[#422006] ">
              
                <span className="block bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent pr">
                 Brew the Royal Tradition
                </span>
              </h2>
              <p className="text-[#422006]/80  mt-2 pr">
                Premium Instant Chai • Inspired by Royal Indian Households
              </p>
            </div>
          </div>
          
          {/* Launching Soon Badge */}
          <div className="relative mb-2">
          
          
            
                <h1 className='text-4xl md:text-5xl lg:text-9xl ab  '>Launching Soon</h1>
             
          </div>
        </div>

        {/* Main Content - Mobile Stacked Layout */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
          {/* Left Column - Product Visual */}
          <div className="lg:w-1/2">
            {/* Chai Cup Container */}
            <div className="relative mb-8">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-200/20 to-amber-400/10 rounded-3xl blur-xl opacity-50"></div>
              
              {/* Main Cup */}
              <div 
                ref={cupRef}
                className="relative"
              >
                {/* Cup with Glass Effect */}
                <div className="relative mx-auto max-w-xs sm:max-w-sm">
                  {/* Cup Shadow */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-amber-900/20 blur-md rounded-full"></div>
                  
                  {/* Cup Body */}
                
                  <img src='/images/chai1.png' className='w-full h-full object-cover'/>
                   
                    
                    {/* Steam */}
                    <div 
                      ref={steamRef}
                      className="absolute top-12 left-1/2 transform -translate-x-1/2"
                    >
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i}
                          className="absolute w-3 h-10 bg-gradient-to-t from-amber-50/60 to-transparent rounded-full"
                          style={{
                            left: `${(i - 2) * 10}px`,
                            transform: `scale(${1 - Math.abs(i - 2) * 0.2})`
                          }}
                        ></div>
                      ))}
                    </div>
                 
                  
                  {/* Spices */}
                  <div className="absolute bottom-10 lg:-left-24">
                    <div 
                      ref={el => spicesRef.current[0] = el}
                      className="w-14 h-14 sm:w-32 sm:h-32 rounded-full   flex items-center justify-center"
                    >
                      <img src='/images/cinn.png' className='bg-transparent'/>
                    </div>
                  </div>
                  
                  <div className="absolute -top-9 lg:-right-6">
                    <div 
                      ref={el => spicesRef.current[1] = el}
                      className="w-14 h-14 sm:w-35 sm:h-35 rounded-full   flex items-center justify-center"
                    >
                      <img src='/images/ginger3.png' className='bg-transparent'/>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 -right-10 lg:-right-20">
                    <div 
                      ref={el => spicesRef.current[2] = el}
                      className="w-14 h-14 sm:w-27 sm:h-27 rounded-full   flex items-center justify-center"
                    >
                       <img src='/images/eli.png' className='bg-transparent'/>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product Label */}
              <div className="mt-8 text-center">
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 backdrop-blur-sm rounded-2xl border border-amber-500/20">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#422006] font-serif mb-1">
                    Royal Blend
                  </h3>
                  <p className="text-[#422006]/70 text-sm sm:text-base">
                    Authentic Indian Masala Chai
                  </p>
                </div>
              </div>
            </div>
            
            {/* Social Proof */}
            <div className="bg-gradient-to-br from-amber-50/50 to-amber-100/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-amber-200/30 mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-center text-[#422006]/70 text-sm">
                "Tastes like the chai served in royal palaces of India"
              </p>
            </div>
          </div>
          
          {/* Right Column - Content & Form */}
          <div className="lg:w-1/2">
            {/* Description */}
            <div 
              ref={descriptionRef}
              className="mb-8"
            >
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-amber-50/60 to-amber-100/40 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-amber-200/30">
                  <h3 className="text-xl font-bold text-[#422006] font-serif mb-3">
                    A Taste of Royalty
                  </h3>
                  <p className="text-[#422006]/80 leading-relaxed">
                    Experience the authentic taste of royal Indian households with our premium instant chai tea remix. 
                    Crafted from a centuries-old recipe passed down through generations of Indian nobility.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50/40 to-amber-50/30 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-amber-200/30">
                  <h3 className="text-xl font-bold text-[#422006] font-serif mb-3">
                    Traditional Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {['Finest Assam Tea Leaves', 'Premium Indian Spices', 'Natural Sweeteners', 'Royal Blending Technique'].map((item, index) => (
                      <li key={index} className="flex items-center text-[#422006]/80">
                        <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Email Signup Form */}
            <div 
              ref={formRef}
              className="mb-8"
            >
              <div className="relative">
                {/* Form Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-amber-100/20 rounded-3xl blur-xl opacity-60"></div>
                
                {/* Form Content */}
                <div className="relative bg-gradient-to-br from-amber-50 to-amber-100/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-amber-200/40 shadow-xl">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#422006] font-serif mb-2">
                      Join Our Royal List
                    </h3>
                    <p className="text-[#422006]/70">
                      Be the first to experience authentic royal chai
                    </p>
                  </div>
                  
                  {submitted ? (
                    <div className="success-message">
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-200">
                        <div className="flex items-center justify-center mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <h4 className="text-center font-bold text-[#422006] mb-2">
                          Welcome to the Royal Family!
                        </h4>
                        <p className="text-center text-[#422006]/70 text-sm">
                          You'll receive exclusive launch offers and updates
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full px-5 py-4 rounded-xl border border-amber-300/50 bg-amber-50/80 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-[#422006] placeholder-amber-600/50"
                            required
                          />
                        </div>
                        
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-amber-50 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Joining Royal List...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center">
                              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                              Get Early Access
                            </span>
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-center pt-2">
                        <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-[#422006]/60">
                          We respect your privacy. No spam, ever.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: '🎯', title: 'Early Access' },
                { icon: '👑', title: 'Royal Discount' },
                { icon: '🎁', title: 'Free Samples' },
                { icon: '⚡', title: 'Instant Brew' },
                { icon: '🌿', title: '100% Natural' },
                { icon: '🚚', title: 'Free Shipping' }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-amber-50/50 to-amber-100/30 backdrop-blur-sm rounded-xl p-3 text-center border border-amber-200/30"
                >
                  <div className="text-2xl mb-1">{benefit.icon}</div>
                  <p className="text-xs font-medium text-[#422006]/80">{benefit.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer 
          ref={socialRef}
          className="pt-6 border-t border-amber-200/30"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-6 sm:mb-0 text-center sm:text-left">
              <p className="text-[#422006]/70 text-sm">
                &copy; {new Date().getFullYear()} Royal Chai. Crafted with royal tradition.
              </p>
              <p className="text-[#422006]/50 text-xs mt-1">
                Inspired by centuries of Indian tea heritage
              </p>
            </div>
            
            {/* Social Media */}
            <div className="flex items-center space-x-3">
              {[
                { icon: '🐦', label: 'Twitter', color: 'text-sky-500' },
                { icon: '📸', label: 'Instagram', color: 'text-pink-500' },
                { icon: '📘', label: 'Facebook', color: 'text-blue-600' },
                { icon: '▶️', label: 'YouTube', color: 'text-red-600' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-amber-200/30 hover:border-amber-300/50 ${social.color}`}
                  aria-label={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile CTA */}
          <div className="mt-8 sm:hidden">
            <button
              onClick={() => {
                const formElement = document.querySelector('input[type="email"]');
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
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-800 text-amber-50 font-bold rounded-xl shadow-lg"
            >
              Join Waiting List
            </button>
          </div>
        </footer>
      </div>
      
      {/* Inline CSS for custom colors */}
      <style jsx global>{`
        /* Define custom color palette */
        :root {
          /* Royal Color Palette */
          --royal-gold-light: #fbbf24;
          --royal-gold: #f59e0b;
          --royal-gold-dark: #d97706;
          --royal-brown-light: #92400e;
          --royal-brown: #78350f;
          --royal-brown-dark: #5a2e0a;
          --royal-cream: #fffbeb;
          --royal-deep-brown: #422006;
        }
        
        /* Apply colors using CSS variables */
        .bg-royal-gold { background-color: var(--royal-gold); }
        .bg-royal-brown { background-color: var(--royal-brown); }
        .bg-royal-cream { background-color: var(--royal-cream); }
        .bg-royal-deep-brown { background-color: var(--royal-deep-brown); }
        
        .text-royal-gold { color: var(--royal-gold); }
        .text-royal-brown { color: var(--royal-brown); }
        .text-royal-cream { color: var(--royal-cream); }
        .text-royal-deep-brown { color: var(--royal-deep-brown); }
        
        .border-royal-gold { border-color: var(--royal-gold); }
        .border-royal-brown { border-color: var(--royal-brown); }
        
        /* Gradient classes */
        .from-royal-gold { --tw-gradient-from: var(--royal-gold); }
        .to-royal-brown { --tw-gradient-to: var(--royal-brown); }
        
        /* Specific color overrides for better royal feel */
        .text-\[#422006\] { color: #422006 !important; }
        .bg-\[#422006\] { background-color: #422006 !important; }
        .border-\[#422006\] { border-color: #422006 !important; }
        .from-\[#422006\] { --tw-gradient-from: #422006 !important; }
        .to-\[#422006\] { --tw-gradient-to: #422006 !important; }
        .via-\[#422006\] { --tw-gradient-stops: var(--tw-gradient-from), #422006, var(--tw-gradient-to) !important; }
        
        /* Ensure proper text contrast */
        .text-amber-50 { color: #fffbeb !important; }
        .text-amber-100 { color: #fef3c7 !important; }
        .text-amber-200 { color: #fde68a !important; }
        .text-amber-300 { color: #fcd34d !important; }
        .text-amber-400 { color: #fbbf24 !important; }
        .text-amber-500 { color: #f59e0b !important; }
        .text-amber-600 { color: #d97706 !important; }
        .text-amber-700 { color: #b45309 !important; }
        .text-amber-800 { color: #92400e !important; }
        .text-amber-900 { color: #78350f !important; }
        
        /* Background colors */
        .bg-amber-50 { background-color: #fffbeb !important; }
        .bg-amber-100 { background-color: #fef3c7 !important; }
        .bg-amber-200 { background-color: #fde68a !important; }
        .bg-amber-300 { background-color: #fcd34d !important; }
        .bg-amber-400 { background-color: #fbbf24 !important; }
        .bg-amber-500 { background-color: #f59e0b !important; }
        .bg-amber-600 { background-color: #d97706 !important; }
        .bg-amber-700 { background-color: #b45309 !important; }
        .bg-amber-800 { background-color: #92400e !important; }
        .bg-amber-900 { background-color: #78350f !important; }
        
        /* Border colors */
        .border-amber-200 { border-color: #fde68a !important; }
        .border-amber-300 { border-color: #fcd34d !important; }
        .border-amber-400 { border-color: #fbbf24 !important; }
        .border-amber-500 { border-color: #f59e0b !important; }
        .border-amber-600 { border-color: #d97706 !important; }
        
        /* Gradient stops */
        .from-amber-50 { --tw-gradient-from: #fffbeb !important; }
        .to-amber-100 { --tw-gradient-to: #fef3c7 !important; }
        .from-amber-400 { --tw-gradient-from: #fbbf24 !important; }
        .to-amber-600 { --tw-gradient-to: #d97706 !important; }
        .from-amber-500 { --tw-gradient-from: #f59e0b !important; }
        .to-amber-700 { --tw-gradient-to: #b45309 !important; }
        .from-amber-600 { --tw-gradient-from: #d97706 !important; }
        .to-amber-800 { --tw-gradient-to: #92400e !important; }
        .from-amber-700 { --tw-gradient-from: #b45309 !important; }
        .to-amber-900 { --tw-gradient-to: #78350f !important; }
      `}</style>
    </div>
  );
};

export default ComingSoonPage;