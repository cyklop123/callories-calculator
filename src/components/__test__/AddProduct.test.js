import {fireEvent, render, queryByAttribute} from '@testing-library/react'
import "@testing-library/jest-dom"
import AddProduct from '../AddProduct'
import { MEALS } from '../../Constants'

test('It should render modal while it is shown', async () => {
    const { getByText } = render(<AddProduct modal={{show:true}} form={{}} />)
    expect(getByText('Add product', {selector: 'div'})).toBeInTheDocument()
})

test('It should not render modal while it is closed', async () => {
    const { getByText } = render(<AddProduct modal={{show:false}} form={{}} />)
    // getByText rzuca wyjątek gdy nie ma elementu
    expect(() => getByText('Add product')).toThrow()
})

test('It should display all meal types', async () => {
    const { getByText } = render(<AddProduct modal={{show:true}} form={{}} />)
    MEALS.forEach(meal => {
        expect(getByText(meal.charAt(0).toUpperCase() + meal.slice(1))).toBeInTheDocument()
    });
})

test('It should save values to state while change', async () => {
    let productQuantity, productMeal
    const { getByPlaceholderText, getByTestId } = render(<AddProduct modal={{show:true}} form={{
        setProductQuantity: e => productQuantity = e,
        setProductMeal: e => productMeal=e
    }} />)


    const quantity = getByPlaceholderText(100)
    const select = getByTestId('select')

    fireEvent.change(quantity, { target: { value: 555 } })
    fireEvent.change(select, { target: { value: 'breakfast' } })
    expect(productQuantity).toBe('555')
    expect(productMeal).toBe('breakfast')
})
