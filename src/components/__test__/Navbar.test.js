import {fireEvent, render} from '@testing-library/react'
import "@testing-library/jest-dom"
import Navbar from '../Navbar'
import { BrowserRouter as Router} from 'react-router-dom'

test('It should render Navbar name and admin panel link while role is admin', async () => {
    const { getByText } = render(<Router><Navbar role={{role: 'admin'}} /></Router>)
    expect(getByText('Callories calculator')).toBeInTheDocument()
    expect(getByText('Admin panel')).toBeInTheDocument()
})

test('It should not render admin panel link while role is user', async () => {
    const { getByText } = render(<Router><Navbar role={{role: 'user'}} /></Router>)
    expect(() => getByText('Admin panel')).toThrow()
})