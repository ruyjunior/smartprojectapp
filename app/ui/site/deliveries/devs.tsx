import React from 'react';
import Link from 'next/link';
import { FaLink, FaGithub } from 'react-icons/fa';
import { fetchProjects } from "@/app/lib/projects/data";

export default async function Devs() {
    const projects = await fetchProjects();

    return (
        <section id="dev" className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-10">Developed Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {projects
                    .filter((project) => project.url !== null)
                    .map((project, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{project.comments}</p>
                            <iframe
                                src={project.url}
                                className="w-full h-40 rounded-md border"
                            >
                            </iframe>
                            <Link
                                href={project.url}
                                className="mt-4 text-blue-500 hover:underline flex items-center gap-2"
                            >
                                <FaLink size={24} />
                                <span>Web Site</span>
                            </Link>
                            <Link
                                href={project.repository}
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