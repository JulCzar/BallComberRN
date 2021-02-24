import { Direction } from '../models/Utils'

type Increments = (direction: Direction) => {
  xIncrement: number,
  yIncrement: number
}

export const getIncrements: Increments = (direction: Direction) => ({
  'up': {
    xIncrement: 0,
    yIncrement: -1
  },
  'right': {
    xIncrement: 1,
    yIncrement: 0
  },
  'down': {
    xIncrement: 0,
    yIncrement: 1
  },
  'left': {
    xIncrement: -1,
    yIncrement: 0
  }
}[direction])