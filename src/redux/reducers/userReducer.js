import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {setLoading} from "../reducers/dataReducer";
import { toast } from "react-toastify";

const initialState = {
    user:null,
    favorites:[]
}

export const signUp = createAsyncThunk(
    'user/signup',
    async (values, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        return createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async (userCredential) => {
            updateProfile(auth.currentUser, {
                displayName:values.name
            })
            // Set user in redux store
            const user = {
                name:values.name,
                email:values.email,
                favorites:[]
            }
            // Add a new document as user in firestore database
            const userRef = await setDoc(doc(db, 'users', user.email), {
                name:values.name,
                email:values.email,
                password:values.password,
                favorites:[]
            });
            thunkAPI.dispatch(setUser(user));   
            thunkAPI.dispatch(setLoading(false)); 
            toast.success(`Welcome ${user.name} 🌟`)
        }).catch((err) => {
            toast.error(err.message);
            thunkAPI.dispatch(setLoading(false));
        })
    }
)

export const signIn = createAsyncThunk(
    'user/signin',
    (values, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then(userCredential => {
            const user = {
                name:userCredential.user.displayName,
                email:values.email,
                favorites:[]
            }
            thunkAPI.dispatch(setUser(user));
            thunkAPI.dispatch(setLoading(false));
            toast.success(`Welcome ${user.name} 🌟`)
        }).catch(err => {
            toast.error(err.message);
            thunkAPI.dispatch(setLoading(false));
        })
    }
)

export const signInWithGoogle = createAsyncThunk(
    'user/signinwithgoogle',
    async (arg, thunkAPI) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(async (result) => {
            thunkAPI.dispatch(setLoading(true));
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const userCredential = result.user;
            
            const docRef = doc(db, 'users', userCredential.email);
            const docSnap = await getDoc(docRef);
            const userFavorites = docSnap.exists() ?docSnap.data().favorites :[]

            const user = {
                name:userCredential.displayName,
                email:userCredential.email,
                favorites:userFavorites
            }
            const userRef = await setDoc(docRef, user);
            thunkAPI.dispatch(setUser(user));
            thunkAPI.dispatch(setLoading(false));
            toast.success(`Welcome ${user.name} 🌟`)
        }).catch(err => {
            toast.error(err.message);
            thunkAPI.dispatch(setLoading(false));
        })
    }
)

export const authentication = createAsyncThunk(
    'user/authentication',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
       await onAuthStateChanged(auth,  (currentUser) => {
            if(currentUser){
                const user = {
                    name:currentUser.displayName,
                    email:currentUser.email,
                    favorites:[]
                }
                thunkAPI.dispatch(setUser(user));
                thunkAPI.dispatch(setLoading(false));
            }
        })
    }
)

export const logOut = createAsyncThunk(
    'user/signOut',
    (arg, thunkAPI) => {
        console.log('log out');
        signOut(auth).then(() => {
            thunkAPI.dispatch(setUser(null))
        }).catch((err) => {
            toast.error(err.message);
        })
    }
)

export const getFavorites = createAsyncThunk(
    'user/getFavorites',
        async (arg, thunkAPI) => {
        const { userReducer } = thunkAPI.getState();
        const { user } = userReducer;

        const docRef = doc(db, 'users', user.email);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            thunkAPI.dispatch(setFavorites(docSnap.data().favorites));
        }
    }
)

export const addToFavorites = createAsyncThunk(
    'user/favorites',
    async (obj, thunkAPI) => {
        const {userReducer} = thunkAPI.getState();
        const {user, favorites} = userReducer;
        const isPresent = favorites.some((el) => el.id === obj.id);

        if(isPresent){
            toast.info("This item is already added to favorites list.");
            return;
        }
        const docRef = doc(db, 'users', user.email);
        await updateDoc(docRef, {
            favorites:arrayUnion(obj)
        })
        toast.success('Added to favorites.');
        thunkAPI.dispatch(getFavorites());
    }
)

export const removeFromFavorites = createAsyncThunk(
    'user/removeFavorite',
    async (obj, thunkAPI) => {
        const {userReducer} = thunkAPI.getState();
        const {user, favorites} = userReducer;

        const docRef = doc(db, 'users',user.email);
        await updateDoc(docRef, {
            favorites : arrayRemove(obj)
        })
        toast.success("Removed from favorites");
        thunkAPI.dispatch(getFavorites());
    }
)

const userSlice = createSlice({
    name:'userData',
    initialState:initialState,
    reducers:{
        setUser:(state, action)=>{
            state.user = action.payload
        },
        setFavorites:(state, action) => {
            state.favorites = action.payload
        }
    }
})

export const userReducer = userSlice.reducer;
export const { setUser, setFavorites } = userSlice.actions;
export const userSelector = (state) => state.userReducer;
