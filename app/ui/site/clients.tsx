import Image from 'next/image';

const logos = [
  '/img/clients/ambev.jpg',
  '/img/clients/assaabloy.png',
  '/img/clients/gestamp.jpg',
  '/img/clients/gm.jpg',
  '/img/clients/zegla.jpg',
  // add more logos as needed
];

const Clients = () => {
  return (
    <section id="clients" className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-6">Each and every client is important.</h2>
      <div className="flex justify-center flex-wrap gap-6">
        {logos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center bg-gray-100 px-2 py-3 rounded-lg shadow-md">
            <Image
              src={logo}
              width={100} height={100}
              alt="Clients"
              className="rounded-md w-auto h -auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default Clients;