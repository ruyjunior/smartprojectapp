import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa';

const Team: React.FC = () => {
    return (
        <section id="team" className="mt-12 text-center">
            <h2 className="text-3xl font-bold text-center text-gray-800">Our Team</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-1 lg:grid-cols-1">
                <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md">
                    <Image
                        src="/img/team/ruy.jpg"
                        width={150}
                        height={150}
                        alt="Membro da Equipe 1"
                        className="rounded-full"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">Ruy Junior</h3>
                    <p className="mt-2 text-gray-600">Automation Analyst and Systems Developer.</p>
                    <Link href="https://www.linkedin.com/in/ruyjunior21" className="mt-4 text-blue-500 hover:underline flex items-center gap-2">
                        <FaLinkedin size={24} />
                        <span>LinkedIn</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Team;