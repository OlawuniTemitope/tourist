
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../services/redux/app/store';
import { signOutUserSuccess } from '../../services/redux/user/user.slice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signOut } from '../../services/api';
import { useIsLogeedIn } from '../../services/queries';
// import imagess from '../../../../upload/users/user-66df2e734c7ac1095c463b9d-1725948014157.jpeg'

const Action = () => {
    const { currentUser } = useSelector((state:RootState) => state.user);
    console.log(currentUser)

      const isLogedIn = useIsLogeedIn()
         const currentlyLogIn = isLogedIn.data
        
       console.log(currentlyLogIn)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const handleSignOut = async (e:React.MouseEvent<HTMLButtonElement>) => {
      
      e.preventDefault();
      //  console.log("confirmed")
      const signOuts = await signOut()
      const res =  signOuts    
      console.log(currentUser?.data?.user?.photo)
      console.log(res)
        if(!res){
          return
        }
     
         if(res.status === 'success'){
          console.log(res)
          dispatch(signOutUserSuccess(res));
          navigate('/sign-in');
          toast.success('user Loggedout successfully')
        }
    }
    


        
  return (
    <div className='flex items-center justify-end gap-x-8 text-2xl'>
        {!currentUser?.token || !currentlyLogIn ? <><button
              className=' text-muted-foreground hover:text-primary'
          >
              <Link to="/sign-in">
                  LOG IN
              </Link>
          </button><button
              className=' text-muted-foreground hover:text-primary'
          >
                  <Link to="/sign-up">
                      SIGN UP
                  </Link>
              </button></>:(
               <div className='flex text-white justify-center uppercase items-center lg:space-x-6 space-x-4'>
                <button onClick={(e)=>handleSignOut(e)}>LOGOUT</button>
                <Link to='/profile' className='flex justify-center items-center gap-3 sm:gap-4'>
                 <div>
                  <img src={`/img/users/${currentUser?.data.user.photo}`} className='w-10 h-10 rounded-full' alt="user photo" /> 
                </div> 
                  <div>
                    {currentUser?.data.user.name}
                </div>
                </Link>
              </div> )
                  }
    </div>
  )
}

export default Action