const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-blue-50 to-white text-center"
    >
      <h2 className="text-4xl font-extrabold mb-4 text-blue-900 tracking-tight drop-shadow">
        Quem Somos?
      </h2>
      <div className="flex justify-center flex-wrap gap-8">
        <div className="flex flex-col items-center bg-white px-8 py-8 rounded-2xl shadow-xl border border-blue-100 max-w-3xl">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            AUTORIC AUTOMAÇÃO
          </span>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            A <span className="font-bold text-blue-800">AUTORIC</span> é referência em serviços técnicos de automação, entregando tecnologia e inovação para aplicações industriais, comerciais e residenciais.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-2">
            Atuamos com suporte e assistência para as principais plataformas industriais: <span className="font-medium text-blue-700">Siemens, Rockwell, Beckhoff</span> e outras.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-2">
            Programação de <span className="font-medium text-blue-700">CLPs, HMIs, Servo Drives</span>, leitores de QR Codes e Barras, sistemas de visão, sensores de nível, presença e temperatura.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mt-4 italic">
            <span className="text-blue-800 font-semibold">Você imagina, nós fazemos funcionar.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
export default About;