import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { AtomType, IAtom } from '../types';
import { ELEMENT_PROPERTIES } from '../constants';

interface Atom3DProps {
  atom: IAtom;
  onClick: (atomId: string, currentType: AtomType) => void;
  hoverable: boolean;
  isCracking?: boolean;
}

export const Atom3D: React.FC<Atom3DProps> = ({ atom, onClick, hoverable, isCracking = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [justChanged, setJustChanged] = useState(false);

  const props = ELEMENT_PROPERTIES[atom.type];
  
  // Trigger animation when atom type changes (substitution)
  useEffect(() => {
    setJustChanged(true);
    const timer = setTimeout(() => setJustChanged(false), 400);
    return () => clearTimeout(timer);
  }, [atom.type]);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      let targetScale = 1;
      
      if (justChanged) {
        // Pop effect when transformed
        targetScale = 1.5; 
      } else if (clicked) {
        // Press effect
        targetScale = 0.8;
      } else if (hovered && hoverable) {
        // Hover breathing effect
        targetScale = 1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      }

      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.2);

      // Cracking Animation: Vibration and Red Color
      if (isCracking) {
        // Random intense vibration
        meshRef.current.position.x = (Math.random() - 0.5) * 0.15;
        meshRef.current.position.y = (Math.random() - 0.5) * 0.15;
        meshRef.current.position.z = (Math.random() - 0.5) * 0.15;

        // Change color to glowing red
        (meshRef.current.material as THREE.MeshStandardMaterial).color.lerp(new THREE.Color('#ff2200'), 0.1);
        (meshRef.current.material as THREE.MeshStandardMaterial).emissive = new THREE.Color('#aa0000');
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5;
      } else {
        // Reset position
        meshRef.current.position.set(0, 0, 0);
        
        // Reset color
        (meshRef.current.material as THREE.MeshStandardMaterial).color.lerp(new THREE.Color(props.color), 0.1);
        (meshRef.current.material as THREE.MeshStandardMaterial).emissive = new THREE.Color('#000000');
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
      }
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (hoverable && !isCracking) {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
      onClick(atom.id, atom.type);
    }
  };

  return (
    <group position={new THREE.Vector3(...atom.position)}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (hoverable && !isCracking) {
            setHover(true);
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHover(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[props.radius, 32, 32]} />
        <meshStandardMaterial
          color={props.color}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      
      {/* Atom Label */}
      <Html position={[0, 0, 0]} center pointerEvents="none">
        <div 
          className={`text-xs font-bold select-none transition-all duration-300 ${
            (props.color === '#FFFFFF' || props.color === '#f3f4f6') && !isCracking ? 'text-black' : 'text-white'
          }`}
          style={{ 
            opacity: hovered ? 1 : 0.7,
            transform: hovered ? 'scale(1.2)' : 'scale(1)',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          {props.symbol}
        </div>
      </Html>
    </group>
  );
};