import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import logo from 'public/images/logos/logo.png';
import { CurrentCompany } from '../utils/utils';

export default function Logo() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center justify-center leading-none text-white m-5`}>
      <Image
        src={logo}
        alt="AUTORIC"
        width={200}
        height={200}
        className="h-10 w-10 md:h-20 md:w-20 rounded-full"
      />
      <p className="text-[24px] m-2 p-0"></p>
    </div>
  );
}

export async function LogoCompany() {
  const company = await CurrentCompany();
  return (
    <div className={`${lusitana.className} flex flex-row items-center justify-center leading-none text-white m-5`}>
      <Image
        src={company.logourl ? company.logourl : logo}
        alt="Logo Company"
        width={200}
        height={200}
        className="h-10 w-10 md:h-20 md:w-20 rounded-[10px]"
      />
      <p className="text-[24px] m-2 p-0"></p>
    </div>
  );
}