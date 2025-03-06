import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { tours } from '../../../__fixtures__/feed'
import CardMediaImageGrid from './CardMediaImageGrid'

describe('<CardMediaImageGrid/>', () => {
  test("upon image click calls onSelect() with the image's index", async () => {
    const cb = vi.fn()
    const { images } = tours[2]
    render(
      <CardMediaImageGrid
        images={images}
        width={100}
        height={100}
        onSelect={cb}
      />,
    )
    const imageIndex = 2
    const button = screen.getAllByRole('button')[imageIndex]
    await userEvent.click(button)
    expect(cb).toHaveBeenCalledWith(imageIndex)
  })
})
