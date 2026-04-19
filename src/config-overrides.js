const path = require('path');

module.exports = function override(config, env) {
  // Add an alias for three-mesh-bvh to use our mock instead
  config.resolve.alias = {
    ...config.resolve.alias,
    'three-mesh-bvh/src/utils/ExtensionUtilities.js': path.resolve(__dirname, 'mocks/three-mesh-bvh.js'),
    'three-mesh-bvh/src/core/MeshBVH.js': path.resolve(__dirname, 'mocks/three-mesh-bvh.js'),
    'three-mesh-bvh/src': path.resolve(__dirname, 'mocks/three-mesh-bvh.js'),
    'three-mesh-bvh': path.resolve(__dirname, 'mocks/three-mesh-bvh.js')
  };
  
  return config;
}; 