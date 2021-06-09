import {fireEvent, render} from '@testing-library/react'
import "@testing-library/jest-dom"
import Summary from '../Summary'

test('It should render Summary properely', async () => {

    const summary = {
        "kcal": 1018.44,
        "carbs": 0,
        "prots": 0,
        "fats": 113.16
    }

    const { getByText, getAllByText } = render(<Summary summary={summary} />)
    expect(getByText('1018.44')).toBeInTheDocument()
    getAllByText('0').forEach(el => expect(el).toBeInTheDocument())
    expect(getByText('113.16')).toBeInTheDocument()    
})