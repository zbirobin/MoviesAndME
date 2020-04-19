import 'react-native-gesture-handler';
import React from 'react'
import Search from './Components/Search'
import Favorites from './Components/Favorites'
import FilmDetail from './Components/FilmDetail'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

const SearchStackNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
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

function MyTab() {
  return (
    <Tab.Navigator>
          <Tab.Screen
          name="StackSearch"
          component={MyStack}
          options={{title:"Rechercher"}} />
          <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{title:'Favoris'}}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <MyTab/>
      </Provider>
    </NavigationContainer>
  );
}
