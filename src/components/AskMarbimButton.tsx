import { motion } from 'motion/react';
import { AskMarbimImage } from './AskMarbimImage';

interface AskMarbimButtonProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

// Size configurations for the button container
const buttonSizes = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

// Logo sizes
const logoSizes = {
  sm: 'sm' as const,
  md: 'md' as const,
  lg: 'lg' as const,
};

export function AskMarbimButton({ 
  size = 'md', 
  onClick,
  className = '' 
}: AskMarbimButtonProps) {
  
  return (
    <motion.button
      onClick={onClick}
      className={`relative ${buttonSizes[size]} ${className} cursor-pointer group`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Outer rotating glow ring - Yellow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, rgba(234, 179, 8, 0.4) 25%, transparent 50%, transparent 100%)',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Middle rotating glow ring - Aqua (counter-clockwise) */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, transparent 50%, rgba(87, 172, 175, 0.4) 75%, transparent 100%)',
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Pulsing background glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#EAB308]/30 via-[#57ACAF]/30 to-[#EAB308]/30 blur-2xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner circle container */}
      <motion.div
        className="absolute inset-[8%] rounded-full bg-gradient-to-br from-[#101725] to-[#182336] border border-white/20 shadow-2xl flex items-center justify-center"
        animate={{
          boxShadow: [
            '0 0 20px rgba(234, 179, 8, 0.2)',
            '0 0 30px rgba(87, 172, 175, 0.3)',
            '0 0 20px rgba(234, 179, 8, 0.2)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* MARBIM Logo with subtle rotation */}
        <motion.div
          className="relative z-10"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <AskMarbimImage size={logoSizes[size]} alt="Ask MARBIM" />
        </motion.div>
      </motion.div>

      {/* Sparkle particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#EAB308] rounded-full"
          style={{
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [0, Math.cos((i * 120 * Math.PI) / 180) * 40],
            y: [0, Math.sin((i * 120 * Math.PI) / 180) * 40],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Hover state - additional glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#EAB308]/0 via-[#57ACAF]/0 to-[#EAB308]/0 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300"
        animate={{
          background: [
            'radial-gradient(circle, rgba(234,179,8,0) 0%, rgba(87,172,175,0.2) 50%, rgba(234,179,8,0) 100%)',
            'radial-gradient(circle, rgba(87,172,175,0) 0%, rgba(234,179,8,0.2) 50%, rgba(87,172,175,0) 100%)',
            'radial-gradient(circle, rgba(234,179,8,0) 0%, rgba(87,172,175,0.2) 50%, rgba(234,179,8,0) 100%)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Orbital dots */}
      {[0, 1, 2].map((index) => (
        <motion.div
          key={`orbital-${index}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#EAB308] to-[#57ACAF]"
          style={{
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [
              Math.cos(((index * 120 + 0) * Math.PI) / 180) * 35,
              Math.cos(((index * 120 + 360) * Math.PI) / 180) * 35,
            ],
            y: [
              Math.sin(((index * 120 + 0) * Math.PI) / 180) * 35,
              Math.sin(((index * 120 + 360) * Math.PI) / 180) * 35,
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 0.2,
          }}
        />
      ))}
    </motion.button>
  );
}
