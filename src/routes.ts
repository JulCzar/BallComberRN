import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Game from './pages/Game'

const Routes = createAppContainer(createStackNavigator({
  Main: {
    screen: Game,
    navigationOptions: {
      title: 'EmojiCrush'
    }
  }
}, {
  defaultNavigationOptions: {
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: '#191947',
    },
  }
}))

export default Routes