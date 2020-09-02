import React, { useState, useEffect } from "react"
import styled from "styled-components"

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const HighScore = styled.p`
  font-size: 25px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: white;
  border-bottom: 1px solid white;
`
const Name = styled.span``
const Score = styled.span`
  color: orange;
`

const Input = styled.input`
  font-size: 20px;
  padding: 10px;
  width: 100%;
  max-width: 95%;
  margin-bottom: 10px;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px;
`

const Button = styled.button`
  :first-child {
    margin-right: 10px;
  }
  padding: 15px;
  width: 100%;
  font-size: large;
  border: none;
  background-color: #000;
  border: 1px solid ${p => (p.disabled ? "white" : "blue")};
  color: white;
  :hover {
    cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
    background-color: ${p => (p.disabled ? "#aaa" : "#777")};
  }
`

const getEnding = place => {
  if (place === 1) return "st"
  if (place === 2) return "nd"
  if (place === 3) return "rd"
  return "th"
}

const getPlacementText = place => {
  if (place === -1) return "You placed last: "
  const placement = place + 1
  return `You placed ${placement}${getEnding(placement)}:`
}

export default ({ highScores, score, onSubmit }) => {
  const [name, setName] = useState("")
  const [placement, setPlacement] = useState(1)
  useEffect(() => {
    const place = highScores.findIndex(highScore => highScore.score < score)
    setPlacement(getPlacementText(place))
  }, [])

  return (
    <Form>
      <HighScore>
        <Name>{placement}</Name>
        <Score>{score}</Score>
      </HighScore>
      <Input
        id="username"
        placeholder="Enter username"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <Buttons>
        <Button
          onClick={() => {
            if (!name) {
              document.getElementById("username").focus()
              return
            }
            const newObj = { name, score }
            const newHighScores = [...highScores, newObj].sort(
              (a, b) => b.score - a.score
            )

            onSubmit(name ? newHighScores : highScores)
          }}
        >
          Submit
        </Button>
        <Button onClick={() => onSubmit(highScores)}>Cancel</Button>
      </Buttons>
    </Form>
  )
}
