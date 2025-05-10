import React, { useEffect, useState } from 'react'
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';


function RecentlyAdded() {
    const [Data, setData] = useState();

    useEffect(() => {
        const fetch = async() => {
            console.log("Fetching recent books")
            const response = await axios.get("http://localhost:3000/api/v1/get-recent-books");
            console.log(response.data.data)
            setData(response.data.data);
            console.log(Data)
        }
        fetch()
    }, []);
  return (
    <div className='mt-10'>
        <h1 className='uppercase text-2xl font-semibold'>Recently Added Books</h1>
        {!Data && <div className='flex items-center justify-center my-8'> <Loader/> </div>}
        <div className='grid my-8 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
                Data && Data.map((item, i) => (
                    <div key={i}>
                        <BookCard data={item}/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default RecentlyAdded