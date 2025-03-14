import Image from 'next/image';

const logos = [
  '/images/techs/abb.jpg',
  '/images/techs/beckoff.png',
  '/images/techs/Codesys.png',
  '/images/techs/omron.png',
  '/images/techs/Rockwell.png',
  '/images/techs/twincat.png',
  '/images/techs/tiaportal.png',
  '/images/techs/weg.png',
];

const Technologies = () => {
  return (
    <section id="techs"
      className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">
        Technologies our team has knowledge of.
      </h2>
      <div className="flex justify-center flex-wrap gap-6">
        {logos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center bg-gray-100 px-2 py-3 rounded-lg shadow-md">
            <Image
              src={logo}
              width={100} height={100}
              alt="Techs"
              className="rounded-md w-auto h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default Technologies;