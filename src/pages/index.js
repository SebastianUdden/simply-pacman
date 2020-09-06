import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Board from "../components/board/OptimizedBoard"
import Menu from "../components/Menu"
import EnterHighScore from "../components/EnterHighScore"
import Game from "../components/game/Game"

const Container = styled.div`
  margin: 0 auto;
  padding: 0.5rem;
  max-width: 500px;
  max-height: 500px;
  text-align: center;
`
const WrapWord = styled.span`
  border-bottom: 1px solid ${p => p.color};
`
const H1 = styled.h1`
  color: #fefefe;
  text-align: center;
`
const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin: 5px;
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
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`

const getHighScores = () => {
  if (typeof window === "undefined") return

  const highScores = localStorage.getItem("highscores-pacman")
  return highScores ? JSON.parse(highScores) : []
}

export default () => {
  const [loaded, setLoaded] = useState(false)
  const [showTab, setShowTab] = useState("menu")
  const [pause, setPause] = useState(false)
  // const [sound, setSound] = useState(false)
  const [score, setScore] = useState(0)
  const [highScores, setHighScores] = useState(getHighScores)

  const handleEndGame = () => {
    setShowTab("enterHighScore")
  }

  useEffect(() => {
    localStorage.setItem("highscores", JSON.stringify(highScores))
  }, [highScores])

  useEffect(() => {
    setLoaded(true)
  }, [])

  return loaded ? (
    <Container>
      <H1>
        Simply<WrapWord color="orange">Pacman</WrapWord>
      </H1>
      {showTab === "menu" && (
        <Menu
          highScores={highScores}
          onClick={() => {
            setShowTab("pacman")
            setScore(0)
          }}
        />
      )}
      {showTab === "enterHighScore" && (
        <EnterHighScore
          score={score}
          highScores={highScores}
          onSubmit={newHighScores => {
            setShowTab("menu")
            setHighScores(newHighScores)
          }}
        />
      )}
      <>
        {showTab === "pacman" && (
          <Game
          // score={score}
          // pause={pause}
          // sound={sound}
          // onScoreChange={score => setScore(score)}
          // onEndGame={handleEndGame}
          />
        )}
        <Buttons>
          {showTab === "pacman" && (
            <>
              <Button
                id="restart"
                onClick={() => {
                  handleEndGame()
                  setScore(0)
                  setTimeout(() => setShowTab("pacman"), 100)
                }}
              >
                Restart
              </Button>
              <Button id="pause" onClick={() => setPause(!pause)}>
                {pause ? "Play" : "Pause"}
              </Button>
            </>
          )}
          {/* <Button
            id="sound"
            onClick={() => setSound(!sound)}
            style={{ maxWidth: "130px", margin: "5px auto" }}
          >
            {sound ? "Sound On" : "Sound Off"}
          </Button> */}
          {showTab === "pacman" && (
            <Button id="quit" onClick={handleEndGame}>
              Quit
            </Button>
          )}
        </Buttons>
      </>
    </Container>
  ) : (
    ""
  )
}
