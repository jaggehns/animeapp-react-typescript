import React from 'react'
import { render, screen } from '@testing-library/react'
import Banner from './components/Banner/Banner'

test('renders AnimeApp in header', () => {
  render(<Banner />)
  const linkElement = screen.getByText(/find/i)
  expect(linkElement).toBeInTheDocument()
})
