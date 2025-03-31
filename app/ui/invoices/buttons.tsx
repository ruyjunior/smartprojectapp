import { DocumentIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { InvoicePDF } from '@/app/lib/companies/definitions';


export function PdfInvoice({ id, data }: { id: string, data: InvoicePDF }) {
  const router = useRouter();

  const handleGeneratePDF = () => {
    // Salvar os dados no localStorage para serem acessados na outra página
    localStorage.setItem('invoiceData', JSON.stringify(data));

    // Redirecionar para a página do PDF
    router.push(`/companies/${id}/invoicePDF`);
  };

  return (
    <button
      onClick={handleGeneratePDF}
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      <DocumentIcon className="w-5" />
      Gerar PDF
    </button>
  );
}