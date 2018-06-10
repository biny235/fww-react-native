import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Container, Content, H1, Button} from 'native-base';
import GoogleSearch from './GoogleSearch';
import MapView from 'react-native-maps';
import { fetchPlaces } from '../store/places';
import { connect } from 'react-redux';

const chicago = {
  lat: '41.881832',
  lng: '-87.623177'
};

//sample data
const hawaii = {
  lat: '21.315603',
  lng: '-157.858093'
};

class SuggestToFriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleObject: null,
      region: {
        latitude: 41.881832,
        longitude: -87.623177,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
    this.addToState = this.addToState.bind(this);
  }

  addToState(obj) {
    this.setState({googleObject: obj});
  }

  render() {
    if (this.state.googleObject){console.log(`Got Google Object: ${this.state.googleObject.name}`);}
    const {  region } = this.state;
    return (
      <Container>
      <Text style={{ height: 20 }} />
        <Image
          style={{alignSelf: 'center', width: 150, height: 100}}
          source={require('../assets/PlanItLogo.png')}
        />
        <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
          <H1 style={{ marginBottom: 10 }}>Give Moe a Suggestion</H1>
          <GoogleSearch setLoc={this.addToState} lat={chicago.lat} lng={chicago.lng} type="establishment" />
            <MapView
              style={{ flex: 2, width: 370, marginBottom: 60 }}
              initialRegion={region}
              provider={MapView.PROVIDER_GOOGLE}
            />
        {this.state.googleObject && <Button block danger style={{ alignSelf: 'center', width: 200}}><Text> Add Your Suggestion </Text></Button>}
          <Text style={{ flex: 0.5 }} />

        </Content>
      </Container>
    );
  }
}

const mapState = ({users, places}) => {
  return {
    users,
    places
  };
};

const mapDispatch = dispatch => {
  return {
      fetchPlaces: () => dispatch(fetchPlaces())
    };
  };

export default connect(mapState, mapDispatch)(SuggestToFriendScreen);
