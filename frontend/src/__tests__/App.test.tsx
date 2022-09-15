import { fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import App from '../App'
import { FormikValueType } from '../AddComment'
import { comment, render } from '../testUtil'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('App', () => {
  const setUp = () => render(<App />)

  it('should create a comment and display it on screen', async () => {
    const newComment = { ...comment }
    const requestToServerValues = {
      name: newComment.name,
      message: newComment.message,
    }

    mockedAxios.post
      .mockResolvedValue(requestToServerValues)
      .mockReturnValue(Promise.resolve({ data: newComment }))

    setUp()

    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: newComment.name },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
      target: { value: newComment.message },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Comment' }))

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/createComment'),
        requestToServerValues
      )
    )

    await waitFor(() => {
      screen.getByText(newComment.name, { exact: false })
      screen.getByText(newComment.message, { exact: false })
    })
  })
})
