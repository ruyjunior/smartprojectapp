import { HeartIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Logo() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center justify-center leading-none text-white`}>
      <Image src="/logo.png" alt="AUTORIC" width={40} height={40} />
      <p className="text-[24px] m-2 p-0">AUTORIC</p>
    </div>
  );
}