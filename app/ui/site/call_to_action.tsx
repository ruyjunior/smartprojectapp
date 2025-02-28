import React from 'react';
import Link from 'next/link';
import { FaEnvelope, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const CallToAction: React.FC = () => {
  return (
    <section id="call" className="mt-5 flex flex-col items-center justify-center bg-blue-500 py-12 text-white">
      <h2 className="text-3xl font-bold">Contact Us</h2>
      <p className="mt-4 text-center">We are ready to help transform your company with our technological solutions.</p>
      <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
        <Link href="mailto:autoricbr@gmail.com" className="flex items-center gap-2 bg-gray-100 p-4 rounded-lg shadow-md">
          <FaEnvelope className="text-blue-500" size={24} />
          <h3 className="text-gray-800">autoricbr@gmail.com</h3>
        </Link>
        <Link href="https://wa.me/5571991258769" className="flex items-center gap-2 bg-gray-100 p-4 rounded-lg shadow-md">
          <FaWhatsapp className="text-green-500" size={24} />
          <h3 className="text-gray-800">+55 71 99125-8769</h3>
        </Link>
        <Link href="https://www.instagram.com/autoricbr" className="flex items-center gap-2 bg-gray-100 p-4 rounded-lg shadow-md">
          <FaInstagram className="text-pink-500" size={24} />
          <h3 className="text-gray-800">@autoricbr</h3>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;