import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const logo = "/images/logos/logo.jpg";


const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center gap-4">
        <Image src={logo} width={200} height={200} alt="Logo da Empresa" />

        <nav className="hidden md:flex gap-4">
          <Link href="#services" className="text-gray-800 hover:text-blue-500">Serviços</Link>
          <Link href="#clients" className="text-gray-800 hover:text-blue-500">Clientes</Link>
          <Link href="#platforms" className="text-gray-800 hover:text-blue-500">Plataformas</Link>
          <Link href="#videos" className="text-gray-800 hover:text-blue-500">Galeria de Vídeos</Link>
          <Link href="#contact" className="text-gray-800 hover:text-blue-500">Contato</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Link href="https://www.instagram.com" className="text-gray-800 hover:text-blue-500">Instagram</Link>
        <Link href="https://www.linkedin.com" className="text-gray-800 hover:text-blue-500">LinkedIn</Link>
        <Link href="https://www.youtube.com" className="text-gray-800 hover:text-blue-500">YouTube</Link>
        <select className="border border-gray-300 rounded-md p-2">
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
          <option value="es">Espanhol</option>
        </select>
      </div>
    </header>
  );
};

export default Header;