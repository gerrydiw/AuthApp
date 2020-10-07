import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import config from './src/config';
import Header from './src/components/Header';
import LoginForm from './src/components/LoginForm';
import CardSection from './src/components/CardSection';
import Button from './src/components/Button';
import Card from './src/components/Card';
import Spinner from './src/components/Spinner';

class App extends Component {
  state = {
    loggedIn: null
  }
  componentDidMount() {
    if (!firebase.apps.length) {
      console.log('Init Firebase...');
      firebase.initializeApp(config.firebaseConfig)
    }
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loggedIn: !!user})
    })
  }
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={ () => firebase.auth().signOut() }>Logout</Button>
            </CardSection>
          </Card>
        )
        case false:
          return <LoginForm/>
        default:
          return (
            <Card>
              <CardSection>
                <Spinner />
              </CardSection>
            </Card>
          )
    }
  }
  render() {
    return (
      <View>
        <Header title="Authentication"></Header>
        { this.renderContent() }
      </View>
    )
  }
}

export default App;