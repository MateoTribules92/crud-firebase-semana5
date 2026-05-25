// ─── DetailScreen.tsx ────────────────────────────────────────────────────────
// Muestra el detalle completo de una especie.
// Carga el documento desde Firestore por ID.

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { ScreenProps } from "../navigation/typeNavigation";
import { detailStyles } from "../theme/appStyles";
import { Species } from "../types/species";

type Props = ScreenProps<"Detail">;

export const DetailScreen = ({ route, navigation }: Props) => {
  const { speciesId } = route.params;
  const [species, setSpecies] = useState<Species | null>(null);

  return (
    <ScrollView
      style={detailStyles.container}
      contentContainerStyle={detailStyles.content}
    >
      {species!.imageUrl ? (
        <Image source={{ uri: species!.imageUrl }} style={detailStyles.image} />
      ) : (
        <View style={[detailStyles.image, detailStyles.imagePlaceholder]}>
          <Text style={{ fontSize: 64 }}>🌿</Text>
        </View>
      )}

      <View style={detailStyles.dataCard}>
        <Text style={detailStyles.commonName}>{species!.commonName}</Text>
        <Text style={detailStyles.scientificName}>
          {species!.scientificName}
        </Text>

        <View style={detailStyles.divider} />

        <View style={detailStyles.field}>
          <Text style={detailStyles.fieldLabel}>Hábitat</Text>
          <Text style={detailStyles.fieldValue}>{species!.habitat}</Text>
        </View>
      </View>

      <View style={detailStyles.actions}>
        <TouchableOpacity
          style={detailStyles.editBtn}
          onPress={() => navigation.navigate("Form", {})}
        >
          <Text style={detailStyles.editBtnText}>✏️ Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={detailStyles.deleteBtn} onPress={() => {}}>
          <Text style={detailStyles.deleteBtnText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};