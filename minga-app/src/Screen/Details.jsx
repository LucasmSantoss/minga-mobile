import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import actions from "../Store/Mangas/actions.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/Logo2.png";
import bg from "../../assets/fondologin.jpg";

const { captureManga, captureChapter } = actions;
function Details() {
  const id = "6418b8f9b447d534f335807d"; //aca va const {id}=useparams()-> depende de la ruta que viene de mangas
  const page = Number(useParams().page);
  const dispatch = useDispatch();
  const [pagina, setPagina] = useState(0);
  const [chapter, setChapter] = useState({});
  const [capitulo, setCapitulo] = useState(true);
  let chapters = useSelector((store) => store.mangas.chapter);
  const manga = useSelector((store) => store.mangas.manga);

  useEffect(() => {
    dispatch(captureManga({ manga_id: id }));
  }, []);

  useEffect(() => {
    dispatch(captureChapter({ manga_id: id, page: page }));
  }, [page, capitulo]);

  useEffect(() => {
    setChapter(chapters[0] || {});
  }, [chapters]);
  return (
    <ImageBackground source={bg}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            height: 90,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "transparent",
            paddingHorizontal: 10, // añade un padding horizontal para evitar que el contenido se salga de la pantalla
          }}
        >
          <Text
            style={{
              flex: 1, // establece un flex para que el texto ocupe el espacio restante
              textAlign: "center",
              fontSize: 22,
              color: "white",
              height: "auto",
            }}
          >
            {manga?.title}
          </Text>
          <Image
            source={logo}
            style={{
              width: "40%", // cambia el ancho a un porcentaje más pequeño
              height: "100%",
              resizeMode: "contain", // ajusta el tamaño de la imagen al contenedor
            }}
          />
        </View>

        <Image
          source={{ uri: manga?.cover_photo }}
          style={{
            width: "100%",
            height: 300,
            width: 300,
            marginTop: 20,
            marginBottom: 20,
            marginVertical: 50,
            alignSelf: "center",
            backgroundColor: "rgb(63, 61, 62)",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              borderRadius: 50,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginHorizontal: 10,
              fontSize: 20,
              backgroundColor: "rgb(63, 61, 62)",
              color: "white",
            }}
          >
            {manga.author_id?.name}
          </Text>
          <Text
            style={{
              textAlign: "center",
              borderRadius: 50,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginHorizontal: 10,
              fontSize: 20,
              backgroundColor: "rgb(63, 61, 62)",
              color: "white",
            }}
          >
            {manga.category_id?.name}
          </Text>
        </View>

        <Text
          style={{
            textAlign: "justify",
            marginVertical: 20,
            marginHorizontal: 10,
            fontSize: 18,
            color: "rgb(248, 246, 247)",
          }}
        >
          {manga?.description}
        </Text>

        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginVertical: 20,
              color: "rgb(248, 246, 247)",
            }}
          >
            {chapter?.name}
          </Text>
        </View>

        <View>
          {chapters?.length > 0
            ? chapters?.map((chapter) => (
                <View
                  key={chapter?._id}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "justify",
                      margin: 20,
                      fontSize: 30,
                      height: "auto",
                      color: "white",
                    }}
                  >
                    {chapter.title}
                  </Text>
                  <Image
                    style={{
                      width: 300,
                      height: 300,
                      borderRadius: 40,
                    }}
                    source={{ uri: chapter?.manga_id.cover_photo }}
                    alt={chapter?.title}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Chapter", {
                        chapterId: chapter?._id,
                        page: 0,
                      })
                    }
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        borderRadius: 50,
                        width: 150,
                        marginVertical: 20,
                        fontSize: 24,
                        height: 50,
                        backgroundColor: 'rgb(63, 61, 62)',
                        color: 'white',
                        lineHeight: 50
                      }}
                    >
                      Read
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            : null}

          <View style={styles.paginationContainer}>
            {pagina !== 1 && (
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => setPagina(pagina - 1)}
              >
                <Text style={styles.paginationButtonText}>Prev</Text>
              </TouchableOpacity>
            )}
            {chapters?.length === 4 && (
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => setPagina(pagina + 1)}
              >
                <Text style={styles.paginationButtonText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgb(63, 61, 62)",
    borderRadius: 10,
  },
  paginationButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Details;
