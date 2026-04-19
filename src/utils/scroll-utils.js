// src/utils/scroll-utils.js
import { useEffect, useState, useRef } from 'react';

/**
 * Detects when an element enters or exits the viewport
 * @param {Object} options - Intersection observer options
 * @returns {Object} - Observer ref and inView status
 */
export const useInView = (options = {}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, mergedOptions);
    
    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, mergedOptions.root, mergedOptions.rootMargin, mergedOptions.threshold]);
  
  return { ref, inView };
};

/**
 * Tracks scroll position and direction
 * @returns {Object} - Scroll data
 */
export const useScrollPosition = () => {
  const [scrollData, setScrollData] = useState({
    y: 0,
    lastY: 0,
    direction: 'none' // 'up', 'down', or 'none'
  });
  
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      
      setScrollData(prevData => ({
        y: currentY,
        lastY: prevData.y,
        direction: currentY > prevData.y ? 'down' : 
                  currentY < prevData.y ? 'up' : 
                  prevData.direction
      }));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return scrollData;
};

/**
 * Tracks scroll progress through a page or element
 * @param {Object} options - Scroll progress options
 * @returns {Number} - Progress value from 0 to 1
 */
export const useScrollProgress = (options = {}) => {
  const [progress, setProgress] = useState(0);
  const elementRef = useRef(null);
  
  const defaultOptions = {
    targetElement: null, // If null, tracks progress through the entire page
    offset: 0 // Offset in pixels
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  useEffect(() => {
    const handleScroll = () => {
      const target = mergedOptions.targetElement || document.documentElement;
      const element = mergedOptions.targetElement ? elementRef.current : target;
      
      if (!element) return;
      
      const totalHeight = mergedOptions.targetElement ? 
        element.scrollHeight - element.clientHeight : 
        element.scrollHeight - window.innerHeight;
      
      const scrollPosition = mergedOptions.targetElement ? 
        element.scrollTop : 
        window.scrollY;
      
      // Calculate progress with offset
      let calculatedProgress = (scrollPosition + mergedOptions.offset) / totalHeight;
      
      // Clamp progress between 0 and 1
      calculatedProgress = Math.max(0, Math.min(1, calculatedProgress));
      
      setProgress(calculatedProgress);
    };
    
    const scrollTarget = mergedOptions.targetElement ? 
      elementRef.current : 
      window;
    
    scrollTarget?.addEventListener('scroll', handleScroll, { passive: true });
    
    // Calculate initial progress
    handleScroll();
    
    return () => {
      scrollTarget?.removeEventListener('scroll', handleScroll);
    };
  }, [mergedOptions.targetElement, mergedOptions.offset]);
  
  return { progress, ref: elementRef };
};

/**
 * Creates a parallax scroll effect
 * @param {Object} options - Parallax options
 * @returns {Object} - Style object and ref
 */
export const useParallax = (options = {}) => {
  const [style, setStyle] = useState({});
  const elementRef = useRef(null);
  
  const defaultOptions = {
    speed: 0.5, // Positive values scroll slower, negative values scroll faster
    direction: 'vertical', // 'vertical' or 'horizontal'
    reverse: false // Reverse the direction of the parallax
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      // Calculate how far the element is from the center of the viewport
      const centerOffsetY = rect.top + rect.height / 2 - windowHeight / 2;
      const centerOffsetX = rect.left + rect.width / 2 - windowWidth / 2;
      
      // Calculate parallax offset
      const direction = mergedOptions.reverse ? -1 : 1;
      
      if (mergedOptions.direction === 'vertical') {
        const translateY = centerOffsetY * mergedOptions.speed * direction * -1;
        setStyle({ transform: `translateY(${translateY}px)` });
      } else {
        const translateX = centerOffsetX * mergedOptions.speed * direction * -1;
        setStyle({ transform: `translateX(${translateX}px)` });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Calculate initial parallax
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [mergedOptions.speed, mergedOptions.direction, mergedOptions.reverse]);
  
  return { style, ref: elementRef };
};

/**
 * Creates a scroll-triggered animation timeline
 * @param {Object} options - Timeline options
 * @returns {Object} - Timeline progress and ref
 */
export const useScrollTimeline = (options = {}) => {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  
  const defaultOptions = {
    start: 'top bottom', // When the top of the element hits the bottom of the viewport
    end: 'bottom top', // When the bottom of the element hits the top of the viewport
    scrub: true, // Whether to scrub the animation (true) or play it once (false)
    markers: false // Whether to show markers for debugging
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const section = sectionRef.current;
    
    const calculateProgress = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Parse start and end positions
      const [startElement, startViewport] = mergedOptions.start.split(' ');
      const [endElement, endViewport] = mergedOptions.end.split(' ');
      
      // Calculate start and end positions in pixels
      let startPosition, endPosition;
      
      // Calculate start position
      if (startElement === 'top') {
        if (startViewport === 'top') {
          startPosition = rect.top;
        } else if (startViewport === 'bottom') {
          startPosition = rect.top - windowHeight;
        } else { // center
          startPosition = rect.top - windowHeight / 2;
        }
      } else if (startElement === 'bottom') {
        if (startViewport === 'top') {
          startPosition = rect.bottom;
        } else if (startViewport === 'bottom') {
          startPosition = rect.bottom - windowHeight;
        } else { // center
          startPosition = rect.bottom - windowHeight / 2;
        }
      } else { // center
        if (startViewport === 'top') {
          startPosition = rect.top + rect.height / 2;
        } else if (startViewport === 'bottom') {
          startPosition = rect.top + rect.height / 2 - windowHeight;
        } else { // center
          startPosition = rect.top + rect.height / 2 - windowHeight / 2;
        }
      }
      
      // Calculate end position
      if (endElement === 'top') {
        if (endViewport === 'top') {
          endPosition = rect.top;
        } else if (endViewport === 'bottom') {
          endPosition = rect.top - windowHeight;
        } else { // center
          endPosition = rect.top - windowHeight / 2;
        }
      } else if (endElement === 'bottom') {
        if (endViewport === 'top') {
          endPosition = rect.bottom;
        } else if (endViewport === 'bottom') {
          endPosition = rect.bottom - windowHeight;
        } else { // center
          endPosition = rect.bottom - windowHeight / 2;
        }
      } else { // center
        if (endViewport === 'top') {
          endPosition = rect.top + rect.height / 2;
        } else if (endViewport === 'bottom') {
          endPosition = rect.top + rect.height / 2 - windowHeight;
        } else { // center
          endPosition = rect.top + rect.height / 2 - windowHeight / 2;
        }
      }
      
      // Calculate progress (0 to 1)
      const total = endPosition - startPosition;
      const current = -startPosition;
      let calculatedProgress = current / total;
      
      // Clamp progress between 0 and 1
      calculatedProgress = Math.max(0, Math.min(1, calculatedProgress));
      
      setProgress(calculatedProgress);
      
      // Debug markers
      if (mergedOptions.markers && typeof document !== 'undefined') {
        // Create or update markers
        let startMarker = document.getElementById('scroll-timeline-start');
        let endMarker = document.getElementById('scroll-timeline-end');
        
        if (!startMarker) {
          startMarker = document.createElement('div');
          startMarker.id = 'scroll-timeline-start';
          startMarker.style.position = 'fixed';
          startMarker.style.left = '0';
          startMarker.style.right = '0';
          startMarker.style.height = '2px';
          startMarker.style.backgroundColor = 'red';
          startMarker.style.zIndex = '9999';
          document.body.appendChild(startMarker);
        }
        
        if (!endMarker) {
          endMarker = document.createElement('div');
          endMarker.id = 'scroll-timeline-end';
          endMarker.style.position = 'fixed';
          endMarker.style.left = '0';
          endMarker.style.right = '0';
          endMarker.style.height = '2px';
          endMarker.style.backgroundColor = 'green';
          endMarker.style.zIndex = '9999';
          document.body.appendChild(endMarker);
        }
        
        // Position markers
        let startY, endY;
        
        if (startViewport === 'top') {
          startY = 0;
        } else if (startViewport === 'bottom') {
          startY = windowHeight;
        } else { // center
          startY = windowHeight / 2;
        }
        
        if (endViewport === 'top') {
          endY = 0;
        } else if (endViewport === 'bottom') {
          endY = windowHeight;
        } else { // center
          endY = windowHeight / 2;
        }
        
        startMarker.style.top = `${startY}px`;
        endMarker.style.top = `${endY}px`;
      }
    };
    
    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });
    
    // Calculate initial progress
    calculateProgress();
    
    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
      
      // Remove debug markers
      if (mergedOptions.markers && typeof document !== 'undefined') {
        const startMarker = document.getElementById('scroll-timeline-start');
        const endMarker = document.getElementById('scroll-timeline-end');
        
        if (startMarker) startMarker.remove();
        if (endMarker) endMarker.remove();
      }
    };
  }, [
    mergedOptions.start,
    mergedOptions.end,
    mergedOptions.scrub,
    mergedOptions.markers
  ]);
  
  return { progress, ref: sectionRef };
};

export default {
  useInView,
  useScrollPosition,
  useScrollProgress,
  useParallax,
  useScrollTimeline
};