import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

const initialState = {
    user:null,
    favorites:[]
}

export const signUp = createAsyncThunk(
    'user/signup',
    (values, thunkAPI) => {
        return createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async (userCredential) => {
            updateProfile(auth.currentUser, {
                displayName:values.name
            })
            // Set user in app local state
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
        }).catch((err) => {
            console.log(err.message);
        })
    }
)

export const signIn = createAsyncThunk(
    'user/signin',
    (values, thunkAPI) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then(userCredential => {
            const user = {
                name:userCredential.user.displayName,
                email:values.email,
                favorites:[]
            }
            thunkAPI.dispatch(setUser(user))
        }).catch(err => {
            console.log(err);
        })
    }
)

export const signInWithGoogle = createAsyncThunk(
    'user/signinwithgoogle',
    (arg, thunkAPI) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            thunkAPI.dispatch(setUser({
                name:user.displayName,
                email:user.email,
                favorites:[]
            }));
        }).catch(err => {
            console.log(err);
        })
    }
)

export const authentication = createAsyncThunk(
    'user/authentication',
    async (arg, thunkAPI) => {
       await onAuthStateChanged(auth,  (currentUser) => {
            if(currentUser){
                const user = {
                    name:currentUser.displayName,
                    email:currentUser.email,
                    favorites:[]
                }
                thunkAPI.dispatch(setUser(user));
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
            console.log(err);
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
            alert('This item is already added to favorites');
            return;
        }
        const docRef = doc(db, 'users', user.email);
        await updateDoc(docRef, {
            favorites:arrayUnion(obj)
        })
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
