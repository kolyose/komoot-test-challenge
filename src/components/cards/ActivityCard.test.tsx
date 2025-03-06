import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { tours } from '../../__fixtures__/feed'
import ActivityCard from './ActivityCard.tsx'

beforeAll(() => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))

  vi.mock('../../hooks/useElementSize', () => ({
    default: vi.fn(() => ({ ref: null, size: { width: 800, height: 600 } })),
  }))
})

describe('<ActivityCard/>', () => {
  test('renders all sections', async () => {
    render(<ActivityCard {...tours[0]} />)

    expect(screen.getByTestId('activity-card')).toBeInTheDocument()
    expect(screen.getByTestId('card-header')).toBeInTheDocument()
    expect(screen.getByTestId('card-stats')).toBeInTheDocument()
    expect(screen.getByTestId('card-media')).toBeInTheDocument()
  })

  test('opens image gallery upon image click', async () => {
    render(<ActivityCard {...tours[0]} />)

    expect(screen.queryByTestId('image-gallery')).not.toBeInTheDocument()
    const button = within(screen.getByTestId('card-media')).getByRole(
      'button',
      {
        name: "Open adventure's media gallery",
      },
    )
    await userEvent.click(button)
    expect(screen.queryByTestId('image-gallery')).toBeInTheDocument()
  })

  test('opens image gallery with correct image', async () => {
    render(<ActivityCard {...tours[2]} />)

    expect(screen.queryByTestId('image-gallery')).not.toBeInTheDocument()

    const imageIndex = 2
    const button = within(screen.getByTestId('card-media')).getByTestId(
      `card-media-grid-image-${imageIndex}`,
    )
    expect(button).toBeInTheDocument()
    await userEvent.click(button)

    const imageGallery = await screen.findByTestId('image-gallery')
    expect(imageGallery).toBeInTheDocument()

    const image = within(imageGallery).getByRole('img', {
      name: `Adventure image gallery slide ${imageIndex + 1}`,
    })
    expect(image).toBeVisible()
  })
})
