import 'react-native-gesture-handler';
import React from 'react'
import Search from './Components/Search'
import FilmDetail from './Components/FilmDetail'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name='Search'
      component={Search}
      options={{title:'Rechercher'}}
      />
      <Stack.Screen
      name='FilmDetail'
      component={FilmDetail}
      options={{title:'Détails du Film'}}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <MyStack/>
      </Provider>
    </NavigationContainer>
  );
}
