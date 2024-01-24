import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./reducers/dataReducer";
import { userReducer } from "./reducers/userReducer";

export const store = configureStore({
    reducer:{
        dataReducer,
        userReducer
    }  
})