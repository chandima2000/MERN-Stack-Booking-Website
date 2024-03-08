import { Link } from "react-router-dom"


export default function Footer() {
  return (
    <div className="bg-blue-800 py-10">
        <div className="container mx-auto flex justify-between items-center">
            
              <Link to = {"/"}>
                <span className='text-xl text-white font-bold tracking-tight'>
                    <span className="text-red-600">Book</span>
                            Wizards<span className="text-red-600">.</span>com
                </span>
              </Link>
              
            <span className='text-white font-bold tracking-tight flex gap-4'>
                <p className='cursor-pointer'>Privacy Policy</p>
                <p className='cursor-pointer'>Terms of Services</p>
            </span>
        </div>
    </div>
  )
}
