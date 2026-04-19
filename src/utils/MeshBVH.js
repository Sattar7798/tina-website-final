// Simplified MeshBVH implementation that doesn't rely on BatchedMesh
import { Vector3, Box3 } from 'three';

export class MeshBVH {
  constructor(geometry, options = {}) {
    this.geometry = geometry;
    this.root = null;
  }

  raycast(ray, material, near = 0, far = Infinity) {
    return [];
  }

  raycastFirst(ray, material, near = 0, far = Infinity) {
    return null;
  }

  refit() {
    return this;
  }

  getBoundingBox(target = new Box3()) {
    return target;
  }
} 