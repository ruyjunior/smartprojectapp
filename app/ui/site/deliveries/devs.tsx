import React from 'react';
import Link from 'next/link';
import { FaLink, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import { Project } from '@/app/lib/projects/definitions';

export default async function Devs({ projects }: { projects: Project[] }) {
    return (
        <section id="dev" className="py-20 text-center bg-gradient-to-b from-white to-blue-50">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-10 mt-20 text-blue-900 tracking-tight drop-shadow">
                Projetos Desenvolvidos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {projects
                    .filter((project) => project.url !== null)
                    .map((project, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200"
                        >
                            <Image
                                src={project.url + "images/logo.png"}
                                alt={project.title}
                                width={100}
                                height={100}
                                className="rounded-full border-4 border-blue-200 shadow mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-blue-800">{project.title}</h3>
                            <p className="text-gray-600 text-base mb-4">{project.comments}</p>
                            <div className="flex gap-4 mt-2">
                                <Link
                                    href={project.url || '#'}
                                    target="_blank"
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition"
                                >
                                    <FaLink size={20} />
                                    <span>Web Site</span>
                                </Link>
                                {project.repository && (
                                    <Link
                                        href={project.repository}
                                        target="_blank"
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
                                    >
                                        <FaGithub size={20} />
                                        <span>Github</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
}