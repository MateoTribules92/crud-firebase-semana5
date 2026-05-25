import { useEffect, useState } from "react";
import { Species } from "../types/species";
import { subscribeToSpecies } from "../services/speciesServices";

interface UseSpeciesReturn {
  species: Species[];
  loading: boolean;
  error: string | null;
}

export const useSpecies = (): UseSpeciesReturn => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSpecies(
      (data) => {
        setSpecies(data);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
    );
    //Cancelar subcripción al desmontar el componente
    return () => unsubscribe();
  }, []);
  return { species, loading, error };
};