import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CardMangas({title, category, photo }) {
  const navigation = useNavigation();
  const categoryColor = {
    shonen: { color: '#EF8481' },
    shojo: { color: '#00BA88' },
    seinen: { color: '#FC9C57' },
    comic: { color: '#8883F0' }
  };

  return (
    <View style={styles.card}>
      <View style={styles.text1}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={[{ fontSize: 16 }, categoryColor[category]]}>{category}</Text>
        </View>
        <Text
          style={styles.read}
          onPress={() => {
            navigation.navigate('Details');
          }}
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
    backgroundColor: "rgba(238, 238, 238, 0.8)",
    flexDirection: 'row',
    marginVertical: 10,
    width:"95%",
    borderWidth:1,
    borderRadius: 16
  },
  shonen: {
    backgroundColor: '#F06C9B',
  },
  text1: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    width:"50%",
    justifyContent: "center",
    gap: 30
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryName: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  read: {
    backgroundColor: '#000',
    color: '#FFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  imgContainer: {
    width: "50%",
    height: 150,
    borderRadius: 5,
    overflow: 'hidden',
  },
  imgManga: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16
  },
});