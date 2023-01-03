import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BookClass from "./src/components/Book";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>This is my first app</Text>
      <BookClass title={"Book"} description={"Description"} price={3.74} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
