import React from 'react';
import { FaCogs, FaLaptopCode, FaLightbulb, FaChartLine } from 'react-icons/fa';


const Services = () => {
  const services = [
    { title: "Industrial Machine Programming", desc: "Specialized in PLCs and automation systems.", icon: <FaCogs size={32} /> },
    { title: "System and Website Development", desc: "Custom software and automation systems.", icon: <FaLaptopCode size={32} /> },
    { title: "Consulting", desc: "Helping with decision-making and efficiency.", icon: <FaLightbulb size={32} /> },
    { title: "Process Improvement", desc: "Optimizing workflows and operations.", icon: <FaChartLine size={32} /> }
  ];

  return (
    <section id="services" 
    className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">
      Services we offer
        </h2>
        <div className="flex justify-center flex-wrap gap-6">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center justify-center bg-gray-100 px-2 py-3 rounded-lg shadow-md">
            {service.icon}
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Services;