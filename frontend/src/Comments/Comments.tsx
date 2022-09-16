import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useApp } from '../context'
import { Comment as CommentType, Types } from '../types'
import { Comment } from './Comment'

const AppBodyContent = styled.div`
  padding: 0.75rem 1.5rem;
  border-radius: 1em;
  box-shadow: 0 0 0 0.0625rem ${(props) => props.theme.text};
  margin-bottom: 2rem;
`

export const Comments: FC = () => {
  const { state, dispatch } = useApp()
  const [messageFromServer, setMessageFromServer] = useState<string | null>(
    null
  )
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get<CommentType[]>(
          `${process.env.REACT_APP_SERVER_URL}/getComments`
        )
        const comments = await res.data

        dispatch({
          type: Types.AddComments,
          payload: {
            comments,
          },
        })
      } catch (e) {
        setMessageFromServer('Unable to get comments')
      } finally {
        setIsLoading(false)
      }
    }

    getComments()
  }, [])

  if (isLoading) {
    return <AppBodyContent>Loading...</AppBodyContent>
  }

  if (messageFromServer) {
    return <AppBodyContent>{messageFromServer}</AppBodyContent>
  }

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
