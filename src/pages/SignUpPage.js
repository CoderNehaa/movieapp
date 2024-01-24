import React, { useState, useEffect } from 'react'
import { signUp } from '../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const SignUpPage = () => {
    const [values, setValues] = useState({name:'', email:'', password:''});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.userReducer.user);

    useEffect(() => {
        if(user){
            navigate('/');
            console.log(user);
        }
    }, [user]);

    function handleSubmit(e){
        e.preventDefault();
        dispatch(signUp(values));
    }

    return (
        <div className='h-screen w-screen bg-slate-900 text-cyan-700 flex justify-center items-center p-0 m-0'>
            <div className='w-1/3 h-1/2 flex flex-col justify-center items-center'>
                <h1 className='text-4xl mb-4'> Sign Up </h1>

                <form onSubmit={handleSubmit} className='flex flex-col w-[350px]'>
                    <input type='text' placeholder='Enter name'
                        onChange={(e) => setValues({name:e.target.value, email:values.email, password:values.password})} 
                        className='my-2 bg-transparent border-2 border-cyan-700 py-3 px-5 text-lg focus:outline-none' />
                    
                    <input type='email' placeholder='Enter email'
                        onChange={(e) => setValues({name:values.name, email:e.target.value, password:values.password})} 
                        className='my-2 bg-transparent border-2 border-cyan-700 py-3 px-5 text-lg focus:outline-none' />

                    <input type='password' placeholder='Enter password'
                        onChange={(e) => setValues({name:values.name, email:values.email, password:e.target.value})}
                        className='my-2 bg-transparent border-2 border-cyan-700 py-3 px-5 focus:outline-none'/>

                    <button className='my-4 bg-cyan-700 text-black p-3 font-bold'> Sign Up </button>
                    <button className='my-4 bg-cyan-700 text-black p-3 font-bold'> Sign In With Google </button>
                </form>
                <Link to='/signin' className='text-gray-400 font-bold m-2 text-sm'> 
                    Already have an account? Sign in. 
                </Link>
            </div>
        </div>
    )
}

export default SignUpPage
