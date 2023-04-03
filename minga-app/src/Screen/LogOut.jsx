
import React, { useState } from 'react';
import { Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import bottomTabsActions from '../Store/Perfil/action';  
import detailsActions from "../Store/Details/actions"

const { mangaClicked } = detailsActions
const { reloadBottomTabs } = bottomTabsActions

export default function LogOut() {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  let state = useSelector(store => store.bottomTabsReducer.state)
  let [token, setToken] = useState('')
  const [loading, setLoading] = useState()

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

  let headers = { headers: { 'Authorization': `Bearer ${token}` } }


  const handleLogOut = async () => {
    let url = 'https://minga-grupoblanco.onrender.com/api/signout'
    try {
      setLoading(true)
      await axios.post(url," ",headers)

      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      
  
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      console.log('Token almacenado:', storedToken);
      console.log('Usuario almacenado:', storedUser);
      dispatch(mangaClicked( {state:false} ))
      dispatch(reloadBottomTabs({ state: false }));
      dispatch(reloadBottomTabs({ state: !state }))

      setTimeout(() => {
        setLoading(false);
      }, 3000);
      navigation.navigate('Home');
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
  <TouchableOpacity>
    <Button title="Log Out" onPress={handleLogOut}/>
    
    </TouchableOpacity>
  )
}