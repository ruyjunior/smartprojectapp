import React from 'react';

export default function Automation() {
    const folderId = "1LsKL_LmR3tjkCT0eyn3Imx6N3UyVriCO"
    return (
        <section id="automation" className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-10">Automation Deliveries</h2>
            <p>Here are some projects and services delivered.</p>
            <div className="flex flex-col items-center justify-center bg-gray-100 px-1 py-1 rounded-md shadow-md">
                <div className="flex justify-center">
                    <iframe
                        src={`https://drive.google.com/embeddedfolderview?id=${folderId}#list`}   //Use #grid or #list
                        width="100%"
                        height="300px"
                        style={{ border: "none" }}
                    ></iframe>
                </div>
            </div>
        </section>);
};