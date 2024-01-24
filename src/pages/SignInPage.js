import React, { useEffect, useState } from 'react'
import { signIn, signInWithGoogle, user } from '../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const [values, setValues] = useState({email:'', password:''});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.userReducer.user);

    useEffect(() => {
        if(user){
            navigate('/');
        }
    }, [user])

    return (
        <div className='h-screen w-screen bg-slate-900 text-cyan-700 flex justify-center items-center p-0 m-0'>
            <div className='w-1/3 h-1/2 flex flex-col justify-center items-center'>
                <h1 className='text-4xl mb-4'> Sign in </h1>

                <form onSubmit={(e) => e.preventDefault()} className='flex flex-col w-[350px]'>
                    <input type='email' placeholder='Enter email'
                        onChange={(e) => setValues({email:e.target.value, password:values.password})} 
                        className='my-2 bg-transparent border-2 border-cyan-700 py-3 px-5 text-lg focus:outline-none' />

                    <input type='password' placeholder='Enter password'
                        onChange={(e) => setValues({email:values.email, password:e.target.value})}
                        className='my-2 bg-transparent border-2 border-cyan-700 py-3 px-5 focus:outline-none'/>

                    <button className='my-4 bg-cyan-700 text-black p-3 font-bold' 
                        onClick={() => dispatch(signIn(values))} type='submit'> Sign In </button>

                    <button className='my-4 bg-cyan-700 text-black p-3 font-bold' 
                        onClick={() => dispatch(signInWithGoogle())}> Sign In With Google </button>
                        
                </form>
                <Link to='/signup' className='text-gray-400 font-bold m-2 text-sm'> Don't have an account? Create for free. </Link>
            </div>
        </div>
    )
}

export default SignInPage
