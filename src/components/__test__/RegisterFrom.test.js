import {fireEvent, render} from '@testing-library/react'
import "@testing-library/jest-dom"
import RegisterForm from '../RegisterForm'

test('It should render component h2', async () => {
    const { getByText } = render(<RegisterForm />)
    expect(getByText('Register', {selector: 'h2'})).toBeInTheDocument()
})

test('It should save values to state while typing', async () => {
    let login, pass, email
    const { getByPlaceholderText } = render(<RegisterForm onSubmit={() => {}} setUsername={e => login=e} setPassword={e => [pass=e]} setEmail={e => email=e} />)

    const username = getByPlaceholderText('username')
    const password = getByPlaceholderText('pass')
    const mail = getByPlaceholderText('email')

    fireEvent.change(username, { target: { value: 'user-login' } })
    fireEvent.change(password, { target: { value: 'user-pass' } })
    fireEvent.change(mail, { target: { value: 'user-mail' } })
    
    expect(login).toBe('user-login')
    expect(pass).toBe('user-pass')
    expect(email).toBe('user-mail')
})
