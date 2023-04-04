import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageBackground, ScrollView } from "react-native";
import fondo from "../../assets/fondologin.jpg";
import actions from "../Store/Manga/actions";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { useParams } from "react-router-dom";

const { captureManga, captureChapter } = actions;

export default function Details({ route }) {
  const manga = useSelector((store) => store.mangareducer.manga);
  const [pagina, setPagination] = useState(page);
  const [capitulo, setCapitulo] = useState(true);
  const page = Number(useParams().page);
  const chapters = useSelector((store) => store.mangareducer.chapter);

  console.log(chapters);
  const _id = route.params && route.params._id;
  const dispatch = useDispatch();

  const [showChapters, setShowChapters] = useState(false);

  const toggleView = () => {
    setShowChapters(!showChapters);
  };

  useEffect(() => {
    if (_id) dispatch(captureManga({ manga_id: _id }));
    if (_id) dispatch(captureChapter({ manga_id: _id, page: pagina }));
  }, [_id, pagina, capitulo]);

  if (!manga) return null;

  return (
    <ImageBackground source={fondo} style={styles.container}>
      <View style={styles.containTotal}>
        <ScrollView>
          <View style={styles.fondoMangaImg}>
            <View style={styles.fondoManga}>
              <Image
                source={{ uri: manga.cover_photo }}
                style={styles.bannerPhoto}
              />
            </View>
          </View>

          <View style={styles.sectionManga}>
            <Text style={styles.titulo}>{manga.title}</Text>
            <Text>{manga.category_id && manga.category_id.name}</Text>
            <View>
              <TouchableOpacity onPress={toggleView}>
                <Text style={styles.show}>
                  {showChapters ? "Go description" : "Go chapters"}
                </Text>
              </TouchableOpacity>
              {showChapters ? (
              
              <View style={styles.contChapters}>
              {chapters.map((chapter) => {
                let card = (
                  <View key={chapter.id}>
                    <Image
                      source={{ uri: chapter?.pages[0] }}
                      style={styles.bannerPhotoChapter}
                    />
                    <Text style={styles.titleChapter}>{chapter.title}</Text>
                  </View>
                );
            
                return card;
              })}
            </View>
            
              ) : (
              
                <Text style={styles.desripcion}>{manga.description}</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = {
  loadMoreButton: {
    color: "white",
    fontSize: 15,
    height: 22,
    borderRadius: 15,
    width: 110,
    backgroundColor: "rgba(128, 128, 128, 0.8)",
    textAlign: "center",
  },
  noMoreButton: {
    color: "white",
    fontSize: 15,
    height: 22,
    borderRadius: 15,
    width: 200,
    backgroundColor: "rgba(128, 128, 128, 0.8)",
    textAlign: "center",
  },
  containTotal: {
    width: "100%",
    minHeight: "100%",
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  fondoMangaImg: {
    width: "100%",
    marginTop: 100,
  },
  fondoManga: {
    width: "100%",
    height: 100,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    marginBottom: 50,
    gap: 15,
  },

  title: {
    fontSize: 44,
    fontWeight: "bold",
    marginRight: 10,
    color: "white",
  },
  searchContainer: {
    flex: 1,
    height: 60,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionManga: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 75,
    minHeight: "100%",
  },
  contCartas: {
    justifyContent: "center",
    alignItems: "center",
  },
  bannerPhoto: {
    marginTop: 160,
    width: 250,
    height: 250,
  
  },
  desripcion: {
    color: "#000000",
    height: 400,
    padding: 15,
    fontSize: 18,
    textAlign: "center",
   
  },
  titulo: {
    color: "black",
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 900,
  },
  show: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "green",
    borderRadius: 100,
    marginBottom: 10,
    fontWeight: 500,
  },
  bannerPhotoChapter: {
    width: 140,
    height: 140,
    borderRadius: 40,
  },
  contChapters: {
    width: 360,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  titleChapter: {
    color: "white",
    textAlign: "center",
  },
};
