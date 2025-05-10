import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiMenuFries } from "react-icons/ci";

function Navbar() {
    const links = [
        { title: "Home", link: "/" },
        { title: "About", link: "/about-us" },
        { title: "All Books", link: "/all-books" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
    ];

    const [MobileNav, setMobileNav] = useState("hidden");

    const handleLinkClick = () => {
        setMobileNav("hidden");
    };

    return (
        <>
            <nav className='z-50 sticky border-gray-500 border-b top-0 left-0 right-0 bg-zinc-800 text-white px-10 py-4 flex justify-between'>
                <Link to="/">
                    <h1 className='text-2xl font-semibold uppercase'>Book Store</h1>
                </Link>
                <div className='nav-links flex items-center gap-4'>
                    <div className='gap-4 md:flex hidden'>
                        {links.map((items, i) => (
                            <Link 
                                className='hover:text-blue-500 transition-all duration-300 cursor-pointer' 
                                key={i}
                                to={items.link}
                            >
                                {items.title}
                            </Link>
                        ))}
                    </div>
                    <div className='gap-4 md:flex hidden'>
                        <Link to="/signUp" className='px-4 py-1 border border-blue-500 cursor-pointer rounded'>
                            SignIn
                        </Link>
                        <Link to="/login" className='px-4 py-1 bg-white text-zinc-800 cursor-pointer rounded'>
                            SignUp
                        </Link>
                    </div>
                    <button 
                        className='text-white text-2xl md:hidden' 
                        onClick={() => setMobileNav(prev => prev === "hidden" ? "block" : "hidden")}
                    >
                        <CiMenuFries />
                    </button>
                </div>
            </nav>

            {/* Mobile Nav */}
            <div className={`${MobileNav} fixed bg-zinc-800 top-0 left-0 right-0 bottom-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items, i) => (
                    <Link 
                        className='hover:text-blue-500 transition-all duration-300 cursor-pointer text-white text-2xl mb-6'
                        key={i}
                        to={items.link}
                        onClick={handleLinkClick}
                    >
                        {items.title}
                    </Link>
                ))}

                <Link 
                    to="/signUp" 
                    className='px-4 mb-6 text-2xl text-white py-1 border border-blue-500 cursor-pointer rounded'
                    onClick={handleLinkClick}
                >
                    SignIn
                </Link>
                <Link 
                    to="/login" 
                    className='px-4 text-2xl py-1 bg-white text-zinc-800 cursor-pointer rounded'
                    onClick={handleLinkClick}
                >
                    SignUp
                </Link>
            </div>
        </>
    )
}

export default Navbar;
