import React from 'react'
import GameOfLifeCanvas from '../../lib/p5-game-of-life'

import {
  Backdrop,
  Container,
  PageContent,
  PageContentContainer,
} from './styles'

const Home: React.FC = () => {
  return (
    <Container>
      <GameOfLifeCanvas />
      <Backdrop />
      <PageContentContainer>
        <PageContent>
          <h1>
            Ops! Looks like <span>something wen't wrong :/</span>
          </h1>
        </PageContent>

        <PageContent noBackground>
          <h2>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus
            ullam nisi iste praesentium,{' '}
            <span>nostrum enim qui culpa? Ipsa rem expedita, perferendis</span>{' '}
            illo consequuntur!
          </h2>
        </PageContent>

        <PageContent>
          <footer>Try contacting the administrator for more information</footer>
        </PageContent>
      </PageContentContainer>
    </Container>
  )
}

export default Home
