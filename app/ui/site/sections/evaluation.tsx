import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

const Evaluation: React.FC = () => {
    return (
        <section id="evaluation" className="py-20 bg-gradient-to-b from-white to-blue-50 text-center">
            <h1 className="text-4xl font-extrabold mb-4 text-blue-900 tracking-tight drop-shadow">
                Avaliação
            </h1>
            <h2 className="text-lg font-medium mb-10 text-gray-700">
                Seu feedback é fundamental para continuarmos evoluindo!
            </h2>
            <div className="flex justify-center flex-wrap gap-8">
                <div className="flex flex-col items-center justify-center bg-white px-8 py-8 rounded-2xl shadow-xl border border-blue-100 max-w-md">
                    <Image
                        src="/images/google/googleevaluation.png"
                        width={100}
                        height={100}
                        alt="Avaliação Google"
                        className="rounded-lg w-auto h-auto"
                    />
                    <p className="mt-4 text-gray-700 text-base">
                        Poste uma avaliação no nosso perfil do Google e ajude outras pessoas a conhecerem nosso trabalho!
                    </p>
                    <Link
                        href="https://g.page/r/CeVvVoD1qOnHEBI/review"
                        className="mt-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGoogle size={24} />
                        <span>Deixar Avaliação no Google</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Evaluation;