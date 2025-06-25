import Image from 'next/image';

const logosAutomacao = [
  '/images/techs/abb.jpg',
  '/images/techs/beckoff.png',
  '/images/techs/Codesys.png',
  '/images/techs/omron.png',
  '/images/techs/Rockwell.png',
  '/images/techs/twincat.png',
  '/images/techs/tiaportal.png',
  '/images/techs/weg.png',
];

const logosDev = [
  '/images/techs/vscode.png',
  '/images/techs/git.png',
  '/images/techs/javascript.png',
  '/images/techs/typescript.png',
  '/images/techs/react.png',
  '/images/techs/sql.png',
  '/images/techs/neon.png',
  '/images/techs/nodejs.png',
  '/images/techs/vercel.png',
  '/images/techs/nextjs.png',
  '/images/techs/oop.png',
  '/images/techs/solid.png',
  '/images/techs/htmlcss.png',
];

const Techs = () => {
  return (
    <section id="techs"
      className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">
        Tecnologias Conhecidas - Automação Industrial
      </h2>
      <div className="flex justify-center flex-wrap gap-6 mb-20">
        {logosAutomacao.map((logo, index) => (
          <div key={index} className="flex items-center justify-center bg-gray-100 px-2 py-3 rounded-lg shadow-md">
            <Image
              src={logo}
              width={100} height={100}
              alt="Techs"
              className="rounded-md w-auto h -auto"
            />
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-6">
        Tecnologias Conhecidas - Desenvolvimentos de Sistemas
      </h2>
      <div className="flex justify-center flex-wrap gap-6">
        {logosDev.map((logo, index) => (
          <div key={index} className="flex items-center justify-center bg-gray-100 px-2 py-3 rounded-lg shadow-md">
            <Image
              src={logo}
              width={100} height={100}
              alt="Techs"
              className="rounded-md w-auto h -auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default Techs;