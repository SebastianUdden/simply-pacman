import React, { useEffect } from "react"
import styled from "styled-components"
import BoardGrid from "./BoardGrid"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`

export default ({ player, board, onBoardChange, cellSize }) => {
  useEffect(() => {
    onBoardChange(
      board.map(row =>
        row.map(cell => {
          if (cell.index.x === player.x && cell.index.y === player.y) {
            return {
              ...cell,
              player: true,
            }
          }
          return {
            ...cell,
            player: false,
            isDot: !cell.isWall,
          }
        })
      )
    )
  }, [player])

  return (
    <>
      <Wrapper>
        {board && <BoardGrid board={board} cellSize={cellSize} />}
      </Wrapper>
    </>
  )
}
