'use client'
import React from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { ProjectPDF } from '@/app/query/projects/definitions';
import { DocPDF } from './docPDF';

export const PagePDF = ({ data }: { data: ProjectPDF }) => (
  <div>
    <PDFDownloadLink
      document={<DocPDF data={data} />}
      fileName={
        'Report_' + data.project.title + '.pdf'
      }
      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold shadow hover:bg-blue-700 transition-colors text-sm"
  >
      {({ loading }) => (
        <>
          <DocumentArrowDownIcon className="h-5 w-5" />
          {loading ? 'Gerando PDF...' : 'Baixar Relatório'}
        </>
      )}
    </PDFDownloadLink>

    <PDFViewer style={{ width: '100%', height: '500px', marginTop: 20 }}>
      <DocPDF data={data} />
    </PDFViewer>
  </div>
);