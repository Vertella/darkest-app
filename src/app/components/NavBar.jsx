import React from "react";
import  Link  from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-zinc-800 text-gray-300 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="container mx-auto text-center">
          <Link href="/"> 
          <h1 className="text-2xl font-bold">Darkest Helper</h1>
          
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <ul>
          <li><Link href="/adventurers">Adventurers</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
