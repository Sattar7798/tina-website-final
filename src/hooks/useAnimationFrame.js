// src/hooks/useAnimationFrame.js
import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook for creating smooth animations using requestAnimationFrame
 * @param {Function} callback - Animation frame callback function
 * @param {Boolean} running - Whether the animation should be running
 * @returns {Object} - Animation state and controls
 */
const useAnimationFrame = (callback, running = true) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const [isRunning, setIsRunning] = useState(running);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [frameCount, setFrameCount] = useState(0);
  const [fps, setFps] = useState(0);
  
  // FPS calculation
  const fpsRef = useRef({
    frames: 0,
    lastFpsUpdate: 0,
    currentFps: 0
  });
  
  // Store the callback in a ref to avoid re-creating the animation loop
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  const animate = (time) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
      fpsRef.current.lastFpsUpdate = time;
    }
    
    const deltaTime = time - previousTimeRef.current;
    previousTimeRef.current = time;
    
    // Calculate elapsed time
    setElapsedTime(prevElapsedTime => prevElapsedTime + deltaTime);
    
    // Increment frame count
    setFrameCount(prevFrameCount => prevFrameCount + 1);
    
    // Calculate FPS
    fpsRef.current.frames++;
    if (time - fpsRef.current.lastFpsUpdate >= 1000) {
      fpsRef.current.currentFps = 
        Math.round((fpsRef.current.frames * 1000) / (time - fpsRef.current.lastFpsUpdate));
      fpsRef.current.lastFpsUpdate = time;
      fpsRef.current.frames = 0;
      
      setFps(fpsRef.current.currentFps);
    }
    
    // Call the animation callback
    if (callbackRef.current) {
      callbackRef.current({
        time,
        deltaTime,
        elapsedTime: elapsedTime + deltaTime,
        frameCount: frameCount + 1,
        fps: fpsRef.current.currentFps
      });
    }
    
    // Request next frame if still running
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };
  
  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [isRunning]);
  
  // Controls
  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setElapsedTime(0);
    setFrameCount(0);
    previousTimeRef.current = undefined;
  };
  const toggle = () => setIsRunning(prevIsRunning => !prevIsRunning);
  
  return {
    isRunning,
    elapsedTime,
    frameCount,
    fps,
    controls: {
      start,
      stop,
      reset,
      toggle
    }
  };
};

export default useAnimationFrame;