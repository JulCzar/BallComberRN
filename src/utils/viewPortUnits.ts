import { Dimensions } from 'react-native';

export const vw = (number: number) => Dimensions.get('window').width * (number / 100);
export const vh = (number: number) => Dimensions.get('window').height * (number / 100);

export const vmin = (number: number) => {
  const VH = vh(1) * number;
  const VW = vw(1) * number;
  return Math.min(VW, VH);
}
export const vmax = (number: number) => {
  const VH = vh(1) * number;
  const VW = vw(1) * number;
  return Math.max(VW, VH);
}
