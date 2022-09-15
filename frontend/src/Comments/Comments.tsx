import { FC } from 'react'
import styled from 'styled-components'

import { useApp } from '../context'
import { Comment } from './Comment'

const AppBodyContent = styled.div`
  padding: 0.75rem 1.5rem;
  border-radius: 1em;
  box-shadow: 0 0 0 0.0625rem ${(props) => props.theme.text};
  margin-bottom: 2rem;
`

export const Comments: FC = () => {
  const { state } = useApp()

  return (
    <>
      {state.comments.map((comment) => (
        <AppBodyContent key={comment.id}>
          <Comment remark={comment} />
        </AppBodyContent>
      ))}
    </>
  )
}
