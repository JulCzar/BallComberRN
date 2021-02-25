import React from 'react'

import { createGameEnvironment } from '../../controller/game'
import { Container } from '../../styles'
import { GridView, Row } from './styles'

// Models
import Grid from '../../models/Grid'
import Item from '../../models/Item'
import Ball from '../../components/Ball'

// Temporary
const GAME_CONFIG = {
  gridBase: new Grid(10, 10),
  animationDuration: 1000
}

const Game = () => {
  const [grid, setGrid] = React.useState<Item[][]>([[]])
  const [game] = React.useState(createGameEnvironment(GAME_CONFIG))

  React.useEffect(() => {
    game.subscribe(setGrid)

    game.start()
  }, [])

  return (
    <Container>
      <GridView>
      {grid.map(row => (
        <Row key={JSON.stringify(row)}>
        {row.map(i => (
          <Ball key={JSON.stringify(i)}
            onSwipe={game.handleMovement}
            item={i}
          />))}
        </Row>))}
      </GridView>
    </Container>
  );
}

export default Game