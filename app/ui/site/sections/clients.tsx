import Image from 'next/image';

const logos = [
  '/images/clients/khs.png',
  '/images/clients/ambev.jpg',
  '/images/clients/gestamp.jpg',
  '/images/clients/gm.jpg',
  '/images/clients/parker.png',
  '/images/clients/zegla.jpg',
];

const Clients = () => {
  return (
    <section id="clients" className="py-20 bg-gradient-to-b from-white to-blue-50 text-center">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-900 tracking-tight drop-shadow">
        Nossos Clientes
      </h1>
      <h2 className="text-lg font-medium mb-10 text-gray-700">
        Cada cliente é fundamental para nossa equipe e nossa história.
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-white px-6 py-4 rounded-xl shadow-lg border border-blue-100 hover:scale-105 transition-transform duration-200"
          >
            <Image
              src={logo}
              width={200}
              height={200}
              alt="Logo do cliente"
              className="object-contain h-32 w-32"
            />
          </div>
        ))}
      </div>
      <p className="mt-10 text-base text-gray-500">
        Obrigado por confiarem na <span className="font-bold text-blue-800">AUTORIC</span>.
      </p>
    </section>
  );
};

export default Clients;