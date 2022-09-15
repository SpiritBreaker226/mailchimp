import { FC } from 'react'
import styled from 'styled-components'

import { Comment as CommentType } from '../types'

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
        {remark.name} on{' '}
        <time dateTime={remark.created.toISOString()}>
          {remark.created.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          })}{' '}
          at{' '}
          {remark.created.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </time>
      </p>
    </CommentFooterContainer>
  </article>
)
