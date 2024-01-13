import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    movies:[],
    tvShows:[],
    favorites:[],
    videoURL:''
}

export const fetchMovies = createAsyncThunk(
    'data/fetchMovies',
    async (url, thunkAPI) => {
        await fetch(url)
        .then(res => res.json())
        .then(data => thunkAPI.dispatch(setMovies(data.results)))
        .catch(err => console.log(err))
    }
)

export const fetchTVshows = createAsyncThunk(
    'data/fetchShows',
    async(url, thunkAPI) => {
        await fetch(url)
        .then(res => res.json())
        .then(data => thunkAPI.dispatch(setShows(data.results)
        ))
        .catch(err => console.log(err))
    }
)

export const dataSlice = createSlice({
    name: 'data',
    initialState:INITIAL_STATE,
    reducers:{
        setShows:(state, action) => {
            state.tvShows = action.payload
        },
        setMovies:(state, action) => {
            state.movies = action.payload
        },
        setVideoURL:(state, action) => {
            state.videoURL = action.payload
        }
    }
})

export const dataReducer = dataSlice.reducer;
export const { setMovies, setShows, setVideoURL } = dataSlice.actions