import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { ScreenProps } from "../navigation/typeNavigation";
import { formStyles } from "../theme/appStyles";
import { SpeciesFormValues } from "../types/species";
import { useImagePicker } from "../hooks/useImagePicker";
import { addSpecies, getSpeciesById, updateSpecies } from "../services/speciesServices";

type Props = ScreenProps<"Form">;

export const FormScreen = ({ route, navigation }: Props) => {
  const id = route.params?.speciesId;
  const isEditMode = id !== undefined;
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditMode); // ← nuevo

  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const { localUri, uploading, pickFromGallery, pickFromCamera, uploadImage } =
    useImagePicker();

  const {
    control,
    handleSubmit,
    reset,                         
    formState: { errors },
  } = useForm<SpeciesFormValues>({
    defaultValues: {
      commonName: "",
      scientificName: "",
      habitat: "",
      imageUrl: "",
    },
  });

  // ── Cargar datos si es modo edición ──────────────────────────────────────
  useEffect(() => {
    if (!isEditMode || !id) return;

    const loadSpecies = async () => {
      try {
        const species = await getSpeciesById(id);
        if (species) {
          // Rellena el formulario con los datos existentes
          reset({
            commonName: species.commonName,
            scientificName: species.scientificName,
            habitat: species.habitat,
            imageUrl: species.imageUrl ?? "",
          });
          // Guarda la imagen existente para mostrarla
          if (species.imageUrl) {
            setExistingImageUrl(species.imageUrl);
          }
        }
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los datos de la especie.");
      } finally {
        setLoadingData(false);
      }
    };

    loadSpecies();
  }, [id]);

  // ── Crear ─────────────────────────────────────────────────────────────────
  const onCreate = async (values: SpeciesFormValues) => {
    setSaving(true);
    try {
      const newId = await addSpecies({ ...values, imageUrl: "" });

      let imageUrl = "";
      if (localUri) {
        const url = await uploadImage(newId);
        if (url) imageUrl = url;
      }

      Alert.alert("Creado", "Especie registrada correctamente.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la especie. Intente de nuevo.");
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  // ── Editar ────────────────────────────────────────────────────────────────
  const onEdit = async (values: SpeciesFormValues) => {
    if (!id) return;
    setSaving(true);
    try {
      let imageUrl = existingImageUrl ?? "";

      // Si eligió una imagen nueva, súbela
      if (localUri) {
        const url = await uploadImage(id);
        if (url) imageUrl = url;
      }

      await updateSpecies(id, { ...values, imageUrl });

      Alert.alert("Actualizado", "Especie actualizada correctamente.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la especie.");
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const onSubmit = isEditMode ? onEdit : onCreate;  // ← decide qué función usar

  const showImageOptions = () => {
    Alert.alert("Seleccionar imagen", "¿Desde dónde quiere agregar la foto?", [
      { text: "Cámara", onPress: pickFromCamera },
      { text: "Galería", onPress: pickFromGallery },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const previewUri = localUri ?? existingImageUrl;

  // ── Pantalla de carga mientras trae los datos ─────────────────────────────
  if (loadingData) {
    return (
      <View style={formStyles.container}>
        <ActivityIndicator size="large" color="#1a5c38" style={{ marginTop: 40 }} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={formStyles.container}
        contentContainerStyle={formStyles.content}
      >
        {/* Imagen */}
        <TouchableOpacity
          style={formStyles.imagePicker}
          onPress={showImageOptions}
        >
          {previewUri ? (
            <Image source={{ uri: previewUri }} style={formStyles.imagePreview} />
          ) : (
            <View style={formStyles.imagePlaceholder}>
              <Text style={formStyles.imagePlaceholderIcon}>📸</Text>
              <Text style={formStyles.imagePlaceholderText}>
                Toca para agregar foto
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {uploading && (
          <View style={formStyles.uploadingRow}>
            <ActivityIndicator size="small" color="#1a5c38" />
            <Text style={formStyles.uploadingText}>Subiendo imagen...</Text>
          </View>
        )}

        <View style={formStyles.form}>
          <View style={formStyles.fieldGroup}>
            <Text style={formStyles.fieldLabel}>Nombre común *</Text>
            <Controller
              control={control}
              name="commonName"
              rules={{ required: "El nombre común es obligatorio" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[formStyles.input, errors.commonName && formStyles.inputError]}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Ej: Árbol de la quina"
                  placeholderTextColor="#aaa"
                />
              )}
            />
            {errors.commonName && (
              <Text style={formStyles.errorText}>{errors.commonName.message}</Text>
            )}
          </View>

          <View style={formStyles.fieldGroup}>
            <Text style={formStyles.fieldLabel}>Nombre científico *</Text>
            <Controller
              control={control}
              name="scientificName"
              rules={{ required: "El nombre científico es obligatorio" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[formStyles.input, errors.scientificName && formStyles.inputError]}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Ej: Cinchona officinalis"
                  placeholderTextColor="#aaa"
                />
              )}
            />
            {errors.scientificName && (
              <Text style={formStyles.errorText}>{errors.scientificName.message}</Text>
            )}
          </View>

          <View style={formStyles.fieldGroup}>
            <Text style={formStyles.fieldLabel}>Hábitat *</Text>
            <Controller
              control={control}
              name="habitat"
              rules={{ required: "El hábitat es obligatorio" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[formStyles.input, formStyles.inputMultiline, errors.habitat && formStyles.inputError]}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Ej: Bosque andino, 2000-3500 msnm"
                  placeholderTextColor="#aaa"
                  multiline
                  numberOfLines={3}
                />
              )}
            />
            {errors.habitat && (
              <Text style={formStyles.errorText}>{errors.habitat.message}</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={[formStyles.saveBtn, (saving || uploading) && formStyles.saveBtnDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={saving || uploading}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={formStyles.saveBtnText}>
              {isEditMode ? "💾  Guardar cambios" : "➕  Registrar especie"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};