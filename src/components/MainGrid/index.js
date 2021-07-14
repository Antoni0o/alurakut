import styled from 'styled-components'

const MainGrid = styled.main`
  width: 100%;
  grid-gap: 1rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 1.6rem;
  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }
  @media(min-width: 860px) {
    max-width:1110px;
    display: grid;
    grid-template-areas:
    "profileArea welcomeArea relationshipArea";
    grid-template-columns: 160px 1fr 312px;
  }
`

export default MainGrid