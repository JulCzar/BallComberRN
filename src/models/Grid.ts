import { sortValue } from '../utils/sortValue';
import Item from './Item';

const EMPTY_ITEM = new Item(-1, -1, 2, -1)

const REGISTERED_ITEMS_QUANTITY = 5

export default class Grid {
  grid: Item[][]
  lockState: boolean
  width: number
  height: number

  /**
   * 
   * @param width number of columns the grid will have
   * @param height number of rows the grid will have
   */
  constructor(width: number, height: number) {
    this.grid = [[]]
    this.lockState = false
    this.width = width
    this.height = height

    this.createGrid()
  }

  private createGrid() {
    for(let y=0; y<this.height; y++) {
      this.grid[y] = [EMPTY_ITEM]
      const currentRow = this.grid[y]

      for(let x=0; x<this.width; x++)
        currentRow[x] = new Item(x, y, sortValue(REGISTERED_ITEMS_QUANTITY), REGISTERED_ITEMS_QUANTITY)
    }
  }

  static getEmptyItem() {
    return EMPTY_ITEM
  }

  getItem(x: number, y: number) {
    return this.grid[y][x]
  }

  getItemAbove(item: Item) {
    const { x, y } = item.position
    if (!y) return EMPTY_ITEM
    return this.grid[y-1][x]
  }

  getGrid() {
    return this.grid
  }
}