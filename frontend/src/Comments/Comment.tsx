import { FC } from 'react'
import styled from 'styled-components'

import { Comment as CommentType } from '../types'
import { CommentTime } from './CommentTime'

const CommentFooterContainer = styled.footer`
  margin-top: 1rem;
`

export type CommentProps = {
  remark: CommentType
}

export const Comment: FC<CommentProps> = ({ remark }) => (
  <article>
    <p>{remark.message}</p>
    <CommentFooterContainer>
      <p>
        {remark.name} <CommentTime created={remark.created} />
      </p>
    </CommentFooterContainer>
  </article>
)
