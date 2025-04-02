
import { profileConst } from '../../constant'
import { Link } from 'react-router-dom'

const ProfileSide = () => {
  return (
    <div className='bg-green-300   pl-12'>
    <ul className='flex-center pt-20'>
      {
        profileConst.slice(0,4).map((link)=>(
          <Link key={link.route} 
          to={link.route}>
            <div className='flex text-white text-2xl pb-8 space-x-11 items-center'>
            <li className='list-none'>
              {<link.icon/>}
            </li>
            <p>
              {link.label}
            </p>
            </div>
          </Link>
        ))
      }
    </ul>
    <div className='mt-20 '>
      <div>
      <p className='text-white text-2xl'>Admin</p>
      <hr className=' w-96' />
      <ul className='flex-center pt-20'>
      {
        profileConst.slice(4).map((link)=>(
          <Link key={link.route} 
          to={link.route}>
            <div className='flex text-white text-2xl pb-8 space-x-11 items-center'>
            <li className='list-none'>
              {<link.icon/>}
            </li>
            <p>
              {link.label}
            </p>
            </div>
          </Link>
        ))
      }
    </ul>
      </div>
    </div>
    </div>
  )
}

export default ProfileSide