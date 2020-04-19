import React from 'react'
import {View, Button, TextInput, StyleSheet, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import {getFilmsFromApiWithSearchText} from '../API/TMDBApi'
import { connect } from 'react-redux'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchText = ''
    this.page = 0
    this.totalPages = 0
    this.state = {
      films:[],
      isLoading: false
    }
    this._loadFilms = this._loadFilms.bind(this)
  }

  _loadFilms() {
    if (this.searchText.length > 0) {
      this.setState({isLoading: true})
      getFilmsFromApiWithSearchText(this.searchText, this.page + 1).then(
        data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false})
        }
      )
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _searchTextInputChanged(text) {
    this.searchText = text
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: []
    }, () => {
      this._loadFilms()
    })
  }

  _displayDetailForFilm = (idFilm) => {
    console.log('Display film with id' + idFilm);
    this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          onSubmitEditing={() => this._searchFilms()}
          onChangeText={(text) => this._searchTextInputChanged(text)}
          style={styles.textinput}
          placeholder='Titre du film'
        />
        <Button
          style={{height: 50}}
          title='Rechercher'
          onPress={() => this._searchFilms()}
        />
        <FilmList
          films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          page={this.page}
          totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
          favoriteList={false}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
