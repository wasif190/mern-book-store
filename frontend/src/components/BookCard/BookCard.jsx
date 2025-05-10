import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ data }) {
  return (
    <Link>
      <div className="bg-white rounded shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-[320px]">
        <div className="bg-gray-800 flex items-center justify-center">
          <img
            src={data.url}
            alt={data.title}
            className="h-[30vh]"
          />
        </div>

        <div className='p-2'>
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{data.title}</h2>
            <p className="text-sm text-gray-500 mt-1">by {data.author}</p>
            <p className="text-xl pt-2 font-bold text-blue-600">${data.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
