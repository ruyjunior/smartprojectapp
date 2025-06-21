import React from 'react';
import Link from 'next/link';
import { FaLink, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import { Project } from '@/app/lib/projects/definitions';

export default async function Devs({ projects }: { projects: Project[] }) {

    return (
        <section id="dev" className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-10 mt-20">Developed Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {projects
                    .filter((project) => project.url !== null)
                    .map((project, index) => (
                        <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{project.comments}</p>
                            <Image
                                src={project.url + "images/logo.png"}
                                alt={project.title}
                                width={100} height={100}
                                className='rounded-full border'
                            />
                            <Link
                                href={project.url || '#'}
                                target="_blank"

                                className="mt-4 text-blue-500 hover:underline flex items-center gap-2"
                            >
                                <FaLink size={24} />
                                <span>Web Site</span>
                            </Link>
                            <Link
                                href={project.repository || '#'}
                                target="_blank"

                                className="mt-4 text-blue-500 hover:underline flex items-center gap-2"
                            >
                                <FaGithub size={24} />
                                <span>Github</span>
                            </Link>
                        </div>
                    ))}
            </div>
        </section>);
};