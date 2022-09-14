import { FC } from 'react'
import styled from 'styled-components'

const ErrorMessageContianer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  color: ${(props) => props.theme.error};
`

export type ErrorMessageProps = {
  children?: string
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
  if (!children) {
    return null
  }

  return <ErrorMessageContianer>{children}</ErrorMessageContianer>
}
