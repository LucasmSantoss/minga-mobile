import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Wellcome from '../Components/Wellcome';
import FormLogin from '../Components/FormLogin';

export default function Login() {
  return (
    <ScrollView style={styles.container}>
      <Wellcome text="Welcome!" />
      <FormLogin />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap:30,
    height: "100%",
    backgroundColor: '#FFFFFF',
  },
});