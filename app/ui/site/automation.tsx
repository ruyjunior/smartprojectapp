import React from 'react';
import Link from 'next/link';
import { FaLink, FaGithub } from 'react-icons/fa';
import { Project } from '@/app/lib/projects/definitions';

export default function Automation() {
    return (
        <section id="automation" className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-10">Automation Deliveries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                <p>Automation Deliveries</p>
            </div>
        </section>);
};