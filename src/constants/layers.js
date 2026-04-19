// src/constants/layers.js

/**
 * Layer definitions for the building anatomy visualization
 * Used in the BuildingAnatomy and LayerNavigation components
 */

import colors from './colors';

export const layerGroups = [
  {
    id: 'structure',
    name: 'Structural Systems',
    description: 'The core structural elements that support the building',
    color: colors.primary[600],
    icon: 'columns',
    order: 1
  },
  {
    id: 'envelope',
    name: 'Building Envelope',
    description: 'The exterior shell that protects from environmental elements',
    color: colors.secondary[500],
    icon: 'box',
    order: 2
  },
  {
    id: 'mechanical',
    name: 'Mechanical Systems',
    description: 'Systems for climate control, ventilation, and energy distribution',
    color: colors.accent[500],
    icon: 'settings',
    order: 3
  },
  {
    id: 'interior',
    name: 'Interior Elements',
    description: 'Interior partitions, finishes, and spatial organization',
    color: colors.neutral[600],
    icon: 'layout',
    order: 4
  },
  {
    id: 'adaptive',
    name: 'Adaptive Features',
    description: 'Dynamic elements that respond to environmental changes',
    color: colors.research.adaptive,
    icon: 'refresh-cw',
    order: 5
  }
];

export const layers = [
  // Structural System Layers
  {
    id: 'foundations',
    name: 'Foundations',
    groupId: 'structure',
    description: 'Deep foundation system with reinforced concrete piles and grade beams',
    color: colors.primary[800],
    materialType: 'Reinforced Concrete',
    visible: true,
    opacity: 1.0,
    order: 1
  },
  {
    id: 'primary-structure',
    name: 'Primary Structure',
    groupId: 'structure',
    description: 'Steel frame primary structural system with moment connections',
    color: colors.primary[600],
    materialType: 'Steel',
    visible: true,
    opacity: 1.0,
    order: 2
  },
  {
    id: 'floor-systems',
    name: 'Floor Systems',
    groupId: 'structure',
    description: 'Composite steel and concrete floor decks with integrated services',
    color: colors.primary[400],
    materialType: 'Composite Steel/Concrete',
    visible: true,
    opacity: 1.0,
    order: 3
  },
  {
    id: 'lateral-systems',
    name: 'Lateral Systems',
    groupId: 'structure',
    description: 'Braced frames and shear walls for lateral stability',
    color: colors.primary[500],
    materialType: 'Steel/Concrete',
    visible: true,
    opacity: 1.0,
    order: 4
  },
  
  // Building Envelope Layers
  {
    id: 'curtain-wall',
    name: 'Curtain Wall',
    groupId: 'envelope',
    description: 'High-performance unitized curtain wall system with triple glazing',
    color: colors.secondary[400],
    materialType: 'Aluminum/Glass',
    visible: true,
    opacity: 0.8,
    order: 5
  },
  {
    id: 'dynamic-shading',
    name: 'Dynamic Shading',
    groupId: 'envelope',
    description: 'Automated external shading devices responding to solar conditions',
    color: colors.secondary[600],
    materialType: 'Aluminum/Composite',
    visible: true,
    opacity: 0.9,
    order: 6,
    animatable: true,
    animationData: {
      type: 'rotation',
      axis: 'y',
      range: [0, 90],
      speed: 0.5
    }
  },
  {
    id: 'roof-system',
    name: 'Roof System',
    groupId: 'envelope',
    description: 'Green roof with integrated photovoltaic array and rainwater collection',
    color: colors.secondary[500],
    materialType: 'Multiple',
    visible: true,
    opacity: 1.0,
    order: 7
  },
  {
    id: 'insulation',
    name: 'Insulation',
    groupId: 'envelope',
    description: 'High-performance thermal and acoustic insulation layers',
    color: colors.secondary[300],
    materialType: 'Mineral Wool/Foam',
    visible: true,
    opacity: 0.7,
    order: 8
  },
  
  // Mechanical Systems Layers
  {
    id: 'hvac',
    name: 'HVAC',
    groupId: 'mechanical',
    description: 'Variable air volume system with heat recovery and displacement ventilation',
    color: colors.accent[600],
    materialType: 'Steel/Aluminum',
    visible: true,
    opacity: 0.8,
    order: 9,
    animatable: true,
    animationData: {
      type: 'flow',
      direction: 'circular',
      speed: 0.3
    }
  },
  {
    id: 'electrical',
    name: 'Electrical Systems',
    groupId: 'mechanical',
    description: 'Smart electrical distribution with occupancy-based lighting controls',
    color: colors.accent[400],
    materialType: 'Copper/Plastic',
    visible: true,
    opacity: 0.7,
    order: 10
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    groupId: 'mechanical',
    description: 'Dual water systems with greywater recycling and low-flow fixtures',
    color: colors.accent[300],
    materialType: 'Copper/PEX',
    visible: true,
    opacity: 0.7,
    order: 11,
    animatable: true,
    animationData: {
      type: 'flow',
      direction: 'vertical',
      speed: 0.2
    }
  },
  {
    id: 'fire-protection',
    name: 'Fire Protection',
    groupId: 'mechanical',
    description: 'Integrated fire detection and suppression systems',
    color: colors.accent[500],
    materialType: 'Steel/Plastic',
    visible: true,
    opacity: 0.6,
    order: 12
  },
  
  // Interior Elements Layers
  {
    id: 'partitions',
    name: 'Partitions',
    groupId: 'interior',
    description: 'Modular partition system with acoustic properties and integrated technology',
    color: colors.neutral[500],
    materialType: 'Multiple',
    visible: true,
    opacity: 0.8,
    order: 13
  },
  {
    id: 'ceilings',
    name: 'Ceiling Systems',
    groupId: 'interior',
    description: 'Suspended acoustic ceiling system with integrated lighting and services',
    color: colors.neutral[400],
    materialType: 'Acoustic Panels',
    visible: true,
    opacity: 0.7,
    order: 14
  },
  {
    id: 'flooring',
    name: 'Flooring Systems',
    groupId: 'interior',
    description: 'Raised access flooring with radiant heating/cooling and underfloor air',
    color: colors.neutral[600],
    materialType: 'Multiple',
    visible: true,
    opacity: 0.9,
    order: 15
  },
  {
    id: 'furniture',
    name: 'Furniture Systems',
    groupId: 'interior',
    description: 'Reconfigurable ergonomic furniture with integrated power and data',
    color: colors.neutral[300],
    materialType: 'Multiple',
    visible: true,
    opacity: 0.6,
    order: 16
  },
  
  // Adaptive Features Layers
  {
    id: 'facade-automation',
    name: 'Facade Automation',
    groupId: 'adaptive',
    description: 'Automated facade elements responsive to environmental conditions',
    color: colors.research.adaptive,
    materialType: 'Multiple',
    visible: true,
    opacity: 0.8,
    order: 17,
    animatable: true,
    animationData: {
      type: 'rotation',
      axis: 'x',
      range: [-30, 30],
      speed: 0.3
    }
  },
  {
    id: 'environmental-sensors',
    name: 'Environmental Sensors',
    groupId: 'adaptive',
    description: 'Network of sensors monitoring environmental conditions and occupancy',
    color: colors.visualization.category10[7],
    materialType: 'Electronic',
    visible: true,
    opacity: 0.7,
    order: 18,
    animatable: true,
    animationData: {
      type: 'pulse',
      range: [0.9, 1.1],
      speed: 0.8
    }
  },
  {
    id: 'energy-systems',
    name: 'Energy Systems',
    groupId: 'adaptive',
    description: 'Renewable energy systems with storage and smart grid integration',
    color: colors.visualization.category10[2],
    materialType: 'Multiple',
    visible: true,
    opacity: 0.8,
    order: 19,
    animatable: true,
    animationData: {
      type: 'flow',
      direction: 'horizontal',
      speed: 0.4
    }
  },
  {
    id: 'water-management',
    name: 'Water Management',
    groupId: 'adaptive',
    description: 'Integrated rainwater harvesting and greywater recycling systems',
    color: colors.visualization.category10[0],
    materialType: 'Multiple',
    visible: true,
    opacity: 0.7,
    order: 20,
    animatable: true,
    animationData: {
      type: 'flow',
      direction: 'vertical',
      speed: 0.3
    }
  }
];

