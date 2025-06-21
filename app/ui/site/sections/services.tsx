import React from 'react';
import { FaCogs, FaLaptopCode, FaLightbulb, FaChartLine } from 'react-icons/fa';


const Services = () => {
  const services = [
    {
      title: "Programação de Máquinas Industriais",
      desc: "Especializado em PLCs e sistemas de automação.",
      icon: <FaCogs size={32} />
    },
    {
      title: "Desenvolvimento de Sistemas e Sites",
      desc: "Software personalizado e sistemas de automação.",
      icon: <FaLaptopCode size={32} />
    },
    {
      title: "Consultoria",
      desc: "Ajudando com tomada de decisões e eficiência.",
      icon: <FaLightbulb size={32} />
    },
    {
      title: "Melhoria de Processos",
      desc: "Otimizando fluxos de trabalho e operações.",
      icon: <FaChartLine size={32} />
    }];

  return (
    <section id="services"
      className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-6 mt-20">
        Nossos Serviços
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