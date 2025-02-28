const Hero = () => {
  return (
    <>
      {/* Seção do vídeo de fundo */}
      <section className="relative h-[40vh] md:h-[80vh]">
        <video
          className="absolute inset-0 w-full h-auto max-h-[80vh] object-cover opacity-30"
          src="/videos/background.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </section>

      {/* Seção com a frase */}
      <section className="relative flex flex-col items-center justify-center text-blue-400 text-center px-6 md:pt-24 mb-0 md:mb-16">
        <div className="relative z-10 max-w-4xl px-4 mt-[-20vh] md:mt-0">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
            YOU IMAGINE IT, <br /> WE MAKE IT WORK.
          </h1>
        </div>
      </section>
    </>
  );
};

export default Hero;