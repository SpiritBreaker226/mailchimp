import { screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import { AppProvider, comment, initialState, render } from '../../testUtil'
import { InitialState } from '../../types'
import { Comments } from '../Comments'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockDispatch = jest.fn()

describe('Comments', () => {
  const setUp = (
    state: Partial<InitialState> = {},
    dispatch = mockDispatch
  ) => {
    render(
      <AppProvider state={{ ...initialState, ...state }} dispatch={dispatch}>
        <Comments />
      </AppProvider>
    )
  }

  it('should get the comments', async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve({ data: [comment] }))

    setUp({ comments: [comment] })

    await waitFor(() => expect(mockDispatch).toHaveBeenCalled())

    await waitFor(() => {
      screen.getByText(comment.name, { exact: false })
      screen.getByText(comment.message, { exact: false })
    })
  })

  it('should display loading message when getting data from the server', async () => {
    setUp()

    await screen.findByText(/Loading.../i)
  })

  it('should display error from server', async () => {
    mockedAxios.get.mockRejectedValue(new Error('fake error message'))

    setUp()

    await screen.findByText(/Unable to get comments/i)
  })
})
