import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    loading:false,
    apiData:{ baseUrl: "https://api.themoviedb.org/3/", apiKey: 'a85f0e9195796914174fd0bde91a48bc' },
    movies:[],
    tvShows:[],
    genres:[],
    currentMovie:null,
    currentShow:null,
    movieGenre:null,
    tvGenre:null,
    searchResults:[],
    videoURL:''
}

export const fetchList = createAsyncThunk(
    'data/fetchMovies',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
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
                case 'search':
                    thunkAPI.dispatch(setSearchResults(data.results))
                    break;
            }
            setTimeout(() => {
                thunkAPI.dispatch(setLoading(false));
            }, 200);
        })
        .catch(err => {
            console.log(err);
            thunkAPI.dispatch(setLoading(false));
        });
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
                console.log('setting loading to false');
                thunkAPI.dispatch(setLoading(false));
            }, 300);
        })
        .catch(err => {
            console.log(err);
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
                    window.alert('Trailer not available');
                    throw new Error('Trailer not available'); 
                }
                const url = arr[0].key;
                thunkAPI.dispatch(setVideoURL(url))
            }
        })
        .catch(err => console.log(err))
      }
);
  
export const dataSlice = createSlice({
    name: 'data',
    initialState:INITIAL_STATE,
    reducers:{        
        setVideoURL:(state, action) => {
            state.videoURL = action.payload
        },
        setMovies:(state, action) => {
            state.movies = [...state.movies, ...action.payload];
        },
        setCurrentMovie:(state, action) => {
            state.currentMovie = action.payload
        },
        setMovieGenre:(state, action) => {
            state.movieGenre = action.payload
            state.movies=[]
        },
        setShows:(state, action) => {
            state.tvShows = [...state.tvShows, ...action.payload]
        },
        setCurrentShow:(state, action) => {
            state.currentShow = action.payload
        }, 
        setTVgenre:(state, action) => {
            state.tvGenre = action.payload
            state.tvShows=[]
        },
        setLoading:(state, action) => {
            state.loading = action.payload
        },
        setGenres:(state, action) => {
            state.genres = action.payload
        },
        setSearchResults:(state, action) => {
            state.searchResults = action.payload
        }
    }
})

export const dataReducer = dataSlice.reducer;
export const { setMovies, setVideoURL, setGenres, setShows, setCurrentMovie, setCurrentShow, setMovieGenre, setTVgenre, setLoading, setSearchResults } = dataSlice.actions;
export const dataSelector = (state) => state.dataReducer;

