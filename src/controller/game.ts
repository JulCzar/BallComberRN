import Combo from '../models/Combo'
import Grid from '../models/Grid'
import Item from '../models/Item'
import { Position, Direction } from '../models/Utils'
import { doAfter } from '../utils/wait'
import gameConfig, { Observer } from './gameConfig'
import { getIncrements } from './getIncrements'

export const createGameEnvironment = ({ gridBase, animationDuration = 0 }: gameConfig) => {
  const grid: Item[][] = [[]]
  const { width, height } = gridBase
  const observers: Observer[] = []
  const state = {
    lock: {
      externalGridChanges: false
    }
  }

  const isGridLocked = () => state.lock.externalGridChanges
  const lockExternalGridChanges = () => {
    console.log('locking grid to external changes')
    state.lock.externalGridChanges = true
  }
  const unlockExternalGridChanges = () => {
    console.log('unlocking grid to external changes')
    state.lock.externalGridChanges = false
  }

  const subscribe = (observer: Observer) => {
    if (observers.includes(observer)) return

    observers.push(observer)
  }

  const notifyAll = () => {
    const publicGrid = grid.map(row => [...row])

    console.log(`notifying ${observers.length} observers about a grid change`)

    for (const observer of observers) observer(publicGrid)
  }

  const createInitialGrid = () => {
    for(let y=0; y<height; y++) {
      grid[y] = []

      for(let x=0; x<width; x++)
        grid[y][x] = gridBase.getItem(x,y)
    }
    
    notifyAll()
  }

  const updateGridValues = () => {
    const dropValuesOnce = () => {
      const reverseGrid = [...grid].reverse()

      for (let y=0;y<height;y++) {
        const row = reverseGrid[y]
        const rowAbove = reverseGrid[y+1] || []

        for (let x=0; x<width; x++) {
          const item = row[x]
          const itemAbove = rowAbove[x] || Grid.getEmptyItem()

          if (item.isEmpty()) {
            item.value = itemAbove.popValue()
            item.increaseFall()
          }
        }
      }
    }

    const hasFloatingItems = () => {
      for (let y=0; y<height;y++) {
        const row = grid[y]
        const rowBellow = grid[y+1] || []

        for (let x=0; x<width;x++) {
          const currentItem = row[x]
          const itemBellow = rowBellow[x]

          if (!currentItem.isEmpty()) {
            if (y+1>=height) continue

            if (itemBellow.isEmpty()) return true
          }
        }
      }
      return false
    }

    const fillEmptyValues = () => {
      for (const row of grid) {
        for (const item of row) {
          if (item.isEmpty()) {
            item.sortNewValue()
          }
        }
      }
    }

    do { dropValuesOnce() } while (hasFloatingItems())

    fillEmptyValues()
  }

  const reduceComboList = (comboList: Combo[]) => {}

  const findHorizontalCombos = () => {
    const combos = []

    for (let y=0; y<height; y++) {
      for (let x=0;x<width-2;x++) {

        const [item1, item2, item3] = [grid[y][x], grid[y][x+1], grid[y][x+2]]

        const item1EqualsItem2 = item1.value === item2.value
        const item2EqualsItem3 = item2.value === item3.value

        const isACombo = item1EqualsItem2&&item2EqualsItem3 && !item1.isEmpty()

        if (isACombo)
          combos.push(new Combo('horizontal', 3, [item1, item2, item3]))
      }
    }

    // const reducedCombos = reduceCombos(combos)

    return combos
  }

  const findVerticalCombos = () => {
    const combos = []

    for (let y=0; y<height-2; y++) {
      for (let x=0; x<width; x++) {
        const [item1, item2, item3] = [grid[y][x], grid[y+1][x], grid[y+2][x]]

        const item1EqualsItem2 = item1.value === item2.value
        const item2EqualsItem3 = item2.value === item3.value

        const isACombo = item1EqualsItem2 && item2EqualsItem3 && !item1.isEmpty()

        const items = [item1, item2, item3]

        if (isACombo) combos.push(new Combo('vertical', 3, items))
      }
    }

    // const reducedCombos = reduceCombos(combos)

    return combos
  }

  const findCombos = () => {
    const horizontalCombos = findHorizontalCombos()
    const verticalCombos = findVerticalCombos()

    const combos = [...horizontalCombos, ...verticalCombos]

    return combos;
  }
  const removeCombos = (comboList: Combo[]) => {
    for (const combo of comboList)
      for (const item of combo.items)
        item.popValue()

    console.log(`removed ${comboList.length} combos from grid`)
  }
  
  const handleCombos = async (animDuration = animationDuration) => {
    const notifyObservers = () => {
      notifyAll()

      handleCombos(animDuration)
    }

    const combos = findCombos()

    console.log(`found ${combos.length} valid combos.`)
    
    if (!combos.length) return unlockExternalGridChanges()

    removeCombos(combos)
    
    updateGridValues()

    if (animDuration)
      await doAfter(notifyObservers, animDuration)
    else {
      notifyObservers()
    }
  }

  const updateItemPosition = (row: number, col: number, direction: Direction) => {
    const isMovingOutsideGrid = () => {
      const isMovingFirstRowUp = row===0 && direction === 'up'
      const isMovingLastRowDown = row===height-1 && direction === 'down'
      const isMovingFirstColumnLeft = col===0 && direction === 'left'
      const isMovingLastColRight = col===height-1 && direction === 'right'

      return isMovingFirstRowUp || isMovingLastRowDown || isMovingFirstColumnLeft || isMovingLastColRight
    }
    if (isMovingOutsideGrid()) return

    const { xIncrement, yIncrement } = getIncrements(direction)

    const aux = grid[row][col]
    const sideItem = grid[row + yIncrement][col+xIncrement]
    
    if (!aux || !sideItem || aux.isEmpty() || sideItem.isEmpty()) return

    grid[row][col] = grid[row+yIncrement][col+xIncrement]
    grid[row+yIncrement][col+xIncrement] = aux
  }
  const handleMovement = (direction: Direction, position: Position) => {
    if (isGridLocked()) return console.warn('touch event ignored due to lock state')

    lockExternalGridChanges()

    const { x, y } = position
    const { xIncrement, yIncrement } = getIncrements(direction)

    const rowIsValid = y+yIncrement >= 0 && y+yIncrement <= height
    const colIsValid = x+xIncrement >= 0 && x+xIncrement <= width

    if (!rowIsValid || !colIsValid) return unlockExternalGridChanges()

    updateItemPosition(y, x, direction)

    notifyAll()

    console.log(`moving ${y}-${x} ${direction}`)

    const combos = findCombos()

    if (!combos.length)  {
      updateItemPosition(y, x, direction)

      console.log('invalid move')

      unlockExternalGridChanges()
    }
    else handleCombos()
  }

  /** Function that create the initial grid and notify all observers about the grid layout */
  const start = () => {
    const clearFallCount = () => grid.forEach(row => row.forEach(i => i.getFallCount()))

    createInitialGrid()

    handleCombos(0)

    clearFallCount()

    notifyAll()
  }

  return {
    subscribe,
    start,
    handleMovement
  }
}