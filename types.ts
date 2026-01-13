export enum AtomType {
  C = 'C',
  H = 'H',
  Cl = 'Cl',
  Br = 'Br',
}

export type MoleculeCategory = 'Alkane' | 'Alkene' | 'Alkyne';

export interface IAtom {
  id: string;
  type: AtomType;
  position: [number, number, number];
  connectedTo: string[]; // IDs of connected atoms
}

export interface IMolecule {
  id: string;
  name: string;
  formula: string;
  category: MoleculeCategory;
  description: string;
  atoms: IAtom[];
}

export interface IElementInfo {
  name: string;
  color: string;
  radius: number;
  symbol: string;
}
