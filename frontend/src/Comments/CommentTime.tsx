import { FC } from 'react'
import { Comment } from '../types'

type CommentTimeProps = {
  created: Comment['created']
}

export const CommentTime: FC<CommentTimeProps> = ({ created }) => {
  if (!created) {
    return null
  }

  const createdDate = new Date(created)
  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language

  return (
    <>
      on{' '}
      <time dateTime={createdDate.toISOString()}>
        {createdDate.toLocaleDateString(userLocale, {
          month: 'long',
          day: '2-digit',
        })}{' '}
        at{' '}
        {createdDate.toLocaleTimeString(userLocale, {
          hour: 'numeric',
          minute: 'numeric',
        })}
      </time>
    </>
  )
}
