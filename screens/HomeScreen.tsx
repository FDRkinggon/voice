import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { globalStyles } from '../assets/styles/globalStyles';

interface Note{
  id: number;
  texte: string;
}

export default function HomeScreen() {  
  const [data, setData] = useState<Note[]>([]);
  const API_URL = 'http://192.168.1.174:8000/api/hello/';
  const isFocused = useIsFocused(); // Hook pour détecter si l'écran est actif

  const chargerNotes = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (isFocused) { // Charger les notes uniquement lorsque l'écran est actif
      chargerNotes();
    }
  }, [isFocused]);

  return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Sentinelle</Text>
        <ScrollView style={{width: '100%'}} contentContainerStyle={globalStyles.container}>
          <Text style={globalStyles.title}>Mes Messages Dynamiques</Text>
          
          {/* LA BOUCLE MAGIQUE : Pour chaque "item" dans "data" */}
          {data.map((item) => (
            <View key={item.id} style={globalStyles.card}>
              <Text style={globalStyles.text}>{item.texte}</Text>
            </View>
          ))}
          
        </ScrollView>
      </View>
    );
}

