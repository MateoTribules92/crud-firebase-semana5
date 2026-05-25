import {
  DataSnapshot,
  get,
  off,
  onValue,
  push,
  ref,
  serverTimestamp,
  set,
  update,
  remove
} from "firebase/database";
import { Species, SpeciesFormValues } from "../types/species";
import { db } from "./firebaseConfig";

const SPECIES_PATH = "species";

//Convertir  snapshot de RTDB - array de Species
const snapshotToArray = (snapshot: DataSnapshot): Species[] => {
  const val = snapshot.val() as Record<string, Omit<Species, "id">> | null;
  if (!val) return [];

  return Object.entries(val).map(([id, data]) => ({
    id,
    commonName: data.commonName ?? "",
    scientificName: data.scientificName ?? "",
    habitat: data.habitat ?? "",
    imageUrl: data.imageUrl ?? "",
    createdAt: data.createdAt,
  }));
};

//Create - RealTime Database
export const addSpecies = async (
  values: SpeciesFormValues,
): Promise<string> => {
  const speciesRef = ref(db, SPECIES_PATH);
  const newRef = push(speciesRef);
  await set(newRef, {
    ...values,
    createdAt: serverTimestamp(),
  });
  return newRef.key as string;
};

//Read
export const subscribeToSpecies = (
  onData: (species: Species[]) => void,
  onError: (error: Error) => void,
): (() => void) => {
  const speciesRef = ref(db, SPECIES_PATH);
  onValue(
    speciesRef,
    (snapshot) => {
      const data = snapshotToArray(snapshot);
      data.sort((a, b) => (b.createdAt as number) - (a.createdAt as number));
      onData(data);
    },
    (error) => onError(error),
  );
  return () => off(speciesRef, "value");
};

//Read con ID
export const getSpeciesById = async (id: string): Promise<Species | null> => {
  const speciesRef = ref(db, `${SPECIES_PATH}/${id}`);
  const snapshot = await get(speciesRef);

  if (!snapshot.exists()) return null;

  return {
    id,
    ...(snapshot.val() as Omit<Species, "id">),
  };
};

//Update - RealTime Database
export const updateSpecies = async (
  id: string,
  values: Partial<SpeciesFormValues>,
): Promise<void> => {
  const speciesRef = ref(db, `${SPECIES_PATH}/${id}`);
  await update(speciesRef, {
    ...values,
    updatedAt: serverTimestamp(),
  });
};

//Delete - RealTime Database
export const deleteSpecies = async (id: string): Promise<void> => {
  const speciesRef = ref(db, `${SPECIES_PATH}/${id}`);
  await remove(speciesRef);
};