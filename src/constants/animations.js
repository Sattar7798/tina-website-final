// src/constants/animations.js

/**
 * Animation timing constants and configurations
 * Used for consistent animations throughout the application
 */

// Duration constants in milliseconds
export const duration = {
    fastest: 150,
    fast: 300,
    normal: 500,
    slow: 800,
    slowest: 1200
  };
  
  // Easing functions
  export const easing = {
    // Standard easing
    linear: 'linear',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    // Custom easing curves
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    anticipate: 'cubic-bezier(0.38, -0.4, 0.88, 0.65)',
    bounceOut: 'cubic-bezier(0.34, 1.95, 0.64, 0.74)',
    elastic: 'cubic-bezier(0.43, 0.59, 0.82, 1.2)'
  };
  
  // Animation presets for common elements
  export const presets = {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: duration.normal,
      easing: easing.easeOut
    },
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
      duration: duration.normal,
      easing: easing.easeIn
    },
    fadeInUp: {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      duration: duration.normal,
      easing: easing.easeOut
    },
    fadeInDown: {
      from: { opacity: 0, transform: 'translateY(-20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      duration: duration.normal,
      easing: easing.easeOut
    },
    scaleIn: {
      from: { opacity: 0, transform: 'scale(0.95)' },
      to: { opacity: 1, transform: 'scale(1)' },
      duration: duration.normal,
      easing: easing.easeOut
    },
    slideInLeft: {
      from: { transform: 'translateX(-100%)' },
      to: { transform: 'translateX(0)' },
      duration: duration.normal,
      easing: easing.easeOut
    },
    slideInRight: {
      from: { transform: 'translateX(100%)' },
      to: { transform: 'translateX(0)' },
      duration: duration.normal,
      easing: easing.easeOut
    },
    slideInBottom: {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' },
      duration: duration.normal,
      easing: easing.easeOut
    },
    slideInTop: {
      from: { transform: 'translateY(-100%)' },
      to: { transform: 'translateY(0)' },
      duration: duration.normal,
      easing: easing.easeOut
    },
    pulse: {
      from: { transform: 'scale(1)' },
      to: { transform: 'scale(1.05)' },
      duration: duration.slow,
      easing: easing.easeInOut,
      repeat: Infinity,
      direction: 'alternate'
    },
    rotation: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
      duration: duration.slowest,
      easing: easing.linear,
      repeat: Infinity
    }
  };
  
  // Scroll-based animation settings
  export const scroll = {
    fadeIn: {
      opacity: [0, 1],
      duration: duration.normal,
      easing: easing.easeOut
    },
    fadeInUp: {
      opacity: [0, 1],
      y: [30, 0],
      duration: duration.normal,
      easing: easing.easeOut
    },
    staggerChildren: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    },
    parallax: {
      y: (position) => `${position * -20}px`,
      easing: easing.easeInOut
    }
  };
  
  // Stagger animations for lists and grids
  export const stagger = {
    fast: 0.05,
    normal: 0.08,
    slow: 0.12,
    container: {
      animate: { transition: { staggerChildren: 0.08 } }
    },
    childrenFadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: duration.normal / 1000,
          ease: easing.easeOut
        }
      }
    }
  };
  
  // Page transition settings
  export const pageTransition = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: duration.normal / 1000,
        ease: easing.easeOut,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: duration.fast / 1000,
        ease: easing.easeIn
      }
    }
  };
  
  // Layer navigation animations
  export const layerNavigation = {
    enter: {
      opacity: [0, 1],
      scale: [0.98, 1],
      duration: duration.normal,
      easing: easing.easeOut
    },
    exit: {
      opacity: [1, 0],
      scale: [1, 0.98],
      duration: duration.fast,
      easing: easing.easeIn
    },
    activeLayer: {
      scale: [1, 1.02, 1],
      boxShadow: ['0px 0px 0px rgba(0,0,0,0)', '0px 10px 30px rgba(0,0,0,0.15)', '0px 5px 15px rgba(0,0,0,0.1)'],
      duration: duration.slow,
      easing: easing.overshoot
    }
  };
  
  // 3D object animations
  export const threeD = {
    fadeIn: {
      opacity: [0, 1],
      duration: duration.slow
    },
    rotate: {
      rotationY: [0, Math.PI * 2],
      duration: duration.slowest,
      repeat: Infinity,
      easing: easing.linear
    },
    explode: {
      scale: [1, 1.2],
      position: [0, 0.5],
      duration: duration.normal,
      easing: easing.overshoot
    },
    hover: {
      position: [0, 0.1, 0],
      duration: duration.slow,
      repeat: Infinity,
      direction: 'alternate',
      easing: easing.easeInOut
    }
  };
  
  // Wave animation parameters
  export const wave = {
    amplitude: 25,
    frequency: 0.02,
    speed: 0.1,
    color: '#3498db',
    width: 2
  };
  
  // Particle animation parameters
  export const particles = {
    count: 100,
    size: {
      min: 1,
      max: 3
    },
    speed: {
      min: 0.5,
      max: 1.5
    },
    opacity: {
      min: 0.2,
      max: 0.8
    },
    colors: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6']
  };
  
  export default {
    duration,
    easing,
    presets,
    scroll,
    stagger,
    pageTransition,
    layerNavigation,
    threeD,
    wave,
    particles
  };