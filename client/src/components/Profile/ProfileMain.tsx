import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../services/redux/app/store';
import { useDispatch } from 'react-redux';
import { useUpdateUser, useUpdateUserPassword } from '../../services/mutation';
import { updateUserSuccess } from '../../services/redux/user/user.slice';
import { toast } from 'react-toastify';
import { UserProps } from '../../types/types';

  
const ProfileMain = () => {

    const fileRef = useRef(null);
    const { currentUser, loading, } = useSelector((state:RootState) => state.user);

    const [photo, setPhoto] = useState(currentUser.data.user.photo)
    const [name, setName] = useState(currentUser.data.user.name);
    const [email, setEmail] = useState(currentUser.data.user.email);
 
    // const [file, setFile] = useState<string>();
        const [formData, setFormData] = useState<UserProps>({ 
          password:'',
          passwordConfirm:''});

        const dispatch = useDispatch();
        const navigate = useNavigate();
        const updateUserData = useUpdateUser()
        const updatePassword = useUpdateUserPassword()

        const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
         
          setFormData({ ...formData, [e.target.id]: e.target.value })
        };  
        
        
         const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("photo", photo as string);
        formData.append("name", name);
        formData.append("email", email);
       console.log(formData)
       console.log(photo)

        const res = await updateUserData?.mutateAsync(formData as FormData)
          if(!res){
            return
          }
          console.log(res)
              if(res.status === 'success'){
                console.log(res.token)
                dispatch(updateUserSuccess(res));
                navigate('/profile');
                toast.success('Profile successfully updated')
              }
      };
    
      const handleUpdatePassword = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await updatePassword?.mutateAsync(formData)
          if(!res){
            return
          }
          // console.log(res)
              if(res.status === 'success'){
                console.log(res.token)
                dispatch(updateUserSuccess(res));
                setFormData({
                  password:" ",
                  passwordConfirm:" ",
                })
                navigate('/');
                toast.success('Profile successfully updated')
              }
           };
    
      
  return (
    <div className='px-36 bg-gray-100'>
      <h1 className='text-3xl font-semibold text-green-400 text-center my-7'>Profile Settings</h1>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-14'>
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.data.user.email}
          className="p-3 text-2xl font-semibold rounded-xl ring-1 ring-gray-300"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='name'
          placeholder='name'
          onChange={(e) => setName(e.target.value)}

          defaultValue={currentUser.data.user.name}
          id='name'
          className="p-2 rounded-md ring-1 ring-gray-300"
        />
         <input
          onChange={(e)=>setPhoto(e.target.files ? e.target.files[0] : null)}
          type='file'
          ref={fileRef}
          id='photo'
          hidden
          accept='image/*'
        />
        <img
                // @ts-expect-error not
          onClick={() => fileRef.current.click()}
          src={`/img/users/${currentUser?.data.user.photo}`}
          alt='profile'
          className='rounded-full h-24 object-cover cursor-pointer self-center mt-2'
        />
     
       
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-4 font-semibold uppercase 
          hover:opacity-95 disabled:opacity-80 text-xl'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div>

      <form onSubmit={handleUpdatePassword}  className='flex mt-36 flex-col gap-4'>
        <div className='flex flex-col font-semibold justify-center text-xl gap-4'>
          <label className='ml-[35%]'>Current Password</label>
        <input
          placeholder='*******'
          onChange={handleChange}
          id='passwordCurrent'
          type="password"
          className="p-2 text-2xl rounded-lg ring-1 ring-gray-300"
        />
        </div>
        <div className="flex flex-col font-semibold justify-center text-xl gap-4">
        <label className='ml-[35%]'>New Password</label>
        <input
          type='password'
          placeholder='******'
          onChange={handleChange}
          id='password'
          className="p-2 text-2xl rounded-lg ring-1 ring-gray-300"
        />
        </div>
        <div className='flex flex-col font-semibold justify-center text-xl gap-4'>
        <label className='ml-[35%]'>confirm Password</label>
        <input
          placeholder='******'
          onChange={handleChange}   
          id='passwordConfirm'          
           type="password"
          className="p-2 text-2xl rounded-lg ring-1 ring-gray-300"
        />
        </div>
        <button
          disabled={loading}
          className='bg-slate-700  text-white rounded-lg text-xl
           p-4 mb-8 uppercase font-semibold hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
        
      </div>
    </div>

  )
}

export default ProfileMain