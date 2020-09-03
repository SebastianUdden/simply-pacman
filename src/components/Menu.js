import React, { useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.button`
  margin: 5px 0 10px;
  padding: 1rem 3rem;
  font-size: large;
  border: none;
  background-color: #000;
  border: 1px solid blue;
  color: white;
  :hover {
    cursor: pointer;
    border: 1px dashed blue;
  }
`
const SmallButton = styled.button`
  font-size: small;
  padding: 0 15px;
  background-color: #000;
  border: 1px solid blue;
  color: white;
  :hover {
    cursor: pointer;
    border: 1px dashed blue;
  }
`

const Title = styled.h2`
  border-bottom: 1px solid white;
  text-align: left;
  padding: 5px;
  display: flex;
  justify-content: space-between;
`

const HighScores = styled.div`
  min-width: 300px;
`

const HighScore = styled.p`
  color: #444;
  font-size: 20px;
  margin: 5px 0;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  color: white;
  border-bottom: 1px solid #444;
`

const Left = styled.div`
  display: flex;
  margin: 0;
`
const Place = styled.div`
  width: 30px;
  margin-right: 10px;
`
const Name = styled.span``
const Score = styled.span`
  color: orange;
`

export default ({ onClick, highScores = [] }) => {
  const [showAll, setShowAll] = useState(false)
  const MAX = 10
  const maxLength = highScores.length < MAX ? highScores.length : MAX
  const highScoresShown = showAll ? highScores : highScores.slice(0, maxLength)
  return (
    <Wrapper>
      <Button id="play" onClick={onClick}>
        Play
      </Button>
      {highScores.length !== 0 && (
        <HighScores>
          <Title>
            <span>High-score</span>
            <SmallButton onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Top 10" : "Show All"}
            </SmallButton>
          </Title>
          {highScoresShown.map(({ name, score }, index) => (
            <HighScore>
              <Left>
                <Place>{index + 1}.</Place>
                <Name>{name}</Name>
              </Left>
              <Score>{score}</Score>
            </HighScore>
          ))}
        </HighScores>
      )}
    </Wrapper>
  )
}
