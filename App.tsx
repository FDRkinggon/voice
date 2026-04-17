import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Définition du type pour TypeScript
interface DjangoData {
  message: string;
}

export default function App() {
  const [data, setData] = useState<DjangoData | null>(null);

  useEffect(() => {
    // Utilise ton IP locale ici (pas localhost !)
    fetch('http://TON_IP:8000/api/hello/')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Erreur:", err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {data ? data.message : "Connexion au serveur..."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20, color: 'blue' }
});