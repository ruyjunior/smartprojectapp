'use client'
import Link from 'next/link';

export default function Register() {
    return (
        <div className='mt-10'>
            <Link
                href="/auth/register"
                className="flex h-10 items-center justify-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
                Esqueci a senha
            </Link>
        </div>
    )
}