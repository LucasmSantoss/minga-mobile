import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      setUser(JSON.parse(userData));
    };
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.userContainer}>
        <Text style={styles.userTitle}>User Information:</Text>
        <Image
          style={styles.userPhoto}
          source={{ uri: user.photo }}
        />
        <Text style={styles.userText}>Name: {user.name}</Text>
        <Text style={styles.userText}>Email: {user.email}</Text>
      </View>
      ) : ("")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userContainer: {
    alignItems: 'center',
  },
  userTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loggedOutContainer: {
    alignItems: 'center',
  },
  loggedOutText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});