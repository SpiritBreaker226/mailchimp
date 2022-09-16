import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { contentStyle } from '../Components'
import { useApp } from '../context'
import { Comment as CommentType, Types } from '../types'
import { Comment } from './Comment'

const AppBodyContent = styled.div`
  ${contentStyle}
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
