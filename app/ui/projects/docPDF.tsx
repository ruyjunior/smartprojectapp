import React from 'react';
import { Page, Text, View, Document, Font, StyleSheet, Image } from '@react-pdf/renderer';
import styles from '@/app/ui/projects/stylesPDF';
import { formatCNPJ, formatDateToLocal, formatPhone, formatTime } from '@/app/lib/utils/utils';
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
  const totalHoursEstimed = data.tasks.reduce((sum, task) => sum + (parseFloat(task.timeprevision) || 0), 0);
  const progress = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : "0.00";
  const reportDate = new Date().toLocaleDateString();

  function timeToDecimal(time: string) {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours + minutes / 60 + seconds / 3600;
  }

  const totalHoursRealized = data.tasks.reduce((sum, task) => sum + timeToDecimal(task.timespend), 0);

  // Converte para HH:MM corretamente
  const hours = Math.floor(totalHoursRealized);
  const minutes = Math.round((totalHoursRealized - hours) * 60);

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  //console.log(formattedTime); // Exemplo: "07:30"

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Image src="/images/logos/logo.jpg" style={styles.logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.subtitle}>VOCÊ IMAGINA, NÓS FAZEMOS ACONTECER.</Text>
            <Text style={styles.title}>Relatório de Projeto</Text>
            <Text style={styles.reportDate}>Data de impressão: {reportDate}</Text>
          </View>
        </View>

        {/* Project Data */}
        <View style={styles.section}>
          <Text style={styles.chapter}>PROJETO</Text>
          <Text style={styles.field}><Text style={styles.label}></Text>{data.project.title}</Text>
          <Text style={styles.field}><Text style={styles.label}>Comentários:</Text> {data.project.comments}</Text>
          <Text style={styles.field}><Text style={styles.label}>Início:</Text> {formatDateToLocal(data.project.timestamp)}</Text>
          <Text style={styles.field}><Text style={styles.label}>Horas Planejadas:</Text>{totalHoursEstimed}h</Text>
          <Text style={styles.field}><Text style={styles.label}>Horas Realizadas:</Text>{formattedTime}h</Text>
          <Text style={styles.field}><Text style={styles.label}>Progresso:</Text> {progress}%</Text>
        </View>

        {/* Taker Project */}
        <View style={styles.section}>
          <Text style={styles.chapter}>SOLICITANTE</Text>
          <Text style={styles.field}><Text style={styles.label}>Empresa:</Text> {data.taker.name}</Text>
          <Text style={styles.field}><Text style={styles.label}>CNPJ:</Text> {formatCNPJ(data.taker.cnpj)}</Text>
          <Text style={styles.field}><Text style={styles.label}>Responsável:</Text> {data.takerSponsor.name}</Text>
          <Text style={styles.field}><Text style={styles.label}>Telefone:</Text> {formatPhone(data.takerSponsor.phone)}</Text>
          <Text style={styles.field}><Text style={styles.label}>Email:</Text> {data.takerSponsor.email}</Text>
        </View>

        {/* Tasks */}
        <View style={styles.section}>
          <Text style={styles.chapter}>Tarefas</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={styles.tableCellHeader}>Nome</Text>
            <Text style={styles.tableCellHeader}>Stado</Text>
            <Text style={styles.tableCellHeader}>Data Inical</Text>
            <Text style={styles.tableCellHeader}>Data Final</Text>
            <Text style={styles.tableCellHeaderWide}>O que?</Text>
            <Text style={styles.tableCellHeaderWide}>Como?</Text>
            <Text style={styles.tableCellHeader}>Quem?</Text>
            <Text style={styles.tableCellHeader}>Criticidade</Text>
            <Text style={styles.tableCellHeader}>Tempo Previsto</Text>
            <Text style={styles.tableCellHeader}>Tempo Gasto</Text>
          </View>
          {data.tasks.map((task, index) => {
            const employee = data.employees.find(emp => emp.id === task.who);
            const taskSprints = data.sprints.filter((sprint) => sprint.idtask === task.id);

            return (
              <React.Fragment key={index}>
                <View style={[styles.tableRow, index % 2 === 0 ? styles.tableRowAlt : {}]}>
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
                {/* Sprint */}
                {taskSprints.map((sprint, sprintIndex) => (
                  <View style={[styles.tableRowSprints, styles.sprintRow]} key={sprintIndex}>
                    <Text style={styles.tableSprints}>{sprintIndex + 1}</Text>
                    <Text style={styles.tableSprints}>Date: {formatDateToLocal(sprint.date)}</Text>
                    <Text style={styles.tableSprints}>Start: {formatTime(sprint.starttime)}</Text>
                    <Text style={styles.tableSprints}>End: {formatTime(sprint.endtime)}</Text>
                  </View>
                ))}
              </React.Fragment>
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