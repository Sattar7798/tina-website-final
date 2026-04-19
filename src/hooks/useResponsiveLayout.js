// src/hooks/useResponsiveLayout.js
import { useState, useEffect } from 'react';

/**
 * Hook for managing responsive layouts and breakpoints
 * @param {Object} options - Configuration options
 * @returns {Object} - Responsive state and utility functions
 */
const useResponsiveLayout = (options = {}) => {
  // Default breakpoints (based on common device sizes)
  const defaultBreakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  };
  
  // Merge default breakpoints with user-provided breakpoints
  const breakpoints = {
    ...defaultBreakpoints,
    ...options.breakpoints
  };
  
  // Create an array of breakpoint names sorted by size
  const sortedBreakpointNames = Object.keys(breakpoints).sort(
    (a, b) => breakpoints[a] - breakpoints[b]
  );
  
  // Initialize state
  const [state, setState] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    breakpoint: 'xs',
    orientation: 'portrait',
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });
  
  // Update state based on current screen dimensions
  const updateDimensions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Determine current breakpoint
    let currentBreakpoint = sortedBreakpointNames[0]; // Default to smallest breakpoint
    
    for (let i = sortedBreakpointNames.length - 1; i >= 0; i--) {
      const name = sortedBreakpointNames[i];
      if (width >= breakpoints[name]) {
        currentBreakpoint = name;
        break;
      }
    }
    
    // Determine orientation
    const orientation = width >= height ? 'landscape' : 'portrait';
    
    // Determine device type (customize these ranges as needed)
    const isMobile = width < breakpoints.md;
    const isTablet = width >= breakpoints.md && width < breakpoints.lg;
    const isDesktop = width >= breakpoints.lg;
    
    setState({
      width,
      height,
      breakpoint: currentBreakpoint,
      orientation,
      isMobile,
      isTablet,
      isDesktop
    });
  };
  
  // Initialize and add resize listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initial update
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Check if current breakpoint matches or exceeds a target breakpoint
  const isBreakpoint = (targetBreakpoint) => {
    const currentIndex = sortedBreakpointNames.indexOf(state.breakpoint);
    const targetIndex = sortedBreakpointNames.indexOf(targetBreakpoint);
    
    return currentIndex >= targetIndex;
  };
  
  // Get value based on current breakpoint
  const getResponsiveValue = (values) => {
    if (typeof values !== 'object') {
      return values; // Return non-object values as-is
    }
    
    // Find the largest matching breakpoint in values
    for (let i = sortedBreakpointNames.indexOf(state.breakpoint); i >= 0; i--) {
      const breakpoint = sortedBreakpointNames[i];
      if (breakpoint in values) {
        return values[breakpoint];
      }
    }
    
    // If no matching breakpoint found, return the smallest defined breakpoint
    for (let i = 0; i < sortedBreakpointNames.length; i++) {
      const breakpoint = sortedBreakpointNames[i];
      if (breakpoint in values) {
        return values[breakpoint];
      }
    }
    
    // If still no match, return undefined
    return undefined;
  };
  
  // Return state and helpers
  return {
    ...state,
    breakpoints,
    isBreakpoint,
    getResponsiveValue,
    
    // Convenience breakpoint checks
    isXs: state.breakpoint === 'xs',
    isSm: state.breakpoint === 'sm',
    isMd: state.breakpoint === 'md',
    isLg: state.breakpoint === 'lg',
    isXl: state.breakpoint === 'xl',
    is2Xl: state.breakpoint === '2xl',
    
    // Min-width checks
    isSmUp: isBreakpoint('sm'),
    isMdUp: isBreakpoint('md'),
    isLgUp: isBreakpoint('lg'),
    isXlUp: isBreakpoint('xl'),
    is2XlUp: isBreakpoint('2xl'),
    
    // Max-width checks
    isXsDown: !isBreakpoint('sm'),
    isSmDown: !isBreakpoint('md'),
    isMdDown: !isBreakpoint('lg'),
    isLgDown: !isBreakpoint('xl'),
    isXlDown: !isBreakpoint('2xl')
  };
};

export default useResponsiveLayout;