import { fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import App from '../App'
import { comment, render } from '../testUtil'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('App', () => {
  const setUp = () => render(<App />)

  it('should create a comment and display it on screen', async () => {
    const { name, message } = comment
    const requestToServerValues = { name, message }

    mockedAxios.post
      .mockResolvedValue(requestToServerValues)
      .mockReturnValue(Promise.resolve({ data: comment }))

    mockedAxios.get.mockReturnValue(Promise.resolve({ data: [comment] }))

    setUp()

    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: comment.name },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
      target: { value: comment.message },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Comment' }))

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/createComment'),
        requestToServerValues
      )
    )

    await waitFor(() => {
      screen.getByText(comment.name, { exact: false })
      screen.getByText(comment.message, { exact: false })
    })
  })

  describe('when first loading', () => {
    it('should get the latest comments from the server', async () => {
      mockedAxios.get.mockReturnValue(Promise.resolve({ data: [comment] }))

      setUp()

      await waitFor(() =>
        expect(mockedAxios.get).toHaveBeenCalledWith(
          expect.stringContaining('/getComments')
        )
      )

      await waitFor(() => {
        screen.getByText(comment.name, { exact: false })
        screen.getByText(comment.message, { exact: false })
      })
    })
  })
})
