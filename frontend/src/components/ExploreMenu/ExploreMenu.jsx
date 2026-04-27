import React, { useEffect, useState } from 'react'
import './ExploreMenu.css'
import axios from 'axios'
import { assets } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({ category, setCategory }) => {

  const [categories, setCategories] = useState([])

  const BASE_URL = "http://localhost:4000" // ✅ backend URL

  // 🔥 Category → Image Mapping
  const categoryImages = {
    pizza: assets.Classic_Farm_Fresh,
    burger: assets.Classic_Cheese_Burger,
    salad: assets.menu_1,
    rolls: assets.menu_2,
    deserts: assets.menu_3,
    sandwich: assets.menu_4,
    cake: assets.menu_5,
    "pure veg": assets.menu_6,
    pasta: assets.menu_7,
    noodles: assets.menu_8,
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/food/list`)

        console.log("API DATA:", res.data)

        if (!res.data || !res.data.data) return

        const uniqueCategories = [
          "All",
          ...new Set(res.data.data.map(item => item.category))
        ]

        setCategories(uniqueCategories)

      } catch (error) {
        console.log(error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className='explore-menu' id='explore-menu'>

      <h1>Explore our menu</h1>

      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes.
        Our mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>

      <div className="explore-menu-list">

        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => setCategory(prev => prev === cat ? "All" : cat)}
            className="explore-menu-list-item"
          >
            <img
              className={category === cat ? "active" : ""}
              src={categoryImages[cat?.toLowerCase()] || assets.menu_1}
              alt={cat}
            />
            <p>{cat}</p>
          </div>
        ))}

      </div>

      <hr />

    </div>
  )
}

export default ExploreMenu