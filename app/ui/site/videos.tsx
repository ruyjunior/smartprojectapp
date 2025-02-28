import React from 'react';

const Videos: React.FC = () => {
    return (
        <section id="videos" className="mt-12">
        <h2 className="text-3xl font-bold text-center text-gray-800">Galeria de Vídeos</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/videoid1"
              title="Vídeo 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Projeto 1</h3>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/videoid2"
              title="Vídeo 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Projeto 2</h3>
          </div>
          {/* Adicione mais vídeos conforme necessário */}
        </div>
      </section>
    );
};

export default Videos;