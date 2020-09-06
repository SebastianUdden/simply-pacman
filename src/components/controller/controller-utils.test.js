const { changePosition } = require("./utils")

const BOARD = [
  [{ index: { x: 0, y: 0 } }, { index: { x: 0, y: 1 } }],
  [{ index: { x: 1, y: 1 } }, { index: { x: 2, y: 1 } }],
]
test("value should increase/decrease by amount given", () => {
  const X = 0
  const CHANGE = 1
  const result = changePosition(X, CHANGE)
  expect(result).toBe(CHANGE)
})

test("when value is less than zero, return array length", () => {
  const ARRAY1 = [0, 1]
  const ARRAY2 = [0, 1, 2, 3, 4]
  const X = 0
  const CHANGE = -1

  const result1 = changePosition(X, CHANGE, ARRAY1)
  expect(result1).toBe(1)

  const result2 = changePosition(X, CHANGE, ARRAY2)
  expect(result2).toBe(4)
})

test("when value is more than array length, return zero", () => {
  const ARRAY = [0, 1]
  const X = 1
  const CHANGE = 1
  const result = changePosition(X, CHANGE, ARRAY)
  expect(result).toBe(0)
})
