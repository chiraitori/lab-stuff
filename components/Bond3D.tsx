import React, { useMemo } from 'react';
import * as THREE from 'three';
import { IAtom } from '../types';

interface Bond3DProps {
  startAtom: IAtom;
  endAtom: IAtom;
}

export const Bond3D: React.FC<Bond3DProps> = ({ startAtom, endAtom }) => {
  const { position, rotation, length } = useMemo(() => {
    const start = new THREE.Vector3(...startAtom.position);
    const end = new THREE.Vector3(...endAtom.position);
    
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    
    const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    
    // Calculate rotation to align cylinder with the direction vector
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    const rotation = new THREE.Euler().setFromQuaternion(quaternion);

    return { position, rotation, length };
  }, [startAtom.position, endAtom.position]);

  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[0.1, 0.1, length, 12]} />
      <meshStandardMaterial color="#888888" />
    </mesh>
  );
};
