const Services = () => {
  return (
    <section id="services" className="relative py-20 bg-white text-center">
      <h2 className="text-4xl font-bold mb-10">Services we offer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto px-6">
        {[ 
          { title: "Industrial Machine Programming", desc: "Specialized in PLCs and automation systems." },
          { title: "System and Website Development", desc: "Custom software and automation systems." },
          { title: "Consulting", desc: "Helping with decision-making and efficiency." },
          { title: "Process Improvement", desc: "Optimizing workflows and operations." }
        ].map((service, index) => (
          <div key={index} className="bg-blue-500 text-white p-6 rounded-lg shadow-lg border border-gray-600">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Services;