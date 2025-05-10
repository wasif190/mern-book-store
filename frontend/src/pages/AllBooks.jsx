import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard';
import Loader from '../components/Loader/Loader';

function AllBooks() {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      console.log("Fetching all books");
      const response = await axios.get("http://localhost:3000/api/v1/get-all-books");
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="py-10 px-10 bg-zinc-900 h-auto">
      <h1 className="text-white uppercase text-2xl font-semibold">All Books</h1>
      {!Data && <div className="flex justify-center my-8"><Loader /></div>}
      <div className="grid my-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Data && Data.map((item, i) => (
          <div key={i}>
            <BookCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBooks;
