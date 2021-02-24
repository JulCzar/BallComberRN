import { sortValue } from '../utils/sortValue'

export default class Item {
  fall: number
  position: { x: number; y: number }
  value: number
  maxValue: number

  constructor (x: number, y: number, initialValue: number, maxValue: number) {    
    this.maxValue = maxValue
    this.value = initialValue
    this.position =  { x, y }
    this.fall = 0;
  }

  sortNewValue = () => {
    this.value = sortValue(this.maxValue)
  }
  
  isEmpty() {
    return this.value === -1
  }
  getX() { return this.position.x }
  getY() { return this.position.y }

  popValue() {
    const value = this.value
    this.value = -1
    
    return value
  }

  increaseFall() {
    this.fall++
  }

  setFall(value: number) {
    this.fall = value
  }

  getFallCount() {
    const value = this.fall
    this.fall = 0
    
    return value
  }
}