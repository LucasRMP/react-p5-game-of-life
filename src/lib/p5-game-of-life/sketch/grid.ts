import p5 from 'p5'

import Cell, { CellSize } from './cell'
import { P5Element } from '..'

type GameOfLifeParams = {
  cols: number
  rows: number
  cellSize: CellSize
  spawnAliveChance: number
}

export class GameOfLife implements P5Element {
  cellGrid: Cell[][] = [[]]
  cols: number
  rows: number
  cellSize: CellSize
  spawnAliveChance: number
  sketch: p5

  constructor(
    sketchInstance: p5,
    { cols, rows, cellSize, spawnAliveChance }: GameOfLifeParams,
  ) {
    this.cols = cols
    this.rows = rows
    this.cellSize = cellSize
    this.spawnAliveChance = spawnAliveChance
    this.sketch = sketchInstance

    this.initializeGrid()
  }

  initializeGrid() {
    this.cellGrid = Array.from({ length: this.cols }, (_, colIndex) =>
      Array.from({ length: this.rows }, (_, rowIndex) => {
        const rand = this.sketch.random()

        const shouldBeAlive = rand <= this.spawnAliveChance

        const cell = new Cell(this.sketch, {
          size: this.cellSize,
          alive: shouldBeAlive,
          position: { col: colIndex, row: rowIndex },
        })

        return cell
      }),
    )
  }

  iterateOnGrid(fn: (cell?: Cell) => void) {
    this.cellGrid.forEach(col => {
      col.forEach(cell => {
        fn(cell)
      })
    })
  }

  countNeighbors(cell: Cell) {
    let neighborsCount = 0
    const { position } = cell

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!i && !j) continue

        const colIndexToCheck = position.col + i
        const rowIndexToCheck = position.row + j

        if (colIndexToCheck < 0 || colIndexToCheck >= this.cols) continue
        if (rowIndexToCheck < 0 || rowIndexToCheck >= this.rows) continue

        const neighborCell = this.cellGrid[colIndexToCheck][rowIndexToCheck]

        neighborsCount += Number(neighborCell.alive)
      }
    }

    return neighborsCount
  }

  update() {
    this.iterateOnGrid(cell => {
      cell.setNextLifeState(this.countNeighbors(cell))
    })

    this.iterateOnGrid(cell => cell.update())
  }

  draw() {
    this.iterateOnGrid(cell => {
      cell.draw()
    })
  }
}
