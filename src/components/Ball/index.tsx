import React from 'react'
import { Animated } from 'react-native'
import Item from '../../models/Item'
import { Direction, Position } from '../../models/Utils'
import { Container, ItemView } from './styles'

const COLORS = ['teal', 'red', '#666654', 'pink', 'purple']

interface BallConfig {
  item: Item,
  onSwipe?: (direction: Direction, position: Position) => void
}

const Ball: React.FC<BallConfig> = ({ item, onSwipe }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const [swipe, setSwipe] = React.useState<Direction | null>(null)

  React.useEffect(() => Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false
  }).start(), [fadeAnim])

  React.useEffect(() => {
    if (!swipe) return

    if (onSwipe) onSwipe(swipe, item.position)
    
    setSwipe(null)
  }, [swipe])

  const fallHeight = -30 * item.getFallCount()
  const fallAnimation = {
    transform: [
      {
        translateY: fadeAnim.interpolate({
          inputRange: [0,1],
          outputRange: [fallHeight, 0]
        })
      }
    ]
  }

  return (
    <Container style={fallAnimation}>
      <ItemView color={COLORS[item.value]}
        onSwipeUp={() => setSwipe('up')}
        onSwipeRight={() => setSwipe('right')}
        onSwipeDown={() => setSwipe('down')}
        onSwipeLeft={() => setSwipe('left')}/>
    </Container>
  )
}

export default Ball