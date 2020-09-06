import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent"
import { changePosition, validatePosition } from "./controller-utils"

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

export default ({ board = [], player = {}, onMove }) => {
  const [prevPosition, setPrevPosition] = useState(player)
  const [isOnPerimeter, setIsOnPerimeter] = useState(false)
  const { x, y } = player

  const changeXpos = value => {
    const newPosition = {
      x: changePosition(x, value, board),
      y,
    }
    if (validatePosition(newPosition, board)) {
      onMove(newPosition)
    }
  }
  const changeYpos = value => {
    const newPosition = {
      x,
      y: changePosition(y, value, board),
    }
    if (validatePosition(newPosition, board)) {
      onMove(newPosition)
    }
  }

  const goUp = () => changeYpos(-1)
  const goLeft = () => changeXpos(-1)
  const goRight = () => changeXpos(1)
  const goDown = () => changeYpos(1)

  useKeyboardEvent("ArrowUp", () => {
    !isOnPerimeter && goUp()
  })
  useKeyboardEvent("ArrowLeft", () => {
    !isOnPerimeter && goLeft()
  })
  useKeyboardEvent("ArrowRight", () => {
    !isOnPerimeter && goRight()
  })
  useKeyboardEvent("ArrowDown", () => {
    !isOnPerimeter && goDown()
  })
  useKeyboardEvent(" ", () => {})

  const handleShift = (type, count, onChange) => {
    const timer = 150
    if (player[type] === 0 && prevPosition[type] === 1) {
      setTimeout(() => {
        onChange(count - 1)
        setPrevPosition(player)
      }, timer)
    } else if (player[type] === count - 1 && prevPosition[type] === 0) {
      setTimeout(() => {
        onChange(-1)
        setPrevPosition(player)
      }, timer)
    } else if (player[type] === count - 1 && prevPosition[type] === count - 2) {
      setTimeout(() => {
        onChange(-count + 1)
        setPrevPosition(player)
      }, timer)
    } else if (player[type] === 0 && prevPosition[type] === count - 1) {
      setTimeout(() => {
        onChange(1)
        setPrevPosition(player)
      }, timer)
    }
  }

  const checkPerimeter = (player, board) => {
    if (
      player.x === 0 ||
      player.y === 0 ||
      player.x === board[0].length - 1 ||
      player.y === board.length - 1
    ) {
      setIsOnPerimeter(true)
      return
    }
    setIsOnPerimeter(false)
  }

  useEffect(() => {
    checkPerimeter(player, board)
    handleShift("x", board[0].length, changeXpos)
    handleShift("y", board.length, changeYpos)
    setPrevPosition(player)
  }, [player, board])

  return (
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
  )
}
