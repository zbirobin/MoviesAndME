import 'react-native-gesture-handler';
import React from 'react'
import { Image, StyleSheet } from 'react-native';

import Search from './Components/Search'
import Favorites from './Components/Favorites'
import FilmDetail from './Components/FilmDetail'
import Test from './Components/Test'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Provider } from 'react-redux'
import Store from './Store/configureStore'


const SearchStackNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStackSearch() {
  return (
    <SearchStackNavigator.Navigator>
      <SearchStackNavigator.Screen
      name='Search'
      component={Search}
      options={{title:'Rechercher'}}
      />
      <SearchStackNavigator.Screen
      name='FilmDetail'
      component={FilmDetail}
      options={{title:'Détails du Film'}}
      />
    </SearchStackNavigator.Navigator>
  )
}

function MyStackFavorite() {
  return (
    <SearchStackNavigator.Navigator>
      <SearchStackNavigator.Screen
      name='Favorites'
      component={Favorites}
      options={{title:'Favoris'}}
      />
      <SearchStackNavigator.Screen
      name='FilmDetail'
      component={FilmDetail}
      options={{title:'Détails du Film'}}
      />
    </SearchStackNavigator.Navigator>
  )
}

function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          //var sourceImage =
          if (route.name === "StackSearch"){
            return <Image
                    source={require('./Images/ic_search.png')}
                    style={styles.icon} />
          } else { //  if (route.name === 'Favorites')
            return <Image
                    source={require('./Images/ic_favorite.png')}
                    style={styles.icon} />
          }
        }
      })}
      tabBarOptions={{
          showLabel: false,
          activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
          inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
        }}>
          <Tab.Screen
          name="StackSearch"
          component={MyStackSearch}
          />
          <Tab.Screen
          name="StackFavorite"
          component={MyStackFavorite}
          />
          <Tab.Screen
          name="Test"
          component={Test}
          />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <MyTab/>
      </Provider>
    </NavigationContainer>
  );
}
