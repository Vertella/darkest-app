import { Link } from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-gray-300 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo/Title */}
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-400">Darkest Helper</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
                <ul>
                <li><Link href="/" className="hover:text-gray-400">Home</Link></li>
                <li><Link href="/party-planner" className="hover:text-gray-400">Party Planner</Link></li>
                </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
