'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaIndustry } from 'react-icons/fa';
import { MdDevices } from 'react-icons/md'

// Extend the Window interface to include gtag
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

const Deliveries: React.FC = () => {

    const handleAutomationClick = () => {
        // Envia o evento para o Google Analytics
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
        <section id="projects"
            className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-6">
                Projetos e Entregas
            </h2>
            <div className="flex justify-center flex-wrap gap-6">
                <div className="flex flex-col items-center justify-center bg-blue-100 px-2 py-3 rounded-lg shadow-md">
                    <Link
                        href="/deliveries/#automation"
                        onClick={handleAutomationClick} >
                        <Image
                            src="/images/icons/automation.png"
                            width={300}
                            height={300}
                            alt="automation"
                            className="rounded-full w-auto h-auto"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">AUTOMAÇÃO</h3>
                        <p className="mt-2 text-gray-600">Desenvolvimento de Software para Máquinas Industriais.</p>
                        <FaIndustry size={24} />
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center bg-blue-100 px-2 py-3 rounded-lg shadow-md">
                    <Link
                        href="/deliveries/#dev"
                        onClick={handleDevClick}
                    >
                        <Image
                            src="/images/icons/dev.png"
                            width={300}
                            height={300}
                            alt="developed"
                            className="rounded-full w-auto h-auto"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">SISTEMAS</h3>
                        <p className="mt-2 text-gray-600">Desenvolvimento de sistemas e sites.</p>
                        <MdDevices size={24} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Deliveries;