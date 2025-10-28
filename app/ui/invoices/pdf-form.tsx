'use client';
import { Invoice } from '@/app/query/invoice/definitions';
import { DocPDF } from './docPDF';
import { PDFViewer } from '@react-pdf/renderer';
import { LinkPDF } from './linkPDF';
import { useEffect, useState } from 'react';

export default function PdfForm() {

  const [data, setData] = useState<Invoice | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('invoiceData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (!data) return <p>Carregando...</p>;

  return (
    <div>

      <LinkPDF data={data} />

      <PDFViewer style={{ width: '100%', height: '500px', marginTop: 20 }}>
        <DocPDF data={data} />
      </PDFViewer>

    </div>);
}