import { FC } from 'react'
import styled from 'styled-components'

import { Comment as CommentType } from '../types'

const CommentFooterContainer = styled.footer`
  margin-top: 1rem;
`

export type CommentProps = {
  remark: CommentType
}

export const Comment: FC<CommentProps> = ({ remark }) => {
  const createdDate = new Date(remark.created)

  return (
    <article>
      <p>{remark.message}</p>
      <CommentFooterContainer>
        <p>
          {remark.name} on{' '}
          <time dateTime={createdDate.toISOString()}>
            {createdDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            })}{' '}
            at{' '}
            {createdDate.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </time>
        </p>
      </CommentFooterContainer>
    </article>
  )
}
