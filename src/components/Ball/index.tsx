import React from 'react'
import { Animated } from 'react-native'

import { Direction, Position } from '../../models/Utils'
import { Container, ItemView } from './styles'

import Item from '../../models/Item'
import { vmin } from '../../utils/viewPortUnits'

const COLORS = ['teal', 'red', '#666654', 'pink', 'purple']

const inputRange = [0,1]

const animationConfig = {
  toValue: 1,
  duration: 500,
  useNativeDriver: false
}

interface BallConfig {
  item: Item,
  onSwipe?: (direction: Direction, position: Position) => void
}

const Ball: React.FC<BallConfig> = ({ item, onSwipe }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const [swipe, setSwipe] = React.useState<Direction | null>(null)

  React.useEffect(() => {
    Animated
      .timing(fadeAnim, animationConfig)
      .start()
  }, [fadeAnim])

  React.useEffect(() => {
    if (!swipe) return

    if (onSwipe) onSwipe(swipe, item.position)
    
    setSwipe(null)
  }, [swipe])

  const getItemAnimation = () => {
    const getInitialItemRelativePosition = (swipe: Direction) => {
      const initialPositionPositive = ['down', 'right']

      if (initialPositionPositive.includes(swipe))
        return ITEM_HEIGHT * -1

      return ITEM_HEIGHT
    }

    const ITEM_HEIGHT = vmin(10)
    const swipe = item.getSwipeDirection()

    const result = {
      inputRange,
      outputRange: [fallHeight, 0]
    }

    if (swipe) {
      const horizontalSwipe = ['left', 'right']
      const initialItemRelativePosition = getInitialItemRelativePosition(swipe)

      result.outputRange = [0,initialItemRelativePosition]

      if (horizontalSwipe.includes(swipe)) {
        return { translateX: fadeAnim.interpolate(result) }
      }
      
      return {
        translateY: fadeAnim.interpolate(result)
      }
    }

    return {
      translateY: fadeAnim.interpolate(result)
    }
  }

  const fallHeight = vmin(10) * item.getFallCount()
  const itemAnimation = getItemAnimation()

  return (
    <Container style={itemAnimation}>
      <ItemView color={COLORS[item.value]}
        onSwipeUp={() => setSwipe('up')}
        onSwipeRight={() => setSwipe('right')}
        onSwipeDown={() => setSwipe('down')}
        onSwipeLeft={() => setSwipe('left')}/>
    </Container>
  )
}

export default Ball