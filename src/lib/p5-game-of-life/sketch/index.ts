import P5 from 'p5'

import { GameOfLife } from './grid'

const DESIRED_NUM_COLUMNS = 150
const FPS = 5
const SPAWN_ALIVE_CHANCE = 0.15

const calculateGridDimensions = (canvasWidth: number, canvasHeight: number) => {
  const roundFn = Math.ceil

  const cellWidth = roundFn(canvasWidth / DESIRED_NUM_COLUMNS)
  const numCols = roundFn(canvasWidth / cellWidth)
  const numRows = roundFn(canvasHeight / cellWidth)
  const cellHeight = roundFn(canvasHeight / numRows)

  return {
    cellSize: {
      width: cellWidth,
      height: cellHeight,
    },
    numCols,
    numRows,
  }
}

export function sketch(sketch: P5) {
  const width = sketch.windowWidth
  const height = sketch.windowHeight

  const { cellSize, numCols, numRows } = calculateGridDimensions(width, height)

  let game: GameOfLife = null

  sketch.setup = () => {
    game = new GameOfLife(sketch, {
      cols: numCols,
      rows: numRows,
      cellSize,
      spawnAliveChance: SPAWN_ALIVE_CHANCE,
    })

    sketch.createCanvas(width, height)
  }

  sketch.draw = () => {
    sketch.frameRate(FPS)

    game.draw()
    game.update()
  }
}
