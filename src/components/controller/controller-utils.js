export const changePosition = (value, change, board) => {
  const newValue = value + change
  if (newValue < 0) return board.length - 1
  if (board && board.length - 1 < newValue) return 0
  return newValue
}

export const validatePosition = (position, board) => {
  const isWall = board[position.y][position.x].isWall
  return !isWall
}
