const Figma = () => {
    return (
        <section id="figma" className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-6">
                Our Figma creations
            </h2>
            <div className="flex justify-center flex-wrap gap-6">
                <iframe
                    style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} 
                    width="800"
                    height="450"
                    src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/z7JbnKeBTHGPxIGWdRA3vv/SupervisorApp?node-id=13-1677"
                    allowFullScreen
                />
            </div>
        </section>
    )
}
export default Figma;