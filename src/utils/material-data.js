// src/utils/material-data.js

/**
 * Material database with properties, characteristics and visualizations
 * Used for the MaterialDemonstration component
 */

export const materials = {
    concrete: {
      name: 'Concrete',
      type: 'Composite',
      properties: {
        compressiveStrength: {
          value: '20-40 MPa',
          visualColor: '#4a90e2',
          description: 'Excellent compressive strength, making it ideal for structural elements that bear weight.'
        },
        tensileStrength: {
          value: '2-5 MPa',
          visualColor: '#e74c3c',
          description: 'Low tensile strength, requiring reinforcement with steel in most applications.'
        },
        thermalConductivity: {
          value: '1.0-1.8 W/(m·K)',
          visualColor: '#f39c12',
          description: 'Moderate thermal conductivity, providing reasonable insulation.'
        },
        density: {
          value: '2300-2400 kg/m³',
          visualColor: '#8e44ad',
          description: 'High density, contributing to its thermal mass and sound insulation properties.'
        },
        environmentalImpact: {
          value: 'High',
          visualColor: '#c0392b',
          description: 'Significant carbon footprint during production, but durable lifespan can offset this over time.'
        },
        lifespan: {
          value: '50-100 years',
          visualColor: '#27ae60',
          description: 'Long lifespan with proper maintenance and reinforcement protection.'
        }
      },
      applications: [
        'Foundations',
        'Structural frames',
        'Bridges',
        'Dams',
        'Roads and pavements',
        'Decorative elements'
      ],
      innovations: [
        {
          name: 'Ultra-High Performance Concrete',
          description: 'Achieves compressive strengths exceeding 150 MPa through optimized particle packing.',
          visualKey: 'uhpc'
        },
        {
          name: 'Self-healing Concrete',
          description: 'Contains bacteria that activate when cracks form, secreting limestone to repair damage.',
          visualKey: 'selfhealing'
        },
        {
          name: 'Translucent Concrete',
          description: 'Embeds optical fibers to transmit light while maintaining structural properties.',
          visualKey: 'translucent'
        },
        {
          name: 'Carbon-negative Concrete',
          description: 'Formulations that absorb more CO2 during curing than emitted during production.',
          visualKey: 'carbonnegative'
        }
      ],
      visualizationData: {
        stressDistribution: [
          {x: 0, compression: 100, tension: 5},
          {x: 20, compression: 95, tension: 10},
          {x: 40, compression: 85, tension: 20},
          {x: 60, compression: 70, tension: 35},
          {x: 80, compression: 50, tension: 55},
          {x: 100, compression: 25, tension: 80}
        ],
        thermalPerformance: [
          {time: 0, interior: 22, exterior: 35, material: 28},
          {time: 4, interior: 23, exterior: 36, material: 30},
          {time: 8, interior: 24, exterior: 38, material: 32},
          {time: 12, interior: 25, exterior: 34, material: 31},
          {time: 16, interior: 24, exterior: 30, material: 28},
          {time: 20, interior: 23, exterior: 26, material: 25},
          {time: 24, interior: 22, exterior: 25, material: 24}
        ]
      }
    },
    
    steel: {
      name: 'Steel',
      type: 'Metal Alloy',
      properties: {
        compressiveStrength: {
          value: '250-550 MPa',
          visualColor: '#4a90e2',
          description: 'Excellent compressive strength, resistant to buckling when properly designed.'
        },
        tensileStrength: {
          value: '400-850 MPa',
          visualColor: '#e74c3c',
          description: 'Outstanding tensile strength, making it ideal for spanning and tensile structures.'
        },
        thermalConductivity: {
          value: '45-60 W/(m·K)',
          visualColor: '#f39c12',
          description: 'High thermal conductivity, requiring insulation in building applications.'
        },
        density: {
          value: '7850 kg/m³',
          visualColor: '#8e44ad',
          description: 'High density, resulting in heavyweight construction unless optimized with lighter sections.'
        },
        environmentalImpact: {
          value: 'Moderate to High',
          visualColor: '#c0392b',
          description: 'Energy-intensive production, but highly recyclable with minimal quality loss.'
        },
        lifespan: {
          value: '50-100 years',
          visualColor: '#27ae60',
          description: 'Long lifespan when properly protected from corrosion.'
        }
      },
      applications: [
        'Structural frames',
        'Long-span roofs',
        'Bridges',
        'High-rise buildings',
        'Industrial facilities',
        'Reinforcement in concrete'
      ],
      innovations: [
        {
          name: 'Ultra-High-Strength Steel',
          description: 'Advanced alloys reaching tensile strengths of 1700 MPa, enabling lighter structural members.',
          visualKey: 'uhss'
        },
        {
          name: 'Self-healing Coatings',
          description: 'Microcapsule technologies that release corrosion inhibitors when damage occurs.',
          visualKey: 'selfhealingcoating'
        },
        {
          name: 'Additive Manufacturing',
          description: '3D printing techniques for complex steel components with optimized geometries.',
          visualKey: 'additivemanufacturing'
        },
        {
          name: 'Green Steel',
          description: 'Production using hydrogen instead of coal, drastically reducing carbon emissions.',
          visualKey: 'greensteel'
        }
      ],
      visualizationData: {
        stressDistribution: [
          {x: 0, compression: 90, tension: 95},
          {x: 20, compression: 92, tension: 94},
          {x: 40, compression: 94, tension: 92},
          {x: 60, compression: 94, tension: 92},
          {x: 80, compression: 92, tension: 94},
          {x: 100, compression: 90, tension: 95}
        ],
        thermalPerformance: [
          {time: 0, interior: 22, exterior: 35, material: 34},
          {time: 4, interior: 25, exterior: 36, material: 35},
          {time: 8, interior: 29, exterior: 38, material: 37},
          {time: 12, interior: 32, exterior: 34, material: 34},
          {time: 16, interior: 30, exterior: 30, material: 30},
          {time: 20, interior: 28, exterior: 26, material: 26},
          {time: 24, interior: 25, exterior: 25, material: 25}
        ]
      }
    },
    
    timber: {
      name: 'Timber',
      type: 'Natural Material',
      properties: {
        compressiveStrength: {
          value: '35-50 MPa (parallel to grain)',
          visualColor: '#4a90e2',
          description: 'Good compressive strength parallel to grain, lower perpendicular to grain.'
        },
        tensileStrength: {
          value: '100-140 MPa (parallel to grain)',
          visualColor: '#e74c3c',
          description: 'Strong in tension along grain direction, weaker across grain.'
        },
        thermalConductivity: {
          value: '0.10-0.16 W/(m·K)',
          visualColor: '#f39c12',
          description: 'Excellent thermal insulator, helping to maintain comfortable interior environments.'
        },
        density: {
          value: '400-700 kg/m³',
          visualColor: '#8e44ad',
          description: 'Low density provides good strength-to-weight ratio and easier handling.'
        },
        environmentalImpact: {
          value: 'Low (if sustainably sourced)',
          visualColor: '#27ae60',
          description: 'Carbon sequestration during growth, renewable when harvested from managed forests.'
        },
        lifespan: {
          value: '25-100+ years',
          visualColor: '#16a085',
          description: 'Variable based on species, treatment, and exposure conditions.'
        }
      },
      applications: [
        'Residential construction',
        'Roof structures',
        'Floor systems',
        'Interior elements',
        'Low-rise buildings',
        'Decorative features'
      ],
      innovations: [
        {
          name: 'Cross-Laminated Timber (CLT)',
          description: 'Engineered wood panels with layers oriented perpendicular to each other, enabling tall timber buildings.',
          visualKey: 'clt'
        },
        {
          name: 'Thermally Modified Timber',
          description: 'Heat treatment process that increases durability and dimensional stability without chemicals.',
          visualKey: 'thermallymodified'
        },
        {
          name: 'Transparent Wood',
          description: 'Lignin-removed wood infused with polymer, creating a transparent structural material.',
          visualKey: 'transparentwood'
        },
        {
          name: 'Wood-polymer Composites',
          description: 'Hybrid materials combining wood fibers with polymers for enhanced durability and weather resistance.',
          visualKey: 'woodcomposite'
        }
      ],
      visualizationData: {
        stressDistribution: [
          {x: 0, compression: 80, tension: 90},
          {x: 20, compression: 75, tension: 85},
          {x: 40, compression: 70, tension: 80},
          {x: 60, compression: 65, tension: 75},
          {x: 80, compression: 60, tension: 70},
          {x: 100, compression: 55, tension: 65}
        ],
        thermalPerformance: [
          {time: 0, interior: 22, exterior: 35, material: 24},
          {time: 4, interior: 22, exterior: 36, material: 25},
          {time: 8, interior: 23, exterior: 38, material: 26},
          {time: 12, interior: 23, exterior: 34, material: 25},
          {time: 16, interior: 23, exterior: 30, material: 24},
          {time: 20, interior: 22, exterior: 26, material: 23},
          {time: 24, interior: 22, exterior: 25, material: 23}
        ]
      }
    },
    
    glass: {
      name: 'Glass',
      type: 'Amorphous Solid',
      properties: {
        compressiveStrength: {
          value: '800-1000 MPa',
          visualColor: '#4a90e2',
          description: 'Very high compressive strength, manifold stronger than concrete.'
        },
        tensileStrength: {
          value: '30-100 MPa',
          visualColor: '#e74c3c',
          description: 'Relatively low tensile strength, prone to brittle failure without treatment.'
        },
        thermalConductivity: {
          value: '0.8-1.1 W/(m·K)',
          visualColor: '#f39c12',
          description: 'Moderate thermal conductor, typically requiring double or triple glazing for insulation.'
        },
        density: {
          value: '2500 kg/m³',
          visualColor: '#8e44ad',
          description: 'Similar density to concrete, contributing to building envelope weight.'
        },
        environmentalImpact: {
          value: 'Moderate',
          visualColor: '#f39c12',
          description: 'Energy-intensive production, but fully recyclable and can reduce building energy consumption.'
        },
        lifespan: {
          value: '30-50 years',
          visualColor: '#27ae60',
          description: 'Durable with excellent resistance to environmental degradation.'
        }
      },
      applications: [
        'Building envelopes',
        'Windows and skylights',
        'Interior partitions',
        'Structural elements',
        'Decorative features',
        'Solar collection'
      ],
      innovations: [
        {
          name: 'Electrochromic Glass',
          description: 'Smart glass that changes opacity in response to electrical current, reducing solar heat gain.',
          visualKey: 'electrochromic'
        },
        {
          name: 'Structural Glass',
          description: 'Laminated and tempered assemblies enabling all-glass structures with minimal supporting elements.',
          visualKey: 'structuralglass'
        },
        {
          name: 'Photovoltaic Glass',
          description: 'Integrated solar cells that generate electricity while maintaining transparency.',
          visualKey: 'pvglass'
        },
        {
          name: 'Aerogel-filled Glass',
          description: 'Incorporates aerogel between panes for superior thermal insulation while maintaining light transmission.',
          visualKey: 'aerogelglass'
        }
      ],
      visualizationData: {
        stressDistribution: [
          {x: 0, compression: 100, tension: 20},
          {x: 20, compression: 95, tension: 20},
          {x: 40, compression: 90, tension: 20},
          {x: 60, compression: 85, tension: 20},
          {x: 80, compression: 80, tension: 20},
          {x: 100, compression: 75, tension: 20}
        ],
        thermalPerformance: [
          {time: 0, interior: 22, exterior: 35, material: 33},
          {time: 4, interior: 23, exterior: 36, material: 34},
          {time: 8, interior: 26, exterior: 38, material: 36},
          {time: 12, interior: 28, exterior: 34, material: 32},
          {time: 16, interior: 27, exterior: 30, material: 29},
          {time: 20, interior: 25, exterior: 26, material: 26},
          {time: 24, interior: 23, exterior: 25, material: 24}
        ]
      }
    }
  };
  
  export const materialComparisons = [
    {
      property: 'Compressive Strength',
      unit: 'MPa',
      data: [
        { material: 'Concrete', value: 30, color: '#95a5a6' },
        { material: 'Steel', value: 400, color: '#7f8c8d' },
        { material: 'Timber', value: 40, color: '#d35400' },
        { material: 'Glass', value: 900, color: '#3498db' }
      ]
    },
    {
      property: 'Tensile Strength',
      unit: 'MPa',
      data: [
        { material: 'Concrete', value: 3, color: '#95a5a6' },
        { material: 'Steel', value: 500, color: '#7f8c8d' },
        { material: 'Timber', value: 120, color: '#d35400' },
        { material: 'Glass', value: 50, color: '#3498db' }
      ]
    },
    {
      property: 'Thermal Conductivity',
      unit: 'W/(m·K)',
      data: [
        { material: 'Concrete', value: 1.5, color: '#95a5a6' },
        { material: 'Steel', value: 50, color: '#7f8c8d' },
        { material: 'Timber', value: 0.12, color: '#d35400' },
        { material: 'Glass', value: 1.0, color: '#3498db' }
      ]
    },
    {
      property: 'Carbon Footprint',
      unit: 'kg CO2 eq/kg',
      data: [
        { material: 'Concrete', value: 0.11, color: '#95a5a6' },
        { material: 'Steel', value: 1.46, color: '#7f8c8d' },
        { material: 'Timber', value: -1.64, color: '#d35400' },
        { material: 'Glass', value: 0.85, color: '#3498db' }
      ]
    }
  ];
  
  export const materialApplications = {
    structural: ['Concrete', 'Steel', 'Timber'],
    envelope: ['Glass', 'Concrete', 'Timber'],
    thermal: ['Timber', 'Glass', 'Concrete'],
    decorative: ['Glass', 'Timber', 'Concrete', 'Steel'],
    sustainable: ['Timber', 'Glass', 'Steel', 'Concrete']
  };
  
  export default {
    materials,
    materialComparisons,
    materialApplications
  };