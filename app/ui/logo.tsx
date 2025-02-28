import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import logo from 'public/img/logos/logo.jpg';

export default function Logo() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center justify-center leading-none text-white m-5`}>
      <Image src={logo} alt="AUTORIC" width={200} height={200} />
      <p className="text-[24px] m-2 p-0"></p>
    </div>
  );
}