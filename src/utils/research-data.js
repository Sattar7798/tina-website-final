// src/utils/research-data.js

/**
 * Research topics and connections data
 * Used for the ResearchWebVisualization component
 */

export const researchAreas = [
    {
      id: 'adaptive',
      name: 'Adaptive Architecture',
      description: 'Systems that respond dynamically to environmental conditions and occupant needs',
      color: '#e74c3c',
      weight: 10,
      connections: ['parametric', 'materials', 'sustainability', 'computation'],
      publications: [2, 5, 7],
      projects: [1, 4],
      keyVisualizations: ['adaptive-facade-system', 'environmental-response-cycle']
    },
    {
      id: 'parametric',
      name: 'Parametric Design',
      description: 'Form-finding methodologies using algorithmic and variable-driven processes',
      color: '#3498db',
      weight: 12,
      connections: ['adaptive', 'computation', 'materials', 'fabrication'],
      publications: [1, 3, 8],
      projects: [2, 3, 5],
      keyVisualizations: ['parametric-iteration-sequence', 'form-finding-algorithms']
    },
    {
      id: 'materials',
      name: 'Advanced Materials',
      description: 'Novel building materials with enhanced performance characteristics',
      color: '#9b59b6',
      weight: 8,
      connections: ['adaptive', 'fabrication', 'sustainability', 'parametric'],
      publications: [4, 9, 10],
      projects: [3, 6],
      keyVisualizations: ['material-performance-analysis', 'composite-structure-detail']
    },
    {
      id: 'computation',
      name: 'Computational Engineering',
      description: 'Algorithmic approaches to structural analysis and optimization',
      color: '#f1c40f',
      weight: 11,
      connections: ['parametric', 'adaptive', 'fabrication', 'urbanism'],
      publications: [6, 11, 12],
      projects: [2, 7],
      keyVisualizations: ['structural-optimization-process', 'finite-element-analysis']
    },
    {
      id: 'sustainability',
      name: 'Sustainable Design',
      description: 'Strategies for minimizing environmental impact and resource consumption',
      color: '#2ecc71',
      weight: 9,
      connections: ['adaptive', 'materials', 'urbanism'],
      publications: [13, 14, 15],
      projects: [4, 8],
      keyVisualizations: ['energy-flow-diagram', 'lifecycle-analysis']
    },
    {
      id: 'fabrication',
      name: 'Digital Fabrication',
      description: 'Advanced manufacturing techniques for complex architectural components',
      color: '#e67e22',
      weight: 7,
      connections: ['materials', 'parametric', 'computation'],
      publications: [16, 17],
      projects: [5, 9],
      keyVisualizations: ['robotic-assembly-sequence', 'additive-manufacturing-process']
    },
    {
      id: 'urbanism',
      name: 'Urban Systems',
      description: 'Integration of buildings within larger urban infrastructure networks',
      color: '#1abc9c',
      weight: 6,
      connections: ['sustainability', 'computation'],
      publications: [18, 19, 20],
      projects: [10, 11],
      keyVisualizations: ['urban-network-analysis', 'infrastructure-integration-model']
    }
  ];
  
  export const publications = [
    {
      id: 1,
      title: 'Parametric Analysis of Responsive Building Skins',
      journal: 'Journal of Architectural Engineering',
      year: 2019,
      authors: ['Ziarati, T.', 'Rodriguez, A.', 'Chen, J.'],
      abstract: 'This paper presents a comprehensive framework for analyzing performance characteristics of parametrically designed building envelope systems that respond to environmental stimuli.',
      keywords: ['parametric design', 'building envelopes', 'performance analysis'],
      citations: 42,
      areas: ['parametric', 'adaptive']
    },
    {
      id: 2,
      title: 'Thermal Adaptation Strategies in High-Performance Building Facades',
      journal: 'Building and Environment',
      year: 2020,
      authors: ['Ziarati, T.', 'Smith, K.'],
      abstract: 'An investigation of advanced thermal regulation mechanisms in building facades, focusing on passive and active adaptation strategies for extreme climate conditions.',
      keywords: ['thermal adaptation', 'building facades', 'climate response'],
      citations: 31,
      areas: ['adaptive', 'sustainability']
    },
    {
      id: 3,
      title: 'Form-Finding Algorithms for Structurally Efficient Architectural Elements',
      journal: 'Computer-Aided Design',
      year: 2018,
      authors: ['Ziarati, T.', 'Johnson, M.', 'Wong, L.'],
      abstract: 'This research demonstrates novel algorithms for generating structurally optimized architectural forms while maintaining fabrication feasibility and aesthetic considerations.',
      keywords: ['form-finding', 'structural optimization', 'algorithms'],
      citations: 55,
      areas: ['parametric', 'computation']
    },
    {
      id: 4,
      title: 'Biomimetic Material Systems for Adaptive Building Skins',
      journal: 'Advanced Materials Research',
      year: 2021,
      authors: ['Ziarati, T.', 'Garcia, P.', 'Hassan, N.'],
      abstract: 'A study of bio-inspired material systems that emulate natural adaptation mechanisms for application in architectural envelopes with enhanced performance.',
      keywords: ['biomimicry', 'material systems', 'adaptive facades'],
      citations: 28,
      areas: ['materials', 'adaptive']
    },
    {
      id: 5,
      title: 'Kinetic Facades: Mechanisms for Environmental Responsiveness',
      journal: 'Architectural Science Review',
      year: 2022,
      authors: ['Ziarati, T.', 'Patel, R.'],
      abstract: 'An exploration of mechanical systems enabling facade elements to transform in response to environmental conditions, occupant needs, and energy efficiency requirements.',
      keywords: ['kinetic architecture', 'responsive facades', 'environmental control'],
      citations: 19,
      areas: ['adaptive', 'sustainability']
    },
    {
      id: 6,
      title: 'Multi-Objective Optimization for Structural Systems in Tall Buildings',
      journal: 'Structural Engineering International',
      year: 2019,
      authors: ['Ziarati, T.', 'Brown, D.', 'Tanaka, S.'],
      abstract: 'A computational approach to balancing multiple competing objectives in tall building structural systems, including material efficiency, spatial planning, and construction logistics.',
      keywords: ['multi-objective optimization', 'tall buildings', 'structural systems'],
      citations: 36,
      areas: ['computation', 'parametric']
    },
    {
      id: 7,
      title: 'Climate-Adaptive Building Shells: Performance Analysis Case Studies',
      journal: 'Energy and Buildings',
      year: 2020,
      authors: ['Ziarati, T.', 'Edwards, J.'],
      abstract: 'Post-occupancy evaluations of implemented adaptive building envelope systems in various climate zones, analyzing actual performance against predicted models.',
      keywords: ['climate adaptation', 'building performance', 'case studies'],
      citations: 24,
      areas: ['adaptive', 'sustainability']
    },
    {
      id: 8,
      title: 'Parametric Urbanism: Computational Approaches to Urban Design',
      journal: 'Urban Planning and Design',
      year: 2021,
      authors: ['Ziarati, T.', 'Lee, M.', 'Gonzalez, C.'],
      abstract: 'An investigation of parametric methodologies applied to urban planning, focusing on the integration of multiple systems including transportation, open space, and building morphology.',
      keywords: ['parametric urbanism', 'computational design', 'urban systems'],
      citations: 22,
      areas: ['parametric', 'urbanism']
    },
    {
      id: 9,
      title: 'Smart Materials for Responsive Architectural Systems',
      journal: 'Materials Science and Engineering',
      year: 2022,
      authors: ['Ziarati, T.', 'Nakamura, H.', 'Klein, A.'],
      abstract: 'Research on emerging smart materials with programmable properties for application in dynamic building systems that can respond to changing environmental conditions.',
      keywords: ['smart materials', 'responsive architecture', 'material science'],
      citations: 17,
      areas: ['materials', 'adaptive']
    },
    {
      id: 10,
      title: 'Composite Systems for Lightweight Structural Applications',
      journal: 'Composites in Construction',
      year: 2020,
      authors: ['Ziarati, T.', 'Ferreira, L.'],
      abstract: 'Development and testing of fiber-reinforced composite systems designed for architectural applications requiring high strength-to-weight ratios and customizable properties.',
      keywords: ['composites', 'lightweight structures', 'material testing'],
      citations: 29,
      areas: ['materials', 'fabrication']
    },
    {
      id: 11,
      title: 'Generative Design Systems for Structural Grid Optimization',
      journal: 'Journal of Structural Design and Computation',
      year: 2021,
      authors: ['Ziarati, T.', 'Phillips, S.', 'Ahmed, K.'],
      abstract: 'A novel generative design methodology for optimizing structural grid systems in large-span buildings, balancing material efficiency with constructibility constraints.',
      keywords: ['generative design', 'structural grids', 'optimization'],
      citations: 25,
      areas: ['computation', 'parametric']
    },
    {
      id: 12,
      title: 'Machine Learning Applications in Structural Performance Prediction',
      journal: 'Automation in Construction',
      year: 2022,
      authors: ['Ziarati, T.', 'Kumar, V.'],
      abstract: 'Implementation of machine learning models to predict structural performance under various loading conditions, enabling rapid prototyping and optimization of architectural structures.',
      keywords: ['machine learning', 'structural performance', 'predictive modeling'],
      citations: 21,
      areas: ['computation', 'parametric']
    },
    {
      id: 13,
      title: 'Life Cycle Assessment of Adaptive Facade Systems',
      journal: 'Sustainability in the Built Environment',
      year: 2019,
      authors: ['Ziarati, T.', 'Müller, D.', 'Zhang, Y.'],
      abstract: 'Comprehensive analysis of the environmental impacts of adaptive facade systems throughout their life cycle, from material extraction to end-of-life scenarios.',
      keywords: ['life cycle assessment', 'adaptive facades', 'environmental impact'],
      citations: 38,
      areas: ['sustainability', 'adaptive']
    },
    {
      id: 14,
      title: 'Embodied Carbon Reduction Strategies in Contemporary Architecture',
      journal: 'Journal of Green Building',
      year: 2021,
      authors: ['Ziarati, T.', 'Okafor, J.'],
      abstract: 'Investigation of design and material selection strategies for minimizing embodied carbon in architectural projects while maintaining performance requirements.',
      keywords: ['embodied carbon', 'material selection', 'sustainable design'],
      citations: 26,
      areas: ['sustainability', 'materials']
    },
    {
      id: 15,
      title: 'Passive Design Strategies for Net-Zero Energy Buildings',
      journal: 'Energy and Buildings',
      year: 2020,
      authors: ['Ziarati, T.', 'Sánchez, M.', 'Patel, R.'],
      abstract: 'Analysis of passive environmental control strategies that can be integrated into the architectural design process to achieve net-zero energy performance.',
      keywords: ['passive design', 'net-zero energy', 'environmental control'],
      citations: 45,
      areas: ['sustainability', 'adaptive']
    },
    {
      id: 16,
      title: 'Robotic Fabrication Methods for Complex Architectural Components',
      journal: 'Automation in Construction',
      year: 2022,
      authors: ['Ziarati, T.', 'Fischer, M.', 'Kim, H.'],
      abstract: 'Development of robotic fabrication workflows for producing geometrically complex architectural components with high precision and reduced material waste.',
      keywords: ['robotic fabrication', 'complex geometry', 'automation'],
      citations: 15,
      areas: ['fabrication', 'parametric']
    },
    {
      id: 17,
      title: 'Large-Scale Additive Manufacturing for Architectural Applications',
      journal: 'Additive Manufacturing',
      year: 2021,
      authors: ['Ziarati, T.', 'Bosch, P.'],
      abstract: 'Research on scaling additive manufacturing processes for architectural-scale components, addressing challenges in material properties, process control, and integration with conventional building systems.',
      keywords: ['additive manufacturing', 'large-scale printing', 'material development'],
      citations: 23,
      areas: ['fabrication', 'materials']
    },
    {
      id: 18,
      title: 'Integrated Building-Infrastructure Systems for Urban Resilience',
      journal: 'Urban Planning Review',
      year: 2022,
      authors: ['Ziarati, T.', 'Washington, K.', 'Rivera, M.'],
      abstract: 'A framework for integrating building systems with urban infrastructure networks to enhance resilience against climate change impacts and other environmental stressors.',
      keywords: ['urban resilience', 'integrated systems', 'infrastructure'],
      citations: 19,
      areas: ['urbanism', 'sustainability']
    },
    {
      id: 19,
      title: 'Data-Driven Urban Form Optimization for Energy Performance',
      journal: 'Sustainable Cities and Society',
      year: 2021,
      authors: ['Ziarati, T.', 'Nguyen, L.'],
      abstract: 'Utilization of urban data sets to inform optimization of building arrangements and urban morphology for enhanced energy performance and microclimate conditions.',
      keywords: ['urban form', 'energy performance', 'data-driven design'],
      citations: 27,
      areas: ['urbanism', 'computation']
    },
    {
      id: 20,
      title: 'Smart City Integration Strategies for Architectural Projects',
      journal: 'Smart and Sustainable Built Environment',
      year: 2022,
      authors: ['Ziarati, T.', 'Sharma, P.', 'Anderson, J.'],
      abstract: 'Investigation of methods for connecting architectural projects to smart city networks, enabling data exchange and coordinated performance optimization across scales.',
      keywords: ['smart cities', 'network integration', 'cross-scale optimization'],
      citations: 14,
      areas: ['urbanism', 'computation']
    }
  ];
  
  export const projects = [
    {
      id: 1,
      title: 'Dynamic Solar Shading System',
      year: 2019,
      location: 'Milan, Italy',
      collaborators: ['Studio Fuksas', 'Arup Engineering'],
      description: 'Design and implementation of an advanced solar shading system that responds dynamically to sun angles and interior comfort conditions.',
      areas: ['adaptive', 'computation'],
      keyImages: ['dynamic-shading-1.jpg', 'dynamic-shading-2.jpg', 'dynamic-shading-detail.jpg']
    },
    {
      id: 2,
      title: 'Parametric Concert Hall',
      year: 2020,
      location: 'Singapore',
      collaborators: ['DP Architects', 'Nagata Acoustics'],
      description: 'Acoustically optimized concert hall with parametrically designed interior surfaces that enhance sound distribution while creating a dynamic visual experience.',
      areas: ['parametric', 'computation'],
      keyImages: ['concert-hall-1.jpg', 'concert-hall-interior.jpg', 'acoustic-panel-detail.jpg']
    },
    {
      id: 3,
      title: 'Material Innovation Pavilion',
      year: 2021,
      location: 'Munich, Germany',
      collaborators: ['Technical University of Munich', 'BASF'],
      description: 'Experimental pavilion showcasing novel architectural materials with enhanced structural and environmental performance characteristics.',
      areas: ['materials', 'parametric'],
      keyImages: ['material-pavilion-1.jpg', 'material-pavilion-2.jpg', 'material-detail.jpg']
    },
    {
      id: 4,
      title: 'Climate-Adaptive Office Building',
      year: 2022,
      location: 'Dubai, UAE',
      collaborators: ['Foster + Partners', 'Transsolar'],
      description: 'High-performance office building with an envelope system that adapts to extreme desert climate conditions, minimizing energy consumption while maximizing occupant comfort.',
      areas: ['adaptive', 'sustainability'],
      keyImages: ['office-exterior.jpg', 'facade-detail.jpg', 'environmental-diagram.jpg']
    },
    {
      id: 5,
      title: 'Parametric Bridge Design',
      year: 2020,
      location: 'Rotterdam, Netherlands',
      collaborators: ['Royal HaskoningDHV', 'MX3D'],
      description: 'Pedestrian bridge designed using parametric optimization algorithms and constructed with advanced digital fabrication techniques.',
      areas: ['parametric', 'fabrication'],
      keyImages: ['bridge-1.jpg', 'bridge-structure.jpg', 'fabrication-process.jpg']
    },
    {
      id: 6,
      title: 'Bio-composite Tower Prototype',
      year: 2021,
      location: 'Vancouver, Canada',
      collaborators: ['University of British Columbia', 'Scion Research'],
      description: 'Prototype for high-rise construction using bio-based composite materials, demonstrating potential for carbon-negative structural systems.',
      areas: ['materials', 'sustainability'],
      keyImages: ['tower-prototype.jpg', 'bio-composite-detail.jpg', 'assembly-process.jpg']
    },
    {
      id: 7,
      title: 'Structural Optimization Platform',
      year: 2022,
      location: 'Zurich, Switzerland',
      collaborators: ['ETH Zurich', 'Autodesk Research'],
      description: 'Development of a computational platform for multi-objective structural optimization, applied to several built projects.',
      areas: ['computation', 'parametric'],
      keyImages: ['optimization-platform.jpg', 'case-study-1.jpg', 'case-study-2.jpg']
    },
    {
      id: 8,
      title: 'Net-Zero Energy Campus',
      year: 2021,
      location: 'Copenhagen, Denmark',
      collaborators: ['Henning Larsen Architects', 'Ramboll'],
      description: 'Educational campus achieving net-zero energy performance through an integrated approach to passive design, renewable energy, and user behavior.',
      areas: ['sustainability', 'urbanism'],
      keyImages: ['campus-aerial.jpg', 'energy-systems.jpg', 'interior-space.jpg']
    },
    {
      id: 9,
      title: 'Robotically Fabricated Pavilion',
      year: 2022,
      location: 'Tokyo, Japan',
      collaborators: ['University of Tokyo', 'Obayashi Corporation'],
      description: 'Experimental pavilion constructed using custom robotic fabrication processes, demonstrating new possibilities for architectural form and assembly.',
      areas: ['fabrication', 'parametric'],
      keyImages: ['robotic-pavilion.jpg', 'fabrication-robot.jpg', 'assembly-detail.jpg']
    },
    {
      id: 10,
      title: 'Urban Microclimate Modification System',
      year: 2021,
      location: 'Barcelona, Spain',
      collaborators: ['Barcelona City Council', 'Institute for Advanced Architecture of Catalonia'],
      description: 'Network of architectural interventions designed to improve urban microclimate conditions through passive cooling, air movement, and vegetation integration.',
      areas: ['urbanism', 'sustainability'],
      keyImages: ['urban-microclimate.jpg', 'intervention-detail.jpg', 'thermal-imaging.jpg']
    },
    {
      id: 11,
      title: 'Smart Infrastructure Integration Project',
      year: 2022,
      location: 'Seoul, South Korea',
      collaborators: ['Seoul Metropolitan Government', 'Samsung SDS'],
      description: 'Integration of building systems with smart city infrastructure, enabling coordinated management of energy, water, and transportation resources.',
      areas: ['urbanism', 'computation'],
      keyImages: ['smart-infrastructure.jpg', 'data-visualization.jpg', 'system-diagram.jpg']
    }
  ];
  
  export const visualizationTypes = [
    {
      id: 'network',
      name: 'Research Network Visualization',
      description: 'Interactive network diagram showing connections between research areas, publications, and projects.'
    },
    {
      id: 'timeline',
      name: 'Research Timeline',
      description: 'Chronological visualization of research activities and their impacts over time.'
    },
    {
      id: 'impact',
      name: 'Citation Impact Analysis',
      description: 'Visual representation of publication impact through citation metrics and reach.'
    },
    {
      id: 'geo',
      name: 'Geographic Distribution',
      description: 'Map-based visualization showing the global distribution of research projects and collaborations.'
    },
    {
      id: 'thematic',
      name: 'Thematic Clusters',
      description: 'Cluster analysis of research themes and their evolution across publications and projects.'
    }
  ];
  
  export default {
    researchAreas,
    publications,
    projects,
    visualizationTypes
  };