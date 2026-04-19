import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EnvironmentalResponse.css';

const EnvironmentalResponse = () => {
  const [activeFactor, setActiveFactor] = useState('sunlight');
  const [timeOfDay, setTimeOfDay] = useState(12);
  const [season, setSeason] = useState('summer');
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  const environmentalFactors = [
    {
      id: 'sunlight',
      name: 'Sunlight Path',
      description: 'Visualization of how buildings can be designed to optimize natural daylight'
    },
    {
      id: 'airflow',
      name: 'Airflow Patterns',
      description: 'Demonstration of natural ventilation strategies in architectural design'
    },
    {
      id: 'thermal',
      name: 'Thermal Gradients',
      description: 'Heat flow and thermal regulation in building envelopes'
    },
    {
      id: 'weather',
      name: 'Weather Adaptation',
      description: 'How building systems respond to changing weather conditions'
    }
  ];
  
  const seasons = [
    { id: 'winter', name: 'Winter' },
    { id: 'spring', name: 'Spring' },
    { id: 'summer', name: 'Summer' },
    { id: 'autumn', name: 'Autumn' }
  ];
  
  // Canvas animation setup
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw based on active environmental factor
      switch (activeFactor) {
        case 'sunlight':
          drawSunlightPath(ctx, canvas.width, canvas.height, timeOfDay, season, time);
          break;
        case 'airflow':
          drawAirflowPatterns(ctx, canvas.width, canvas.height, timeOfDay, season, time);
          break;
        case 'thermal':
          drawThermalGradients(ctx, canvas.width, canvas.height, timeOfDay, season, time);
          break;
        case 'weather':
          drawWeatherAdaptation(ctx, canvas.width, canvas.height, timeOfDay, season, time);
          break;
        default:
          drawSunlightPath(ctx, canvas.width, canvas.height, timeOfDay, season, time);
      }
      
      time += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationRef.current);
    };
  }, [activeFactor, timeOfDay, season]);
  
  // Drawing functions for environmental factors
  const drawSunlightPath = (ctx, width, height, timeOfDay, season, time) => {
    // Base building
    drawBuilding(ctx, width, height);
    
    // Calculate sun position based on time of day and season
    const sunRadius = 30;
    const orbitRadiusX = width * 0.4;
    const orbitRadiusY = height * 0.3;
    const orbitCenterX = width / 2;
    const orbitCenterY = height * 0.5;
    
    // Adjust orbit based on season
    let seasonFactor = 0;
    switch(season) {
      case 'winter':
        seasonFactor = -0.2;
        break;
      case 'spring':
        seasonFactor = -0.1;
        break;
      case 'summer':
        seasonFactor = 0;
        break;
      case 'autumn':
        seasonFactor = -0.1;
        break;
      default:
        seasonFactor = 0;
    }
    
    // Calculate angle based on time of day (0-24 hours)
    const angle = (((timeOfDay / 24) * Math.PI) + Math.PI) % (Math.PI * 2);
    
    // Calculate sun position
    const sunX = orbitCenterX + Math.cos(angle) * orbitRadiusX;
    const sunY = orbitCenterY + (Math.sin(angle) * orbitRadiusY * (1 + seasonFactor));
    
    // Draw sun
    const gradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
    gradient.addColorStop(0, '#fff176');
    gradient.addColorStop(0.7, '#ffb74d');
    gradient.addColorStop(1, '#ff9800');
    
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add glow effect
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius * 1.5, 0, Math.PI * 2);
    const glowGradient = ctx.createRadialGradient(sunX, sunY, sunRadius, sunX, sunY, sunRadius * 1.5);
    glowGradient.addColorStop(0, 'rgba(255, 152, 0, 0.5)');
    glowGradient.addColorStop(1, 'rgba(255, 152, 0, 0)');
    ctx.fillStyle = glowGradient;
    ctx.fill();
    
    // Draw sun rays hitting the building
    drawSunRays(ctx, sunX, sunY, width, height, timeOfDay, season, time);
    
    // Draw shadows
    drawShadows(ctx, sunX, sunY, width, height, timeOfDay, season);
    
    // Draw sun path
    ctx.beginPath();
    ctx.ellipse(orbitCenterX, orbitCenterY, orbitRadiusX, orbitRadiusY * (1 + seasonFactor), 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 152, 0, 0.3)';
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw time markers
    for (let i = 0; i < 24; i += 3) {
      const markerAngle = (((i / 24) * Math.PI) + Math.PI) % (Math.PI * 2);
      const markerX = orbitCenterX + Math.cos(markerAngle) * orbitRadiusX;
      const markerY = orbitCenterY + (Math.sin(markerAngle) * orbitRadiusY * (1 + seasonFactor));
      
      ctx.beginPath();
      ctx.arc(markerX, markerY, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
      
      // Add time labels for key hours
      if (i % 6 === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${i}:00`, markerX, markerY - 15);
      }
    }
    
    // Add legend
    drawLegend(ctx, width, height, 'sunlight', timeOfDay, season);
  };
  
  const drawAirflowPatterns = (ctx, width, height, timeOfDay, season, time) => {
    // Base building
    drawBuilding(ctx, width, height);
    
    // Set up variables for airflow
    const buildingCenterX = width / 2;
    const buildingCenterY = height / 2 + 20;
    const buildingWidth = width * 0.4;
    const buildingHeight = height * 0.3;
    
    // Adjust airflow based on time of day and season
    let windStrength = 0.5;
    let windDirection = 0; // Radians (0 = from right)
    
    // Time of day affects wind strength
    windStrength = 0.2 + (Math.sin((timeOfDay / 12) * Math.PI) * 0.3);
    
    // Season affects wind direction and strength
    switch(season) {
      case 'winter':
        windDirection = Math.PI * 1.75; // From top-left
        windStrength *= 1.5;
        break;
      case 'spring':
        windDirection = Math.PI; // From left
        windStrength *= 1.2;
        break;
      case 'summer':
        windDirection = Math.PI * 0.5; // From top
        windStrength *= 0.8;
        break;
      case 'autumn':
        windDirection = Math.PI * 1.5; // From bottom
        windStrength *= 1.3;
        break;
      default:
        windDirection = 0;
    }
    
    // Create airflow particles
    const particleCount = 100;
    const particles = [];
    
    // Initialize particles if not already done
    if (particles.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        // Random position around the building
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 200;
        
        particles.push({
          x: buildingCenterX + Math.cos(angle) * distance,
          y: buildingCenterY + Math.sin(angle) * distance,
          size: 1 + Math.random() * 2,
          speed: 0.5 + Math.random() * 2,
          angle: 0,
          opacity: 0.3 + Math.random() * 0.7
        });
      }
    }
    
    // Draw airflow particles
    for (let i = 0; i < particleCount; i++) {
      // Calculate new particle position based on building influence and wind
      const particleX = buildingCenterX + 
        (buildingWidth * 1.5) * Math.cos(i / particleCount * Math.PI * 2 + time * 0.5);
      const particleY = buildingCenterY + 
        (buildingHeight * 1.5) * Math.sin(i / particleCount * Math.PI * 2 + time * 0.5);
      
      // Calculate particle trail
      const trailLength = 20 * windStrength;
      const trailEndX = particleX - Math.cos(windDirection) * trailLength;
      const trailEndY = particleY - Math.sin(windDirection) * trailLength;
      
      // Draw particle trail
      ctx.beginPath();
      ctx.moveTo(particleX, particleY);
      ctx.lineTo(trailEndX, trailEndY);
      
      const strokeGradient = ctx.createLinearGradient(
        particleX, particleY, trailEndX, trailEndY
      );
      strokeGradient.addColorStop(0, 'rgba(173, 216, 230, 0.8)');
      strokeGradient.addColorStop(1, 'rgba(173, 216, 230, 0)');
      
      ctx.strokeStyle = strokeGradient;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // Draw particle head
      ctx.beginPath();
      ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(173, 216, 230, 0.8)';
      ctx.fill();
    }
    
    // Draw arrows to indicate airflow direction
    drawAirflowArrows(ctx, width, height, windDirection, windStrength, time);
    
    // Draw legend
    drawLegend(ctx, width, height, 'airflow', timeOfDay, season);
  };
  
  const drawThermalGradients = (ctx, width, height, timeOfDay, season, time) => {
    // Base building
    drawBuilding(ctx, width, height);
    
    // Building dimensions
    const buildingCenterX = width / 2;
    const buildingCenterY = height / 2 + 20;
    const buildingWidth = width * 0.4;
    const buildingHeight = height * 0.3;
    const wallThickness = 20;
    
    // Calculate exterior temperature based on time of day and season
    let exteriorTemp = 0; // scale of -20 to 40 (Celsius)
    
    // Base temperature by season
    switch(season) {
      case 'winter':
        exteriorTemp = -10;
        break;
      case 'spring':
        exteriorTemp = 15;
        break;
      case 'summer':
        exteriorTemp = 30;
        break;
      case 'autumn':
        exteriorTemp = 10;
        break;
      default:
        exteriorTemp = 20;
    }
    
    // Time of day adjustment
    const timeAdjustment = Math.sin((timeOfDay / 24) * Math.PI * 2) * 10;
    exteriorTemp += timeAdjustment;
    
    // Interior temperature (constant comfortable temperature)
    const interiorTemp = 22;
    
    // Draw thermal gradient through wall
    drawThermalWall(
      ctx, 
      buildingCenterX - buildingWidth/2, 
      buildingCenterY - buildingHeight/2, 
      wallThickness, 
      buildingHeight, 
      exteriorTemp, 
      interiorTemp,
      time
    );
    
    // Draw heat flow arrows
    drawHeatFlowArrows(
      ctx, 
      buildingCenterX - buildingWidth/2, 
      buildingCenterY - buildingHeight/2, 
      wallThickness, 
      buildingHeight, 
      exteriorTemp, 
      interiorTemp,
      time
    );
    
    // Draw temperature labels
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Exterior temperature
    ctx.fillStyle = exteriorTemp > 20 ? '#ff5a5f' : '#4a90e2';
    ctx.fillText(
      `${exteriorTemp.toFixed(1)}°C`, 
      buildingCenterX - buildingWidth/2 - 30, 
      buildingCenterY
    );
    
    // Interior temperature
    ctx.fillStyle = '#4CAF50';
    ctx.fillText(
      `${interiorTemp.toFixed(1)}°C`, 
      buildingCenterX - buildingWidth/2 + wallThickness + 30, 
      buildingCenterY
    );
    
    // Draw legend
    drawLegend(ctx, width, height, 'thermal', timeOfDay, season);
  };
  
  const drawWeatherAdaptation = (ctx, width, height, timeOfDay, season, time) => {
    // Base building
    drawBuilding(ctx, width, height);
    
    // Building dimensions
    const buildingCenterX = width / 2;
    const buildingCenterY = height / 2 + 20;
    const buildingWidth = width * 0.4;
    const buildingHeight = height * 0.3;
    
    // Determine weather conditions based on season and time
    let weatherType = 'sunny';
    let precipitationIntensity = 0;
    let cloudCover = 0;
    let windIntensity = 0;
    
    switch(season) {
      case 'winter':
        cloudCover = 0.8;
        precipitationIntensity = timeOfDay > 8 && timeOfDay < 16 ? 0.6 : 0.3;
        weatherType = 'snow';
        windIntensity = 0.7;
        break;
      case 'spring':
        cloudCover = timeOfDay > 12 ? 0.6 : 0.3;
        precipitationIntensity = timeOfDay > 14 ? 0.7 : 0;
        weatherType = 'rain';
        windIntensity = 0.5;
        break;
      case 'summer':
        cloudCover = timeOfDay > 15 ? 0.4 : 0.1;
        precipitationIntensity = timeOfDay > 16 ? 0.3 : 0;
        weatherType = 'rain';
        windIntensity = 0.3;
        break;
      case 'autumn':
        cloudCover = 0.7;
        precipitationIntensity = timeOfDay > 10 && timeOfDay < 18 ? 0.8 : 0.4;
        weatherType = 'rain';
        windIntensity = 0.6;
        break;
      default:
        cloudCover = 0.2;
        precipitationIntensity = 0;
        weatherType = 'sunny';
        windIntensity = 0.2;
    }
    
    // Draw weather elements
    drawClouds(ctx, width, height, cloudCover, time);
    
    if (precipitationIntensity > 0) {
      if (weatherType === 'rain') {
        drawRain(ctx, width, height, precipitationIntensity, time);
      } else if (weatherType === 'snow') {
        drawSnow(ctx, width, height, precipitationIntensity, time);
      }
    }
    
    // Draw building response to weather
    drawWeatherResponse(ctx, width, height, weatherType, time, season, timeOfDay);
    
    // Draw legend
    drawLegend(ctx, width, height, 'weather', timeOfDay, season);
  };
  
  // Helper functions for drawing
  const drawBuilding = (ctx, width, height) => {
    const buildingCenterX = width / 2;
    const buildingCenterY = height / 2 + 20;
    const buildingWidth = width * 0.4;
    const buildingHeight = height * 0.3;
    
    // Draw building exterior
    ctx.fillStyle = '#2d3e50';
    ctx.strokeStyle = '#1a2a3a';
    ctx.lineWidth = 2;
    
    // Main structure
    ctx.beginPath();
    ctx.rect(
      buildingCenterX - buildingWidth/2, 
      buildingCenterY - buildingHeight/2, 
      buildingWidth, 
      buildingHeight
    );
    ctx.fill();
    ctx.stroke();
    
    // Roof
    ctx.beginPath();
    ctx.moveTo(buildingCenterX - buildingWidth/2 - 20, buildingCenterY - buildingHeight/2);
    ctx.lineTo(buildingCenterX, buildingCenterY - buildingHeight/2 - 30);
    ctx.lineTo(buildingCenterX + buildingWidth/2 + 20, buildingCenterY - buildingHeight/2);
    ctx.closePath();
    ctx.fillStyle = '#1a2a3a';
    ctx.fill();
    ctx.stroke();
    
    // Windows
    const windowRows = 2;
    const windowCols = 3;
    const windowWidth = buildingWidth / (windowCols + 1) / 1.5;
    const windowHeight = buildingHeight / (windowRows + 1) / 1.5;
    
    ctx.fillStyle = '#88bfd4';
    
    for (let row = 0; row < windowRows; row++) {
      for (let col = 0; col < windowCols; col++) {
        ctx.beginPath();
        ctx.rect(
          buildingCenterX - buildingWidth/2 + (col + 1) * (buildingWidth / (windowCols + 1)) - windowWidth/2,
          buildingCenterY - buildingHeight/2 + (row + 1) * (buildingHeight / (windowRows + 1)) - windowHeight/2,
          windowWidth,
          windowHeight
        );
        ctx.fill();
        ctx.stroke();
      }
    }
    
    // Door
    ctx.beginPath();
    ctx.rect(
      buildingCenterX - 15,
      buildingCenterY + buildingHeight/2 - 30,
      30,
      30
    );
    ctx.fillStyle = '#4d5e6f';
    ctx.fill();
    ctx.stroke();
  };
  
  const drawSunRays = (ctx, sunX, sunY, width, height, timeOfDay, season, time) => {
    const buildingCenterX = width / 2;
    const buildingCenterY = height / 2 + 20;
    const buildingWidth = width * 0.4;
    const buildingHeight = height * 0.3;
    
    // Calculate window positions
    const windowRows = 2;
    const windowCols = 3;
    const windowWidth = buildingWidth / (windowCols + 1) / 1.5;
    const windowHeight = buildingHeight / (windowRows + 1) / 1.5;
    
    const windows = [];
    for (let row = 0; row < windowRows; row++) {
      for (let col = 0; col < windowCols; col++) {
        windows.push({
          x: buildingCenterX - buildingWidth/2 + (col + 1) * (buildingWidth / (windowCols + 1)),
          y: buildingCenterY - buildingHeight/2 + (row + 1) * (buildingHeight / (windowRows + 1)),
          width: windowWidth,
          height: windowHeight
        });
      }
    }
    
    // Draw sun rays entering windows
    ctx.globalAlpha = 0.3;
    
    windows.forEach(window => {
      // Only draw sun rays for windows facing the sun
      if ((sunX > buildingCenterX && window.x > buildingCenterX) || 
          (sunX < buildingCenterX && window.x < buildingCenterX) ||
          (sunY < buildingCenterY && timeOfDay > 10 && timeOfDay < 14)) {
        
        // Create ray gradient
        const gradient = ctx.createLinearGradient(
          sunX, sunY, window.x, window.y
        );
        gradient.addColorStop(0, 'rgba(255, 214, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 214, 0, 0)');
        
        // Draw ray
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(window.x - window.width/2, window.y - window.height/2);
        ctx.lineTo(window.x + window.width/2, window.y - window.height/2);
        ctx.lineTo(window.x + window.width/2, window.y + window.height/2);
        ctx.lineTo(window.x - window.width/2, window.y + window.height/2);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw illumination inside the building
        const insideGradient = ctx.createRadialGradient(
          window.x, window.y, 0,
          window.x, window.y, window.width
        );
        insideGradient.addColorStop(0, 'rgba(255, 214, 0, 0.15)');
        insideGradient.addColorStop(1, 'rgba(255, 214, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(window.x, window.y, window.width, 0, Math.PI * 2);
        ctx.fillStyle = insideGradient;
        ctx.fill();
      }
    });
    
    ctx.globalAlpha = 1;
  };
  
  const drawShadows = (ctx, sunX, sunY, width, height, timeOfDay, season) => {
    const buildingCenterX = width / 2;
    const buildingCenterY = height / 2 + 20;
    const buildingWidth = width * 0.4;
    const buildingHeight = height * 0.3;
    
    // Calculate shadow direction based on sun position
    const shadowDirectionX = buildingCenterX - sunX;
    const shadowDirectionY = buildingCenterY - sunY;
    
    // Calculate shadow length based on sun height (shorter at noon, longer at sunrise/sunset)
    const baseLength = 100;
    let shadowLength = baseLength;
    
    // Adjust by time of day
    if (timeOfDay < 8 || timeOfDay > 16) {
      shadowLength *= 3;
    } else if (timeOfDay < 10 || timeOfDay > 14) {
      shadowLength *= 2;
    }
    
    // Adjust by season
    switch(season) {
      case 'winter':
        shadowLength *= 2;
        break;
      case 'summer':
        shadowLength *= 0.7;
        break;
      default:
        // No adjustment for spring/autumn
    }
    
    // Normalize direction vector
    const directionMagnitude = Math.sqrt(shadowDirectionX * shadowDirectionX + shadowDirectionY * shadowDirectionY);
    const normalizedDirectionX = shadowDirectionX / directionMagnitude;
    const normalizedDirectionY = shadowDirectionY / directionMagnitude;
    
    // Calculate shadow points
    const shadowEndX = normalizedDirectionX * shadowLength;
    const shadowEndY = normalizedDirectionY * shadowLength;
    
    // Draw building shadow
    ctx.beginPath();
    
    // Bottom corners of the building
    const bottomLeftX = buildingCenterX - buildingWidth/2;
    const bottomLeftY = buildingCenterY + buildingHeight/2;
    const bottomRightX = buildingCenterX + buildingWidth/2;
    const bottomRightY = buildingCenterY + buildingHeight/2;
    
    // Roof points
    const roofLeftX = buildingCenterX - buildingWidth/2 - 20;
    const roofLeftY = buildingCenterY - buildingHeight/2;
    const roofPeakX = buildingCenterX;
    const roofPeakY = buildingCenterY - buildingHeight/2 - 30;
    const roofRightX = buildingCenterX + buildingWidth/2 + 20;
    const roofRightY = buildingCenterY - buildingHeight/2;
    
    // Only draw shadow when sun is above horizon
    if (sunY < buildingCenterY) {
      ctx.moveTo(bottomLeftX, bottomLeftY);
      ctx.lineTo(bottomLeftX + shadowEndX, bottomLeftY + shadowEndY);
      ctx.lineTo(bottomRightX + shadowEndX, bottomRightY + shadowEndY);
      ctx.lineTo(bottomRightX, bottomRightY);
      ctx.closePath();
      
      // Shadow gradient
      const shadowGradient = ctx.createLinearGradient(
        buildingCenterX, buildingCenterY,
        buildingCenterX + shadowEndX, buildingCenterY + shadowEndY
      );
      shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = shadowGradient;
      ctx.fill();
      
      // Roof shadow
      ctx.beginPath();
      ctx.moveTo(roofLeftX, roofLeftY);
      ctx.lineTo(roofLeftX + shadowEndX, roofLeftY + shadowEndY);
      ctx.lineTo(roofPeakX + shadowEndX, roofPeakY + shadowEndY);
      ctx.lineTo(roofRightX + shadowEndX, roofRightY + shadowEndY);
      ctx.lineTo(roofRightX, roofRightY);
      ctx.lineTo(roofPeakX, roofPeakY);
      ctx.closePath();
      
      ctx.fillStyle = shadowGradient;
      ctx.fill();
    }
  };
  
  const drawAirflowArrows = (ctx, width, height, windDirection, windStrength, time) => {
    const buildingCenterX = width / 2;
    const buildingCenterY = height / 2 + 20;
    const buildingWidth = width * 0.4;
    const buildingHeight = height * 0.3;
    
    // Draw main wind direction arrow
    const arrowLength = 50 * windStrength;
    const arrowX = buildingCenterX - buildingWidth * 0.8;
    const arrowY = buildingCenterY - buildingHeight * 0.8;
    
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(arrowX + Math.cos(windDirection) * arrowLength, arrowY + Math.sin(windDirection) * arrowLength);
    
    // Arrowhead
    const headSize = 10 * windStrength;
    const headAngle = 0.5;
    
    const arrowEndX = arrowX + Math.cos(windDirection) * arrowLength;
    const arrowEndY = arrowY + Math.sin(windDirection) * arrowLength;
    
    ctx.lineTo(
      arrowEndX - headSize * Math.cos(windDirection - headAngle),
      arrowEndY - headSize * Math.sin(windDirection - headAngle)
    );
    ctx.moveTo(arrowEndX, arrowEndY);
    ctx.lineTo(
      arrowEndX - headSize * Math.cos(windDirection + headAngle),
      arrowEndY - headSize * Math.sin(windDirection + headAngle)
    );
    
    ctx.strokeStyle = '#4a90e2';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw "Wind" label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Wind', arrowX - 30, arrowY - 10);
    
    // Draw wind strength indicator
    ctx.fillText(
      `Strength: ${(windStrength * 100).toFixed(0)}%`,
      arrowX - 30, arrowY + 10
    );
  }

    const drawThermalWall = (ctx, x, y, width, height, exteriorTemp, interiorTemp, time) => {
        // Draw wall
        ctx.fillStyle = '#2d3e50';
        ctx.fillRect(x, y, width, height);
        
        // Draw temperature gradient
        const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
        gradient.addColorStop(0, `rgba(255, 0, 0, ${Math.abs(exteriorTemp) / 40})`);
        gradient.addColorStop(1, `rgba(0, 0, 255, ${Math.abs(interiorTemp) / 40})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x + width / 2 - width / 4, y + height / 2 - height / 4, width / 2, height / 2);
    };

    const drawHeatFlowArrows = (ctx, x, y, width, height, exteriorTemp, interiorTemp, time) => {
        // Draw heat flow arrows
        const arrowCount = 5;
        const arrowLength = 20;
        const arrowWidth = 5;
        
        for (let i = 0; i < arrowCount; i++) {
            const angle = Math.PI / 2 + (i * Math.PI) / (arrowCount - 1);
            const startX = x + width / 2 + Math.cos(angle) * (width / 4);
            const startY = y + height / 2 + Math.sin(angle) * (height / 4);
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + Math.cos(angle) * arrowLength, startY + Math.sin(angle) * arrowLength);
            
            // Arrowhead
            ctx.lineTo(
                startX + Math.cos(angle - Math.PI / 6) * arrowWidth,
                startY + Math.sin(angle - Math.PI / 6) * arrowWidth
            );
            ctx.moveTo(startX + Math.cos(angle) * arrowLength, startY + Math.sin(angle) * arrowLength);
            ctx.lineTo(
                startX + Math.cos(angle + Math.PI / 6) * arrowWidth,
                startY + Math.sin(angle + Math.PI / 6) * arrowWidth
            );
            
            ctx.strokeStyle = '#ff9800';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    };

    const drawClouds = (ctx, width, height, cloudCover, time) => {
        const cloudCount = Math.floor(cloudCover * 10);
        const cloudColor = 'rgba(255, 255, 255, 0.8)';
        
        for (let i = 0; i < cloudCount; i++) {
            const cloudX = Math.random() * width;
            const cloudY = Math.random() * height / 2;
            const cloudWidth = Math.random() * 100 + 50;
            const cloudHeight = Math.random() * 30 + 20;
            
            ctx.fillStyle = cloudColor;
            ctx.beginPath();
            ctx.ellipse(cloudX, cloudY, cloudWidth, cloudHeight, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const drawRain = (ctx, width, height, intensity, time) => {
        const dropCount = Math.floor(intensity * 100);
        const dropColor = 'rgba(0, 0, 255, 0.5)';
        
        for (let i = 0; i < dropCount; i++) {
            const dropX = Math.random() * width;
            const dropY = Math.random() * height / 2;
            const dropLength = Math.random() * 10 + 5;
            
            ctx.strokeStyle = dropColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(dropX, dropY);
            ctx.lineTo(dropX, dropY + dropLength);
            ctx.stroke();
        }
    }

    const drawSnow = (ctx, width, height, intensity, time) => {
        const flakeCount = Math.floor(intensity * 100);
        const flakeColor = 'rgba(255, 255, 255, 0.8)';
        
        for (let i = 0; i < flakeCount; i++) {
            const flakeX = Math.random() * width;
            const flakeY = Math.random() * height / 2;
            const flakeSize = Math.random() * 5 + 2;
            
            ctx.fillStyle = flakeColor;
            ctx.beginPath();
            ctx.arc(flakeX, flakeY, flakeSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const drawWeatherResponse = (ctx, width, height, weatherType, time, season, timeOfDay) => {
        const buildingCenterX = width / 2;
        const buildingCenterY = height / 2 + 20;
        const buildingWidth = width * 0.4;
        const buildingHeight = height * 0.3;
        
        // Draw weather response elements based on weather type
        ctx.fillStyle = '#4CAF50';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (weatherType === 'rain') {
            ctx.fillText('Rainwater Harvesting System', buildingCenterX, buildingCenterY - 50);
            ctx.fillText('Green Roof for Water Absorption', buildingCenterX, buildingCenterY - 30);
        } else if (weatherType === 'snow') {
            ctx.fillText('Snow Melting System', buildingCenterX, buildingCenterY - 50);
            ctx.fillText('Insulated Roof to Prevent Accumulation', buildingCenterX, buildingCenterY - 30);
        } else if (weatherType === 'sunny') {
            ctx.fillText('Solar Panels for Energy Generation', buildingCenterX, buildingCenterY - 50);
            ctx.fillText('Natural Ventilation for Cooling', buildingCenterX, buildingCenterY - 30);
        }
    };

    const drawLegend = (ctx, width, height, factor, timeOfDay, season) => {
        const legendX = width - 150;
        const legendY = height - 150;
        const legendWidth = 130;
        const legendHeight = 120;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(legendX, legendY, legendWidth, legendHeight);
        
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(legendX, legendY, legendWidth, legendHeight);
        
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        ctx.fillText('Legend', legendX + 10, legendY + 10);
        
        // Draw factor-specific information
        switch (factor) {
            case 'sunlight':
                ctx.fillText('Sunlight Path', legendX + 10, legendY + 30);
                break;
            case 'airflow':
                ctx.fillText('Airflow Patterns', legendX + 10, legendY + 30);
                break;
            case 'thermal':
                ctx.fillText('Thermal Gradients', legendX + 10, legendY + 30);
                break;
            case 'weather':
                ctx.fillText('Weather Adaptation', legendX + 10, legendY + 30);
                break;
            default:
                ctx.fillText('Environmental Factors', legendX + 10, legendY + 30);
        }
        
        // Draw time of day and season
        ctx.fillText(`Time: ${timeOfDay}:00`, legendX + 10, legendY + 50);
        ctx.fillText(`Season: ${season}`, legendX + 10, legendY + 70);
    }

    return (
        <div className="canvas-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
            <div className="controls" style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
                <label>Time of Day:</label>
                <input type="number" value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} min="0" max="24" step="1" />
                <label>Season:</label>
                <select value={season} onChange={(e) => setSeason(e.target.value)}>
                    <option value="winter">Winter</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="autumn">Autumn</option>
                </select>
                <label>Active Factor:</label>
                <select value={activeFactor} onChange={(e) => setActiveFactor(e.target.value)}>
                    <option value="sunlight">Sunlight</option>
                    <option value="airflow">Airflow</option>
                    <option value="thermal">Thermal</option>
                    <option value="weather">Weather</option>
                </select>
            </div>
        </div>
    );
}