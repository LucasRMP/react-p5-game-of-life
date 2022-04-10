import p5 from 'p5'
import React from 'react'
import styled from 'styled-components'

import { sketch } from './sketch'

export interface P5Element {
  draw: (...args: any) => void
}

const GameOfLifeCanvas: React.FC = () => {
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    new p5(sketch, ref.current as HTMLDivElement)
  }, [])

  return <Container ref={ref} />
}

const Container = styled.div`
  overflow: hidden;

  canvas {
    display: block;
    position: absolute;
    z-index: -1;
  }
`

export default GameOfLifeCanvas
