import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, ImageBackground } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "../Screen/Home";
import Register from "../Screen/Register";
import Mangas from "../Screen/Mangas";
import Profile from "../Screen/Profile";
import LogOut from "../Screen/LogOut";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function BottomTabsNavigation() {
  let state = useSelector((store) => store.bottomTabsReducer.state);
  let [token, setToken] = useState('')

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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'register') {
            iconName = 'person-add';
          } else if (route.name === 'Mangas') {
            iconName = 'book';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Mangas"
        component={Mangas}
        options={{ headerShown: false }}
      />

      {token ? (
        <Tab.Screen name="Profile" options={{ headerShown: false }}>
          {() => (
            <>
              <Profile />
              <LogOut/>
            </>
          )}
        </Tab.Screen>
      ): <></>}
      
    </Tab.Navigator>
  );
}

export default BottomTabsNavigation;
