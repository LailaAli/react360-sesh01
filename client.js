// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {
  ReactInstance, Surface
} from 'react-360-web';

function init( bundle, parent, options = {} ) {
  const r360 = new ReactInstance( bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  } );


  // We separated our cylinder surface into two
  // Create flat panel surface to render
  const buttonsPanel = new Surface( 400, 550, Surface.SurfaceShape.Flat );
  // Specify panel position (horizontal, vertical)
  buttonsPanel.setAngle( -0.6, 0.1 );

    // Create another flat panel surface to render
  const infoPanel = new Surface( 400, 550, Surface.SurfaceShape.Flat );
  infoPanel.setAngle( 0.6, 0.1 );

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot( 'ConnectedButtons', {
      /* initial props */
    } ),
    buttonsPanel );

    r360.renderToSurface(
        r360.createRoot( 'ConnectedHouseInfoPanel', {
      /* initial props */ } ),
   infoPanel
  );

  // Load the initial environment
  r360.compositor.setBackground( r360.getAssetURL( '360_front_door.jpg' ) );
}

window.React360 = {
  init
};