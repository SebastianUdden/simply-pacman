import React from "react"

export default ({ color = "yellow" }) => {
  return (
    <svg viewBox="0 0 100 100">
      <circle fill={color} cx="50" cy="50" r="10" />
    </svg>
  )
}
