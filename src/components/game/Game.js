import React, { useEffect, useState } from "react"
import styled from "styled-components"
import OptimizedBoard from "../board/OptimizedBoard"
import PlayerOverlay from "../board/PlayerOverlay"
import Controller from "../controller/Controller"
import { LEVELS } from "../../constants/levels"

const Container = styled.div``
const GameBoard = styled.div``

const Layers = styled.div`
  display: grid;
  justify-content: center;
`
const Layer = styled.div`
  grid-column: 1;
  grid-row: 1;
`

const getCellSize = (width, height, modifier = 1.2) => {
  if (typeof window === "undefined") return 0
  if (window.innerWidth > window.innerHeight)
    return window.innerHeight / (height * modifier)
  return window.innerWidth / (width * modifier)
}

const checkIsWall = ({ x, y }, walls) => {
  console.log({ walls })
  return walls.some(wall => wall.index.x === x && wall.index.y === y)
}

export default ({}) => {
  const width = 28
  const height = 31
  const innerRows = [...Array(height).keys()]
  const innerBoard = innerRows.map(y => {
    const columns = [...Array(width).keys()]
    return columns.map(x => ({
      color: "#00000011",
      index: { x, y },
    }))
  })
  const [board, setBoard] = useState(innerBoard)
  const [player, setPlayer] = useState({ x: 1, y: 1 })
  const [cellSize, setCellSize] = useState(25)

  useEffect(() => {
    setCellSize(getCellSize(width, height))
    setBoard(
      board.map(row =>
        row.map(cell => ({
          ...cell,
          isWall: checkIsWall(cell.index, LEVELS[1].walls),
        }))
      )
    )
  }, [])

  const optimizedBoard = {
    player,
    cellSize,
    width,
    height,
    board,
    onBoardChange: board => setBoard(board),
  }

  return (
    <Container>
      <GameBoard>
        <Layers>
          <Layer>
            <PlayerOverlay player={player} board={board} cellSize={cellSize} />
          </Layer>
          <Layer>
            <OptimizedBoard {...optimizedBoard} />
          </Layer>
        </Layers>
      </GameBoard>
      <Controller
        board={board}
        player={player}
        onMove={position => setPlayer(position)}
      />
    </Container>
  )
}
