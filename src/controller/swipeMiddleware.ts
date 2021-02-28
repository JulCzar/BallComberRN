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

  const subscribe = (observer: Observer) => {
    if (observers.includes(observer)) return

    observers.push(observer)
  }

  const notifyAll = () => {
    console.log(`Notifying ${observers.length} observers about a swipe event`)
    observers.forEach(observer => observer(grid.getGrid()))
  }

  const onSwipe = (direction: Direction, position: Position, toDoNext: (direction: Direction, position: Position) => void) => {
    const { x, y } = position

    const { xIncrement, yIncrement } = getIncrements(direction)
    const oppositeDirection = getOppositeDirection(direction)

    const itemMoved = grid.getItem(x, y)
    const itemSided = grid.getItem(x+xIncrement, y+yIncrement)

    itemMoved.swipe = direction
    itemSided.swipe = oppositeDirection

    notifyAll()

    doAfter(toDoNext, animationDuration, direction, position)
  }

  return {
    subscribe,
    onSwipe
  }
}