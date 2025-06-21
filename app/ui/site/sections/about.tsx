const About = () => {
  return (
    <section id="about"
      className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">
        Quem Somos?
      </h2>
      <div className="flex justify-center flex-wrap gap-6">
        <div className="flex items-center justify-center bg-gray-100 px-2 py-3 rounded-lg shadow-md">
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
            A AUTORIC é uma empresa que presta serviços técnicos de qualidade em automação, oferecendo o que há de melhor em tecnologia e inovação para aplicações industriais, comerciais e residenciais.          </p>
        </div>
      </div>
    </section>
  );
};
export default About;