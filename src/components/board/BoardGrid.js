import React from "react"
import styled from "styled-components"

const BoardGrid = styled.div``
const Board = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
`
const Row = styled.div`
  display: flex;
`
const Cell = styled.div`
  box-sizing: border-box;
  margin: ${p => p.margin || "0"};
  background-color: ${p => p.color};
  width: ${p => p.cellSize}px;
  height: ${p => p.cellSize}px;
  border-color: ${p => (p.isWall ? "blue" : "#00000000")};
  border-style: solid;
  border-width: ${p => p.borderWidth || "1px"};
  background-color: ${p => (p.isWall ? "black" : "#00000000")};
  z-index: 99;
`

export default ({ board, cellSize }) => {
  return (
    <BoardGrid>
      <Board cellSize={cellSize}>
        {board.map(row => (
          <Row>
            {row.map(cell => (
              <Cell {...cell} cellSize={cellSize}>
                {cell.content}
              </Cell>
            ))}
          </Row>
        ))}
      </Board>
    </BoardGrid>
  )
}
