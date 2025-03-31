import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { InvoicePDF } from '@/app/lib/companies/definitions';
import { DocPDF } from './docPDF';

export const LinkPDF = ({ data }: { data: InvoicePDF }) => (
  <div>
    <PDFDownloadLink
      document={<DocPDF data={data} />}
      fileName={
        'Servicos_' + data.taker.name + '_de_' + data.datein + '_a_' + data.dateout + '.pdf'
      }>
      {({ loading }) => (loading ? 'Gerando PDF...' : 
      <DocumentArrowDownIcon className="h-10 w-10 text-gray-500" />)}
    </PDFDownloadLink>
  </div>
);