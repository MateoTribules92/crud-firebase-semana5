import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import { ScreenProps } from "../navigation/typeNavigation";
import { Species } from "../types/species";
import { homeStyles } from "../theme/appStyles";
import { useSpecies } from "../hooks/useSpecies";

type Props = ScreenProps<"Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const { species, loading, error } = useSpecies();

  // ── Render de cada tarjeta ────────────────────────────────────────────────
  const renderItem = ({item} : {item: Species}) => (
    <TouchableOpacity
      style={homeStyles.card}
      onPress={() => navigation.navigate("Detail", { speciesId: "" })}
      activeOpacity={0.85}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={homeStyles.thumbnail} />
      ) : (
        <View style={[homeStyles.thumbnail, homeStyles.placeholder]}>
          <Text style={homeStyles.placeholderText}>🌿</Text>
        </View>
      )}

      <View style={homeStyles.cardInfo}>
        <Text style={homeStyles.commonName}>{item.commonName}</Text>
        <Text style={homeStyles.scientificName}>{item.scientificName}</Text>
        <Text style={homeStyles.habitat}>{item.habitat}</Text>
      </View>

      <View style={homeStyles.cardActions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Form", {})}
          style={homeStyles.editBtn}
        >
          <Text style={homeStyles.editBtnText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={homeStyles.deleteBtnText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  //Controlando el estado de la carag o error
  if (loading) {
    return (
      <View style={homeStyles.center}>
        <ActivityIndicator size="large" color="#1a5c38" />
        <Text style={homeStyles.loadingText}>Cargando especies...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={homeStyles.center}>
        <Text style={homeStyles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <FlatList
        data={species}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={homeStyles.list}
        ListEmptyComponent={
          <View style={homeStyles.center}>
            <Text style={homeStyles.emptyText}>
              No hay especies registradas.
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={homeStyles.fab}
        onPress={() => navigation.navigate("Form", {})}
      >
        <Text style={homeStyles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};