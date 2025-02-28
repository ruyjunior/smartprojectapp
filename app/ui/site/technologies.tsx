import Image from 'next/image';

const logos = [
  '/img/techs/abb.jpg',
  '/img/techs/beckoff.png',
  '/img/techs/Codesys.png',
  '/img/techs/omron.png',
  '/img/techs/Rockwell.png',
  '/img/techs/twincat.png',
  '/img/techs/tiaportal.png',
  '/img/techs/weg.png',
  // add more logos as needed
];

const Technologies = () => {
  return (
    <section id="techs" className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-6">Technologies our team has knowledge of.</h2>
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