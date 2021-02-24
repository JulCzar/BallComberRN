import React from 'react'
import { View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import styled from 'styled-components'
import Item from '../../models/Item'
import { Direction, Position } from '../../models/Utils'
import { vmin } from '../../utils/viewPortUnits'

const COLORS = ['teal', 'red', '#666654', 'pink', 'purple']

interface ItemDependent {
  item: Item,
  onSwipe?: (direction: Direction, position: Position) => void
}

interface ItemAttributes {
  color: string
}

const Container = styled(View)`
  align-items: center;
  height: ${vmin(10)}px;
  justify-content: center;
  width: ${vmin(10)}px;
`

const ItemView = styled(GestureRecognizer)<ItemAttributes>`
  text-align: center;
  color: #fff;
  font-weight: bold;

  background: ${i => i.color};
  border-radius: ${vmin(10)*0.25}px;
  height: ${vmin(10)*0.8}px;
  width: ${vmin(10)*0.8}px;
  
`

const Ball: React.FC<ItemDependent> = ({ item, onSwipe }) => {
  const [swipe, setSwipe] = React.useState<'up'|'down'|'right'|'left'|''>('')

  React.useEffect(() => {
    if (!swipe) return

    if (onSwipe) onSwipe(swipe, item.position)
    
    setSwipe('')
  }, [swipe])

  return (
    <Container>
      <ItemView
        onSwipeUp={() => setSwipe('up')}
        onSwipeRight={() => setSwipe('right')}
        onSwipeDown={() => setSwipe('down')}
        onSwipeLeft={() => setSwipe('left')}
        color={COLORS[item.value]}
      />
    </Container>
  )
}

export default Ball