import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const INITIAL_STATE = {
    loading:false,
    apiData:{ baseUrl: "https://api.themoviedb.org/3/", apiKey: 'a85f0e9195796914174fd0bde91a48bc' },
    movies:[],
    tvShows:[],
    currentMovie:null,
    currentShow:null,
    movieGenre:null,
    tvGenre:null,
    searchResults:[],
    videoURL:'',
    movieGenresList:[],
    tvGenresList:[]
}

export const fetchList = createAsyncThunk(
    'data/fetchMovies',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        await fetch(arg.url)
        .then(res => res.json())
        .then(data => {
            switch(arg.type){
                case 'movie':
                    thunkAPI.dispatch(setMovies(data.results))
                    break;
                case 'shows':
                    thunkAPI.dispatch(setShows(data.results))
                    break;
                case 'search':
                    thunkAPI.dispatch(setSearchResults(data.results))
                    break;
            }
            setTimeout(() => {
                thunkAPI.dispatch(setLoading(false));
            }, 300);
        })
        .catch(err => {
            toast.error(err.mesage);
            thunkAPI.dispatch(setLoading(false));
        });
    }
)

export const fetchGenres = createAsyncThunk(
    'data/genres',
    (media, thunkAPI) => {
        fetch(`https://api.themoviedb.org/3/genre/${media}/list?language=en&api_key=a85f0e9195796914174fd0bde91a48bc`)
        .then(res => res.json())
        .then(data => {
            media==="movie"
            ?thunkAPI.dispatch(setMovieGenresList(data.genres))
            :thunkAPI.dispatch(setTVgenresList(data.genres))
        })
        .catch(err => toast.error(err.mesage));
    }
)

export const fetchCurrent = createAsyncThunk(
    'data/fetchMovie',
    async(arg, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        fetch(arg.url)
        .then(res => res.json())
        .then(data => {
            arg.type==='movie'
            ?thunkAPI.dispatch(setCurrentMovie(data))
            :thunkAPI.dispatch(setCurrentShow(data));
            
            setTimeout(() => {
                thunkAPI.dispatch(setLoading(false));
            }, 300);
        })
        .catch(err => {
            toast.error(err.mesage);
            thunkAPI.dispatch(setLoading(false));
        });
    }
)

export const findTrailer = createAsyncThunk(
    'data/trailer',
    async (obj, thunkAPI) => {
        await fetch(`https://api.themoviedb.org/3/${obj.type}/${obj.id}/videos?api_key=a85f0e9195796914174fd0bde91a48bc`) 
        .then(res => res.json())
        .then(data => {
            if(data.results){
                const arr = data.results.filter((video) => video.name.includes('Trailer'));
                if (!arr.length) {
                    thunkAPI.dispatch(setVideoURL('unavailable'));
                    throw new Error('Trailer not available'); 
                }
                const url = arr[0].key;
                thunkAPI.dispatch(setVideoURL(url))
            }
        })
        .catch(err => toast.error(err.mesage))
      }
);
  
export const dataSlice = createSlice({
    name: 'data',
    initialState:INITIAL_STATE,
    reducers:{        
        setMovies:(state, action) => {
            // Movies List
            state.movies = [...state.movies, ...action.payload];
        },
        setShows:(state, action) => {
            // TV shows List
            state.tvShows = [...state.tvShows, ...action.payload]
        },
        setMovieGenresList:(state, action) => {
            // List of movie's genres
            state.movieGenresList = action.payload
        },
        setTVgenresList:(state, action) => {
            // List of tv show's genres
            state.tvGenresList = action.payload
        },
        emptyMovies:(state, action) => {
            // Make the movies list empty
            state.movies = []
        },
        emptyShows:(state, action) => {
            // Make the tv shows list empty   
            state.tvShows = []
        },
        setCurrentMovie:(state, action) => {
            // Current movie in movie details page
            state.currentMovie = action.payload
        },
        setCurrentShow:(state, action) => {
            // Current TV show in show details page
            state.currentShow = action.payload
        },
        setMovieGenre:(state, action) => {
            // Selected movie genre
            state.movieGenre = action.payload
            state.movies=[]
        },
        setTVgenre:(state, action) => {
            // Selected tv show genre
            state.tvGenre = action.payload
            state.tvShows=[]
        }, 
        setLoading:(state, action) => {
            // Change the loading state of app
            state.loading = action.payload
        },
        setSearchResults:(state, action) => {
            state.searchResults = action.payload
        },
        setVideoURL:(state, action) => {
            state.videoURL = action.payload
        }
    }
})

export const dataReducer = dataSlice.reducer;
export const { setMovies, setShows, setMovieGenresList, setTVgenresList, setVideoURL, emptyMovies, emptyShows, setCurrentMovie, setCurrentShow, setMovieGenre, setTVgenre, setLoading, setSearchResults } = dataSlice.actions;
export const dataSelector = (state) => state.dataReducer;

