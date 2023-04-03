import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bg from '../../assets/mangass.png';

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
    <ImageBackground source={bg} style={styles.background}>
      <View style={styles.container}>
        {user ? (
          <View style={styles.userContainer}>
           
            <Image style={styles.userPhoto} source={{ uri: user.photo }} />
            <Text style={styles.userTitle}>User Information:</Text>
            <Text style={styles.userText}>Email: {user.mail}</Text>
          </View>
        ) : (
          <View style={styles.loggedOutContainer}>
            <Text style={styles.loggedOutText}>You are not logged in.</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
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
    color: '#FFFFFF',
  },
  userPhoto: {
    width: 200,
    height: 200,
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
