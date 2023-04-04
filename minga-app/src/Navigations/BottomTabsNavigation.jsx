
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "../Screen/Home";
import ContFormRegister from "../Screen/Register";
import Mangas from "../Screen/Mangas";
import Perfil from "../Screen/Profile";
import LogOut from "../Screen/LogOut";
import { FontAwesome } from '@expo/vector-icons';
import Details from "../Screen/Details";

const Tab = createBottomTabNavigator();

function BottomTabsNavigation() {
  let state = useSelector((store) => store.bottomTabsReducer.state);
  let [token, setToken] = useState("");

  const details = useSelector((store) => store.mangaClickReducer.state);

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
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#111111",
          borderTopColor: "transparent",
          height: 55,
          paddingBottom: 5,
          paddingTop: 5,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 5,
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "#9B9B9B",
        tabBarTabStyle: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
    >

       { details ? (<Tab.Screen
      name="Details"
      component={Details}
      options={{
        headerShown: false,
        tabBarLabel: 'Details',
        tabBarIcon: ({ color }) => (
          <FontAwesome name="info" size={24} color={color} />
        ),
      }}
    />) : (<></>)}
      
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      {token ? (
        <>
          <Tab.Screen
            name="Mangas"
            component={Mangas}
            options={{
              headerShown: false,
              tabBarLabel: 'Mangas',
              tabBarIcon: ({ color }) => (
                <FontAwesome name="book" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen name="Perfil" options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}>
            {() => (
              <>
                <Perfil />
                <LogOut />
              </>
            )}
          </Tab.Screen>
        </>
      ) : (
        <><Tab.Screen
        name="register"
        component={ContFormRegister}
        options={{
          headerShown: false,
          tabBarLabel: 'Register',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle-o" size={24} color={color} />
          ),
        }}
      /></>
      )}
    </Tab.Navigator>
  );
}

export default BottomTabsNavigation;