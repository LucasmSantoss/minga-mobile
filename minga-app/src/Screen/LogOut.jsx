import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import bottomTabsActions from '../Store/Profile/action';  
const { reloadBottomTabs } = bottomTabsActions;

export default function LogOut() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(store => store.bottomTabsReducer.state);
  const [token, setToken] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      async function getData() {
        try {
          const value = await AsyncStorage.getItem('token');
          setToken(value);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }, [state])
  );

  const handleLogOut = async () => {
    const url = 'https://minga-grupoblanco.onrender.com/api/signout';
    const headers = { headers: { 'Authorization': `Bearer ${token}` } };
    try {
      await axios.post(url, " ", headers);
  
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
  
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      console.log('Token almacenado:', storedToken);
      console.log('Usuario almacenado:', storedUser);
  
      dispatch(reloadBottomTabs({ state: false }));
      Alert.alert('Logout', 'Logout success');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Ha ocurrido un error al cerrar sesión. Por favor, inténtalo de nuevo.');
    }
  };
  

  return <Button title="Log Out" onPress={handleLogOut} />;
}
