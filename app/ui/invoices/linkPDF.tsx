import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Invoice } from '@/app/query/invoice/definitions';
import { DocPDF } from './docPDF';

export const LinkPDF = ({ data }: { data: Invoice }) => (
  <div>
    <PDFDownloadLink
      document={<DocPDF data={data} />}
      fileName={
        'Servicos_' + data.client.name + '_de_' + data.datein + '_a_' + data.dateout + '.pdf'
      }
      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold shadow hover:bg-blue-700 transition-colors text-sm"
    >
      {({ loading }) => (
        <>
          <DocumentArrowDownIcon className="h-10 w-10 text-gray-500" />
          {loading ? 'Gerando PDF...' : 'Baixar Realtório'}
        </>
      )}
    </PDFDownloadLink>
  </div>
);