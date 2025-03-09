import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <Link className='border p-2 rounded-md hover:bg-black hover:text-white transition-all hover:shadow-2xl' to='/'>Back to Home Page</Link>
        </div>
    )
}

export default Navbar