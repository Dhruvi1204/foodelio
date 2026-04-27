import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

    const { food_list, search } = useContext(StoreContext)

    // ✅ FILTER
    const filteredFood = food_list.filter((item) =>
        (category === "All" || category === item.category) &&
        item.name.toLowerCase().includes(search.trim().toLowerCase())
    )

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>

            <div className="food-scroll-container">
                <div className="food-display-list">
                    {filteredFood.map((item) => (
                        <FoodItem
                            key={item._id}   // ✅ FIX (important)
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>

            {filteredFood.length === 0 && (
                <p className="no-food">No food items found 😔</p>
            )}
        </div>
    )
}

export default FoodDisplay