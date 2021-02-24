import Item from './Item'

export default class Combo {
  type: String
  length: number
  items: Item[]

  constructor(type: String, length: number, items: Item[]) {
    this.type = type
    this.length = length
    this.items = items
  }
}