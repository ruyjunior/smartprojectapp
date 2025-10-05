const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-blue-50 to-white text-center"
    >
      <h2 className="text-4xl font-extrabold mb-4 text-blue-900 tracking-tight drop-shadow">
        Sobre o APP
      </h2>
      <div className="flex justify-center flex-wrap gap-8">
        <div className="flex flex-col items-center bg-white px-8 py-8 rounded-2xl shadow-xl border border-blue-100 max-w-3xl">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            SMART PROJECT APP
          </span>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            O <span className="font-bold text-blue-800">SMART PROJECT APP</span> foi desenvolvido para facilitar o gerenciamento de projetos de automação, conectando equipes, clientes e fornecedores em um só lugar.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-2">
            Com o aplicativo, você pode acompanhar o andamento dos projetos, registrar tarefas, compartilhar documentos e receber notificações em tempo real.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-2">
            A plataforma oferece integração com as principais ferramentas industriais, permitindo o controle de <span className="font-medium text-blue-700">CLPs, HMIs, sensores</span> e outros dispositivos diretamente pelo app.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mt-4 italic">
            <span className="text-blue-800 font-semibold">Mais agilidade, organização e tecnologia para o seu projeto.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
export default About;