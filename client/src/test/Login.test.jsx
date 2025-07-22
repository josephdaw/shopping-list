import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import Login from '../pages/Login'

vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders login form', () => {
    render(<Login />)
    
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText(/email/i)).toBeInTheDocument()
    expect(screen.getByText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  test('updates input values when typing', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const inputs = screen.getAllByDisplayValue('')
    const emailInput = inputs[0] // First input (email)
    const passwordInput = inputs[1] // Second input (password)
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  test('makes API call on form submission with valid data', async () => {
    const user = userEvent.setup()
    mockedAxios.post.mockResolvedValue({ data: { email: 'test@example.com' } })
    
    render(<Login />)
    
    const inputs = screen.getAllByDisplayValue('')
    const emailInput = inputs[0]
    const passwordInput = inputs[1]
    const submitButton = screen.getByRole('button', { name: /login/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/v1/users/auth', {
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })

  test('handles form submission with empty fields', async () => {
    const user = userEvent.setup()
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    render(<Login />)
    
    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)
    
    expect(consoleSpy).toHaveBeenCalledWith('Please enter email and password')
    expect(mockedAxios.post).not.toHaveBeenCalled()
    
    consoleSpy.mockRestore()
  })

  test('handles API error on login', async () => {
    const user = userEvent.setup()
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockedAxios.post.mockRejectedValue(new Error('Network error'))
    
    render(<Login />)
    
    const inputs = screen.getAllByDisplayValue('')
    const emailInput = inputs[0]
    const passwordInput = inputs[1]
    const submitButton = screen.getByRole('button', { name: /login/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error logging in:', expect.any(Error))
    })
    
    consoleErrorSpy.mockRestore()
  })
})