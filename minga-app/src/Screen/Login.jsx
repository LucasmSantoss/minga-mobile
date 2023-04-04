import React from 'react';
import { ScrollView, StyleSheet, View, ImageBackground } from 'react-native';
import Wellcome from '../Components/Wellcome';
import FormLogin from '../Components/FormLogin';
import bg from '../../assets/fondologin.jpg';

export default function Login() {
  return (
    <ImageBackground source={bg} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Wellcome text="Welcome!" />
        <FormLogin />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
