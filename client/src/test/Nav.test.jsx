import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Nav from '../Nav'

const NavWithRouter = () => (
  <BrowserRouter>
    <Nav />
  </BrowserRouter>
)

describe('Nav Component', () => {
  test('renders navigation links', () => {
    render(<NavWithRouter />)
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /shopping list/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /items/i })).toBeInTheDocument()
  })

  test('navigation links have correct href attributes', () => {
    render(<NavWithRouter />)
    
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /shopping list/i })).toHaveAttribute('href', '/list')
    expect(screen.getByRole('link', { name: /items/i })).toHaveAttribute('href', '/items')
  })
})