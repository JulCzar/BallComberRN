import { View } from 'react-native'
import styled from 'styled-components'
import { vmin } from '../../utils/viewPortUnits'

export const GridView = styled(View)`
  width: ${vmin(100)}px;
  height: ${vmin(100)}px;
  overflow: hidden;
`

export const Row = styled(View)`
  flex-direction: row;
`