import React from 'react'
import Link from 'next/link'
import { FaYoutube, FaTwitter, FaGithub } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className='bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10'>
        <div className='mx-auto md:px-6 prose prose-xl flex justify-between flex-col sm:flex-row'>
            <h1 className='text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0'>
                <Link href='/' className='text-white/90 no-underline hover:text-white'>
                    Alex
                </Link>
            </h1>
            <div className='flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-3xl lg:text-5xl'>
                <Link className='text-white/90 hover:text-white' href='https://www.youtube.com/watch?v=843nec-IvW0&ab_channel=DaveGray' target='_blank'>
                    <FaYoutube />
                </Link>
                <Link className='text-white/90 hover:text-white' href='https://github.com/Alex21400' target='_blank'>
                    <FaGithub />
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar