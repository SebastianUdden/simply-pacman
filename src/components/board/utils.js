export const checkIfLeaveBoard = (player, board) => {
  return (
    player.x < 1 ||
    player.x > board[0].length - 2 ||
    player.y < 1 ||
    player.y > board.length - 2
  )
  // const directions = []
  // if (player.x < 1) directions.push("left")
  // if (player.x > board[0].length - 2) directions.push("right")
  // if (player.y < 1) directions.push("top")
  // if (player.y > board.length - 2) directions.push("bottom")
  // return directions
}
