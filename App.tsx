import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Button, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

// L'interface représente UN SEUL message
interface Note {
  id: number;
  texte: string;
}


//const [data, setData] = useState<Note[]>([]);// 1. Créer une variable pour stocker la liste des messages (vide au début)
const API_URL = 'http://192.168.1.174:8000/api/hello/';// L'URL de l'endpoint Django

// Le composant qui affiche la liste des messages
function HomeScreen() {// Ce composant est utilisé pour afficher la liste des messages dynamiques
  const [data, setData] = useState<Note[]>([]);
  
    useEffect(() => {
    fetch(API_URL)
      .then(res => res.json()).then(json => setData(json)).catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sentinelle</Text>
      <ScrollView style={{width: '100%'}} contentContainerStyle={styles.container}>
        <Text style={styles.title}>Mes Messages Dynamiques</Text>
        
        {/* LA BOUCLE MAGIQUE : Pour chaque "item" dans "data" */}
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.text}>{item.texte}</Text>
          </View>
        ))}
        
      </ScrollView>
    </View>
  );
}

// Le composant qui permet de saisir un nouveau message
function SettingsScreen() {
  const [texteSaisi, setTexteSaisi] = useState<string>('');

  const envoyerNote = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contenu: texteSaisi }) // Envoyer le texte saisi au backend
    })
    .then(() => {
      setTexteSaisi(''); // Vider le champ de saisie après l'envoi
      alert('Note envoyée avec succès !'); // Recharger la liste des messages pour afficher la nouvelle note
    })
    .catch(err => console.error(err));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
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

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Ionicons name="person-circle" size={100} color="blue" />
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={{fontSize: 16 }}>Utilisateur: FDRkinggon</Text>
      <Text style={{color: 'grey'}}>Status: Developpeur</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({color, size}) => {
            let iconName: any;
            if(route.name === 'Accueil') iconName = 'home';
            else if (route.name === 'Parems') iconName = 'settings';
            else if (route.name === 'Profile') iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'plum',
        })} >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Parems" component={SettingsScreen} />
        </Tab.Navigator>
    </NavigationContainer>
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
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
});