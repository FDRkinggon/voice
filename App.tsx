import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// L'interface représente UN SEUL message
interface Note {
  id: number;
  texte: string;
}

export default function App() {
  // On définit que data est un TABLEAU de Notes : Note[]
  const [data, setData] = useState<Note[]>([]);

  useEffect(() => {
    fetch('http://192.168.1.142:8000/api/hello/')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mes Messages Dynamiques</Text>
      
      {/* LA BOUCLE MAGIQUE : Pour chaque "item" dans "data" */}
      {data.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.text}>{item.texte}</Text>
        </View>
      ))}
      
    </ScrollView>
  );
}

// --- LE STYLE (Design) ---
const styles = StyleSheet.create({
  container: { padding: 50, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#e1f5fe',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  text: { fontSize: 18, color: '#01579b' }
});