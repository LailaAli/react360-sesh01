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
import { connect, changeRoom } from './store';  //Pull in functions from store.js
import house from './data/houseData';

// client.js contains code to render panel(s)
export default class Buttons extends React.Component {

  clickHandler ( roomSelection ) {
    changeRoom( roomSelection );
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
          <Text style={styles.greetingBox}>
            Room Selection
          </Text>
          <Text>
            {this.props.room}
          </Text>
          {this.createRoomButtons(this.props.adjacentRooms)}
        </View>
      </View>
    );
  }
};


export class HouseInfoPanel extends React.Component {

  render() {
    return (
      <View style={styles.panel}>
        
        <View>
          <Text>
            Room Info
          </Text>
          <Text>
            {this.props.info}
          </Text>
        </View>
      </View>
    );
  }
};

// Use 'connect' function from store.js
const ConnectedButtons = connect( Buttons );
const ConnectedHouseInfoPanel = connect( HouseInfoPanel );

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  }
});

AppRegistry.registerComponent('ConnectedButtons', () => ConnectedButtons);
AppRegistry.registerComponent('ConnectedHouseInfoPanel', () => ConnectedHouseInfoPanel);
