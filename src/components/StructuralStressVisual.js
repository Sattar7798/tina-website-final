import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StructuralStressVisual.css';

const StructuralStressVisual = () => {
  const [activeStructure, setActiveStructure] = useState('beam');
  const [loadAmount, setLoadAmount] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  const structures = [
    {
      id: 'beam',
      name: 'Simple Beam',
      description: 'A horizontal structural element that resists loads applied laterally to its axis'
    },
    {
      id: 'arch',
      name: 'Arch',
      description: 'A curved structure that spans an open space and supports loads primarily by compression'
    },
    {
      id: 'truss',
      name: 'Truss',
      description: 'A framework consisting of members organized in triangular units to create a rigid structure'
    },
    {
      id: 'frame',
      name: 'Frame',
      description: 'A structural system that uses rigid connections between elements to resist lateral forces'
    }
  ];
  
  // Initialize and run canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const containerWidth = canvas.parentElement.clientWidth;
      const containerHeight = canvas.parentElement.clientHeight;
      
      canvas.width = containerWidth;
      canvas.height = containerHeight;
      
      // Clear canvas on resize
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Animation variables
    let time = 0;
    
    // Animation loop
    const animate = () => {
      if (!isAnimating) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw based on active structure
      switch (activeStructure) {
        case 'beam':
          drawBeam(ctx, canvas.width, canvas.height, time, loadAmount);
          break;
        case 'arch':
          drawArch(ctx, canvas.width, canvas.height, time, loadAmount);
          break;
        case 'truss':
          drawTruss(ctx, canvas.width, canvas.height, time, loadAmount);
          break;
        case 'frame':
          drawFrame(ctx, canvas.width, canvas.height, time, loadAmount);
          break;
        default:
          drawBeam(ctx, canvas.width, canvas.height, time, loadAmount);
      }
      
      time += 0.05;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Draw static structure when not animating
      switch (activeStructure) {
        case 'beam':
          drawBeam(ctx, canvas.width, canvas.height, 0, loadAmount);
          break;
        case 'arch':
          drawArch(ctx, canvas.width, canvas.height, 0, loadAmount);
          break;
        case 'truss':
          drawTruss(ctx, canvas.width, canvas.height, 0, loadAmount);
          break;
        case 'frame':
          drawFrame(ctx, canvas.width, canvas.height, 0, loadAmount);
          break;
        default:
          drawBeam(ctx, canvas.width, canvas.height, 0, loadAmount);
      }
    }
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeStructure, loadAmount, isAnimating]);
  
  // Drawing functions for different structures
  const drawBeam = (ctx, width, height, time, load) => {
    const scaleFactor = load / 50;
    const beamWidth = width * 0.7;
    const beamHeight = height * 0.1;
    const beamX = width * 0.15;
    const beamY = height * 0.5;
    
    // Support points
    const leftSupport = { x: beamX, y: beamY + beamHeight / 2 };
    const rightSupport = { x: beamX + beamWidth, y: beamY + beamHeight / 2 };
    
    // Beam deflection
    const deflectionAmount = Math.sin(time) * scaleFactor * 0.1 * beamHeight;
    
    // Draw supports
    ctx.fillStyle = '#2d3e50';
    
    // Left support (triangle)
    ctx.beginPath();
    ctx.moveTo(leftSupport.x, leftSupport.y);
    ctx.lineTo(leftSupport.x - 20, leftSupport.y + 40);
    ctx.lineTo(leftSupport.x + 20, leftSupport.y + 40);
    ctx.closePath();
    ctx.fill();
    
    // Right support (roller)
    ctx.beginPath();
    ctx.arc(rightSupport.x, rightSupport.y + 20, 10, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(rightSupport.x - 20, rightSupport.y);
    ctx.lineTo(rightSupport.x + 20, rightSupport.y);
    ctx.lineTo(rightSupport.x + 20, rightSupport.y + 10);
    ctx.lineTo(rightSupport.x - 20, rightSupport.y + 10);
    ctx.closePath();
    ctx.fill();
    
    // Draw deformed beam
    ctx.beginPath();
    ctx.moveTo(leftSupport.x, leftSupport.y - beamHeight / 2);
    
    // Deformed curve
    for (let x = 1; x <= beamWidth; x++) {
      const normalizedX = x / beamWidth;
      const y = leftSupport.y - beamHeight / 2 - Math.sin(Math.PI * normalizedX) * deflectionAmount;
      ctx.lineTo(leftSupport.x + x, y);
    }
    
    ctx.lineTo(rightSupport.x, rightSupport.y - beamHeight / 2);
    ctx.lineTo(rightSupport.x, rightSupport.y + beamHeight / 2);
    ctx.lineTo(leftSupport.x, leftSupport.y + beamHeight / 2);
    ctx.closePath();
    
    // Gradient fill for beam
    const gradient = ctx.createLinearGradient(
      leftSupport.x,
      leftSupport.y - beamHeight,
      leftSupport.x,
      leftSupport.y + beamHeight
    );
    gradient.addColorStop(0, '#1a2a3a');
    gradient.addColorStop(1, '#2d3e50');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw stress visualization
    drawStressGradient(ctx, leftSupport.x, leftSupport.y - beamHeight / 2, beamWidth, beamHeight, time, load);
    
    // Draw the load
    drawLoad(ctx, beamX + beamWidth / 2, leftSupport.y - beamHeight / 2 - 40, load);
    
    // Draw load path arrows
    const arrowCount = 5;
    const arrowSpacing = beamWidth / (arrowCount + 1);
    
    for (let i = 1; i <= arrowCount; i++) {
      const arrowX = leftSupport.x + i * arrowSpacing;
      const normalizedX = i / (arrowCount + 1);
      const deflection = Math.sin(Math.PI * normalizedX) * deflectionAmount;
      const arrowY = leftSupport.y - beamHeight / 2 - deflection;
      
      // Calculate force direction
      const angle = isAnimating
        ? Math.atan2(
            (leftSupport.y - deflection) - leftSupport.y,
            arrowX - leftSupport.x
          )
        : -Math.PI / 2;
      
      drawForceArrow(ctx, arrowX, arrowY, angle, load / 10, '#ff5a5f', '#ff8c8f');
    }
  };
  
  const drawArch = (ctx, width, height, time, load) => {
    const scaleFactor = load / 50;
    const archWidth = width * 0.7;
    const archHeight = height * 0.2;
    const archX = width * 0.15;
    const archY = height * 0.6;
    
    // Support points
    const leftSupport = { x: archX, y: archY };
    const rightSupport = { x: archX + archWidth, y: archY };
    
    // Arch deflection
    const deflectionAmount = Math.sin(time) * scaleFactor * 0.05 * archHeight;
    
    // Draw supports
    ctx.fillStyle = '#2d3e50';
    
    // Left support
    ctx.beginPath();
    ctx.moveTo(leftSupport.x, leftSupport.y);
    ctx.lineTo(leftSupport.x - 20, leftSupport.y + 40);
    ctx.lineTo(leftSupport.x + 20, leftSupport.y + 40);
    ctx.closePath();
    ctx.fill();
    
    // Right support
    ctx.beginPath();
    ctx.moveTo(rightSupport.x, rightSupport.y);
    ctx.lineTo(rightSupport.x - 20, rightSupport.y + 40);
    ctx.lineTo(rightSupport.x + 20, rightSupport.y + 40);
    ctx.closePath();
    ctx.fill();
    
    // Draw arch
    ctx.beginPath();
    ctx.moveTo(leftSupport.x, leftSupport.y);
    
    // Arch curve with deflection
    const archThickness = height * 0.03;
    
    // Outer curve
    for (let x = 0; x <= archWidth; x++) {
      const normalizedX = x / archWidth;
      const baseY = leftSupport.y - Math.sin(Math.PI * normalizedX) * archHeight;
      
      // Add deflection based on load
      const deflection = Math.sin(Math.PI * normalizedX) * deflectionAmount;
      const y = baseY + deflection;
      
      ctx.lineTo(leftSupport.x + x, y);
    }
    
    // Inner curve (reverse direction)
    for (let x = archWidth; x >= 0; x--) {
      const normalizedX = x / archWidth;
      const baseY = leftSupport.y - Math.sin(Math.PI * normalizedX) * (archHeight - archThickness);
      
      // Add deflection based on load
      const deflection = Math.sin(Math.PI * normalizedX) * deflectionAmount;
      const y = baseY + deflection;
      
      ctx.lineTo(leftSupport.x + x, y);
    }
    
    ctx.closePath();
    
    // Gradient fill for arch
    const gradient = ctx.createLinearGradient(
      leftSupport.x,
      leftSupport.y - archHeight,
      leftSupport.x,
      leftSupport.y
    );
    gradient.addColorStop(0, '#1b4d5f');
    gradient.addColorStop(1, '#2d7d93');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw the load
    const loadX = archX + archWidth / 2;
    const normalizedMid = 0.5;
    const baseY = leftSupport.y - Math.sin(Math.PI * normalizedMid) * archHeight;
    const deflection = Math.sin(Math.PI * normalizedMid) * deflectionAmount;
    const loadY = baseY + deflection - 50;
    
    drawLoad(ctx, loadX, loadY, load);
    
    // Draw compression visualization
    drawCompressionArrows(ctx, leftSupport.x, rightSupport.x, leftSupport.y, baseY + deflection, load);
  };
  
  const drawTruss = (ctx, width, height, time, load) => {
    const scaleFactor = load / 50;
    const trussWidth = width * 0.7;
    const trussHeight = height * 0.2;
    const trussX = width * 0.15;
    const trussY = height * 0.6;
    
    // Support points
    const leftSupport = { x: trussX, y: trussY };
    const rightSupport = { x: trussX + trussWidth, y: trussY };
    
    // Truss deflection
    const deflectionAmount = Math.sin(time) * scaleFactor * 0.05 * trussHeight;
    
    // Draw supports
    ctx.fillStyle = '#2d3e50';
    
    // Left support
    ctx.beginPath();
    ctx.moveTo(leftSupport.x, leftSupport.y);
    ctx.lineTo(leftSupport.x - 20, leftSupport.y + 40);
    ctx.lineTo(leftSupport.x + 20, leftSupport.y + 40);
    ctx.closePath();
    ctx.fill();
    
    // Right support
    ctx.beginPath();
    ctx.moveTo(rightSupport.x, rightSupport.y);
    ctx.lineTo(rightSupport.x - 20, rightSupport.y + 40);
    ctx.lineTo(rightSupport.x + 20, rightSupport.y + 40);
    ctx.closePath();
    ctx.fill();
    
    // Calculate truss points
    const segments = 6;
    const segmentWidth = trussWidth / segments;
    const topPoints = [];
    const bottomPoints = [];
    
    // Bottom chord points (with slight deflection)
    for (let i = 0; i <= segments; i++) {
      const x = leftSupport.x + i * segmentWidth;
      const normalizedX = i / segments;
      const deflection = Math.sin(Math.PI * normalizedX) * deflectionAmount;
      const y = leftSupport.y + deflection;
      
      bottomPoints.push({ x, y });
    }
    
    // Top chord points
    for (let i = 0; i <= segments; i++) {
      const x = leftSupport.x + i * segmentWidth;
      const normalizedX = i / segments;
      const baseY = leftSupport.y - Math.sin(Math.PI * normalizedX) * trussHeight;
      const deflection = Math.sin(Math.PI * normalizedX) * deflectionAmount * 0.5;
      const y = baseY + deflection;
      
      topPoints.push({ x, y });
    }
    
    // Draw truss members
    ctx.lineWidth = 10;
    
    // Bottom chord
    ctx.strokeStyle = '#167053';
    ctx.beginPath();
    ctx.moveTo(bottomPoints[0].x, bottomPoints[0].y);
    
    for (let i = 1; i <= segments; i++) {
      ctx.lineTo(bottomPoints[i].x, bottomPoints[i].y);
    }
    
    ctx.stroke();
    
    // Top chord
    ctx.strokeStyle = '#167053';
    ctx.beginPath();
    ctx.moveTo(topPoints[0].x, topPoints[0].y);
    
    for (let i = 1; i <= segments; i++) {
      ctx.lineTo(topPoints[i].x, topPoints[i].y);
    }
    
    ctx.stroke();
    
    // Web members
    for (let i = 0; i <= segments; i++) {
      ctx.beginPath();
      
      // Vertical members
      if (i % 2 === 0) {
        ctx.strokeStyle = '#25a87d';
        ctx.moveTo(bottomPoints[i].x, bottomPoints[i].y);
        ctx.lineTo(topPoints[i].x, topPoints[i].y);
      }
      
      ctx.stroke();
    }
    
    // Diagonal members
    for (let i = 0; i < segments; i++) {
      ctx.beginPath();
      
      if (i % 2 === 0) {
        // Tension diagonals (light color)
        ctx.strokeStyle = '#25a87d';
        ctx.moveTo(bottomPoints[i].x, bottomPoints[i].y);
        ctx.lineTo(topPoints[i+1].x, topPoints[i+1].y);
      } else {
        // Compression diagonals (darker color)
        ctx.strokeStyle = '#167053';
        ctx.moveTo(topPoints[i].x, topPoints[i].y);
        ctx.lineTo(bottomPoints[i+1].x, bottomPoints[i+1].y);
      }
      
      ctx.stroke();
    }
    
    // Draw member force indicators
    ctx.lineWidth = 1;
    
    // Draw the load
    const loadX = trussX + trussWidth / 2;
    const loadPoint = topPoints[segments / 2];
    drawLoad(ctx, loadX, loadPoint.y - 50, load);
    
    // Draw tension and compression indicators
    for (let i = 0; i < segments; i++) {
      if (i % 2 === 0) {
        // Tension indicators
        drawTensionIndicator(ctx, bottomPoints[i].x, bottomPoints[i].y, topPoints[i + 1].x, topPoints[i + 1].y, load);
      } else {
        // Compression indicators
        drawCompressionIndicator(ctx, topPoints[i].x, topPoints[i].y, bottomPoints[i + 1].x, bottomPoints[i + 1].y, load);
      }
    }
  };
  
  const drawFrame = (ctx, width, height, time, load) => {
    const scaleFactor = load / 50;
    const frameWidth = width * 0.5;
    const frameHeight = height * 0.4;
    const frameX = width * 0.25;
    const frameY = height * 0.6;
    
    // Frame deflection
    const horizontalDeflection = Math.sin(time) * scaleFactor * 0.05 * frameWidth;
    const verticalDeflection = Math.sin(time) * scaleFactor * 0.02 * frameHeight;
    
    // Calculate frame points
    const bottomLeft = { x: frameX, y: frameY };
    const bottomRight = { x: frameX + frameWidth, y: frameY };
    const topLeft = { 
      x: frameX + horizontalDeflection, 
      y: frameY - frameHeight + verticalDeflection
    };
    const topRight = { 
      x: frameX + frameWidth + horizontalDeflection, 
      y: frameY - frameHeight + verticalDeflection
    };
    
    // Draw frame base
    ctx.fillStyle = '#2d3e50';
    
    // Left base
    ctx.beginPath();
    ctx.moveTo(bottomLeft.x, bottomLeft.y);
    ctx.lineTo(bottomLeft.x - 20, bottomLeft.y + 20);
    ctx.lineTo(bottomLeft.x + 20, bottomLeft.y + 20);
    ctx.closePath();
    ctx.fill();
    
    // Right base
    ctx.beginPath();
    ctx.moveTo(bottomRight.x, bottomRight.y);
    ctx.lineTo(bottomRight.x - 20, bottomRight.y + 20);
    ctx.lineTo(bottomRight.x + 20, bottomRight.y + 20);
    ctx.closePath();
    ctx.fill();
    
    // Draw columns
    const columnWidth = width * 0.03;
    
    // Left column
    ctx.beginPath();
    ctx.moveTo(bottomLeft.x - columnWidth / 2, bottomLeft.y);
    ctx.lineTo(topLeft.x - columnWidth / 2, topLeft.y);
    ctx.lineTo(topLeft.x + columnWidth / 2, topLeft.y);
    ctx.lineTo(bottomLeft.x + columnWidth / 2, bottomLeft.y);
    ctx.closePath();
    
    const leftColumnGradient = ctx.createLinearGradient(
      bottomLeft.x - columnWidth / 2,
      bottomLeft.y,
      bottomLeft.x + columnWidth / 2,
      bottomLeft.y
    );
    leftColumnGradient.addColorStop(0, '#b06543');
    leftColumnGradient.addColorStop(1, '#dd8f6e');
    ctx.fillStyle = leftColumnGradient;
    ctx.fill();
    
    // Right column
    ctx.beginPath();
    ctx.moveTo(bottomRight.x - columnWidth / 2, bottomRight.y);
    ctx.lineTo(topRight.x - columnWidth / 2, topRight.y);
    ctx.lineTo(topRight.x + columnWidth / 2, topRight.y);
    ctx.lineTo(bottomRight.x + columnWidth / 2, bottomRight.y);
    ctx.closePath();
    
    const rightColumnGradient = ctx.createLinearGradient(
      bottomRight.x - columnWidth / 2,
      bottomRight.y,
      bottomRight.x + columnWidth / 2,
      bottomRight.y
    );
    rightColumnGradient.addColorStop(0, '#b06543');
    rightColumnGradient.addColorStop(1, '#dd8f6e');
    ctx.fillStyle = rightColumnGradient;
    ctx.fill();
    
    // Draw beam
    const beamHeight = height * 0.04;
    
    ctx.beginPath();
    ctx.moveTo(topLeft.x, topLeft.y);
    ctx.lineTo(topRight.x, topRight.y);
    ctx.lineTo(topRight.x, topRight.y + beamHeight);
    ctx.lineTo(topLeft.x, topLeft.y + beamHeight);
    ctx.closePath();
    
    const beamGradient = ctx.createLinearGradient(
      topLeft.x,
      topLeft.y,
      topLeft.x,
      topLeft.y + beamHeight
    );
    beamGradient.addColorStop(0, '#b06543');
    beamGradient.addColorStop(1, '#dd8f6e');
    ctx.fillStyle = beamGradient;
    ctx.fill();
    
    // Draw the load
    const loadX = frameX + frameWidth / 2;
    const loadY = topLeft.y - 50;
    drawLoad(ctx, loadX, loadY, load);
    
    // Draw moment diagrams at the joints
    drawMomentDiagram(ctx, bottomLeft.x, bottomLeft.y, 'left', load);
    drawMomentDiagram(ctx, bottomRight.x, bottomRight.y, 'right', load);
    
    // Draw deformation indicators
    drawDeformationIndicator(ctx, frameX, frameY - frameHeight / 2, horizontalDeflection, load);
  };
  
  // Helper functions for visualization elements
  const drawStressGradient = (ctx, x, y, width, height, time, load) => {
    // Draw stress gradient overlay
    ctx.globalAlpha = 0.6;
    
    const gradient = ctx.createLinearGradient(x, y, x, y + height);
    gradient.addColorStop(0, '#ff5a5f'); // High stress (top)
    gradient.addColorStop(0.5, '#ffffff'); // Neutral axis
    gradient.addColorStop(1, '#00b8a9'); // Low stress (bottom)
    
    ctx.fillStyle = gradient;
    
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();
    
    ctx.globalAlpha = 1.0;
  };
  
  const drawLoad = (ctx, x, y, load) => {
    const loadWidth = 60;
    const loadHeight = 30;
    
    // Draw load arrow
    ctx.fillStyle = '#ff5a5f';
    
    ctx.beginPath();
    ctx.moveTo(x - loadWidth / 2, y);
    ctx.lineTo(x + loadWidth / 2, y);
    ctx.lineTo(x + loadWidth / 2, y + loadHeight);
    ctx.lineTo(x + 10, y + loadHeight);
    ctx.lineTo(x, y + loadHeight + 20);
    ctx.lineTo(x - 10, y + loadHeight);
    ctx.lineTo(x - loadWidth / 2, y + loadHeight);
    ctx.closePath();
    ctx.fill();
    
    // Draw load text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${load} kN`, x, y + loadHeight / 2);
  };
  
  const drawForceArrow = (ctx, x, y, angle, size, startColor, endColor) => {
    const arrowLength = 20 * (size / 10);
    
    // Calculate end point
    const endX = x + Math.cos(angle) * arrowLength;
    const endY = y + Math.sin(angle) * arrowLength;
    
    // Draw arrow line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    
    // Create gradient
    const gradient = ctx.createLinearGradient(x, y, endX, endY);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw arrowhead
    const headSize = 5 * (size / 10);
    const headAngle = 0.5;
    
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - headSize * Math.cos(angle - headAngle),
      endY - headSize * Math.sin(angle - headAngle)
    );
    ctx.lineTo(
      endX - headSize * Math.cos(angle + headAngle),
      endY - headSize * Math.sin(angle + headAngle)
    );
    ctx.closePath();
    
    ctx.fillStyle = endColor;
    ctx.fill();
  };
  
  const drawCompressionArrows = (ctx, startX, endX, baseY, topY, load) => {
    const arrowCount = 5;
    const arrowSpacing = (endX - startX) / (arrowCount + 1);
    const size = load / 10;
    
    // Left to center arrows
    for (let i = 1; i <= arrowCount / 2; i++) {
      const x = startX + i * arrowSpacing;
      const y = baseY - (topY - baseY) * (i / (arrowCount + 1));
      
      const angle = 0; // Right pointing
      drawForceArrow(ctx, x, y, angle, size, '#00b8a9', '#167053');
    }
    
    // Right to center arrows
    for (let i = arrowCount / 2 + 1; i <= arrowCount; i++) {
      const x = startX + i * arrowSpacing;
      const y = baseY - (topY - baseY) * ((arrowCount + 1 - i) / (arrowCount + 1));
      
      const angle = Math.PI; // Left pointing
      drawForceArrow(ctx, x, y, angle, size, '#00b8a9', '#167053');
    }
  };
  
  const drawTensionIndicator = (ctx, x1, y1, x2, y2, load) => {
    ctx.save();
    
    // Calculate midpoint and direction
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const normalX = -dy / length;
    const normalY = dx / length;
    
    // Draw tension indicator (double arrow pointing outward)
    const arrowOffset = 15;
    const arrowSize = load / 20;
    
    drawForceArrow(
      ctx,
      midX + normalX * arrowOffset,
      midY + normalY * arrowOffset,
      Math.atan2(normalY, normalX),
      arrowSize,
      '#ff5a5f',
      '#ff8c8f'
    );
    
    drawForceArrow(
      ctx,
      midX - normalX * arrowOffset,
      midY - normalY * arrowOffset,
      Math.atan2(-normalY, -normalX),
      arrowSize,
      '#ff5a5f',
      '#ff8c8f'
    );
    
    ctx.restore();
  };
  
  const drawCompressionIndicator = (ctx, x1, y1, x2, y2, load) => {
    ctx.save();
    
    // Calculate midpoint and direction
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const normalX = -dy / length;
    const normalY = dx / length;
    
    // Draw compression indicator (double arrow pointing inward)
    const arrowOffset = 15;
    const arrowSize = load / 20;
    
    drawForceArrow(
      ctx,
      midX + normalX * arrowOffset,
      midY + normalY * arrowOffset,
      Math.atan2(-normalY, -normalX),
      arrowSize,
      '#00b8a9',
      '#167053'
    );
    
    drawForceArrow(
      ctx,
      midX - normalX * arrowOffset,
      midY - normalY * arrowOffset,
      Math.atan2(normalY, normalX),
      arrowSize,
      '#00b8a9',
      '#167053'
    );
    
    ctx.restore();
  };
  
  const drawMomentDiagram = (ctx, x, y, side, load) => {
    const size = load / 2;
    const direction = side === 'left' ? 1 : -1;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.strokeStyle = '#ff5a5f';
    ctx.lineWidth = 2;
        ctx.stroke;
    ctx.fillStyle = '#ff5a5f';
    ctx.fill();


    // Draw moment arrow
    const arrowLength = 20 * (size / 10);
    const arrowAngle = Math.PI / 4 * direction;
    const arrowX = x + Math.cos(arrowAngle) * arrowLength;
    const arrowY = y + Math.sin(arrowAngle) * arrowLength;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = '#ff5a5f';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = '#ff5a5f';
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(
        arrowX - 10 * Math.cos(arrowAngle - Math.PI / 6),
        arrowY - 10 * Math.sin(arrowAngle - Math.PI / 6)
    );
    ctx.lineTo(
        arrowX - 10 * Math.cos(arrowAngle + Math.PI / 6),
        arrowY - 10 * Math.sin(arrowAngle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  };

    const drawDeformationIndicator = (ctx, x, y, deflection, load) => {
        ctx.save();
        
        // Draw deformation arrow
        const arrowLength = 20 * (load / 10);
        const arrowX = x + deflection;
        const arrowY = y - arrowLength;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(arrowX, arrowY);
        ctx.strokeStyle = '#ff5a5f';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrowhead
        const headSize = 5 * (load / 10);
        const headAngle = Math.PI / 6;
        
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(
        arrowX - headSize * Math.cos(headAngle),
        arrowY - headSize * Math.sin(headAngle)
        );
        ctx.lineTo(
        arrowX - headSize * Math.cos(-headAngle),
        arrowY - headSize * Math.sin(-headAngle)
        );
        ctx.closePath();
        
        ctx.fillStyle = '#ff5a5f';
        ctx.fill();
        
        ctx.restore();
    };

    // Handle structure change
    const handleStructureChange = (structure) => {
        setActiveStructure(structure.id);
        setLoadAmount(50); // Reset load amount when changing structure
    }

    // Handle load amount change
    const handleLoadChange = (event) => {
        setLoadAmount(event.target.value);
    }

    // Handle animation toggle
    const handleAnimationToggle = () => {
        setIsAnimating(!isAnimating);
    }

    
    return (
        <div className="structural-stress-visual">
            <canvas ref={canvasRef} className="canvas" />
            <div className="controls">
                <h2>Structural Stress Visualization</h2>
                <div className="structure-selector">
                    {structures.map((structure) => (
                        <button
                            key={structure.id}
                            className={`structure-button ${activeStructure === structure.id ? 'active' : ''}`}
                            onClick={() => handleStructureChange(structure)}
                        >
                            {structure.name}
                        </button>
                    ))}
                </div>
                <div className="load-control">
                    <label htmlFor="load">Load Amount (kN):</label>
                    <input
                        type="range"
                        id="load"
                        min="0"
                        max="100"
                        value={loadAmount}
                        onChange={handleLoadChange}
                    />
                    <span>{loadAmount} kN</span>
                </div>
                <button onClick={handleAnimationToggle}>
                    {isAnimating ? 'Stop Animation' : 'Start Animation'}
                </button>
            </div>
        </div>
    );
}