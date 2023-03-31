import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Wellcome from '../Components/Wellcome';
import FormRegister from '../Components/FormRegister';

export default function Register({ handleRender }) {
  return (
    <ScrollView style={styles.container}>
      <Wellcome text="Welcome!" />
      <FormRegister handleRender={handleRender} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 900,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});