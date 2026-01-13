import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stage, Sparkles } from '@react-three/drei';
import { Atom3D } from './Atom3D';
import { Bond3D } from './Bond3D';
import { IAtom, AtomType } from '../types';

interface MoleculeSceneProps {
  atoms: IAtom[];
  onAtomClick?: (id: string, type: AtomType) => void;
  canInteract?: boolean;
  isCracking?: boolean;
}

export const MoleculeScene: React.FC<MoleculeSceneProps> = ({ atoms, onAtomClick, canInteract = false, isCracking = false }) => {
  // Logic to draw bonds: Check the 'connectedTo' property
  const bonds = atoms.flatMap(atom => {
    return atom.connectedTo.map(targetId => {
        const target = atoms.find(a => a.id === targetId);
        if (!target) return null;
        // Avoid drawing bond twice. Only draw if atom.id < target.id lexicographically
        if (atom.id > target.id) return null;
        
        return <Bond3D key={`${atom.id}-${target.id}`} startAtom={atom} endAtom={target} />;
    });
  });

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Grid Pattern Overlay for "Lab" feel */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
            backgroundImage: `linear-gradient(#4f4f4f 1px, transparent 1px), linear-gradient(90deg, #4f4f4f 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Cracking Overlay Gradient */}
      {isCracking && (
        <div className="absolute inset-0 z-0 bg-orange-600/10 pointer-events-none animate-pulse"></div>
      )}

      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          
          <Stage environment={null} intensity={0.5} shadows={false}>
            <group>
              {atoms.map((atom) => (
                <Atom3D 
                  key={atom.id} 
                  atom={atom} 
                  onClick={(id, type) => onAtomClick && onAtomClick(id, type)} 
                  hoverable={canInteract}
                  isCracking={isCracking}
                />
              ))}
              {bonds}
              
              {/* Fire Effect for Cracking */}
              {isCracking && (
                <Sparkles 
                  count={60} 
                  scale={6} 
                  size={5} 
                  speed={0.8} 
                  opacity={0.8} 
                  color="#ff5500" 
                  noise={0.5}
                />
              )}
            </group>
          </Stage>
          
          <OrbitControls makeDefault autoRotate autoRotateSpeed={canInteract ? 0 : 0.5} minPolarAngle={0} maxPolarAngle={Math.PI} />
        </Suspense>
      </Canvas>
    </div>
  );
};