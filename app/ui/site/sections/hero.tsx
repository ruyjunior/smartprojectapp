import Image from "next/image";

const Hero = () => {
  return (
    <>
      <section className="relative h-[40vh] md:h-[80vh] flex items-center justify-center">
        <Image
          src="/images/hero/logo_hero.png"
          alt="Background"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          priority
        />
        {/* Overlay escuro para melhor contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-lg mt-10">
            Seu APP para Projetos,<br />
            <span className="text-blue-300">Tudo conectado.</span>
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-blue-100 font-medium max-w-2xl drop-shadow">
            Melhorando a eficiência e a colaboração em cada etapa do seu projeto.
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;