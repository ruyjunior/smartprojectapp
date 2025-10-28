import clsx from 'clsx';
import { JSX } from 'react';

export function SaveButton({ isPending, uploading }: { isPending: boolean; uploading: boolean; }): JSX.Element {
    return (
        <button type="submit" disabled={isPending || uploading} aria-disabled={isPending || uploading}>
            {isPending ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Salvando...
                </span>
            ) : (
                "Salvar"
            )}
        </button>
    );
}
