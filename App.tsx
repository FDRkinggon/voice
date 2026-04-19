import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Button, View } from 'react-native';

// L'interface représente UN SEUL message
interface Note {
  id: number;
  texte: string;
}

export default function App() {
  const [data, setData] = useState<Note[]>([]);// 1. Créer une variable pour stocker la liste des messages (vide au début)
  const [texteSaisi, setTexteSaisi] = useState<string>('');// 2. Créer une variable pour stocker le texte saisi par l'utilisateur
  const API_URL = 'http://192.168.1.142:8000/api/hello/';// L'URL de l'endpoint Django

  //FONCTION 1: Charger les messages du backend au lancement de l'application
  const chargerNotes = () => {
    fetch(API_URL)
      .then(res => res.json())// Convertir la réponse en JSON
      .then(json => setData(json))// Mettre à jour la variable "data" avec la liste des messages reçue du backend
      .catch(err => console.error(err));
  };

  //FONCTION 2: Envoyer un nouveau message au backend
  const envoyerNote = () => {
    if (texteSaisi.length === 0) return; // Ne rien faire si le champ de saisie est vide
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contenu: texteSaisi }) // Envoyer le texte saisi dans le corps de la requête
    })
    .then(() =>{
      setTexteSaisi(''); // Vider le champ de saisie après l'envoi
      chargerNotes(); // Recharger la liste des messages pour afficher le nouveau message
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    chargerNotes(); // Charger les messages du backend au lancement de l'application
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Mes Messages Dynamiques</Text>
        
        {/* LA BOUCLE MAGIQUE : Pour chaque "item" dans "data" */}
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.text}>{item.texte}</Text>
          </View>
        ))}
        
      </ScrollView>

      {/* 3. Le composant de saisie */}
      <TextInput
        style={styles.input}
        placeholder="Tapez ici..."
        value={texteSaisi} // Affiche ce qui est dans la variable
        onChangeText={setTexteSaisi} // Met à jour la variable à chaque lettre
      />
      
      <Button title="Envoyer" onPress={envoyerNote} />
    </View>
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
  text: { fontSize: 18, color: '#01579b' },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1, // INDISPENSABLE sinon l'input est invisible
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
});