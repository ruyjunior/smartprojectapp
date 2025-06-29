import React from 'react';
import Link from 'next/link';
import { FaEnvelope, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const CallToAction: React.FC = () => {
  return (
    <section id="call" className="py-20 text-center bg-gradient-to-b from-blue-50 to-white">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-900 tracking-tight drop-shadow">
        ENTRE EM CONTATO
      </h2>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
        Estamos prontos para ajudar a transformar sua empresa com nossas soluções tecnológicas.
      </p>
      <div className="flex justify-center flex-wrap mt-10 gap-6">
        <Link
          href="mailto:autoricbr@gmail.com"
          className="flex items-center gap-3 bg-white hover:bg-blue-50 transition p-5 rounded-xl shadow-lg border border-blue-100 min-w-[260px] justify-center"
        >
          <FaEnvelope className="text-blue-500" size={28} />
          <span className="text-gray-800 font-semibold text-lg">autoricbr@gmail.com</span>
        </Link>
        <Link
          href="https://wa.me/5551992274105"
          className="flex items-center gap-3 bg-white hover:bg-green-50 transition p-5 rounded-xl shadow-lg border border-green-100 min-w-[260px] justify-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-green-500" size={28} />
          <span className="text-gray-800 font-semibold text-lg">+55 51 99227-4105</span>
        </Link>
        <Link
          href="https://www.instagram.com/autoricbr"
          className="flex items-center gap-3 bg-white hover:bg-pink-50 transition p-5 rounded-xl shadow-lg border border-pink-100 min-w-[260px] justify-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-pink-500" size={28} />
          <span className="text-gray-800 font-semibold text-lg">@autoricbr</span>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;