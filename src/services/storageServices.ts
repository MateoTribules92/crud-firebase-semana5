import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadSpeciesImage = async (
  localUri: string,
  speciesId: string,
): Promise<string> => {
  const response = await fetch(localUri);
  const blob = await response.blob();

  const imageRef = ref(storage, `species/${speciesId}.jpg`);

  await uploadBytes(imageRef, blob);

  const downloadUrl = await getDownloadURL(imageRef);
  return downloadUrl;
};

//Eliminar imagen
export const deleteSpeciesImage = async (speciesId: string): Promise<void> => {
  const imageRef = ref(storage, `species/${speciesId}.jpg`);
  await deleteObject(imageRef);
};