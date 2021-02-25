import React from 'react'
import Ball from '../../components/Ball'
import { createGameEnvironment } from '../../controller/game'
import Grid from '../../models/Grid'
import Item from '../../models/Item'
import { Container } from '../../styles'
import { Row } from './styles'

// Temporary
const GAME_CONFIG = {
  gridBase: new Grid(10, 10),
  animationDuration: 500
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
    {grid.map(row => (
      <Row key={JSON.stringify(row)}>
      {row.map(i => (
        <Ball
          key={JSON.stringify(i)}
          onSwipe={game.handleMovement}
          item={i}
        />))}
      </Row>))}
    </Container>
  );
}

export default Game