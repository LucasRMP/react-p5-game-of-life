import p5 from 'p5'

import { P5Element } from '..'

export type CellSize = { width: number; height: number }

type CellParams = {
  size: CellSize
  alive: boolean
  position: {
    row: number
    col: number
  }
}

class Cell implements P5Element {
  alive: boolean
  nextCycleAlive: boolean
  size: CellSize
  position: CellParams['position']
  sketch: p5

  constructor(sketchInstance: p5, { alive, size, position }: CellParams) {
    this.alive = alive
    this.size = size
    this.position = position
    this.sketch = sketchInstance
    this.nextCycleAlive = alive
  }

  getNextLifeState(numNeighbors: number): boolean {
    const DIE = false,
      LIVE = true

    const currentlyAlive = this.alive
    const isLonely = numNeighbors <= 1
    const isOvercrowd = numNeighbors >= 4
    const shouldBorn = numNeighbors === 3

    if (currentlyAlive && (isLonely || isOvercrowd)) {
      return DIE
    }

    if (!currentlyAlive && shouldBorn) {
      return LIVE
    }

    return currentlyAlive
  }

  setNextLifeState(numNeighbors: number) {
    const nextLifeState = this.getNextLifeState(numNeighbors)
    this.nextCycleAlive = nextLifeState
  }

  draw() {
    this.sketch.noStroke()
    this.sketch.fill(40, 42, 55)
    if (this.alive) {
      this.sketch.fill(138, 255, 127)
    }

    const x = this.position.col * this.size.width
    const y = this.position.row * this.size.height

    this.sketch.rect(x, y, this.size.width, this.size.height)
  }

  update() {
    this.alive = this.nextCycleAlive
  }
}

export default Cell
