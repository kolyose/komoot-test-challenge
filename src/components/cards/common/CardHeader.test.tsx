import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { tours } from '../../../__fixtures__/feed'
import CardHeader from './CardHeader.tsx'

describe('<CardHeader/>', () => {
  test('renders correctly', async () => {
    const {
      name: title,
      creator: {
        username,
        avatar: { src },
      },
      date,
      isPremium,
      displayName,
    } = tours[0]
    render(
      <CardHeader
        name={displayName}
        title={title}
        src={src}
        username={username}
        isPremium={isPremium}
        date={date}
      />,
    )

    const avatar = screen.getAllByRole('img', {
      name: /User avatar/i,
    })[0]
    expect(avatar).toBeVisible()
    expect(avatar).toHaveAttribute('src', src.replace(/\{width\}/g, '30'))

    expect(screen.getByText(displayName)).toBeVisible()

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    expect(screen.getByText(formattedDate)).toBeVisible()

    expect(screen.getByRole('heading')).toBeVisible()
    expect(screen.getByRole('heading')).toHaveTextContent(title)

    expect(screen.getByText(username)).toBeInTheDocument()
  })
})
