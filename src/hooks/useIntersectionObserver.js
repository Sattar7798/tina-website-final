// src/hooks/useIntersectionObserver.js
import { useRef, useState, useEffect } from 'react';

/**
 * Enhanced hook for detecting when elements enter or exit the viewport
 * with support for multiple thresholds and callback
 * 
 * @param {Object} options - Intersection observer options
 * @returns {Object} - Observer ref, entry data, and utility functions
 */
const useIntersectionObserver = (options = {}) => {
  const [entry, setEntry] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const observerRef = useRef(null);
  const elementRef = useRef(null);
  
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    triggerOnce: false,
    freezeOnceVisible: false,
    onChange: null,
    onEnter: null,
    onExit: null
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Initialize or update the observer
  const initObserver = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    const observer = new IntersectionObserver(
      ([newEntry]) => {
        // Store the entry
        setEntry(newEntry);
        
        // Update intersection state
        const isVisible = newEntry.isIntersecting;
        setIsIntersecting(isVisible);
        
        // Call onChange callback if provided
        if (mergedOptions.onChange) {
          mergedOptions.onChange(newEntry);
        }
        
        // Handle enter/exit callbacks
        if (isVisible) {
          if (!hasIntersected || !mergedOptions.triggerOnce) {
            setHasIntersected(true);
            
            if (mergedOptions.onEnter) {
              mergedOptions.onEnter(newEntry);
            }
          }
          
          // Disconnect if we only need to trigger once and element is visible
          if (mergedOptions.triggerOnce) {
            observer.disconnect();
          }
        } else if (hasIntersected && mergedOptions.onExit) {
          mergedOptions.onExit(newEntry);
        }
      },
      {
        root: mergedOptions.root,
        rootMargin: mergedOptions.rootMargin,
        threshold: mergedOptions.threshold
      }
    );
    
    observerRef.current = observer;
    
    return observer;
  };
  
  // Start observing an element
  const observe = (element) => {
    if (!element) return;
    
    const observer = observerRef.current || initObserver();
    observer.observe(element);
    elementRef.current = element;
  };
  
  // Stop observing the current element
  const unobserve = () => {
    if (elementRef.current && observerRef.current) {
      observerRef.current.unobserve(elementRef.current);
      elementRef.current = null;
    }
  };
  
  // Disconnect and clean up the observer
  const disconnect = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  };
  
  // Setup the ref callback to start observing
  const ref = (element) => {
    if (element) {
      observe(element);
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  
  // Update the observer when options change
  useEffect(() => {
    const observer = initObserver();
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [
    mergedOptions.root,
    mergedOptions.rootMargin,
    mergedOptions.threshold,
    mergedOptions.triggerOnce,
    mergedOptions.freezeOnceVisible
  ]);
  
  return {
    ref,
    entry,
    isIntersecting,
    hasIntersected,
    observe,
    unobserve,
    disconnect
  };
};

export default useIntersectionObserver;