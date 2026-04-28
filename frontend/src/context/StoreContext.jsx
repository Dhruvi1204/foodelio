import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    // API URL
    const url =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://foodelio.onrender.com";

    // STATES
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItem] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    // ✅ NEW SEARCH STATE
    const [search, setSearch] = useState("");


    // ============================
    // ADD TO CART
    // ============================

    const addToCart = async (itemId) => {

        setCartItem((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
        }));

        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            try {
                await axios.post(
                    url + "/api/cart/add",
                    { itemId },
                    { headers: { token: storedToken } }
                );
            } catch (error) {
                console.log(error);
            }
        }
    };


    // ============================
    // REMOVE FROM CART
    // ============================

    const removeFromCart = async (itemId) => {

        setCartItem((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));

        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            try {
                await axios.post(
                    url + "/api/cart/remove",
                    { itemId },
                    { headers: { token: storedToken } }
                );
            } catch (error) {
                console.log(error);
            }
        }
    };


    // ============================
    // GET TOTAL AMOUNT
    // ============================

    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {

                const itemInfo = food_list.find(
                    (product) => product._id === item
                );

                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };


    // ============================
    // FETCH FOOD LIST
    // ============================

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };


    // ============================
    // LOAD CART DATA
    // ============================

    const loadCartData = async (token) => {

        try {
            const response = await axios.post(
                url + "/api/cart/get",
                {},
                { headers: { token } }
            );

            if (response.data.success) {
                setCartItem(response.data.cartData || {});
            } else {
                setCartItem({});
            }

        } catch (error) {
            console.log(error);
            setCartItem({});
        }
    };


    // ============================
    // LOAD DATA ON START
    // ============================

    useEffect(() => {

        async function loadData() {

            await fetchFoodList();

            const storedToken = localStorage.getItem("token");

            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }

        loadData();

    }, []);


    // ============================
    // CONTEXT VALUE
    // ============================

    const contextValue = {

        food_list,
        cartItems,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,

        // ✅ ADD SEARCH HERE
        search,
        setSearch
    };


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;