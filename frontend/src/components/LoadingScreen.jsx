import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/LoadingScreen.css';

/**
 * Premium DailyMitra Loading / Splash Screen
 * 
 * Follows exact brand guidelines:
 * - Warm cream/off-white background
 * - Dark forest green primary typography & elements
 * - Lime/bright green accents & subtle yellow highlights
 * - Unerring focus on exact logo (/logo.png) without alteration
 * - Subtle grocery-inspired floating accents (leaves, soft glowing particles)
 * - Seamless exit transition (scaling down logo, fading out text & container)
 */
const LoadingScreen = ({ 
  isLoading = true, 
  onFinish, 
  duration = 2600,
  minDisplayTime = 1600 
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [stage, setStage] = useState(0); // 0: init, 1: logo in, 2: float active, 3: text in, 4: subtext, 5: progress start

  // Manage timeline triggers matching specified seconds
  useEffect(() => {
    // 0.2s: background animation active
    const timer1 = setTimeout(() => setStage(1), 200);
    // 0.3s - 0.7s: logo entrance
    const timer2 = setTimeout(() => setStage(2), 700);
    // 0.9s: logo floating starts
    const timer3 = setTimeout(() => setStage(3), 900);
    // 1.0s: main headline
    const timer4 = setTimeout(() => setStage(4), 1000);
    // 1.3s: sub headline
    const timer5 = setTimeout(() => setStage(5), 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  // Progress Bar updates & exit trigger
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(calculatedProgress);

      // Check if loading complete (either duration elapsed or isLoading explicitly set to false after min time)
      if (elapsed >= duration || (!isLoading && elapsed >= minDisplayTime)) {
        clearInterval(interval);
        setProgress(100);
        
        // Trigger exit transition sequence
        setTimeout(() => {
          setIsExiting(true);
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [duration, isLoading, minDisplayTime]);

  // Handle completion after exit animation completes (500ms - 700ms)
  useEffect(() => {
    if (isExiting) {
      const exitTimer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 650);
      return () => clearTimeout(exitTimer);
    }
  }, [isExiting, onFinish]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="dailymitra-loading-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center dm-loading-bg overflow-hidden select-none px-4"
        >
          {/* DYNAMIC BACKGROUND - Soft Warm Cream Ambient Motion */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Soft Green Warm Ambient Blob 1 */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#E5F2E3] opacity-60 blur-3xl dm-blob-1" />
            
            {/* Gentle Lime/Yellow Warm Ambient Blob 2 */}
            <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#F3F7E8] opacity-70 blur-3xl dm-blob-2" />
            
            {/* Central Radial Light Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.75)_0%,transparent_75%)]" />
          </div>

          {/* CENTER CONTENT CONTAINER */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-lg w-full text-center">
            
            {/* LOGO & FLOATING GROCERY ACCENTS WRAPPER */}
            <div className="relative flex items-center justify-center mb-6 py-6 px-10">
              
              {/* GROCERY / DELIVERY FLOATING ACCENTS (Positioned around & behind logo) */}
              <div className="absolute inset-0 pointer-events-none z-0">
                {/* Accent Leaf 1 (Top Left) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, x: -10, y: 10 }}
                  animate={stage >= 2 ? { opacity: 0.85, scale: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute -top-2 left-2 text-[#064E3B] dm-leaf-1"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                  </svg>
                </motion.div>

                {/* Accent Leaf 2 (Bottom Right) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, x: 10, y: -10 }}
                  animate={stage >= 2 ? { opacity: 0.75, scale: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
                  className="absolute -bottom-1 right-3 text-[#84CC16] dm-leaf-2"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                  </svg>
                </motion.div>

                {/* Soft Emerald Particle (Top Right) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={stage >= 2 ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute top-1 right-8 w-2.5 h-2.5 rounded-full bg-[#10B981]/70 dm-particle"
                />

                {/* Soft Lime Accent Particle (Bottom Left) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={stage >= 2 ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute bottom-3 left-8 w-2 h-2 rounded-full bg-[#84CC16]/80 dm-particle"
                  style={{ animationDelay: '0.8s' }}
                />

                {/* Warm Yellow Highlight Dot (Far Top Left) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={stage >= 2 ? { opacity: 0.9 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute top-6 -left-3 w-1.5 h-1.5 rounded-full bg-[#FACC15] dm-particle"
                  style={{ animationDelay: '1.4s' }}
                />

                {/* Sparkle Fresh Accent (Far Right) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={stage >= 2 ? { opacity: 0.8, scale: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="absolute top-1/2 -right-4 -translate-y-1/2 text-[#10B981] dm-leaf-1"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                  </svg>
                </motion.div>
              </div>

              {/* DAILYMITRA EXACT LOGO IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
                animate={
                  isExiting 
                    ? { opacity: 0, scale: 0.94, filter: 'blur(4px)', transition: { duration: 0.5, ease: 'easeIn' } }
                    : { 
                        opacity: 1, 
                        scale: 1, 
                        filter: 'blur(0px)',
                        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
                      }
                }
                className={`relative z-10 flex items-center justify-center ${stage >= 3 && !isExiting ? 'dm-logo-float' : ''}`}
              >
                <img
                  src="/logo.png"
                  alt="DailyMitra Logo"
                  className="w-56 sm:w-64 md:w-72 h-auto object-contain filter drop-shadow-[0_10px_25px_rgba(6,78,59,0.08)]"
                />
              </motion.div>
            </div>

            {/* TYPOGRAPHY & SLOGANS */}
            <div className="flex flex-col items-center gap-2 mt-1 min-h-[70px]">
              {/* Main Slogan: "Your daily essentials, delivered." */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={
                  isExiting
                    ? { opacity: 0, y: -8, transition: { duration: 0.35 } }
                    : stage >= 4
                    ? { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
                    : { opacity: 0, y: 12 }
                }
                className="text-lg sm:text-xl font-semibold text-[#053B27] tracking-tight font-sans"
              >
                Your daily essentials, delivered.
              </motion.h2>

              {/* Sub Headline: "FRESH • LOCAL • DELIVERED" */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={
                  isExiting
                    ? { opacity: 0, y: -6, transition: { duration: 0.3 } }
                    : stage >= 5
                    ? { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                    : { opacity: 0, y: 6 }
                }
                className="text-xs sm:text-xs font-bold uppercase tracking-[0.22em] text-[#376554] flex items-center gap-2"
              >
                <span>FRESH</span>
                <span className="text-[#84CC16] text-[8px]">•</span>
                <span>LOCAL</span>
                <span className="text-[#84CC16] text-[8px]">•</span>
                <span>DELIVERED</span>
              </motion.p>
            </div>

            {/* MINIMAL PREMIUM LOADING INDICATOR */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                isExiting
                  ? { opacity: 0, scale: 0.92, transition: { duration: 0.3 } }
                  : stage >= 5
                  ? { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.15 } }
                  : { opacity: 0, y: 10 }
              }
              className="mt-8 flex flex-col items-center w-full max-w-xs px-4"
            >
              {/* Thin Rounded Progress Bar Track */}
              <div className="w-56 sm:w-64 h-2 bg-[#E4ECE3] rounded-full overflow-hidden relative shadow-inner p-[1px]">
                {/* Progress Bar Fill with Gradient */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#053B27] via-[#064E3B] to-[#84CC16] rounded-full relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeInOut' }}
                >
                  {/* Subtle Light Shimmer Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent dm-shimmer-sweep" />
                </motion.div>
              </div>

              {/* Subtle Loading Details / Percentage */}
              <div className="mt-2.5 flex items-center justify-between w-56 sm:w-64 px-1 text-[11px] font-medium text-[#4B7263]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
                  Bringing fresh products...
                </span>
                <span className="font-mono text-[#053B27] font-bold">{progress}%</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
