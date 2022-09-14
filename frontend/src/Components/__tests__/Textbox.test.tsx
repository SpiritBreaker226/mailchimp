import { screen } from '@testing-library/react'

import { render } from '../../testUtil'
import { Textbox, TextBoxProps } from '../Textbox'

describe('Textbox', () => {
  const defaultProps: TextBoxProps = {
    name: 'test',
  }
  const setUp = (props: Partial<TextBoxProps> = {}) =>
    render(<Textbox {...defaultProps} {...props} />)

  it('should show label', async () => {
    setUp({ label: 'testing' })

    await screen.findByText('testing')
  })

  it('should not show label when not provide', async () => {
    setUp({ label: null })

    expect(screen.queryByText(/testing/i)).not.toBeInTheDocument()
  })
})
