import { Direction } from '../models/Utils'

export const getIncrements: (direction: Direction) => { xIncrement: number, yIncrement: number } = direction => ({
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