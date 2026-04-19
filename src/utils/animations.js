// src/utils/animations.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Animate element opacity and y-position on scroll
 * @param {HTMLElement} element - The element to animate
 * @param {Object} options - Animation options
 */
export const fadeInOnScroll = (element, options = {}) => {
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0,
    ease: 'power3.out',
    stagger: 0.2
  };
  
  const settings = { ...defaults, ...options };
  
  return gsap.fromTo(
    element,
    { y: settings.y, opacity: settings.opacity },
    {
      y: 0,
      opacity: 1,
      duration: settings.duration,
      delay: settings.delay,
      ease: settings.ease,
      stagger: settings.stagger,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

/**
 * Animate text reveal character by character
 * @param {HTMLElement} element - The text element to animate
 * @param {Object} options - Animation options
 */
export const textReveal = (element, options = {}) => {
  const defaults = {
    duration: 1.5,
    delay: 0,
    stagger: 0.02
  };
  
  const settings = { ...defaults, ...options };
  
  // Split text into spans for animation
  const text = element.textContent;
  element.textContent = '';
  
  const chars = text.split('');
  
  chars.forEach(char => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.textContent = char;
    element.appendChild(span);
  });
  
  return gsap.to(element.children, {
    opacity: 1,
    y: 0,
    stagger: settings.stagger,
    duration: settings.duration,
    delay: settings.delay,
    ease: 'power2.out'
  });
};

/**
 * Create a parametric wave animation
 * @param {HTMLElement} canvas - The canvas element
 * @param {Object} options - Wave options
 */
export const createWaveAnimation = (canvas, options = {}) => {
  const defaults = {
    amplitude: 20,
    frequency: 0.02,
    speed: 0.1,
    color: '#3498db',
    width: 2
  };
  
  const settings = { ...defaults, ...options };
  const ctx = canvas.getContext('2d');
  
  // Ensure canvas uses the full width and height of its container
  const resize = () => {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  };
  
  window.addEventListener('resize', resize);
  resize();
  
  let phase = 0;
  
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    for (let x = 0; x < canvas.width; x++) {
      const y = Math.sin(x * settings.frequency + phase) * settings.amplitude + canvas.height / 2;
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.strokeStyle = settings.color;
    ctx.lineWidth = settings.width;
    ctx.stroke();
    
    phase += settings.speed;
    requestAnimationFrame(draw);
  };
  
  draw();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', resize);
  };
};

/**
 * Create a flowing particles animation
 * @param {HTMLElement} canvas - The canvas element
 * @param {Object} options - Particle options
 */
export const createParticleFlow = (canvas, options = {}) => {
  const defaults = {
    particleCount: 100,
    particleSize: 2,
    speed: 1,
    color: '#ffffff',
    opacity: 0.5,
    direction: 'upward' // 'upward', 'downward', 'leftward', 'rightward'
  };
  
  const settings = { ...defaults, ...options };
  const ctx = canvas.getContext('2d');
  
  // Ensure canvas uses the full width and height of its container
  const resize = () => {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  };
  
  window.addEventListener('resize', resize);
  resize();
  
  // Create particles
  const particles = [];
  
  for (let i = 0; i < settings.particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * settings.particleSize + 1,
      speed: Math.random() * settings.speed + 0.5
    });
  }
  
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = settings.color + Math.floor(particle.size * settings.opacity * 255).toString(16).padStart(2, '0');
      ctx.fill();
      
      // Update position based on direction
      switch (settings.direction) {
        case 'upward':
          particle.y -= particle.speed;
          if (particle.y < -particle.size) {
            particle.y = canvas.height + particle.size;
            particle.x = Math.random() * canvas.width;
          }
          break;
        case 'downward':
          particle.y += particle.speed;
          if (particle.y > canvas.height + particle.size) {
            particle.y = -particle.size;
            particle.x = Math.random() * canvas.width;
          }
          break;
        case 'leftward':
          particle.x -= particle.speed;
          if (particle.x < -particle.size) {
            particle.x = canvas.width + particle.size;
            particle.y = Math.random() * canvas.height;
          }
          break;
        case 'rightward':
          particle.x += particle.speed;
          if (particle.x > canvas.width + particle.size) {
            particle.x = -particle.size;
            particle.y = Math.random() * canvas.height;
          }
          break;
        default:
          break;
      }
    });
    
    requestAnimationFrame(draw);
  };
  
  draw();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', resize);
  };
};

/**
 * Create a radial pulse animation
 * @param {HTMLElement} element - The element to animate
 * @param {Object} options - Animation options
 */
export const createRadialPulse = (element, options = {}) => {
  const defaults = {
    duration: 2,
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  };
  
  const settings = { ...defaults, ...options };
  
  return gsap.to(element, {
    scale: settings.scale,
    duration: settings.duration,
    repeat: settings.repeat,
    yoyo: settings.yoyo,
    ease: settings.ease
  });
};

/**
 * Create a staggered reveal animation for multiple elements
 * @param {NodeList|Array} elements - The elements to animate
 * @param {Object} options - Animation options
 */
export const staggeredReveal = (elements, options = {}) => {
  const defaults = {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    delay: 0
  };
  
  const settings = { ...defaults, ...options };
  
  return gsap.fromTo(
    elements,
    { 
      y: settings.y, 
      opacity: settings.opacity 
    },
    {
      y: 0,
      opacity: 1,
      duration: settings.duration,
      stagger: settings.stagger,
      ease: settings.ease,
      delay: settings.delay,
      scrollTrigger: {
        trigger: elements[0].parentElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

export default {
  fadeInOnScroll,
  textReveal,
  createWaveAnimation,
  createParticleFlow,
  createRadialPulse,
  staggeredReveal
};