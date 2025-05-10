import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

function ViewBookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
        setBook(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center text-red-500 mt-10 text-xl">Book not found.</div>
    );
  }

  return (
    <div className="bg-zinc-900 text-white min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start h-full">
        <div className="w-full md:w-1/2 p-10 bg-gray-900 flex items-center justify-center">
          <img
            src={book.url}
            alt={book.title}
            className="rounded-lg shadow-lg max-h-[70vh] object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-lg text-gray-400">by <span className="text-white">{book.author}</span></p>
          <p className="text-gray-300">
            {book.description || "No description available."}
          </p>
          <p>🌐 {book.language}</p>
          <p className="text-blue-400 text-xl font-semibold">${book.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewBookDetails;
