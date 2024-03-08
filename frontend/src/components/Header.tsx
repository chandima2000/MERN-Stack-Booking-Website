import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";


export default function Header() {

    const {isLoggedIn} = useAppContext(); 

  return (
    <div className="bg-blue-800 py-6">
        <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking-tight">
                <Link to ="/">
                    <span className="text-red-600">Book</span>
                    Wizards<span className="text-red-600">.</span>com
                </Link>
            </span>
            <span className="flex space-x-2 gap-6 flex-col sm:flex-row ">
                {isLoggedIn ? (
                        <>
                            <Link to="/my-bookings" className="flex items-center
                            text-white px-3 font-bold hover:bg-blue-500 hover:text-black" >My Bookings</Link>
                            <Link to="/my-hotels" className="flex items-center
                            text-white px-3 font-bold hover:bg-blue-500  hover:text-black">My Hotels</Link>
                            <SignOutButton/>
                        </> 
                    ) : (
                        <Link 
                        to="/sign-in" 
                        className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-black hover:text-white">
                            Sign In
                        </Link>
                )}               
            </span>
        </div>
    </div>
  )
}
