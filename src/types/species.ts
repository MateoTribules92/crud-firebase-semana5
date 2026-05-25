export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  habitat: string;
  imageUrl: string;
  createdAt: number;        // ← número Unix (serverTimestamp de RTDB)
}

// Datos del formulario — sin id ni createdAt (los genera Firebase)
export type SpeciesFormValues = Omit<Species, 'id' | 'createdAt'>;