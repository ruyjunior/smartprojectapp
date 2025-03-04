import Image from "next/image";

const Github = () => {
    return (
        <section id="github" className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-6">
                About this project
            </h2>
            <div className="flex justify-center flex-wrap gap-6 mt-6">
                <iframe
                    src="https://ruyjunior.github.io/autoricapp/"
                    width="800"
                    height="200"
                    style={{ border: "1px solid #ddd" }} // Removido o ";" da string
                />
            </div>
        </section>
    );
};

export default Github;
