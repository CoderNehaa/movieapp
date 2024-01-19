import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./reducers/dataReducer";

export const store = configureStore({
    reducer:{
        dataReducer
    }  
})