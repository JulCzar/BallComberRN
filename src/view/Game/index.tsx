import React from 'react'

import { getSwipeMiddleWare } from '../../controller/swipeMiddleware'
import { createGameEnvironment } from '../../controller/game'
import { Container } from '../../styles'
import { GridView, Row } from './styles'

// Models
import Grid from '../../models/Grid'
import Item from '../../models/Item'
import Ball from '../../components/Ball'
import { Direction, Position } from '../../models/Utils'

// Temporary
const GAME_CONFIG = {
  gridBase: new Grid(10, 10),
  animationDuration: 1000
}

const Game = () => {
  const [grid, setGrid] = React.useState<Item[][]>([[]])
  const [game] = React.useState(createGameEnvironment(GAME_CONFIG))
  const [swipeMiddleware] = React.useState(getSwipeMiddleWare(GAME_CONFIG))

  React.useEffect(() => {
    game.subscribe(setGrid)

    swipeMiddleware.subscribe(setGrid)

    game.start()
  }, [])

  const animateSwipe = (direction: Direction, position: Position) => {
    swipeMiddleware.onSwipe(direction, position, game.handleMovement)
  }

  return (
    <Container>
      <GridView>
      {grid.map(row => (
        <Row key={JSON.stringify(row)}>
        {row.map(i => (
          <Ball key={JSON.stringify(i)}
            onSwipe={animateSwipe}
            item={i}
          />))}
        </Row>))}
      </GridView>
    </Container>
  );
}

export default Game