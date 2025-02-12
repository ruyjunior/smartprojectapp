import { HeartIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';


export default function Logo() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center justify-end leading-none text-white`}>
      <HeartIcon className="h-8 w-8 rotate-[-15deg]" />
      <p className="text-[24px] p-0">RSUL</p>
      <p className='text-sm'>Vida Seguros</p>
    </div>
  );
}
