import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const team = [
  {
    name: "Ruy Junior",
    role: "Analista de Automação e Desenvolvedor de Sistemas",
    image: "/images/team/ruy.jpg",
    linkedin: "https://www.linkedin.com/in/ruyjunior21",
    github: "https://github.com/ruyjunior",
  },
  // Adicione mais membros aqui se desejar
];

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-gradient-to-b from-white to-blue-50 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-blue-900 tracking-tight drop-shadow">
        NOSSO TIME
      </h2>
      <div className="flex justify-center flex-wrap gap-8">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-white px-8 py-8 rounded-2xl shadow-xl border border-blue-100 max-w-xs hover:scale-105 transition-transform duration-200"
          >
            <Image
              src={member.image}
              width={120}
              height={120}
              alt={`Foto de ${member.name}`}
              className="rounded-full border-4 border-blue-200 shadow mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-blue-800">{member.name}</h3>
            <p className="mt-2 text-gray-600">{member.role}</p>
            <div className="flex gap-4 mt-4">
              <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition">
                <FaLinkedin size={28} />
              </Link>
              <Link href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition">
                <FaGithub size={28} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;