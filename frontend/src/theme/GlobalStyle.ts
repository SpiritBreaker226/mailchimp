import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    outline: 0;
    color: ${theme.text};
    background: ${theme.secondary};
    font-family: Graphik Web,Helvetica Neue,Helvetica,Arial,Verdana,sans-serif;
    font-size: 1rem;
  }

  a {
    color: ${theme.text};
    background: ${theme.buttonBgColor};
    text-decoration: none;
    font-weight: 500;
    box-shadow: 0 0 0 0.0625rem ${theme.text};
    padding: 0.75rem 1.5rem;
    border-radius: 2em;
    transform: translateY(0);
    position: relative;
    transition: transform .3s cubic-bezier(.5,2.5,.7,.7),box-shadow .3s cubic-bezier(.5,2.5,.7,.7),-webkit-transform .3s cubic-bezier(.5,2.5,.7,.7),-webkit-box-shadow .3s cubic-bezier(.5,2.5,.7,.7);

    &:active {
      box-shadow: 0 0 0 0.0625rem ${theme.text}, 0 .25em 0 0 ${theme.text};
      translateY(calc(-1*.25em/2))
    }

    &:hover {
      background: ${theme.buttonBgColor};
      color: ${theme.text};
      box-shadow: 0 0 0 0.0625rem ${theme.text}, 0 .375em 0 0 ${theme.text};
      transform: translateY(.375em);
    }
  }

  #root{
    margin: 0 auto;
  }
`
