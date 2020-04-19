
import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity} from 'react-native'
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'


class FilmDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.route.params.idFilm).then( data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }

  componentDidUpdate(){
    console.log("componentDidUpdate : ")
    console.log(this.props.favoritesFilm)
  }

  _toggleFavorite(){
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
    this.props.dispatch(action)
  }

  _displayFavoriteImage(){
    var sourceImage = require('../Images/ic_favorite_border.png')
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1){
      sourceImage = require('../Images/ic_favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
        />
    )
  }

  _displayFilm() {
    const film = this.state.film
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
          <Text style={styles.title_text}>
            {film.title}
          </Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>
            {film.overview}
          </Text>
          <Text style={styles.default_text}>
            Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.default_text}>
            Note : {film.vote_average}/10
          </Text>
          <Text style={styles.default_text}>
            Nombre de votes : {film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(film.budget).format('0,0[.]00 $')}
          </Text>
          <Text style={styles.default_text}>
            Genre(s) : {film.genres.map(
              function(genre) {
                return genre.name;
              }
            ).join(' / ')}
          </Text>
          <Text style={styles.default_text}>
            Companie(s) : {
              film.production_companies.map(
                function(companie) {
                  return companie.name;
                }
              ).join(' / ')
            }
          </Text>
        </ScrollView>
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

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayFilm()}
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 190,
    margin: 5
  },
  title_text: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    margin: 10
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 15,
    marginBottom: 20
  },
  default_text: {
    margin: 2,
    marginLeft: 10
  },
  favorite_container: {
    alignItems: 'center'
  },
  favorite_image: {
    width: 40,
    height: 40
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)
