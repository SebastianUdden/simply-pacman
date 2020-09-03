const shiftX = (shift, blocks) =>
  blocks.map(({ index: { x, y } }) => ({ index: { x: x + shift, y } }))
const shiftY = (shift, blocks) =>
  blocks.map(({ index: { x, y } }) => ({ index: { x, y: y + shift } }))

const createBlocks = (rows, columns) => {
  const cells = [...Array(columns).keys()].map(cellIndex => ({
    index: { x: cellIndex, y: 0 },
  }))
  const fullArray = [...Array(rows).keys()].map(rowIndex => {
    const cellsRow = cells.slice()
    return cellsRow.map(({ index: { x, y } }) => ({
      index: { x, y: rowIndex },
    }))
  })
  return fullArray.flat()
}

export const LEVELS = {
  1: {
    name: "Lvl 1",
    blocks: [
      // Row 1
      ...shiftY(2, shiftX(2, createBlocks(3, 4))),
      ...shiftY(2, shiftX(7, createBlocks(3, 5))),
      ...shiftY(1, shiftX(13, createBlocks(4, 2))),
      ...shiftY(2, shiftX(22, createBlocks(3, 4))),
      ...shiftY(2, shiftX(16, createBlocks(3, 5))),

      // Row 2
      ...shiftY(6, shiftX(2, createBlocks(2, 4))),
      ...shiftY(6, shiftX(22, createBlocks(2, 4))),
      // T-shape left
      ...shiftY(6, shiftX(7, createBlocks(8, 2))),
      ...shiftY(9, shiftX(9, createBlocks(2, 3))),
      // T-shape top
      ...shiftY(6, shiftX(10, createBlocks(2, 8))),
      ...shiftY(8, shiftX(13, createBlocks(3, 2))),
      // T-shape right
      ...shiftY(6, shiftX(19, createBlocks(8, 2))),
      ...shiftY(9, shiftX(16, createBlocks(2, 3))),

      // Middle section
      ...shiftY(9, shiftX(1, createBlocks(5, 5))),
      ...shiftY(15, shiftX(1, createBlocks(5, 5))),
      ...shiftY(15, shiftX(22, createBlocks(5, 5))),
      ...shiftY(9, shiftX(22, createBlocks(5, 5))),
      // Cage
      ...shiftY(12, shiftX(10, createBlocks(1, 3))),
      ...shiftY(12, shiftX(15, createBlocks(1, 3))),
      ...shiftY(16, shiftX(10, createBlocks(1, 8))),
      ...shiftY(13, shiftX(10, createBlocks(3, 1))),
      ...shiftY(13, shiftX(17, createBlocks(3, 1))),

      // Row 3
      ...shiftY(15, shiftX(7, createBlocks(5, 2))),
      ...shiftY(15, shiftX(19, createBlocks(5, 2))),
      // T-shape top
      ...shiftY(18, shiftX(10, createBlocks(2, 8))),
      ...shiftY(20, shiftX(13, createBlocks(3, 2))),

      // Row 4
      ...shiftY(24, shiftX(1, createBlocks(2, 2))),
      ...shiftY(24, shiftX(25, createBlocks(2, 2))),

      // L-shape left
      ...shiftY(21, shiftX(2, createBlocks(2, 4))),
      ...shiftY(23, shiftX(4, createBlocks(3, 2))),
      ...shiftY(21, shiftX(7, createBlocks(2, 5))),
      ...shiftY(21, shiftX(16, createBlocks(2, 5))),
      // L-shape right
      ...shiftY(21, shiftX(22, createBlocks(2, 4))),
      ...shiftY(23, shiftX(22, createBlocks(3, 2))),

      // Row 5

      // T-shape bottom left
      ...shiftY(27, shiftX(2, createBlocks(2, 10))),
      ...shiftY(24, shiftX(7, createBlocks(3, 2))),
      // T-shape top
      ...shiftY(24, shiftX(10, createBlocks(2, 8))),
      ...shiftY(26, shiftX(13, createBlocks(3, 2))),
      // T-shape bottom right
      ...shiftY(27, shiftX(16, createBlocks(2, 10))),
      ...shiftY(24, shiftX(19, createBlocks(3, 2))),
    ],
  },
}
