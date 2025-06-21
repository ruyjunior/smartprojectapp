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
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-blue-400 shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href={"/"}>
          <Image
            src="/images/logos/logo.jpg"
            width={60}
            height={60}
            alt="Logo da Empresa"
            className="rounded-md"
          />

        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-6 text-white text-lg font-semibold">
          <Link href="/#services">Serviços</Link>
          <Link href="/#clients">Clientes</Link>
          <Link href="/#projects">Projetos</Link>
          <Link href="/#team">Time</Link>
          <Link href="/#call">Contato</Link>
        </div>

        {/* Botão Menu Mobile */}
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#020d1f] text-white text-lg font-semibold py-4 flex flex-col items-center space-y-4">
          <Link href="/#services" onClick={toggleMenu}>Serviços</Link>
          <Link href="/#clients" onClick={toggleMenu}>Clientes</Link>
          <Link href="/#projects" onClick={toggleMenu}>Projetos</Link>
          <Link href="/#team" onClick={toggleMenu}>Time</Link>
          <Link href="/#call" onClick={toggleMenu}>Contato</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;