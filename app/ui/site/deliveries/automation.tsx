import React from 'react';

export default function Automation() {
    const folderId = "1LsKL_LmR3tjkCT0eyn3Imx6N3UyVriCO";
    return (
        <section id="automation" className="py-20 text-center bg-gradient-to-b from-white to-blue-50">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-900 tracking-tight drop-shadow">
                Entregas de Automação
            </h2>
            <p className="mb-8 text-lg text-gray-700 max-w-2xl mx-auto">
                Confira alguns projetos e serviços de automação industrial já entregues pela nossa equipe.
            </p>
            <div className="flex flex-col items-center justify-center bg-white px-2 py-6 rounded-2xl shadow-xl border border-blue-100 max-w-3xl mx-auto">
                <div className="w-full h-[350px] md:h-[500px] rounded-lg overflow-hidden shadow">
                    <iframe
                        src={`https://drive.google.com/embeddedfolderview?id=${folderId}#list`}
                        width="100%"
                        height="100%"
                        style={{ border: "none", minHeight: 350 }}
                        allowFullScreen
                        loading="lazy"
                        title="Projetos de Automação"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}