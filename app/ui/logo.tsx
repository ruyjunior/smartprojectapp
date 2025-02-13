import { HeartIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function LogoApp() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center justify-end leading-none text-white`}>
      <HeartIcon className="h-8 w-8 rotate-[-15deg]" />
      <p className="text-[24px] p-0">RSUL</p>
      <p className='text-sm'>Vida Seguros</p>
    </div>
  );
}

export function LogoPDF() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center justify-end leading-none text-white`}>
      <Image src="/profile.png"
      width={500}
      height={500}
      alt="Picture of the author"/>
    </div>
  );
}