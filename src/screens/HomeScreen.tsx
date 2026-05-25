import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

import { ScreenProps } from "../navigation/typeNavigation";
import { Species } from "../types/species";
import { homeStyles } from "../theme/appStyles";
import { useSpecies } from "../hooks/useSpecies";
import { deleteSpecies } from "../services/speciesServices";

type Props = ScreenProps<"Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const { species, loading, error } = useSpecies();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ── Eliminar especie ──────────────────────────────────────────────────────
  const handleDelete = (item: Species) => {
    Alert.alert(
      "Eliminar especie",
      `¿Estás seguro de eliminar "${item.commonName}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              setDeletingId(item.id);
              await deleteSpecies(item.id);
            } catch (e) {
              Alert.alert("Error", "No se pudo eliminar la especie.");
            } finally {
              setDeletingId(null);
            }
          },
        },
      ]
    );
  };

  // ── Render de cada tarjeta ────────────────────────────────────────────────
  const renderItem = ({ item }: { item: Species }) => (
    <TouchableOpacity
      style={homeStyles.card}
      onPress={() => navigation.navigate("Detail", { speciesId: item.id })}
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
        {/* ── Lápiz: navega al Form con el id de la especie ── */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Form", { speciesId: item.id })}
          style={homeStyles.editBtn}
        >
          <Text style={homeStyles.editBtnText}>✏️</Text>
        </TouchableOpacity>

        {/* ── Basurero: confirma y elimina ── */}
        <TouchableOpacity
          onPress={() => handleDelete(item)}
          disabled={deletingId === item.id}
        >
          <Text style={homeStyles.deleteBtnText}>
            {deletingId === item.id ? "⏳" : "🗑️"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
            <Text style={homeStyles.emptyText}>No hay especies registradas.</Text>
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