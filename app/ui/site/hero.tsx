//import Image from 'next/image';
import banner from '@/public/img/banners/banner2.jpg'
const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-white text-center bg-cover bg-center px-6">
      <video
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        width={1000}
        height={760}
      />
      <video
        className="absolute inset-0 w-full h-full object-cover block md:hidden"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        width={180}
        height={310}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-6xl font-bold leading-tight">YOU IMAGINE IT, WE MAKE IT WORK.</h1>
      </div>
    </section>
  );
};
export default Hero;