export const layerRelationships = [
  { source: 'foundations', target: 'primary-structure', strength: 0.9 },
  { source: 'primary-structure', target: 'floor-systems', strength: 0.8 },
  { source: 'primary-structure', target: 'lateral-systems', strength: 0.7 },
  { source: 'primary-structure', target: 'curtain-wall', strength: 0.6 },
  { source: 'floor-systems', target: 'hvac', strength: 0.5 },
  { source: 'floor-systems', target: 'electrical', strength: 0.5 },
  { source: 'floor-systems', target: 'plumbing', strength: 0.4 },
  { source: 'curtain-wall', target: 'dynamic-shading', strength: 0.8 },
  { source: 'curtain-wall', target: 'insulation', strength: 0.7 },
  { source: 'roof-system', target: 'insulation', strength: 0.6 },
  { source: 'roof-system', target: 'hvac', strength: 0.4 },
  { source: 'hvac', target: 'ceilings', strength: 0.6 },
  { source: 'hvac', target: 'flooring', strength: 0.5 },
  { source: 'electrical', target: 'ceilings', strength: 0.6 },
  { source: 'electrical', target: 'partitions', strength: 0.5 },
  { source: 'plumbing', target: 'partitions', strength: 0.4 },
  { source: 'plumbing', target: 'water-management', strength: 0.8 },
  { source: 'fire-protection', target: 'ceilings', strength: 0.7 },
  { source: 'fire-protection', target: 'partitions', strength: 0.6 },
  { source: 'partitions', target: 'furniture', strength: 0.5 },
  { source: 'ceilings', target: 'environmental-sensors', strength: 0.6 },
  { source: 'flooring', target: 'furniture', strength: 0.7 },
  { source: 'flooring', target: 'environmental-sensors', strength: 0.5 },
  { source: 'dynamic-shading', target: 'facade-automation', strength: 0.9 },
  { source: 'facade-automation', target: 'environmental-sensors', strength: 0.8 },
  { source: 'environmental-sensors', target: 'energy-systems', strength: 0.7 },
  { source: 'energy-systems', target: 'electrical', strength: 0.8 },
  { source: 'water-management', target: 'roof-system', strength: 0.7 }
];

