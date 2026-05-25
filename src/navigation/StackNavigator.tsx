// ─── AppNavigator.tsx ────────────────────────────────────────────────────────
// Define la navegación en stack para toda la app.

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./typeNavigation";
import { HomeScreen } from "../screens/HomeScreen";
import { DetailScreen } from "../screens/DetailScreen";
import { FormScreen } from "../screens/FormScreen";

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#1a5c38" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Guía de campo de especies" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Detalle de especie" }}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={({ route }) => ({
            title: route.params?.speciesId ? "Editar especie" : "Nueva especie",
          })}
        />
      </Stack.Navigator>
  );
};