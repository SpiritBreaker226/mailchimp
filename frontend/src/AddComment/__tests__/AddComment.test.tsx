import { fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import { AppProvider, comment, initialState, render } from '../../testUtil'
import { InitialState, Types } from '../../types'
import { AddComment } from '../AddComment'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockDispatch = jest.fn()

describe('AddComment', () => {
  const setUp = (
    state: Partial<InitialState> = {},
    dispatch = mockDispatch
  ) => {
    render(
      <AppProvider state={{ ...initialState, ...state }} dispatch={dispatch}>
        <AddComment />
      </AppProvider>
    )
  }
  const fillForm = () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: 'Billy Bob' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
      target: { value: 'Hey' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Comment' }))
  }

  it('should submit a valid form', async () => {
    mockedAxios.post
      .mockResolvedValue({ name: comment.name, message: comment.message })
      .mockReturnValue(Promise.resolve({ data: { id: comment.id } }))

    setUp()

    fillForm()

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Comment' })).toBeDisabled()

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: Types.AddComment })
      )
    )
  })

  it('should display error from server', async () => {
    mockedAxios.post.mockRejectedValue(new Error('fake error message'))

    setUp()

    fillForm()

    await screen.findByText(/fake error message/i)
  })
})
