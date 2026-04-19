// src/constants/colors.js

/**
 * Color palette for the website
 * These colors are used throughout the application to maintain visual consistency
 */

// Primary color palette
export const primary = {
    50: '#f0f8ff',
    100: '#e0f1fe',
    200: '#bae3fd',
    300: '#7dcffc',
    400: '#3ab6f7',
    500: '#1e9de8',
    600: '#0c7cc7',
    700: '#0d65a3',
    800: '#0f5686',
    900: '#12476f',
    950: '#0c2e4a'
  };
  
  // Secondary color palette
  export const secondary = {
    50: '#f6f8f9',
    100: '#edf1f3',
    200: '#dee7eb',
    300: '#c4d6de',
    400: '#a3bccb',
    500: '#7f9eb0',
    600: '#668496',
    700: '#54707f',
    800: '#485e6a',
    900: '#3e5059',
    950: '#263137'
  };
  
  // Accent color palette
  export const accent = {
    50: '#fdf3f3',
    100: '#fce5e5',
    200: '#fbcfcf',
    300: '#f7aeae',
    400: '#f18080',
    500: '#e65757',
    600: '#d13939',
    700: '#b02a2a',
    800: '#912727',
    900: '#782626',
    950: '#411010'
  };
  
  // Neutral color palette
  export const neutral = {
    50: '#f8f8f8',
    100: '#f0f0f0',
    200: '#e4e4e4',
    300: '#d1d1d1',
    400: '#b0b0b0',
    500: '#909090',
    600: '#6e6e6e',
    700: '#5a5a5a',
    800: '#484848',
    900: '#3b3b3b',
    950: '#272727'
  };
  
  // Semantic colors for specific purposes
  export const semantic = {
    success: {
      light: '#dcf5e8',
      main: '#38c977',
      dark: '#2a9d5d'
    },
    warning: {
      light: '#fff8e0',
      main: '#f5b82e',
      dark: '#cf9821'
    },
    error: {
      light: '#fee7e8',
      main: '#ef4b53',
      dark: '#d13239'
    },
    info: {
      light: '#e3f2fd',
      main: '#2196f3',
      dark: '#0b79d0'
    }
  };
  
  // Material property visualization colors
  export const materials = {
    compressive: '#4a90e2',
    tensile: '#e74c3c',
    thermal: '#f39c12',
    density: '#8e44ad',
    environmental: '#2ecc71',
    lifespan: '#16a085'
  };
  
  // Research area visualization colors
  export const research = {
    adaptive: '#e74c3c',
    parametric: '#3498db',
    materials: '#9b59b6',
    computation: '#f1c40f',
    sustainability: '#2ecc71',
    fabrication: '#e67e22',
    urbanism: '#1abc9c'
  };
  
  // Visualization colors (sequential and diverging scales)
  export const visualization = {
    sequential: [
      '#e0f7fa',
      '#b2ebf2',
      '#80deea',
      '#4dd0e1',
      '#26c6da',
      '#00acc1',
      '#0097a7',
      '#00838f',
      '#006064'
    ],
    diverging: [
      '#d73027',
      '#f46d43',
      '#fdae61',
      '#fee090',
      '#ffffbf',
      '#e0f3f8',
      '#abd9e9',
      '#74add1',
      '#4575b4'
    ],
    category10: [
      '#1f77b4',
      '#ff7f0e',
      '#2ca02c',
      '#d62728',
      '#9467bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#bcbd22',
      '#17becf'
    ]
  };
  
  // Theme configuration
  export const theme = {
    light: {
      background: '#ffffff',
      surface: '#f8f8f8',
      text: {
        primary: '#272727',
        secondary: '#545454',
        disabled: '#9e9e9e'
      },
      divider: 'rgba(0, 0, 0, 0.12)'
    },
    dark: {
      background: '#121212',
      surface: '#1e1e1e',
      text: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
        disabled: '#6e6e6e'
      },
      divider: 'rgba(255, 255, 255, 0.12)'
    }
  };
  
  export default {
    primary,
    secondary,
    accent,
    neutral,
    semantic,
    materials,
    research,
    visualization,
    theme
  };