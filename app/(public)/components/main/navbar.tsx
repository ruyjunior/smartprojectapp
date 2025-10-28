'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-blue-600/90 shadow-lg backdrop-blur' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src="/images/logos/logo.png"
            width={60}
            height={60}
            alt="Logo da Empresa"
            className="rounded-md shadow border-2 border-blue-200"
          />
          <span className="hidden md:inline text-white font-extrabold text-2xl tracking-tight drop-shadow">Smart Project</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-6 text-white text-lg font-semibold">
          <Link href="/login" className="hover:text-blue-200 transition">Login</Link>
        </div>

        {/* Botão Menu Mobile */}
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-blue-900/95 text-white text-lg font-semibold py-8 flex flex-col items-center space-y-6 shadow-lg transition-all duration-300">
          <Link href="/login" onClick={toggleMenu} className="hover:text-blue-300 transition">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;