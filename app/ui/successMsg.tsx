export default function SuccessMsg(searchParams?: { success?: string }) {
    let successMsg = '';
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        successMsg = params.get('success') || '';
    } else if (searchParams?.success) {
        successMsg = searchParams.success;
    }

    return (
        successMsg && (
            <div className="mb-4 w-full rounded-lg bg-green-100 border border-green-300 text-green-800 px-4 py-3 text-center font-semibold shadow">
                {successMsg}
            </div>
        )
    );
}