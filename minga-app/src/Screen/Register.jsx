import React from 'react';
import { ScrollView, StyleSheet, ImageBackground } from 'react-native';
import Wellcome from '../Components/Wellcome';
import FormRegister from '../Components/FormRegister';
import bg from '../../assets/registerfondo.jpg';

export default function Register({ handleRender }) {
  return (
    <ImageBackground source={bg} style={styles.background}>
      <ScrollView style={styles.container}>
        <Wellcome text="Welcome!" />
        <FormRegister handleRender={handleRender} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // haz que el fondo de tu ScrollView sea transparente para que la imagen de fondo sea visible
  },
});
