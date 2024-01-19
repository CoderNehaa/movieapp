import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    movies:[],
    genres:[],
    videoURL:'',
    apiData:{
        baseUrl: "https://api.themoviedb.org/3/",
        apiKey: 'a85f0e9195796914174fd0bde91a48bc'
    },
    sortOptions: [
      {name:"Popularity Ascending", value:"popularity.asc"},
      {name:"Popularity Descending", value:"popularity.desc"},
      {name:"Revenue Ascending", value:"revenue.asc"},
      {name:"Revenue Descending", value:"revenue.desc"},
      {name:"Release Date Ascending", value:"primary_release_date.asc"},
      {name:"Release Date Descending", value:"primary_release_date.desc"}
    ],
    currentMovie:null,
    currentShow:null,
    tvShows:[],
    movieGenre:null,
    tvGenre:null,
    loading:false
}

export const fetchList = createAsyncThunk(
    'data/fetchMovies',
    async (arg, thunkAPI) => {
        await fetch(arg.url)
        .then(res => res.json())
        .then(data => {
            switch(arg.type){
                case 'movies':
                    thunkAPI.dispatch(setMovies(data.results))
                    break;
                case 'shows':
                    thunkAPI.dispatch(setShows(data.results))
                    break;
                case 'genres':
                    thunkAPI.dispatch(setGenres(data.genres))
                    break;
            }
        })
        .catch(err => console.log(err))
    }
)

export const fetchCurrent = createAsyncThunk(
    'data/fetchMovie',
    async(arg, thunkAPI) => {
        fetch(arg.url)
        .then(res => res.json())
        .then(data => {
            arg.type==='movie'?thunkAPI.dispatch(setCurrentMovie(data)):thunkAPI.dispatch(setCurrentShow(data))
        })
        .catch(err => console.log(err))
    }
)

export const dataSlice = createSlice({
    name: 'data',
    initialState:INITIAL_STATE,
    reducers:{
        setMovies:(state, action) => {
            state.movies = [...state.movies, ...action.payload];
        },
        setVideoURL:(state, action) => {
            state.videoURL = action.payload
        },
        setGenres:(state, action) => {
            state.genres = action.payload
        },
        setShows:(state, action) => {
            state.tvShows = [...state.tvShows, ...action.payload]
        },
        setCurrentMovie:(state, action) => {
            state.currentMovie = action.payload
        },
        setCurrentShow:(state, action) => {
            state.currentShow = action.payload
        },
        setMovieGenre:(state, action) => {
            state.movieGenre = action.payload
            state.movies=[]
        }, 
        setTVgenre:(state, action) => {
            state.tvGenre = action.payload
            state.tvShows=[]
        },
        setLoading:(state, action) => {
            state.loading = !state.loading
        }
    }
})

export const dataReducer = dataSlice.reducer;
export const { setMovies, setVideoURL, setGenres, setShows, setCurrentMovie, setCurrentShow, setMovieGenre, setTVgenre, setLoading } = dataSlice.actions;
export const dataSelector = (state) => state.dataReducer;

