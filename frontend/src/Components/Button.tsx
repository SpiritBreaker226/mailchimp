import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.button`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.buttonBgColor};
  box-shadow: 0 0 0 0.0625rem ${(props) => props.theme.text};
  border-radius: 2em;
  transform: translateY(0);
  position: relative;
  transition: transform .3s cubic-bezier(.5,2.5,.7,.7),box-shadow .3s cubic-bezier(.5,2.5,.7,.7),-webkit-transform .3s cubic-bezier(.5,2.5,.7,.7),-webkit-box-shadow .3s cubic-bezier(.5,2.5,.7,.7);

  &:active {
    box-shadow: 0 0 0 0.0625rem ${(props) => props.theme.text}, 0 .25em 0 0 ${(
  props
) => props.theme.text};
    translateY(calc(-1*.25em/2))
  }

  &:hover {
    background: ${(props) => props.theme.buttonBgColor};
    color: ${(props) => props.theme.text};
    box-shadow: 0 0 0 0.0625rem ${(props) => props.theme.text}, 0 .375em 0 0 ${(
  props
) => props.theme.text};
    transform: translateY(.375em);
  }
`

export type ButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<unknown>

export const Button: FC<ButtonProps> = ({ children, ...rest }) => (
  <ButtonContainer {...rest}>{children}</ButtonContainer>
)
