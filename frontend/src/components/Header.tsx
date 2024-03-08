import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";


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
            <span className="flex space-x-2">
                {isLoggedIn ? (
                        <>
                            <Link to="/my-bookings">My Bookings</Link>
                            <Link to="/my-hotels">My Hotels</Link>
                            <button >Sign Out</button>
                        </> 
                    ) : (
                        <Link 
                        to="/sign-in" 
                        className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-blue-400">
                            Sign In
                        </Link>
                )}               
            </span>
        </div>
    </div>
  )
}
