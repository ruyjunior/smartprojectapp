import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaIndustry } from 'react-icons/fa';
import { MdDevices } from 'react-icons/md'

const Deliveries: React.FC = () => {
    return (
        <section id="projects"
            className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-6">
                Projects e Deliveries
            </h2>
            <div className="flex justify-center flex-wrap gap-6">
                <div className="flex flex-col items-center justify-center bg-blue-100 px-2 py-3 rounded-lg shadow-md">
                    <Link href="/deliveries/#automation" >
                        <Image
                            src="/images/icons/automation.png"
                            width={300}
                            height={300}
                            alt="automation"
                            className="rounded-full w-auto h-auto"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">AUTOMATION</h3>
                        <p className="mt-2 text-gray-600">Software Development for Industrial Machinery.</p>
                        <FaIndustry size={24} />
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center bg-blue-100 px-2 py-3 rounded-lg shadow-md">
                    <Link href="/deliveries/#dev" >
                        <Image
                            src="/images/icons/dev.png"
                            width={300}
                            height={300}
                            alt="developed"
                            className="rounded-full w-auto h-auto"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">SYSTEMS</h3>
                        <p className="mt-2 text-gray-600">Systems and website development</p>
                        <MdDevices size={24} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Deliveries;