import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInSuccess } from '../../services/redux/user/user.slice';
import { RootState } from '../../services/redux/app/store';
import { useLoginUser } from '../../services/mutation';
import { UserProps } from '../../types/types';
import { toast } from 'react-toastify';
// import  Oauth from '../components/Oauth';

export default function SignIn() {
  const [formData, setFormData] = useState<UserProps>({
    name:'',
    email:'',
    photo:'',
    password:'',
    passwordConfirm:''});
  const { loading, error } = useSelector((state:RootState) => state.user);
  const loginUser = useLoginUser()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if(!loginUser){
    return;
  }
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit  = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const res = await loginUser?.mutateAsync(formData)
    if(!res){
      return
    }
     console.log(res)
         if(res.status === 'success'){
          console.log(res.token)
          dispatch(signInSuccess(res));
          navigate('/');
          toast.success('user Loggedin successfully')
        } 
    }
    // try {
    //   dispatch(signInStart());
    //   const res = await fetch('/api/auth/signin', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   if (data.success === false) {
    //     dispatch(signInFaliure(data.message));
    //     return;
    //   }
    //   dispatch(signInSuccess(data));
    //   navigate('/');
    // } catch (error) {
    //   // @ts-expect-error err can be any variable type
    //   dispatch(signInFaliure(error.message));
    // }
  
  return (
    <div className='p-24 mx-auto w-[500px] items-center justify-center bg-gray-100 my-56'>
      <h1 className='text-4xl text-center font-semibold mb-10'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <label className="text-3xl font-semibold text-gray-500 pb-6">
              Email
       </label>      
        <input
          type='email'
          placeholder='email'
          required
          className="p-4 text-3xl font-semibold rounded-lg ring-1 ring-gray-300"
          id='email'
          onChange={handleChange}
        />
        <label className="text-3xl mt-5 font-semibold
         text-gray-500 pb-3">
              Password
       </label>      
      
        <input
          type='password'
          placeholder='password'
          required
          className="p-4 mb-9 font-semibold rounded-md ring-1
           text-xl ring-gray-300"
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white text-2xl p-3
           rounded-lg uppercase 
          hover:opacity-95
           disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        {/* <Oauth/> */}
      </form>
      <div className='flex gap-3 mr-16 font-semibold text-2xl mt-16'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
