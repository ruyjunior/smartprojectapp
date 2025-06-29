import React from 'react';
import { FaCogs, FaLaptopCode, FaLightbulb, FaChartLine } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      title: "Programação de Máquinas Industriais",
      desc: "Especializado em PLCs, sistemas de automação e integração de equipamentos industriais.",
      icon: <FaCogs size={40} className="text-blue-600 mb-4" />
    },
    {
      title: "Desenvolvimento de Sistemas e Sites",
      desc: "Software personalizado, sistemas web, dashboards e automação digital sob medida.",
      icon: <FaLaptopCode size={40} className="text-blue-600 mb-4" />
    },
    {
      title: "Consultoria em Automação",
      desc: "Apoio técnico para tomada de decisões, eficiência operacional e inovação.",
      icon: <FaLightbulb size={40} className="text-blue-600 mb-4" />
    },
    {
      title: "Melhoria de Processos",
      desc: "Otimização de fluxos de trabalho, redução de custos e aumento de produtividade.",
      icon: <FaChartLine size={40} className="text-blue-600 mb-4" />
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-blue-50 to-white text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-10 mt-20 text-blue-900 tracking-tight drop-shadow">
        Nossos Serviços
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start bg-white px-8 py-10 rounded-2xl shadow-xl border border-blue-100 max-w-xs min-h-[320px] hover:scale-105 transition-transform duration-200"
          >
            {service.icon}
            <h3 className="text-xl font-semibold mb-2 text-blue-800">{service.title}</h3>
            <p className="text-base text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;