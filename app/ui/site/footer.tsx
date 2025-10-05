import Image from 'next/image';
import { FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-10 text-center relative">
      <div className="container mx-auto px-6 flex flex-col md:flex-row md:justify-between items-center">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-2">
            <Image
              src="/images/logos/logodev.jpg"
              width={40}
              height={40}
              alt="Logo da Empresa"
              className="mr-2 rounded-md border-2 border-blue-200 shadow"
            />
            <span className="font-bold text-lg tracking-tight">AUTORIC AUTOMAÇÃO</span>
          </div>
          <p className="text-xs">&copy; 2025 Autoric Automação. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-2">
            <a href="https://www.instagram.com/autoricbr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={22} className="hover:text-pink-200 transition" />
            </a>
            <a href="https://wa.me/5551992274105" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp size={22} className="hover:text-green-200 transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;