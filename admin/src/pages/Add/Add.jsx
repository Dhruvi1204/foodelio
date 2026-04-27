import React, { useState, useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {

    const [image, setImage] = useState(false)

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
        type: "veg",
        ingredients: ""
    })

    // ✅ NEW STATES
    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState("")

    // ✅ FETCH RESTAURANTS
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await axios.get(`${url}/api/restaurant/list`)
                setRestaurants(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRestaurants()
    }, [url])

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData((prevData) => ({ ...prevData, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("type", data.type)
        formData.append("ingredients", data.ingredients)
        formData.append("image", image)

        // ✅ SEND RESTAURANT ID
        formData.append("restaurantId", selectedRestaurant)

        try {

            const response = await axios.post(`${url}/api/food/add`, formData)

            if (response.data.success) {

                toast.success(response.data.message)

                // Reset form
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad",
                    type: "veg",
                    ingredients: ""
                })

                setImage(false)
                setSelectedRestaurant("")

            } else {

                toast.error(response.data.message)

            }

        } catch (error) {

            console.log(error)
            toast.error("Something went wrong")

        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>

                {/* Image Upload */}
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>

                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt=""
                        />
                    </label>

                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>

                {/* Product Name */}
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        required
                    />
                </div>

                {/* Description */}
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                        required
                    ></textarea>
                </div>

                {/* Ingredients */}
                <div className="add-product-ingredients flex-col">
                    <p>Ingredients</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.ingredients}
                        type="text"
                        name="ingredients"
                        placeholder="cheese,tomato,onion"
                    />
                </div>

                {/* ✅ NEW: RESTAURANT DROPDOWN */}
                <div className="add-restaurant-select flex-col">
                    <p>Select Restaurant</p>
                    <select
                        value={selectedRestaurant}
                        onChange={(e) => setSelectedRestaurant(e.target.value)}
                        required
                    >
                        <option value="">Select Restaurant</option>
                        {restaurants.map((res) => (
                            <option key={res._id} value={res._id}>
                                {res.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category & Price */}
                <div className="add-category-price">

                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category"
                            required
                        >
                            <option value="Pizza">Pizza</option>
                            <option value="Burger">Burger</option>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="200"
                            required
                        />
                    </div>

                </div>

                {/* Food Type */}
                <div className="add-type flex-col">
                    <p>Food Type</p>
                    <select
                        onChange={onChangeHandler}
                        value={data.type}
                        name="type"
                    >
                        <option value="veg">Veg</option>
                        <option value="nonveg">Non-Veg</option>
                    </select>
                </div>

                <button type="submit" className="add-btn">
                    ADD
                </button>

            </form>
        </div>
    )
}

export default Add