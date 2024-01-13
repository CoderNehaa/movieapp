import { configureStore } from "@reduxjs/toolkit";
import {dataReducer} from "./dataReducer";

export const store = configureStore({
    reducer:{
        dataReducer
    }  
})