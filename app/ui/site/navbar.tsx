'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#020d1f] p-4 fixed w-full top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Image
          src="/img/logos/logo2.jpg"
          width={60}
          height={60}
          alt="Logo da Empresa"
          className="rounded-md"
        />
        <div className="text-white text-xl font-bold hidden md:flex">
          <ul className="flex space-x-6 text-white">
            <li><Link href="#services">Services</Link></li>
            <li><Link href="#clients">Clients</Link></li>
            <li><Link href="#techs">Technologies</Link></li>
            <li><Link href="#team">Team</Link></li>
            <li><Link href="#call">Contact Us</Link></li>
          </ul>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#020d1f] text-white text-xl font-bold">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><Link href="#services" onClick={toggleMenu}>Services</Link></li>
            <li><Link href="#clients" onClick={toggleMenu}>Clients</Link></li>
            <li><Link href="#techs" onClick={toggleMenu}>Technologies</Link></li>
            <li><Link href="#team" onClick={toggleMenu}>Team</Link></li>
            <li><Link href="#call" onClick={toggleMenu}>Contact Us</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;