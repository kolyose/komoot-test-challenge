import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { tours } from '../../../__fixtures__/feed'
import CardMediaSingleImage from './CardMediaSingleImage.tsx'

describe('<CardMediaSingleImage/>', () => {
  test('calls onSelect() upon image click', async () => {
    const cb = vi.fn()
    const { images } = tours[0]
    render(
      <CardMediaSingleImage
        images={images}
        width={100}
        height={100}
        onSelect={cb}
      />,
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(cb).toHaveBeenCalledTimes(1)
  })
})
