import Grid from '../models/Grid';
import Item from '../models/Item';

export default interface gameConfig  {
  gridBase: Grid,
  animationDuration?: number
}

export type Observer = (grid: Item[][]) => void