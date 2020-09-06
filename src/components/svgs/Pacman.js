import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  margin-top: -5px;
`

export default ({ color = "yellow" }) => {
  return (
    <Wrapper>
      <svg viewBox="0 0 100 100">
        <circle fill={color} cx="50" cy="50" r="50" />
      </svg>
    </Wrapper>
  )
}
