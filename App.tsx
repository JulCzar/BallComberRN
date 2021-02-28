import React from 'react'
import { StatusBar } from 'react-native'
import Routes from './src/routes';
import Game from './src/view/Game';

const App = () => (
  <><StatusBar
    backgroundColor='transparent'
    barStyle='light-content'
    translucent={true}
  />
  <Game/></>
);

export default App