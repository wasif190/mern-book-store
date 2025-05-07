import React from 'react'

function Navbar() {
    const links = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "About",
            link: "/about-us"
        },
        {
            title: "All Books",
            link: "/all-books"
        },
        {
            title: "Cart",
            link: "/cart"
        },
        {
            title: "Profile",
            link: "/profile"
        },
    ]

    return (
        <div className='bg-zinc-800 text-white px-8 py-4 flex justify-between'>
            <div>
                <h1 className='text-2xl font-semibold'>Book Store</h1>
            </div>
            <div className='nav-links flex items-center gap-4'>
                <div className='flex gap-4'>
                    {
                        links.map((items, i) => (
                            <div className='hover:text-blue-500 transition-all duration-300 cursor-pointer' key={i}>{items.title}</div>
                        ))
                    }
                </div>
                <div className='flex gap-4'>
                    <button className='px-4 py-1 border border-blue-500 cursor-pointer rounded'>
                        SignIn
                    </button>
                    <button className='px-4 py-1 bg-white text-zinc-800 cursor-pointer rounded'>
                        SignUp
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar