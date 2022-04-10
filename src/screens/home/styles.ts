import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
`

export const Backdrop = styled.span`
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100vh;
  background: #000;
  opacity: 0.85;
`

export const PageContent = styled.div<{ noBackground?: boolean }>`
  width: 100%;
  padding: 3em 1em;
  background: ${({ noBackground }) =>
    noBackground ? 'none' : 'rgb(40, 42, 55)'};

  span {
    color: #ff7fbf;
  }

  h2 {
    width: 600px;
    margin: 0 auto;
  }

  text-align: center;
`

export const PageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
`