export const layerPerformanceMetrics = {
  thermal: {
    'insulation': 0.9,
    'curtain-wall': 0.8,
    'dynamic-shading': 0.85,
    'roof-system': 0.8,
    'hvac': 0.75,
    'facade-automation': 0.9
  },
  structural: {
    'foundations': 0.95,
    'primary-structure': 0.9,
    'floor-systems': 0.85,
    'lateral-systems': 0.95
  },
  energy: {
    'curtain-wall': 0.7,
    'dynamic-shading': 0.8,
    'hvac': 0.6,
    'electrical': 0.65,
    'energy-systems': 0.9,
    'facade-automation': 0.85,
    'environmental-sensors': 0.75
  },
  acoustic: {
    'curtain-wall': 0.7,
    'insulation': 0.85,
    'partitions': 0.8,
    'ceilings': 0.85,
    'flooring': 0.75
  },
  water: {
    'plumbing': 0.7,
    'roof-system': 0.75,
    'water-management': 0.9
  },
  fire: {
    'fire-protection': 0.95,
    'partitions': 0.7,
    'structural-frame': 0.85
  },
  adaptability: {
    'facade-automation': 0.9,
    'environmental-sensors': 0.85,
    'dynamic-shading': 0.8,
    'partitions': 0.75,
    'furniture': 0.9,
    'flooring': 0.8
  }
};

export default {
  layerGroups,
  layers,
  layerRelationships,
  layerPerformanceMetrics
};