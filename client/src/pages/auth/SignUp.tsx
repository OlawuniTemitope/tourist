import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUser } from '../../services/mutation';
import { UserProps } from '../../types/types';
import { signInSuccess } from '../../services/redux/user/user.slice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import  Oauth  from '../components/Oauth';
// import OAuth from '../components/OAuth';


export default function SignUp() {
  const [formData, setFormData] = useState<UserProps>({name:"",email:"",photo:"",password:"",passwordConfirm:""});
  // eslint-disable-next-line no-unused-vars
  const [error, _] = useState(null);
  const [loading, ] = useState(false);
  const createUser = useCreateUser()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  };
  const handleSubmit  = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createUser?.mutateAsync(formData)
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
   return (
    <div className='p-3 w-[500px] bg-gray-100 items-center justify-center mx-auto my-56'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-9'>
        <input
          type='text'
          placeholder='name'
          className='border text-3xl p-3 my-5 font-semibold rounded-lg'
          id='name'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          required
          className='border text-3xl p-3 my-5 font-semibold rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          required
          className='border text-3xl p-3 my-5 font-semibold rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <input
          placeholder='passwordConfirm'
          type="password"
          required
          className='border text-3xl p-3 my-5 font-semibold rounded-lg'
          id='passwordConfirm'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white text-2xl p-3
           rounded-lg uppercase 
          hover:opacity-95
           disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        {/* <Oauth/> */}
      </form>
      <div className='flex gap-2  mr-16 font-semibold text-2xl mt-8 pb-9'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
