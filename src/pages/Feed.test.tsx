import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { vi } from 'vitest'
import feed from '../__fixtures__/feed'
import * as api from '../api'
import Feed from './Feed'

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

  vi.mock('../api', () => ({
    fetchTours: vi.fn().mockImplementation(() =>
      Promise.resolve({
        rows: feed.tours,
        nextCursor: feed.links.next,
      }),
    ),
  }))
})

describe('<Feed/>', () => {
  test('renders a correct number of cards', async () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <Feed />
      </QueryClientProvider>,
    )

    await waitFor(() => {
      const feedContainer = screen.getByTestId('feed')
      const cards = within(feedContainer).getAllByTestId('activity-card')
      expect(cards.length).toEqual(feed.tours.length)
    })
  })

  test('requests more data once scrolled to the bottom', async () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <Feed />
      </QueryClientProvider>,
    )

    expect(api.fetchTours).toHaveBeenCalledWith('')

    const feedContainer = screen.getByTestId('feed')
    fireEvent.scroll(feedContainer, {
      target: { scrollY: feedContainer.scrollHeight },
    })

    await waitFor(() => {
      expect(api.fetchTours).toHaveBeenCalledWith(feed.links.next)
    })
  })
})
