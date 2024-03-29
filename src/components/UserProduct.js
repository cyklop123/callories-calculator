import Meal from './Meal'

import { MEALS } from '../Constants';

const meals = MEALS

const UserProduct = ({userProducts, deleteUserProduct}) => {
    meals.forEach(meal => {
        const m = userProducts.filter(m => m.type === meal)
        if(m.length <= 0)
        {
            userProducts.push({
                type: meal,
                products: []
            })
        }
    })
    userProducts.sort((a, b) => {
        if ( meals.indexOf(a.type) < meals.indexOf(b.type) )
            return -1
        else
            return 1
    })    

    return (
        <div>
            {
                userProducts.map((mealProducts, i) => (
                    <Meal key={i} mealName={mealProducts.type} mealProducts={mealProducts.products} handleDelete={deleteUserProduct} />
                ))
            }
        </div>
    )
}

export default UserProduct