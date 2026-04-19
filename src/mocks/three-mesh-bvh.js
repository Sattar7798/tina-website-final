// Mock module for three-mesh-bvh to prevent import errors
import { MeshBVH } from '../utils/MeshBVH.js';
import * as ExtensionUtilities from '../utils/FixedExtensionUtilities.js';

// Default export for full module
export default {
  MeshBVH,
  ...ExtensionUtilities,
  src: {
    core: {
      MeshBVH
    },
    utils: {
      ExtensionUtilities
    }
  }
};

// Re-export things for direct imports
export { MeshBVH };
export { 
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
  computeBatchedBoundsTree,
  disposeBatchedBoundsTree
} from '../utils/FixedExtensionUtilities.js'; 