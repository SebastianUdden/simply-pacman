import React from "react"
import styled from "styled-components"
import Pacman from "../svgs/Pacman"
import { checkIfLeaveBoard } from "./utils"

const BoardGrid = styled.div``
const Board = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  z-index: 1;
`
const Cell = styled.div`
  margin: ${p => p.margin || "0"};
  background-color: ${p => p.color};
  width: ${p => p.cellSize}px;
  height: ${p => p.cellSize}px;
  border-color: ${p => p.borderColor || "#000"};
  border-style: solid;
  border-width: ${p => p.borderWidth || "1px"};
  opacity: ${p => (p.hide ? 0 : 1)};
  transition: transform 150ms, opacity 150ms;
  transform: ${p =>
    `translateX(${p.translateX || 0}) translateY(${p.translateY || 0})`};
`

export default ({ player, board, cellSize }) => {
  const translateX = player.x * cellSize + "px"
  const translateY = player.y * cellSize + "px"
  const cell = { translateX, translateY, cellSize }

  const leaveBoard = checkIfLeaveBoard(player, board)
  return (
    <BoardGrid>
      <Board cellSize={cellSize}>
        <Cell {...cell} hide={leaveBoard}>
          <Pacman />
        </Cell>
      </Board>
    </BoardGrid>
  )
}
