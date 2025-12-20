import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { AskMarbimImage } from './AskMarbimImage';

interface MarbimAIButtonProps {
  prompt?: string;
  marbimPrompt?: string; // Legacy support
  onAskMarbim?: (prompt: string) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'full';
  label?: string;
}

export function MarbimAIButton({ 
  prompt,
  marbimPrompt, 
  onAskMarbim, 
  size = 'md', 
  variant = 'full',
  label = 'Ask MARBIM'
}: MarbimAIButtonProps) {
  // Support both 'prompt' and 'marbimPrompt' for backwards compatibility
  const actualPrompt = prompt || marbimPrompt || '';
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const buttonSizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  const handleClick = () => {
    if (onAskMarbim && actualPrompt) {
      onAskMarbim(actualPrompt);
    }
  };

  if (variant === 'icon') {
    return (
      <motion.button
        onClick={handleClick}
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={label}
      >
        {/* Glowing background animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#EAB308] via-[#57ACAF] to-[#EAB308] opacity-0 group-hover:opacity-20 blur-xl"
          animate={{
            opacity: [0, 0.3, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Rotating glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(234, 179, 8, 0.3) 25%, transparent 50%, rgba(87, 172, 175, 0.3) 75%, transparent 100%)',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* MARBIM Logo */}
        <motion.div 
          className="relative z-10 p-2 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <AskMarbimImage size={size} alt="Ask MARBIM" />
        </motion.div>

        {/* Sparkle effect on hover */}
        <motion.div
          className="absolute -top-1 -right-1 text-[#EAB308] opacity-0 group-hover:opacity-100"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Sparkles className="w-3 h-3" />
        </motion.div>
      </motion.button>
    );
  }

  // Full button variant
  return (
    <button 
      onClick={handleClick}
      className="p-0 bg-transparent border-0 cursor-pointer transition-all duration-180 group flex items-center justify-center"
    >
      <AskMarbimImage 
        size={size}
        alt="Ask MARBIM"
      />
    </button>
  );
}
