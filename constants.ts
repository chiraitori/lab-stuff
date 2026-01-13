import { AtomType, IElementInfo, IMolecule } from './types';

export const ELEMENT_PROPERTIES: Record<AtomType, IElementInfo> = {
  [AtomType.C]: {
    name: 'Carbon',
    color: '#1f2937', // Dark Grey (Slate 800)
    radius: 0.5,
    symbol: 'C',
  },
  [AtomType.H]: {
    name: 'Hydrogen',
    color: '#f3f4f6', // White (Gray 100)
    radius: 0.3,
    symbol: 'H',
  },
  [AtomType.Cl]: {
    name: 'Chlorine',
    color: '#22c55e', // Green
    radius: 0.55,
    symbol: 'Cl',
  },
  [AtomType.Br]: {
    name: 'Bromine',
    color: '#991b1b', // Red/Brown
    radius: 0.65,
    symbol: 'Br',
  },
};

const BL = 1.5; // Bond Length standard

export const MOLECULE_DATABASE: IMolecule[] = [
  // --- ALKANES ---
  {
    id: 'methane',
    name: 'Methane',
    formula: 'CH4',
    category: 'Alkane',
    description: 'Hydrocarbon đơn giản nhất, thành phần chính của khí tự nhiên.',
    atoms: [
      { id: 'c1', type: AtomType.C, position: [0, 0, 0], connectedTo: ['h1', 'h2', 'h3', 'h4'] },
      { id: 'h1', type: AtomType.H, position: [BL*0.6, BL*0.6, BL*0.6], connectedTo: ['c1'] },
      { id: 'h2', type: AtomType.H, position: [BL*0.6, -BL*0.6, -BL*0.6], connectedTo: ['c1'] },
      { id: 'h3', type: AtomType.H, position: [-BL*0.6, BL*0.6, -BL*0.6], connectedTo: ['c1'] },
      { id: 'h4', type: AtomType.H, position: [-BL*0.6, -BL*0.6, BL*0.6], connectedTo: ['c1'] },
    ]
  },
  {
    id: 'ethane',
    name: 'Ethane',
    formula: 'C2H6',
    category: 'Alkane',
    description: 'Một alkane chuỗi thẳng, không màu, không mùi.',
    atoms: [
      { id: 'c1', type: AtomType.C, position: [-0.7, 0, 0], connectedTo: ['c2', 'h1', 'h2', 'h3'] },
      { id: 'c2', type: AtomType.C, position: [0.7, 0, 0], connectedTo: ['c1', 'h4', 'h5', 'h6'] },
      // Hydrogens for C1
      { id: 'h1', type: AtomType.H, position: [-1.2, 0.9, 0], connectedTo: ['c1'] },
      { id: 'h2', type: AtomType.H, position: [-1.2, -0.45, 0.8], connectedTo: ['c1'] },
      { id: 'h3', type: AtomType.H, position: [-1.2, -0.45, -0.8], connectedTo: ['c1'] },
      // Hydrogens for C2
      { id: 'h4', type: AtomType.H, position: [1.2, -0.9, 0], connectedTo: ['c2'] },
      { id: 'h5', type: AtomType.H, position: [1.2, 0.45, -0.8], connectedTo: ['c2'] },
      { id: 'h6', type: AtomType.H, position: [1.2, 0.45, 0.8], connectedTo: ['c2'] },
    ]
  },
  {
    id: 'propane',
    name: 'Propane',
    formula: 'C3H8',
    category: 'Alkane',
    description: 'Nhiên liệu phổ biến cho động cơ, lò nướng.',
    atoms: [
      { id: 'c1', type: AtomType.C, position: [-1.5, -0.5, 0], connectedTo: ['c2', 'h1', 'h2', 'h3'] },
      { id: 'c2', type: AtomType.C, position: [0, 0.5, 0], connectedTo: ['c1', 'c3', 'h4', 'h5'] },
      { id: 'c3', type: AtomType.C, position: [1.5, -0.5, 0], connectedTo: ['c2', 'h6', 'h7', 'h8'] },
      // H for C1
      { id: 'h1', type: AtomType.H, position: [-1.5, -1.5, 0], connectedTo: ['c1'] },
      { id: 'h2', type: AtomType.H, position: [-2.0, -0.2, 0.9], connectedTo: ['c1'] },
      { id: 'h3', type: AtomType.H, position: [-2.0, -0.2, -0.9], connectedTo: ['c1'] },
      // H for C2
      { id: 'h4', type: AtomType.H, position: [0, 1.0, 0.9], connectedTo: ['c2'] },
      { id: 'h5', type: AtomType.H, position: [0, 1.0, -0.9], connectedTo: ['c2'] },
       // H for C3
      { id: 'h6', type: AtomType.H, position: [1.5, -1.5, 0], connectedTo: ['c3'] },
      { id: 'h7', type: AtomType.H, position: [2.0, -0.2, 0.9], connectedTo: ['c3'] },
      { id: 'h8', type: AtomType.H, position: [2.0, -0.2, -0.9], connectedTo: ['c3'] },
    ]
  },
  {
    id: 'n-butane',
    name: 'n-Butane',
    formula: 'C4H10',
    category: 'Alkane',
    description: 'Đồng phân mạch thẳng của Butane.',
    atoms: [
        // Carbon Chain Zig-Zag
        { id: 'c1', type: AtomType.C, position: [-2.2, -0.5, 0], connectedTo: ['c2', 'h1-1', 'h1-2', 'h1-3'] },
        { id: 'c2', type: AtomType.C, position: [-0.7, 0.5, 0], connectedTo: ['c1', 'c3', 'h2-1', 'h2-2'] },
        { id: 'c3', type: AtomType.C, position: [0.7, -0.5, 0], connectedTo: ['c2', 'c4', 'h3-1', 'h3-2'] },
        { id: 'c4', type: AtomType.C, position: [2.2, 0.5, 0], connectedTo: ['c3', 'h4-1', 'h4-2', 'h4-3'] },

        // Hydrogens on C1 (End)
        { id: 'h1-1', type: AtomType.H, position: [-2.2, -1.6, 0], connectedTo: ['c1'] },
        { id: 'h1-2', type: AtomType.H, position: [-2.9, -0.2, 0.9], connectedTo: ['c1'] },
        { id: 'h1-3', type: AtomType.H, position: [-2.9, -0.2, -0.9], connectedTo: ['c1'] },

        // Hydrogens on C2 (Middle)
        { id: 'h2-1', type: AtomType.H, position: [-0.7, 0.5, 1.1], connectedTo: ['c2'] },
        { id: 'h2-2', type: AtomType.H, position: [-0.7, 1.6, -0.5], connectedTo: ['c2'] },

        // Hydrogens on C3 (Middle)
        { id: 'h3-1', type: AtomType.H, position: [0.7, -0.5, 1.1], connectedTo: ['c3'] },
        { id: 'h3-2', type: AtomType.H, position: [0.7, -1.6, -0.5], connectedTo: ['c3'] },

        // Hydrogens on C4 (End)
        { id: 'h4-1', type: AtomType.H, position: [2.2, 1.6, 0], connectedTo: ['c4'] },
        { id: 'h4-2', type: AtomType.H, position: [2.9, 0.2, 0.9], connectedTo: ['c4'] },
        { id: 'h4-3', type: AtomType.H, position: [2.9, 0.2, -0.9], connectedTo: ['c4'] },
    ]
  },
  {
    id: 'isobutane',
    name: 'Isobutane',
    formula: 'C4H10',
    category: 'Alkane',
    description: 'Đồng phân mạch nhánh của Butane (2-methylpropane).',
    atoms: [
        // Central Carbon
        { id: 'c1', type: AtomType.C, position: [0, 0.2, 0], connectedTo: ['c2', 'c3', 'c4', 'h1'] },
        
        // Methyl Carbons
        { id: 'c2', type: AtomType.C, position: [0, 1.7, 0], connectedTo: ['c1', 'h2-1', 'h2-2', 'h2-3'] }, // Top
        { id: 'c3', type: AtomType.C, position: [-1.3, -0.7, 0.8], connectedTo: ['c1', 'h3-1', 'h3-2', 'h3-3'] }, // Left Front
        { id: 'c4', type: AtomType.C, position: [1.3, -0.7, -0.8], connectedTo: ['c1', 'h4-1', 'h4-2', 'h4-3'] }, // Right Back

        // H on Central C1
        { id: 'h1', type: AtomType.H, position: [0, 0.2, -1.1], connectedTo: ['c1'] },

        // H on C2 (Top Methyl)
        { id: 'h2-1', type: AtomType.H, position: [0, 2.0, 1.1], connectedTo: ['c2'] },
        { id: 'h2-2', type: AtomType.H, position: [-0.9, 2.0, -0.5], connectedTo: ['c2'] },
        { id: 'h2-3', type: AtomType.H, position: [0.9, 2.0, -0.5], connectedTo: ['c2'] },

        // H on C3 (Left Front Methyl)
        { id: 'h3-1', type: AtomType.H, position: [-1.3, -0.5, 1.9], connectedTo: ['c3'] },
        { id: 'h3-2', type: AtomType.H, position: [-2.2, -0.3, 0.4], connectedTo: ['c3'] },
        { id: 'h3-3', type: AtomType.H, position: [-1.3, -1.8, 0.8], connectedTo: ['c3'] },

        // H on C4 (Right Back Methyl)
        { id: 'h4-1', type: AtomType.H, position: [1.3, -0.5, -1.9], connectedTo: ['c4'] },
        { id: 'h4-2', type: AtomType.H, position: [2.2, -0.3, -0.4], connectedTo: ['c4'] },
        { id: 'h4-3', type: AtomType.H, position: [1.3, -1.8, -0.8], connectedTo: ['c4'] },
    ]
  },
  {
    id: 'n-pentane',
    name: 'n-Pentane',
    formula: 'C5H12',
    category: 'Alkane',
    description: 'Alkane mạch thẳng với 5 nguyên tử carbon, chất lỏng dễ bay hơi.',
    atoms: [
        // Carbon Chain Zig-Zag (5 carbons)
        { id: 'c1', type: AtomType.C, position: [-3.0, -0.5, 0], connectedTo: ['c2', 'h1-1', 'h1-2', 'h1-3'] },
        { id: 'c2', type: AtomType.C, position: [-1.5, 0.5, 0], connectedTo: ['c1', 'c3', 'h2-1', 'h2-2'] },
        { id: 'c3', type: AtomType.C, position: [0, -0.5, 0], connectedTo: ['c2', 'c4', 'h3-1', 'h3-2'] },
        { id: 'c4', type: AtomType.C, position: [1.5, 0.5, 0], connectedTo: ['c3', 'c5', 'h4-1', 'h4-2'] },
        { id: 'c5', type: AtomType.C, position: [3.0, -0.5, 0], connectedTo: ['c4', 'h5-1', 'h5-2', 'h5-3'] },

        // Hydrogens C1
        { id: 'h1-1', type: AtomType.H, position: [-3.0, -1.6, 0], connectedTo: ['c1'] },
        { id: 'h1-2', type: AtomType.H, position: [-3.7, -0.2, 0.9], connectedTo: ['c1'] },
        { id: 'h1-3', type: AtomType.H, position: [-3.7, -0.2, -0.9], connectedTo: ['c1'] },
        
        // Hydrogens C2
        { id: 'h2-1', type: AtomType.H, position: [-1.5, 0.5, 1.1], connectedTo: ['c2'] },
        { id: 'h2-2', type: AtomType.H, position: [-1.5, 1.6, -0.5], connectedTo: ['c2'] },

        // Hydrogens C3
        { id: 'h3-1', type: AtomType.H, position: [0, -0.5, 1.1], connectedTo: ['c3'] },
        { id: 'h3-2', type: AtomType.H, position: [0, -1.6, -0.5], connectedTo: ['c3'] },

        // Hydrogens C4
        { id: 'h4-1', type: AtomType.H, position: [1.5, 0.5, 1.1], connectedTo: ['c4'] },
        { id: 'h4-2', type: AtomType.H, position: [1.5, 1.6, -0.5], connectedTo: ['c4'] },

        // Hydrogens C5
        { id: 'h5-1', type: AtomType.H, position: [3.0, -1.6, 0], connectedTo: ['c5'] },
        { id: 'h5-2', type: AtomType.H, position: [3.7, -0.2, 0.9], connectedTo: ['c5'] },
        { id: 'h5-3', type: AtomType.H, position: [3.7, -0.2, -0.9], connectedTo: ['c5'] },
    ]
  },
  {
    id: 'neopentane',
    name: 'Neopentane',
    formula: 'C5H12',
    category: 'Alkane',
    description: 'Đồng phân 2,2-dimethylpropane. Có cấu trúc tứ diện đối xứng cao.',
    atoms: [
        // Center
        { id: 'c0', type: AtomType.C, position: [0, 0, 0], connectedTo: ['c1', 'c2', 'c3', 'c4'] },
        
        // C1 Top
        { id: 'c1', type: AtomType.C, position: [0, 1.5, 0], connectedTo: ['c0', 'h1-1', 'h1-2', 'h1-3'] },
        // C2 Right Bottom
        { id: 'c2', type: AtomType.C, position: [1.4, -0.5, 0], connectedTo: ['c0', 'h2-1', 'h2-2', 'h2-3'] },
        // C3 Left Front
        { id: 'c3', type: AtomType.C, position: [-0.7, -0.5, 1.2], connectedTo: ['c0', 'h3-1', 'h3-2', 'h3-3'] },
        // C4 Left Back
        { id: 'c4', type: AtomType.C, position: [-0.7, -0.5, -1.2], connectedTo: ['c0', 'h4-1', 'h4-2', 'h4-3'] },

        // Hs C1
        { id: 'h1-1', type: AtomType.H, position: [0, 1.8, 1.1], connectedTo: ['c1'] },
        { id: 'h1-2', type: AtomType.H, position: [-0.9, 1.8, -0.5], connectedTo: ['c1'] },
        { id: 'h1-3', type: AtomType.H, position: [0.9, 1.8, -0.5], connectedTo: ['c1'] },

        // Hs C2
        { id: 'h2-1', type: AtomType.H, position: [1.7, -0.2, 1.0], connectedTo: ['c2'] },
        { id: 'h2-2', type: AtomType.H, position: [1.7, -0.2, -1.0], connectedTo: ['c2'] },
        { id: 'h2-3', type: AtomType.H, position: [1.9, -1.5, 0], connectedTo: ['c2'] },
        
        // Hs C3
        { id: 'h3-1', type: AtomType.H, position: [-0.4, -0.2, 2.2], connectedTo: ['c3'] },
        { id: 'h3-2', type: AtomType.H, position: [-1.8, -0.2, 1.2], connectedTo: ['c3'] },
        { id: 'h3-3', type: AtomType.H, position: [-0.7, -1.6, 1.2], connectedTo: ['c3'] },

        // Hs C4
        { id: 'h4-1', type: AtomType.H, position: [-0.4, -0.2, -2.2], connectedTo: ['c4'] },
        { id: 'h4-2', type: AtomType.H, position: [-1.8, -0.2, -1.2], connectedTo: ['c4'] },
        { id: 'h4-3', type: AtomType.H, position: [-0.7, -1.6, -1.2], connectedTo: ['c4'] },
    ]
  },

  // --- ALKENES ---
  {
    id: 'ethene',
    name: 'Ethene (Ethylene)',
    formula: 'C2H4',
    category: 'Alkene',
    description: 'Hydrocarbon đơn giản nhất có liên kết đôi. Hormone thực vật làm chín quả.',
    atoms: [
      { id: 'c1', type: AtomType.C, position: [-0.6, 0, 0], connectedTo: ['c2', 'h1', 'h2'] },
      { id: 'c2', type: AtomType.C, position: [0.6, 0, 0], connectedTo: ['c1', 'h3', 'h4'] },
      { id: 'h1', type: AtomType.H, position: [-1.2, 0.9, 0], connectedTo: ['c1'] },
      { id: 'h2', type: AtomType.H, position: [-1.2, -0.9, 0], connectedTo: ['c1'] },
      { id: 'h3', type: AtomType.H, position: [1.2, 0.9, 0], connectedTo: ['c2'] },
      { id: 'h4', type: AtomType.H, position: [1.2, -0.9, 0], connectedTo: ['c2'] },
    ]
  },
  {
    id: 'propene',
    name: 'Propene',
    formula: 'C3H6',
    category: 'Alkene',
    description: 'Alkene quan trọng thứ hai, dùng để sản xuất nhựa Polypropylene (PP).',
    atoms: [
      // Double bond C1=C2
      { id: 'c1', type: AtomType.C, position: [-1.2, -0.5, 0], connectedTo: ['c2', 'h1-1', 'h1-2'] },
      { id: 'c2', type: AtomType.C, position: [0, 0, 0], connectedTo: ['c1', 'c3', 'h2'] },
      // Methyl group C3
      { id: 'c3', type: AtomType.C, position: [1.2, 0.7, 0], connectedTo: ['c2', 'h3-1', 'h3-2', 'h3-3'] },

      // H on C1
      { id: 'h1-1', type: AtomType.H, position: [-1.2, -1.6, 0], connectedTo: ['c1'] },
      { id: 'h1-2', type: AtomType.H, position: [-2.1, 0.0, 0], connectedTo: ['c1'] },
      
      // H on C2
      { id: 'h2', type: AtomType.H, position: [0, -1.1, 0], connectedTo: ['c2'] },

      // H on C3 (Methyl) - Tetrahedral
      { id: 'h3-1', type: AtomType.H, position: [1.2, 1.3, 0.9], connectedTo: ['c3'] },
      { id: 'h3-2', type: AtomType.H, position: [1.2, 1.3, -0.9], connectedTo: ['c3'] },
      { id: 'h3-3', type: AtomType.H, position: [2.1, 0.1, 0], connectedTo: ['c3'] },
    ]
  },
  {
    id: 'cis-2-butene',
    name: 'cis-2-Butene',
    formula: 'C4H8',
    category: 'Alkene',
    description: 'Đồng phân hình học (Z) của Butene, hai nhóm methyl nằm cùng phía.',
    atoms: [
      // C=C double bond horizontal
      { id: 'c2', type: AtomType.C, position: [-0.6, 0, 0], connectedTo: ['c3', 'c1', 'h2'] },
      { id: 'c3', type: AtomType.C, position: [0.6, 0, 0], connectedTo: ['c2', 'c4', 'h3'] },
      
      // Methyl groups (Top side)
      { id: 'c1', type: AtomType.C, position: [-1.6, 1.0, 0], connectedTo: ['c2', 'h1-1', 'h1-2', 'h1-3'] },
      { id: 'c4', type: AtomType.C, position: [1.6, 1.0, 0], connectedTo: ['c3', 'h4-1', 'h4-2', 'h4-3'] },

      // Hydrogens on double bond (Bottom side)
      { id: 'h2', type: AtomType.H, position: [-0.6, -1.1, 0], connectedTo: ['c2'] },
      { id: 'h3', type: AtomType.H, position: [0.6, -1.1, 0], connectedTo: ['c3'] },

      // Hydrogens on C1
      { id: 'h1-1', type: AtomType.H, position: [-1.6, 1.5, 1.0], connectedTo: ['c1'] },
      { id: 'h1-2', type: AtomType.H, position: [-1.6, 1.5, -1.0], connectedTo: ['c1'] },
      { id: 'h1-3', type: AtomType.H, position: [-2.5, 0.5, 0], connectedTo: ['c1'] },

      // Hydrogens on C4
      { id: 'h4-1', type: AtomType.H, position: [1.6, 1.5, 1.0], connectedTo: ['c4'] },
      { id: 'h4-2', type: AtomType.H, position: [1.6, 1.5, -1.0], connectedTo: ['c4'] },
      { id: 'h4-3', type: AtomType.H, position: [2.5, 0.5, 0], connectedTo: ['c4'] },
    ]
  },
  {
    id: 'trans-2-butene',
    name: 'trans-2-Butene',
    formula: 'C4H8',
    category: 'Alkene',
    description: 'Đồng phân hình học (E) của Butene, hai nhóm methyl nằm khác phía.',
    atoms: [
      // C=C double bond horizontal
      { id: 'c2', type: AtomType.C, position: [-0.6, 0, 0], connectedTo: ['c3', 'c1', 'h2'] },
      { id: 'c3', type: AtomType.C, position: [0.6, 0, 0], connectedTo: ['c2', 'c4', 'h3'] },
      
      // Methyl C1 (Top Left)
      { id: 'c1', type: AtomType.C, position: [-1.6, 1.0, 0], connectedTo: ['c2', 'h1-1', 'h1-2', 'h1-3'] },
      // Methyl C4 (Bottom Right)
      { id: 'c4', type: AtomType.C, position: [1.6, -1.0, 0], connectedTo: ['c3', 'h4-1', 'h4-2', 'h4-3'] },

      // H on C2 (Bottom Left)
      { id: 'h2', type: AtomType.H, position: [-0.6, -1.1, 0], connectedTo: ['c2'] },
      // H on C3 (Top Right)
      { id: 'h3', type: AtomType.H, position: [0.6, 1.1, 0], connectedTo: ['c3'] },

      // Hydrogens on C1
      { id: 'h1-1', type: AtomType.H, position: [-1.6, 1.5, 1.0], connectedTo: ['c1'] },
      { id: 'h1-2', type: AtomType.H, position: [-1.6, 1.5, -1.0], connectedTo: ['c1'] },
      { id: 'h1-3', type: AtomType.H, position: [-2.5, 0.5, 0], connectedTo: ['c1'] },

      // Hydrogens on C4
      { id: 'h4-1', type: AtomType.H, position: [1.6, -1.5, 1.0], connectedTo: ['c4'] },
      { id: 'h4-2', type: AtomType.H, position: [1.6, -1.5, -1.0], connectedTo: ['c4'] },
      { id: 'h4-3', type: AtomType.H, position: [2.5, -0.5, 0], connectedTo: ['c4'] },
    ]
  },

  // --- ALKYNES ---
  {
    id: 'ethyne',
    name: 'Ethyne (Acetylene)',
    formula: 'C2H2',
    category: 'Alkyne',
    description: 'Hydrocarbon có liên kết ba. Dùng trong đèn hàn xì.',
    atoms: [
      { id: 'c1', type: AtomType.C, position: [-0.6, 0, 0], connectedTo: ['c2', 'h1'] },
      { id: 'c2', type: AtomType.C, position: [0.6, 0, 0], connectedTo: ['c1', 'h2'] },
      { id: 'h1', type: AtomType.H, position: [-1.7, 0, 0], connectedTo: ['c1'] },
      { id: 'h2', type: AtomType.H, position: [1.7, 0, 0], connectedTo: ['c2'] },
    ]
  },
  {
    id: 'propyne',
    name: 'Propyne',
    formula: 'C3H4',
    category: 'Alkyne',
    description: 'Còn gọi là Methylacetylene, dùng làm nhiên liệu tên lửa.',
    atoms: [
      // C-C#C Linear Backbone
      { id: 'c3', type: AtomType.C, position: [-1.5, 0, 0], connectedTo: ['c2', 'h3-1', 'h3-2', 'h3-3'] }, // Methyl C
      { id: 'c2', type: AtomType.C, position: [0, 0, 0], connectedTo: ['c3', 'c1'] }, // Middle C
      { id: 'c1', type: AtomType.C, position: [1.2, 0, 0], connectedTo: ['c2', 'h1'] }, // Terminal C

      // Terminal H (Linear)
      { id: 'h1', type: AtomType.H, position: [2.2, 0, 0], connectedTo: ['c1'] },

      // Methyl Hydrogens (Tetrahedral)
      { id: 'h3-1', type: AtomType.H, position: [-1.8, 0.9, 0], connectedTo: ['c3'] },
      { id: 'h3-2', type: AtomType.H, position: [-1.8, -0.45, 0.8], connectedTo: ['c3'] },
      { id: 'h3-3', type: AtomType.H, position: [-1.8, -0.45, -0.8], connectedTo: ['c3'] },
    ]
  }
];
