'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaIndustry } from 'react-icons/fa';
import { MdDevices } from 'react-icons/md';

// Extend the Window interface to include gtag
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

const Deliveries: React.FC = () => {

    const handleAutomationClick = () => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'clique_automation', {
                event_category: 'Navegação',
                event_label: 'Botão Automação',
            });
        }
    };
    const handleDevClick = () => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'clique_dev', {
                event_category: 'Navegação',
                event_label: 'Botão Desenvolvimento',
            });
        }
    };

    return (
        <section id="projects" className="py-20 text-center bg-gradient-to-b from-white to-blue-50">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-blue-900 tracking-tight drop-shadow">
                Projetos e Entregas
            </h2>
            <div className="flex justify-center flex-wrap gap-10">
                {/* Cartão Automação */}
                <div className="flex flex-col items-center justify-center bg-white px-8 py-8 rounded-2xl shadow-xl border border-blue-100 max-w-xs hover:scale-105 transition-transform duration-200">
                    <Link
                        href="/deliveries/#automation"
                        onClick={handleAutomationClick}
                        className="flex flex-col items-center group"
                    >
                        <div className="relative mb-4">
                            <Image
                                src="/images/icons/automation.png"
                                width={120}
                                height={120}
                                alt="automation"
                                className="rounded-full border-4 border-blue-200 shadow object-cover group-hover:shadow-lg transition"
                            />
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow group-hover:bg-blue-800 transition">
                                Automação
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold text-blue-800 mt-6">AUTOMAÇÃO</h3>
                        <p className="mt-2 text-gray-600">Desenvolvimento de Software para Máquinas Industriais.</p>
                        <FaIndustry size={32} className="mt-4 text-blue-500 group-hover:text-blue-700 transition" />
                    </Link>
                </div>
                {/* Cartão Sistemas */}
                <div className="flex flex-col items-center justify-center bg-white px-8 py-8 rounded-2xl shadow-xl border border-blue-100 max-w-xs hover:scale-105 transition-transform duration-200">
                    <Link
                        href="/deliveries/#dev"
                        onClick={handleDevClick}
                        className="flex flex-col items-center group"
                    >
                        <div className="relative mb-4">
                            <Image
                                src="/images/icons/dev.png"
                                width={120}
                                height={120}
                                alt="developed"
                                className="rounded-full border-4 border-blue-200 shadow object-cover group-hover:shadow-lg transition"
                            />
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow group-hover:bg-blue-800 transition">
                                Sistemas
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold text-blue-800 mt-6">SISTEMAS</h3>
                        <p className="mt-2 text-gray-600">Desenvolvimento de sistemas e sites.</p>
                        <MdDevices size={32} className="mt-4 text-blue-500 group-hover:text-blue-700 transition" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Deliveries;