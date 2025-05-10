import React from 'react';

function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-6 px-10 text-center border-t border-gray-700">
      <h2 className="text-xl uppercase font-semibold">Book Store</h2>
      <p className="text-gray-400 text-sm mt-2">Empowering readers, one book at a time.</p>
      <p className="text-gray-500 text-xs mt-4">
        © {new Date().getFullYear()} Book Store. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
