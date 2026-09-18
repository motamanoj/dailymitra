import React from 'react';
import { motion } from 'framer-motion';
import { Milk, Sparkles } from 'lucide-react';

const Loader = ({ fullScreen = false, text = 'Loading DailyMitra...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      {/* Animated Brand Logo Icon with Glow */}
      <div className="relative flex items-center justify-center">
        {/* Glowing Aura Ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-20 h-20 rounded-full bg-emerald-500/25 blur-xl"
        />

        {/* Outer Spinning Ring */}
        <div className="w-16 h-16 rounded-2xl border-2 border-emerald-500/20 border-t-emerald-500 border-r-teal-400 animate-spin flex items-center justify-center shadow-lg shadow-emerald-950/20"></div>

        {/* Center Logo Image */}
        <motion.div
          animate={{ scale: [0.95, 1.08, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img src="/logo.png" alt="DailyMitra Logo" className="w-10 h-10 object-contain drop-shadow-md" />
        </motion.div>
      </div>

      {/* Loading Label */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-sans">
          {text}
        </p>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center min-h-screen"
      >
        {content}
      </motion.div>
    );
  }

  return <div className="py-12 flex justify-center items-center">{content}</div>;
};

export default Loader;
