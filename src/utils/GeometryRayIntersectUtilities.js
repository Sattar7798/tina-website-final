// Simple implementation of the convertRaycastIntersect function
import { Vector3 } from 'three';

export function convertRaycastIntersect(hit, object, raycaster) {
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