import GestureRecognizer from "react-native-swipe-gestures"
import { Animated } from "react-native"
import styled from "styled-components"

import { vmin } from "../../utils/viewPortUnits"

interface ItemAttributes {
  color: string
}

export const Container = styled(Animated.View)`
  align-items: center;
  height: ${vmin(10)}px;
  justify-content: center;
  width: ${vmin(10)}px;
`

export const ItemView = styled(GestureRecognizer)<ItemAttributes>`
  text-align: center;
  color: #fff;
  font-weight: bold;

  background: ${i => i.color};
  border-radius: ${vmin(10)*0.25}px;
  height: ${vmin(10)*0.8}px;
  width: ${vmin(10)*0.8}px;
`