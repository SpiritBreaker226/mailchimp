import { fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import { render } from '../../testUtil'
import { AddComment } from '../AddComment'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AddComment', () => {
  const setUp = () => render(<AddComment />)
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
    mockedAxios.post.mockResolvedValue({ status: 201 })

    setUp()

    fillForm()

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Comment' })).toBeDisabled()

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/createComment'),
        {
          name: 'Billy Bob',
          message: 'Hey',
        }
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
