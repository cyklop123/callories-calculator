import {fireEvent, render} from '@testing-library/react'
import "@testing-library/jest-dom"
import LoginForm from '../LoginForm'

test('It should render component h2', async () => {
    const { getByText } = render(<LoginForm />)
    expect(getByText('Login', {selector: 'h2'})).toBeInTheDocument()
})

test('It should save values to state while typing', async () => {
    let login, pass
    const { getByPlaceholderText } = render(<LoginForm setUsername={e => login=e} setPassword={e => [pass=e]} />)

    const username = getByPlaceholderText('Login')
    const password = getByPlaceholderText('pass')

    fireEvent.change(username, { target: { value: 'admin-login' } })
    fireEvent.change(password, { target: { value: 'admin-pass' } })
    
    expect(login).toBe('admin-login')
    expect(pass).toBe('admin-pass')
})

