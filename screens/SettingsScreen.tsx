import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../assets/styles/globalStyles';

export default function SettingsScreen() {
  const [texteSaisi, setTexteSaisi] = useState<string>('');
  const API_URL = 'http://192.168.1.174:8000/api/hello/';

  const envoyerNote = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texte: texteSaisi }) // Envoyer le texte saisi au backend
    })
    .then(response => {
      if (response.ok) { // <--- ON VÉRIFIE SI LE SERVEUR DIT OK (200-299)
        setTexteSaisi('');
        alert("Enregistré dans SQLite !");
      } else {
        alert("Erreur serveur : " + response.status);
      }
    })
    .catch(err => console.error(err));
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Settings</Text>
      {/* 3. Le composant de saisie */}
      <TextInput
        style={globalStyles.input}
        placeholder="Tapez ici..."
        value={texteSaisi} // Affiche ce qui est dans la variable
        onChangeText={setTexteSaisi} // Met à jour la variable à chaque lettre
      />
      
      <Button title="Envoyer" onPress={envoyerNote} />
    </View>
  );
}