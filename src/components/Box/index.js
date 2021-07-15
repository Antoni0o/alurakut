import styled from 'styled-components'

const Box = styled.div`
  background: #FFFFFF;
  border-radius: .8rem;
  padding: 1.6rem;
  margin-bottom: 1rem;
  .boxLink {
    font-size: 1.4rem;
    color: #4895ef;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 3.2rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }
  .subTitle {
    font-size: 1.8rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }
  .smallTitle {
    margin-bottom: 2rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: #333333;
    margin-bottom: 2rem;
  }
  hr {
    margin-top: 1.2rem;
    margin-bottom: .8rem;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    outline: none;
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 1.4rem 1.6rem;
    margin-bottom: 1.4rem;
    border-radius: 10000px;
    transition: .1s;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  
  button {
    outline: none;
    border: 0;
    padding: .8rem 1.2rem;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #4895ef;
    cursor: pointer;
    transition: .3s;  
  }
  button:hover {
    opacity: 0.8;
  }
`

export default Box