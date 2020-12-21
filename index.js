import React from 'react';
import {
  AppRegistry,
  asset,
  Environment,
  StyleSheet,
  Text,
  View,
  // Way of changing state of a component
  VrButton
} from 'react-360';
import house from './data/houseData';

export default class HouseTourVR extends React.Component {
  state = {
    room: house.House.roomName,
    info: house.House.info,
    adjacentRooms: house.House.adjacentRooms
  }
  clickHandler ( roomSelection ) {
    this.setState( {
    room: house[`${roomSelection}`].roomName,
    info: house[`${roomSelection}`].info,
    adjacentRooms: house[`${roomSelection}`].adjacentRooms,
    } )
    
    Environment.setBackgroundImage(asset(`./360_${house[`${roomSelection}`].img}`))
}

  createRoomButtons ( adjacentRooms ) {
    let rooms = adjacentRooms;
    let buttons = [];

    rooms.map( room => ( buttons.push(
      <VrButton key={ `${ room }` + '-button' } onClick={()=> this.clickHandler(room)}>
        <Text style={{backgroundColor: 'grey'}}>{ room }</Text>
      </VrButton>
    ) ) )
    
    return buttons;
  }

  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Text >
            Room Selection
          </Text>
          <Text>
            {this.state.room}
          </Text>
          {this.createRoomButtons(this.state.adjacentRooms)}
        </View>
        
        <View style={ styles.greetingBox }>
          <Text>
            Room Info
          </Text>
          <Text>
            {this.state.info}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: 'grey',
    borderWidth: 2,
  }
});

AppRegistry.registerComponent('HouseTourVR', () => HouseTourVR);