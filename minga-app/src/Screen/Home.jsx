import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import bg from '../../assets/home.png';
import TitlteHero1 from '../Components/TitlteHero';
import SectionHero21 from '../Components/SectionHero2';
import SectionHero1 from '../Components/SectionHero';
import FormLogin from '../Components/FormLogin';
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

export default function Seccion1Hero1() {

  let [token, setToken] = useState("");
  let state = useSelector((store) => store.bottomTabsReducer.state);

  useFocusEffect(
    React.useCallback(() => {
      async function getData() {
        try {
          const value = await AsyncStorage.getItem("token");
          setToken(value);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }, [state])
  );

  return (
    <ImageBackground source={bg} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.seccion}>
          <View style={styles.texto}>
            <TitlteHero1 text='Best Manga Reader' />
            <SectionHero21 text='Find the perfect manga for you' />
            <SectionHero1 text="Read" />
          </View>
        </View>
        <View style={styles.seccion2}>
          <FormLogin />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height:"200%"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  seccion: {
    height: "50%",
    padding: 20,
    justifyContent: 'center',
  },
  seccion2: {
    height: "100%",
    backgroundColor: "white"
  },
  texto: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 35,
  },
});