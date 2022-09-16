import axios, { AxiosError } from 'axios'
import { Form, Formik } from 'formik'
import { FC, useState } from 'react'
import styled from 'styled-components'

import { Button, ErrorMessage, Textbox } from '../Components'
import { useApp } from '../context'
import { Comment, Types } from '../types'
import { AddCommentSchema } from './AddCommentSchema'

const AddCommentContainer = styled.section`
  min-width: 40vh;
`

const AddCommentHeaderContainer = styled.header`
  margin: 0 0 1rem;
  text-align: center;
`

const AddCommentHeader = styled.h2`
  margin: 0;
  text-align: left;
`

const SubmitCommentContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`

export type FormikValueType = Pick<Comment, 'name' | 'message'>

export const AddComment: FC = () => {
  const [serverError, setServerError] = useState<string>()
  const { dispatch } = useApp()

  return (
    <AddCommentContainer>
      <AddCommentHeaderContainer>
        <AddCommentHeader>Add Comment</AddCommentHeader>
      </AddCommentHeaderContainer>

      <ErrorMessage>{serverError}</ErrorMessage>

      <Formik<FormikValueType>
        initialValues={{
          name: '',
          message: '',
        }}
        validationSchema={AddCommentSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await axios.post<{ id: Comment['id'] }>(
              `${process.env.REACT_APP_SERVER_URL}/createComment`,
              values
            )

            const { id } = await res.data

            dispatch({
              type: Types.AddComment,
              payload: {
                newComment: {
                  id,
                  ...values,
                },
              },
            })

            resetForm()
          } catch (error) {
            const currentError = error as AxiosError | Error
            const errorMessage = axios.isAxiosError(currentError)
              ? (currentError.response?.data as string)
              : currentError.message

            setServerError(errorMessage)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Textbox
              name="name"
              label="Name"
              placeholder="John Smith"
              disabled={isSubmitting}
            />

            <Textbox
              name="message"
              aria-label="Message"
              disabled={isSubmitting}
              as="textarea"
              rows="5"
            />

            <SubmitCommentContainer>
              <Button disabled={isSubmitting} type="submit">
                Comment
              </Button>
            </SubmitCommentContainer>
          </Form>
        )}
      </Formik>
    </AddCommentContainer>
  )
}
