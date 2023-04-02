import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';
import CardMangas from '../Components/CardMangas';
import search from "../../assets/Search.png"
import fondo from "../../assets/mangass.png"

export default function Mangas() {
    const [mangas, setMangas] = useState([]);
    const [originalMangas, setOriginalMangas] = useState([]);
    const [categorias, setCate] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
    useEffect(() => {
        setLoading(true);
        axios.get(`https://minga-host.onrender.com/mangas-form/view?page=${currentPage}`)
          .then(response => {
            if (response.data.mangas.length === 0) {
              setHasMore(false);
            } else {
              if (currentPage === 1) {
                setOriginalMangas(response.data.mangas);
              } else {
                setOriginalMangas(prevMangas => [...prevMangas, ...response.data.mangas]);
              }
            }
            setLoading(false);
          })
          .catch(error => console.error(error));
      }, [currentPage, searchQuery]);
  
    useEffect(() => {
      axios.get("https://minga-host.onrender.com/mangas-form")
        .then(response => {
          setCate(response.data.categories);
        })
        .catch(error => console.log(error));
    }, []);
  
    const handleSearch = (text) => {
        setSearchQuery(text);
        setCurrentPage(1);
        setOriginalMangas([]);
        setHasMore(true);
    };
  
    const handleLoadMore = () => {
      setCurrentPage(prevPage => prevPage + 1);
    };
  
    const filteredMangas = originalMangas.filter(manga => {
      return manga.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
    return (
        <ImageBackground source={fondo} style={styles.container}>
          <View style={styles.containTotal}>
            <ScrollView>
              <View style={styles.fondoMangaImg}>
                <View style={styles.fondoManga}>
                  <Text style={styles.title}>Mangas</Text>
                  
                </View>
              </View>
      
              <View style={styles.sectionManga}>
                <Text style={styles.exploreMangas}>Explore Mangas</Text>
                <View style={styles.searchContainer}>
                    <Image source={search} style={styles.searchIcon} />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Find your manga here"
                      onChangeText={handleSearch}
                    />
                  </View>
                <View style={styles.contCartas}>
                  {filteredMangas.length > 0 &&
                    filteredMangas.map((manga, index) => (
                      <CardMangas
                        key={index}
                        title={manga.title}
                        category={
                          categorias.find(cat => cat._id === manga.category_id)?.name
                        }
                        photo={{ uri: manga.cover_photo }}
                      />
                    ))}
                </View>
      
                {loading && <Text style={styles.loadMoreButton}>Loading...</Text>}
                {!loading && hasMore && (
                  <Text style={styles.loadMoreButton} onPress={handleLoadMore}>
                    Load more
                  </Text>
                )}
                {!loading && !hasMore && (
                  <Text style={styles.noMoreButton}>
                    No more mangas to show
                  </Text>
                )}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      );
}

const styles = {
  loadMoreButton:{
    color: "white",
    fontSize: 15,
    height: 22,
    borderRadius: 15,
    width: 110,
    backgroundColor: 'rgba(128, 128, 128, 0.8)',
    textAlign: 'center'
  },
  noMoreButton:{
    color: "white",
    fontSize: 15,
    height: 22,
    borderRadius: 15,
    width: 200,
    backgroundColor: 'rgba(128, 128, 128, 0.8)',
    textAlign: 'center'
  },
  containTotal:{
    width:"100%",
    minHeight:"100%",
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  fondoMangaImg:{
    width:"100%",
    marginTop: 100
  },
  fondoManga: {
    width:"100%",
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: "center",
    marginBottom: 50,
    gap: 15,
    
  },

  title: {
    fontSize: 44,
    fontWeight: 'bold',
    marginRight: 10,
    color: "white"
  },
  searchContainer: {
    flex: 1,
    height: 60,
    backgroundColor: 'rgba(228, 228, 228, 0.8)',
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 20
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
    backgroundColor: "rgba(28, 28, 28, 1)",
    borderRadius: 70,
    alignItems: "center",
    flexDirection: "column",
  },
  exploreMangas: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "white"
  },
  contCartas:{
    justifyContent: "center",
    alignItems: "center"
  },
}