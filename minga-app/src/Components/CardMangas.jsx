import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import detailsActions from "../Store/Details/actions"

const { mangaClicked } = detailsActions

export default function CardMangas({title, category, photo, _id }) {
  const [loading, setLoading] = useState()
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categoryColor = {
    shonen: { color: '#EF8481' },
    shojo: { color: '#00BA88' },
    seinen: { color: '#FC9C57' },
    comic: { color: '#8883F0' }
  };

  function goToDetailsScreen() {
    dispatch(mangaClicked( {state:true} ))
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigation.navigate('Details', {_id});
    }, 500);

  }

  return (
    <View style={styles.card}>
      <View style={styles.text1}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={[{ fontSize: 16 }, categoryColor[category]]}>{category}</Text>
        </View>
        <Text
          style={styles.read}
          onPress={goToDetailsScreen}
        >
          Details
        </Text>
        
      </View>

      <View style={styles.imgContainer}>
        <Image style={styles.imgManga} source={photo} />
      </View>
     
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F8F8F8",
    flexDirection: "row",
    marginVertical: 10,
    width: "95%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#C4C4C4",
  },
  shonen: {
    backgroundColor: "#F06C9B",
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginRight: 10,
    marginTop: 5,
  },
  text1: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  categoryName: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#777",
  },
  read: {
    backgroundColor: "green",
    color: "#FFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  imgContainer: {
    width: "50%",
    height: 150,
    borderRadius: 5,
    overflow: "hidden",
  },
  imgManga: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
  },
});
