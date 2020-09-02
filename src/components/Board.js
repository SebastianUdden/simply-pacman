import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { useKeyboardEvent } from "../hooks/useKeyboardEvent"
import { WALL_COLOR } from "../constants/colors"
import Pacman from "./Pacman"
import Dot from "./Dot"

const CELL_SIZE = 25

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  margin-bottom: 20px;
`
const Board = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${p => p.cellSize + 2}px;
`
const Row = styled.div`
  display: flex;
`
const Cell = styled.div`
  margin: ${p => p.margin || "0"};
  background-color: ${p => p.color};
  width: ${p => p.cellSize}px;
  height: ${p => p.cellSize}px;
  box-shadow: 1px 1px black;
  border-color: ${p => p.borderColor || "#222"};
  border-style: solid;
  border-width: ${p => p.borderWidth || "1px"};
`
const Controller = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Arrow = styled.button`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  font-size: 30px;
  border: none;
  background-color: #000;
  border: 1px solid blue;
  color: #fff;
  touch-action: manipulation;
  user-select: none;
  outline: none;
  min-height: 40px;
  :hover {
    cursor: pointer;
    border: 1px dashed blue;
  }
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 5px 5px;
  width: 100%;
  height: 100%;
`
const Meta = styled.p`
  font-weight: 800;
  font-size: 25px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 10px auto;
`

const Level = styled.span`
  border-bottom: 1px solid orange;
`
const Score = styled.span`
  border-bottom: 1px solid orange;
`

const getCellSize = () => {
  if (typeof window === "undefined") return CELL_SIZE
  return window.innerHeight / 60
}

const getBorder = (columns, i) => i === 0 || i === columns.length - 1
const getBordersAndMargin = (board, { x, y }) => {
  // Top left
  if (x === 0 && y === 0)
    return { border: "1px 0 0 1px", margin: "0 1px 1px 0" }
  // Top right
  if (x === board[0].length - 1 && y === 0)
    return { border: "1px 1px 0 0", margin: "0 0 1px 1px" }
  // Bottom left
  if (x === 0 && y === board.length - 1)
    return { border: "0 0 1px 1px", margin: "1px 1px 0 0" }
  // Bottom right
  if (x === board[0].length - 1 && y === board.length - 1)
    return { border: "0 1px 1px 0", margin: "1px 0 0 1px" }
  // Left
  if (x === 0 && y !== 0) return { border: "0 1px", margin: "1px 0" }
  // Right
  if (x === board[0].length - 1 && y !== 0)
    return { border: "0 1px", margin: "1px 0" }
  // Top
  if (x !== 0 && y === 0) return { border: "1px 0", margin: "0 1px" }
  // Bottom
  if (x !== 0 && y === board.length - 1)
    return { border: "1px 0", margin: "0 1px" }
  return { border: "0", margin: "1px" }
}
const getValidPosition = ({ board, x, y }) => {
  if (x === 0 || y === 0) return false
  if (x === board[0].length - 1 || y === board.length - 1) return false
  return true
}

const checkEatenDots = (eatenDots, cellIndex, rowIndex) =>
  eatenDots.some(({ x, y }) => x === cellIndex && y === rowIndex)

const addDot = (dots, newDot) => {
  if (dots.some(({ x, y }) => x === newDot.x && y === newDot.y)) return dots
  return [...dots, newDot]
}

const checkBoardComplete = board =>
  board.every(row => row.every(cell => !cell.isDot))

export default ({ pause, score, onEndGame, onScoreChange }) => {
  const width = 20
  const height = 20
  const innerRows = [...Array(height).keys()]
  const innerBoard = innerRows.map(y => {
    const columns = [...Array(width).keys()]
    return columns.map((x, i) => ({
      color: "black",
      index: { x, y },
      blocked: i === 0 || columns.length - 1,
    }))
  })
  const [board, setBoard] = useState(innerBoard)
  const [cellSize, setCellSize] = useState(CELL_SIZE)
  const [x_pos, setX_pos] = useState(4)
  const [y_pos, setY_pos] = useState(4)
  const [lvl, setLvl] = useState(1)
  const [eatenDots, setEatenDots] = useState([])

  const resetBoard = () => {
    setBoard(innerBoard)
    setEatenDots([])
    setX_pos(4)
    setY_pos(4)
  }
  const changeXpos = value => {
    const newPosition = x_pos + value
    if (getValidPosition({ board, x: newPosition, y: y_pos })) {
      setX_pos(newPosition)
    }
  }
  const changeYpos = value => {
    const newPosition = y_pos + value
    if (getValidPosition({ board, x: x_pos, y: newPosition })) {
      setY_pos(newPosition)
    }
  }

  const goUp = () => changeYpos(-1)
  const goLeft = () => changeXpos(-1)
  const goRight = () => changeXpos(1)
  const goDown = () => changeYpos(1)

  useKeyboardEvent("ArrowUp", () => {
    goUp()
  })
  useKeyboardEvent("ArrowLeft", () => {
    goLeft()
  })
  useKeyboardEvent("ArrowRight", () => {
    goRight()
  })
  useKeyboardEvent("ArrowDown", () => {
    goDown()
  })
  useKeyboardEvent(" ", () => {})

  useEffect(() => {
    if (eatenDots.length > 1) onScoreChange(score + 10)
  }, [eatenDots])

  useEffect(() => {
    setEatenDots(addDot(eatenDots, { x: x_pos, y: y_pos }))
    if (eatenDots.length !== 0 && checkBoardComplete(board)) {
      setLvl(lvl + 1)
      resetBoard()
    }
    setBoard(
      board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          if (cell.index.x === x_pos && cell.index.y === y_pos) {
            return {
              ...cell,
              player: true,
              content: <Pacman />,
            }
          }
          const isWall = getBorder(row, cellIndex) || getBorder(board, rowIndex)
          const isEatenDot = checkEatenDots(eatenDots, cellIndex, rowIndex)
          const bordersAndMargin = getBordersAndMargin(board, cell.index)
          return {
            ...cell,
            margin: bordersAndMargin.margin,
            borderColor: isWall ? WALL_COLOR : "black",
            borderWidth: bordersAndMargin.border,
            isDot: !isWall && !isEatenDot,
            content: !isWall && !isEatenDot && <Dot />,
          }
        })
      )
    )
  }, [x_pos, y_pos])

  useEffect(() => {
    setCellSize(getCellSize())
  }, [])

  return (
    <>
      <Meta>
        <Level>Lvl {lvl}</Level>
        <Score>{score}</Score>
      </Meta>
      <Wrapper>
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
        <Controller>
          <Column>
            <Arrow onClick={goLeft}></Arrow>
          </Column>
          <Column>
            <Arrow onClick={goUp}></Arrow>
            <Arrow onClick={goDown}></Arrow>
          </Column>
          <Column>
            <Arrow onClick={goRight}></Arrow>
          </Column>
        </Controller>
      </Wrapper>
    </>
  )
}
