import React from 'react';
import { motion } from 'framer-motion';

// Simple animated floating orbs background for hero section
export const FloatingOrbs: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    <motion.div
      className="absolute bg-bronze-500 opacity-30 rounded-full"
      style={{ width: 200, height: 200, top: '10%', left: '5%' }}
      animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bg-bronze-300 opacity-20 rounded-full"
      style={{ width: 300, height: 300, bottom: '15%', right: '10%' }}
      animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bg-bronze-400 opacity-25 rounded-full"
      style={{ width: 120, height: 120, top: '40%', left: '60%' }}
      animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);
