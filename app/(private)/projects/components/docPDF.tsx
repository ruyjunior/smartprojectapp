// ...existing code...
import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import styles from './stylesPDF';
import { formatCNPJ, formatDateToLocal, formatPhone, formatTime, timeToDecimal } from '@/app/utils/utils';
import { ProjectPDF } from '@/app/query/projects/definitions';
import logo from '@/public/images/logo.png';

export const DocPDF = ({ data }: { data: ProjectPDF }) => {

  const totalTasks = data.tasks.length;
  const highTasks = data.tasks.filter(task => task.grade === "high");
  const completedTasks = highTasks.filter(task => (task.status === "done"));
  const progress = highTasks.length > 0 ? ((completedTasks.length / highTasks.length) * 100).toFixed(2) : "0.00";

  const totalHoursEstimed = data.tasks.reduce((sum, task) => sum + (parseFloat(task.timeprevision) || 0), 0);
  const reportDate = new Date().toLocaleDateString();

  const totalHoursRealized = data.tasks.reduce((sum, task) => sum + timeToDecimal(task.timespend), 0);

  // Converte para HH:MM corretamente
  const hours = Math.floor(totalHoursRealized);
  const minutes = Math.round((totalHoursRealized - hours) * 60);
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Image src={data.company.logourl ? data.company.logourl : logo.src} style={styles.logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.subtitle}> {data.company.slogan} </Text>
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
          <Text style={styles.field}><Text style={styles.label}>Horas Planejadas: </Text>{totalHoursEstimed}h</Text>
          <Text style={styles.field}><Text style={styles.label}>Horas Realizadas: </Text>{formattedTime}h</Text>
          <Text style={styles.field}><Text style={styles.label}>Progresso:</Text> {progress}%</Text>
        </View>

        {/* Empresas */}
        <View style={styles.section}>
          <Text style={styles.chapter}>EMPRESAS PARTICIPANTES</Text>

          {data.clients.map((client, index) => {
            return (
              <View style={styles.section}>
                <Text style={styles.field}><Text style={styles.label}>Empresa:</Text> {client.name}</Text>
                <Text style={styles.field}><Text style={styles.label}>CNPJ:</Text> {formatCNPJ(client.cnpj)}</Text>
                <View style={styles.section}>
                  {data.contacts.map((contact, ci) => {
                    if (contact.idclient !== client.id) return null;
                    return (
                      <View key={ci} style={styles.contactCard}>
                        <Text style={styles.field}><Text style={styles.label}>Nome:</Text> {contact.name}</Text>
                        <Text style={styles.field}><Text style={styles.label}>Email:</Text> {contact.email}</Text>
                        <Text style={styles.field}><Text style={styles.label}>Telefone:</Text> {formatPhone(contact.phone)}</Text>
                      </View>
                    );
                  }
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Tasks & Sprints (improved layout) */}
        <View style={styles.section}>
          <Text style={styles.chapter}>TAREFAS</Text>

          {data.tasks.map((task, index) => {
            const user = data.users.find(emp => emp.id === task.who);
            const taskSprints = data.sprints.filter((sprint) => sprint.idtask === task.id);

            return (
              <View style={[styles.taskSection, index % 2 === 0 ? styles.tableRowAlt : {}]} key={task.id || index}>
                <View style={styles.taskHeader}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={styles.taskMeta}>{task.status}</Text>
                    <Text style={styles.timeBadge}>Estimated: {task.timeprevision}</Text>
                    <Text style={styles.timeBadge}>Spent: {task.timespend}</Text>
                  </View>
                </View>

                <Text style={styles.taskDescription}>{task.what}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 }}>
                  <Text style={styles.taskMeta}>How: {task.how}</Text>
                  <Text style={styles.taskMeta}>Who: {user ? user.name : '—'}</Text>
                </View>

                {/* Sprints list */}
                <View style={styles.sprintContainer}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 }}>
                    <Text style={styles.small}>Sprints ({taskSprints.length})</Text>
                  </View>
                  <View style={styles.sprintList}>
                    {taskSprints.map((sprint, si) => {
                      const date = formatDateToLocal(sprint.date);
                      const start = formatTime(sprint.starttime);
                      const end = formatTime(sprint.endtime);
                      const [sh, sm] = (start || '00:00').split(':').map(Number);
                      const [eh, em] = (end || '00:00').split(':').map(Number);
                      let diffMinutes = (eh * 60 + em) - (sh * 60 + sm);
                      if (Number.isNaN(diffMinutes)) diffMinutes = 0;
                      if (diffMinutes < 0) diffMinutes += 24 * 60;
                      const dh = Math.floor(diffMinutes / 60);
                      const dm = diffMinutes % 60;
                      const duration = `${String(dh).padStart(2, '0')}:${String(dm).padStart(2, '0')}`;

                      return (
                        <View style={styles.sprintItem} key={sprint.id || si}>
                          <Text style={styles.sprintInfo}>
                            #{si + 1} — {date} | Start: {start} | End: {end} | Dur: {duration}
                          </Text>
                        </View>
                      );
                    })}
                    {taskSprints.length === 0 && <Text style={styles.small}>Nenhum sprint registrado</Text>}
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.companyTextContainer}>
          <Text style={styles.subtitle}>{data.company.name}</Text>
          <Text style={styles.subtitle}>{data.company.cnpj}</Text>
          <Text style={styles.subtitle}>{data.company.siteurl}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image src={logo.src} style={styles.logoDev} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.footerText}>Smart Project - Seu App de Projetos</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 12, textAlign: 'right' }}>
              <Text style={styles.footerTextDev}>Desenvolvido por Autoric Automation</Text>
              <Text style={styles.footerTextDev}>www.autoric.com.br</Text>
            </View>
            <Image src="https://www.autoric.com.br/images/logo.png" style={styles.logoApp} />
          </View>
        </View>
      </Page>
    </Document>
  );
};
// ...existing code...