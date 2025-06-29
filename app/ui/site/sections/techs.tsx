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
    <section id="techs" className="py-20 bg-gradient-to-b from-blue-50 to-white text-center">
      <h1 className="text-5xl font-extrabold mb-10 text-blue-900 tracking-tight drop-shadow">
        Tecnologias Conhecidas
      </h1>
      <h2 className="text-3xl font-bold mb-8 text-blue-800">Automação Industrial</h2>
      <div className="flex justify-center flex-wrap gap-8 mb-20">
        {logosAutomacao.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-white px-6 py-6 rounded-xl shadow-lg border border-blue-100 hover:scale-105 transition-transform duration-200 min-w-[120px] min-h-[120px]"
          >
            <Image
              src={logo}
              width={100}
              height={100}
              alt="Logo de tecnologia de automação"
              className="object-contain w-24 h-24"
            />
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-8 text-blue-800">Desenvolvimento de Sistemas</h2>
      <div className="flex justify-center flex-wrap gap-8">
        {logosDev.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-white px-6 py-6 rounded-xl shadow-lg border border-blue-100 hover:scale-105 transition-transform duration-200 min-w-[120px] min-h-[120px]"
          >
            <Image
              src={logo}
              width={100}
              height={100}
              alt="Logo de tecnologia de desenvolvimento"
              className="object-contain w-24 h-24"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Techs;