const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../node_modules/three-mesh-bvh/src/utils/ExtensionUtilities.js');

try {
  console.log('Reading file:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the BatchedMesh import line with a null assignment
  content = content.replace(
    /import \* as THREE from 'three';/,
    "import * as THREE from 'three';\n// Mock BatchedMesh which may not be available in current Three.js version"
  );
  
  content = content.replace(
    /const BatchedMesh = THREE\.BatchedMesh \|\| null;/,
    "const BatchedMesh = null; // THREE.BatchedMesh removed to avoid import errors"
  );
  
  console.log('Writing modified file');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully patched ExtensionUtilities.js');
} catch (error) {
  console.error('Error patching file:', error);
  process.exit(1);
} 