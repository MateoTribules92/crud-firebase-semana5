import { StackScreenProps } from "@react-navigation/stack";

// Tipado de navegación
export type RootStackParamList = {
  Home: undefined;
  Detail: { speciesId: string };
  Form: { speciesId?: string };
};


export type ScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;