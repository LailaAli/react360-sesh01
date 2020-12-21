import React from 'react';
import { asset, Environment } from 'react-360';
import house from './data/houseData';

const State = {
  room: house.House.roomName,
  info: house.House.info,
  adjacentRooms: house.House.adjacentRooms
}

// Listen for changes
const listeners = new Set();

function updateComponents () {
  for ( const cb of listeners.values() ) {
    cb();
  }
}

export function changeRoom ( roomSelection ) {
  let roomName = roomSelection;

  State.room = roomName;
  State.info = house[ `${ roomName }` ].info;
  State.adjacentRooms = house[ `${ roomName }` ].adjacentRooms;

  // Change background image
  Environment.setBackgroundImage( asset( `./360_${ house[ `${ roomName }` ].img }` ) );

  updateComponents();
}

export function connect ( Component ) {
  return class Wrapper extends React.Component{
    state = {
      room: State.room,
      info: State.info,
      adjacentRooms: State.adjacentRooms,
    }

    _listener = () => {
      this.setState( {
        room: State.room,
        info: State.info,
        adjacentRooms: State.adjacentRooms
      })
    }

    // Once component is rendered in this life cycle, it will add a listener
    componentDidMount () {
      listeners.add( this._listener );
    }

    render () {
      return (
        // Passing parent state to children
        <Component { ...this.props } room={ this.state.room } info={ this.state.info } adjacentRooms={ this.state.adjacentRooms }
        />
      )
    }
  }
}
