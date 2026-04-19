import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../assets/styles/globalStyles";

export default function ProfileScreen(){
  return (
    <View style={globalStyles.screen}>
      <Ionicons name="person-circle" size={100} color="blue" />
      <Text style={globalStyles.title}>Profile Screen</Text>
      <Text style={{fontSize: 16 }}>Utilisateur: FDRkinggon</Text>
      <Text style={{color: 'grey'}}>Status: Developpeur</Text>
    </View>
  );
}
