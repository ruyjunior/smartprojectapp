import { Page, Text, View, Document, Font, StyleSheet, Image } from '@react-pdf/renderer';
import styles from '@/app/ui/projects/stylesPDF';
import { formatCNPJ, formatDateToLocal, formatPhone } from '@/app/lib/utils/utils';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { ProjectPDF } from '@/app/lib/projects/definitions';

export const PagePDF = ({ data }: { data: ProjectPDF }) => (
  <div>
    <PDFDownloadLink
      document={<DocPDF data={data} />}
      fileName={
        'Report_' + data.taker.name + '_' + data.project.title
      }>
      {({ loading }) => (loading ? 'Gerando PDF...' : 'Download ')}
    </PDFDownloadLink>
    <DocumentArrowDownIcon className="h-5 w-5 text-gray-500" />

    <PDFViewer style={{ width: '100%', height: '500px', marginTop: 20 }}>
      <DocPDF data={data} />
    </PDFViewer>
  </div>
);


export const DocPDF = ({ data }: { data: ProjectPDF }) => {
  const totalTasks = data.tasks.length;
  const completedTasks = data.tasks.filter(task => task.status === "done").length;
  const totalHours = data.tasks.reduce((sum, task) => sum + (parseFloat(task.timeprevision) || 0), 0);
  const progress = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : "0.00";
  const reportDate = new Date().toLocaleDateString();
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Image src="/images/logos/logo.jpg" style={styles.logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.subtitle}>YOU IMAGINE IT, WE MAKE IT WORK.</Text>
            <Text style={styles.title}>PROJECT REPORT</Text>
            <Text style={styles.reportDate}>Report Date: {reportDate}</Text>
          </View>
        </View>

        {/* Project Data */}
        <View style={styles.section}>
          <Text style={styles.chapter}>Project Data</Text>
          <Text style={styles.field}><Text style={styles.label}>Title:</Text> {data.project.title}</Text>
          <Text style={styles.field}><Text style={styles.label}>Comments:</Text> {data.project.comments}</Text>
          <Text style={styles.field}><Text style={styles.label}>Start Date:</Text> {formatDateToLocal(data.project.timestamp)}</Text>
          <Text style={styles.field}><Text style={styles.label}>Total Hours Planned:</Text> {totalHours}h</Text>
          <Text style={styles.field}><Text style={styles.label}>Progress:</Text> {progress}%</Text>
        </View>

        {/* Taker Project */}
        <View style={styles.section}>
          <Text style={styles.chapter}>Taker Project</Text>
          <Text style={styles.field}><Text style={styles.label}>Company:</Text> {data.taker.name}</Text>
          <Text style={styles.field}><Text style={styles.label}>CNPJ:</Text> {formatCNPJ(data.taker.cnpj)}</Text>
          <Text style={styles.field}><Text style={styles.label}>Sponsor:</Text> {data.takerSponsor.name}</Text>
          <Text style={styles.field}><Text style={styles.label}>Phone:</Text> {formatPhone(data.takerSponsor.phone)}</Text>
          <Text style={styles.field}><Text style={styles.label}>Email:</Text> {data.takerSponsor.email}</Text>
        </View>

        {/* Tasks */}
        <View style={styles.section}>
          <Text style={styles.chapter}>Tasks</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={styles.tableCellHeader}>Title</Text>
            <Text style={styles.tableCellHeader}>Status</Text>
            <Text style={styles.tableCellHeader}>Start Date</Text>
            <Text style={styles.tableCellHeader}>End Date</Text>
            <Text style={styles.tableCellHeaderWide}>What Do</Text>
            <Text style={styles.tableCellHeaderWide}>How Do</Text>
            <Text style={styles.tableCellHeader}>Who</Text>
            <Text style={styles.tableCellHeader}>Grade</Text>
            <Text style={styles.tableCellHeader}>Prevision</Text>
            <Text style={styles.tableCellHeader}>Spent</Text>
          </View>
          {data.tasks.map((task, index) => {
            const employee = data.employees.find(emp => emp.id === task.who);
            return (
              <View style={[styles.tableRow, index % 2 === 0 ? styles.tableRowAlt : {}]} key={index}>
                <Text style={styles.tableCell}>{task.title}</Text>
                <Text style={styles.tableCell}>{task.status}</Text>
                <Text style={styles.tableCell}>{formatDateToLocal(task.startdate)}</Text>
                <Text style={styles.tableCell}>{formatDateToLocal(task.enddate)}</Text>
                <Text style={styles.tableCellWide}>{task.what}</Text>
                <Text style={styles.tableCellWide}>{task.how}</Text>
                <Text style={styles.tableCell}>{employee ? employee.name : "Unknown"}</Text>
                <Text style={styles.tableCell}>{task.grade}</Text>
                <Text style={styles.tableCell}>{task.timeprevision}</Text>
                <Text style={styles.tableCell}>{task.timespend}</Text>
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Autoric Automation</Text>
          <Text style={styles.footerText}>www.autoric.com.br</Text>
          <Text style={styles.footerText}>(71) - 99125-8769</Text>
          <Text style={styles.footerText}>CNPJ: 33.019.320/0001-42</Text>
        </View>
      </Page>
    </Document>
  );
};