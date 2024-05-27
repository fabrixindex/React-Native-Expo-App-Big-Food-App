import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "../features/Cart/cartSlice"
import shopReducer from "../features/Shop/shopSlice"
import authReducer from "../features/User/userSlice"
import { shopApi } from "../services/shopServices"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authApi } from "../services/authServices.js"


const store = configureStore({
    reducer: {
        shop: shopReducer,
        cart: cartReducer,
        auth: authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(shopApi.middleware)
        .concat(authApi.middleware)
})

setupListeners(store.dispatch)

export default store