import Logo from "./Logo"
import Action from "./Action"
import { Link } from "react-router-dom"


const Header = () => {
  return (
    // <header className="bg-gray-500 px-0 py-2 relative z-50 flex justify-between align-middle">
    //     <nav className=" flex align-middle grow-0 basis-[40%]">
    //       <Link to="#" className="uppercase text-2xl no-underline
    //       inline-flex align-middle transition-all duration-[0.2]
    //       font-normal bg-none border-none cursor-pointer">
    //         <form className="flex align-middle"></form>
    //       </Link>
    //     </nav>
    // </header>
    <header className="flex justify-between items-center bg-gray-600
     text-white h-28 px-16">
      <Link to="/" className="text-3xl font-semibold">ALL TOURS</Link>
      <Logo/>
      <Action/>
    </header>
  )
}

export default Header