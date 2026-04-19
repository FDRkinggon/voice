import { StyleSheet } from "react-native";

export const colors = {
  primary: '#01579b',
  secondary: '#e1f5fe',
  background: '#f0f0f0'
};
export const globalStyles = StyleSheet.create({
  container: { padding: 50, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  text: { fontSize: 18, color: colors.primary },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1, // INDISPENSABLE sinon l'input est invisible
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  }
});