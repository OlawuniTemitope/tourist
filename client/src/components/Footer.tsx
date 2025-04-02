// import logo from '../public/assets/img/logo-white.png'
const Footer = () => {
    return (
      <footer className='items-center p-10 flex justify-between bg-gray-100'>
        <img src="/img/logo-white.png" className='w-40 h-12' alt="logo" />
        <div> 
           <ul className='text-2xl gap-4 flex'>
          <li> <a href="#">Download apps</a></li>
          <li> <a href="#">Become a guide</a></li>
          <li> <a href="#">Careers</a></li>
          <li> <a href="#">Contact</a></li>
          <li> <a href="#">About us</a></li>
          </ul>
          <p className='text-2xl pt-3'> &copy; by Topy-Tech</p>
        </div>
      </footer>
    )
  }
  
  export default Footer