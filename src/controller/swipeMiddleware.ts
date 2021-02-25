import gameConfig, { Observer } from './gameConfig'
import { getIncrements } from './getIncrements'

import { doAfter } from '../utils/wait'

import { Direction, Position } from '../models/Utils'

const getOppositeDirection: (direction: Direction) => Direction = direction => {
  switch(direction) {
    case 'up':
      return 'down'
    case 'down':
      return 'up'
    case 'right':
      return 'left'
    case 'left':
      return 'right'
  }
}

export const getSwipeMiddleWare = ({
  gridBase,
  animationDuration = 0
}: gameConfig) => {
  const grid = gridBase
  const observers: Observer [] = []

  const onSwipe = (direction: Direction, position: Position) => {
    const { x, y } = position

    const { xIncrement, yIncrement } = getIncrements(direction)
    const oppositeDirection = getOppositeDirection(direction)

    const itemMoved = grid.getItem(x, y)
    const itemSided = grid.getItem(x+xIncrement, y+yIncrement)

    itemMoved.swipe = direction
    itemSided.swipe = oppositeDirection

    doAfter(() => {}, animationDuration)
  }
}