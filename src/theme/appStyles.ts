import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7f5' },
  list: { padding: 16, paddingBottom: 90 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },

  // Tarjeta
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  thumbnail: { width: 90, height: 90 },
  placeholder: {
    backgroundColor: '#e8f5ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: { fontSize: 28 },
  cardInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  commonName: { fontSize: 15, fontWeight: '700', color: '#1a3a27' },
  scientificName: { fontSize: 13, fontStyle: 'italic', color: '#4a7a5a', marginTop: 2 },
  habitat: { fontSize: 12, color: '#888', marginTop: 4 },

  // Acciones
  cardActions: { justifyContent: 'space-evenly', paddingHorizontal: 8 },
  editBtn: { padding: 6 },
  editBtnText: { fontSize: 18 },
  deleteBtn: { padding: 6 },
  deleteBtnText: { fontSize: 18 },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1a5c38',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  fabText: { fontSize: 28, color: '#fff', lineHeight: 32 },

  // Texto estados
  loadingText: { marginTop: 12, color: '#4a7a5a', fontSize: 14 },
  errorText: { color: '#c0392b', fontSize: 14 },
  emptyText: { textAlign: 'center', color: '#888', fontSize: 15, lineHeight: 22 },
});

export const formStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7f5' },
  content: { padding: 16, paddingBottom: 40 },

  // Imagen
  imagePicker: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    height: 200,
    backgroundColor: '#e8f5ee',
  },
  imagePreview: { width: '100%', height: '100%' },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#7ab89a',
    borderRadius: 16,
  },
  imagePlaceholderIcon: { fontSize: 40 },
  imagePlaceholderText: { color: '#4a7a5a', marginTop: 8, fontSize: 14 },
  uploadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  uploadingText: { fontSize: 13, color: '#4a7a5a' },

  // Formulario
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  fieldGroup: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#1a3a27', marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderColor: '#dce8e1',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#2d2d2d',
    backgroundColor: '#fafafa',
  },
  inputMultiline: { height: 80, textAlignVertical: 'top' },
  inputError: { borderColor: '#e74c3c' },
  errorText: { color: '#e74c3c', fontSize: 12, marginTop: 4 },

  // Botón
  saveBtn: {
    backgroundColor: '#1a5c38',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export const detailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7f5' },
  content: { paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  image: { width: '100%', height: 260 },
  imagePlaceholder: {
    backgroundColor: '#e8f5ee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dataCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  commonName: { fontSize: 22, fontWeight: '800', color: '#1a3a27' },
  scientificName: { fontSize: 16, fontStyle: 'italic', color: '#4a7a5a', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#e8f0eb', marginVertical: 16 },
  field: { marginBottom: 12 },
  fieldLabel: { fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 0.8 },
  fieldValue: { fontSize: 15, color: '#2d2d2d', marginTop: 4 },

  actions: { flexDirection: 'row', paddingHorizontal: 16, gap: 12 },
  editBtn: {
    flex: 1,
    backgroundColor: '#1a5c38',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  editBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  deleteBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e74c3c',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteBtnText: { color: '#e74c3c', fontWeight: '700', fontSize: 15 },
  errorText: { color: '#c0392b' },
});
