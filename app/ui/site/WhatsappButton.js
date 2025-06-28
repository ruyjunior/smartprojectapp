'use client'
import { FaWhatsapp } from "react-icons/fa";

const href = 'https://wa.me/' + '51992274105';

const WhatsappButton = () => {

  const handleClick = () => {
    // Envia o evento para o Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'clique_whatsapp', {
        event_category: 'Contato',
        event_label: 'Botão WhatsApp',
      });
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-16 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default WhatsappButton;
