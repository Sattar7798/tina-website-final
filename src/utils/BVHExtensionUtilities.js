import { Ray, Matrix4, Mesh, Vector3, Sphere, REVISION } from 'three';
import { MeshBVH } from 'three-mesh-bvh/src/core/MeshBVH.js';

const IS_REVISION_166 = parseInt(REVISION) >= 166;
const ray = /* @__PURE__ */ new Ray();
const direction = /* @__PURE__ */ new Vector3();
const tmpInverseMatrix = /* @__PURE__ */ new Matrix4();
const origMeshRaycastFunc = Mesh.prototype.raycast;
const _worldScale = /* @__PURE__ */ new Vector3();

export function acceleratedRaycast(raycaster, intersects) {
  acceleratedMeshRaycast.call(this, raycaster, intersects);
}

function acceleratedMeshRaycast(raycaster, intersects) {
  if (this.geometry.boundsTree) {
    if (this.material === undefined) return;

    tmpInverseMatrix.copy(this.matrixWorld).invert();
    ray.copy(raycaster.ray).applyMatrix4(tmpInverseMatrix);

    _worldScale.setFromMatrixScale(this.matrixWorld);
    direction.copy(ray.direction).multiply(_worldScale);

    const scaleFactor = direction.length();
    const near = raycaster.near / scaleFactor;
    const far = raycaster.far / scaleFactor;

    const bvh = this.geometry.boundsTree;
    if (raycaster.firstHitOnly === true) {
      const hit = convertRaycastIntersect(bvh.raycastFirst(ray, this.material, near, far), this, raycaster);
      if (hit) {
        intersects.push(hit);
      }
    } else {
      const hits = bvh.raycast(ray, this.material, near, far);
      for (let i = 0, l = hits.length; i < l; i++) {
        const hit = convertRaycastIntersect(hits[i], this, raycaster);
        if (hit) {
          intersects.push(hit);
        }
      }
    }
  } else {
    origMeshRaycastFunc.call(this, raycaster, intersects);
  }
}

export function computeBoundsTree(options = {}) {
  this.boundsTree = new MeshBVH(this, options);
  return this.boundsTree;
}

export function disposeBoundsTree() {
  this.boundsTree = null;
}

// Helper function for converting raycast hit to standard format
function convertRaycastIntersect(hit, object, raycaster) {
  if (hit === null) {
    return null;
  }

  return {
    distance: hit.distance,
    point: new Vector3().copy(hit.point),
    object: object,
    face: hit.face,
    faceIndex: hit.faceIndex,
    uv: hit.uv ? new Vector3().copy(hit.uv) : undefined,
    uv2: hit.uv2 ? new Vector3().copy(hit.uv2) : undefined,
    normal: hit.normal ? new Vector3().copy(hit.normal) : undefined,
    instanceId: hit.instanceId
  };
} 