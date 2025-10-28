import React from 'react';
import * as PDF from '@react-pdf/renderer';
import styles from '@/app/ui/invoices/stylesPDF';
import { formatCNPJ, formatDateToLocal, formatPhone, formatTime, timeToDecimal } from '@/app/utils/utils';
import { Invoice } from '@/app/query/invoice/definitions';


export const DocPDF = ({ data }: { data: Invoice }) => {
  const InvoiceDate = new Date().toLocaleDateString();

  const filteredTasks = data.tasks.filter((t) =>
    data.sprints.some((s) => s.idtask === t.id)
  );
  const filteredProjects = data.projects.filter((p) =>
    filteredTasks.some((t) => t.idproject === p.id)
  );
  console.log(filteredProjects);

  return (
    <PDF.Document>
      <PDF.Page size="A4" style={styles.page}>
        {/* Header */}
        <PDF.View style={styles.headerSection}>
          <PDF.Image src="/images/logos/logo.jpg" style={styles.logo} />
          <PDF.View style={styles.headerTextContainer}>
            <PDF.Text style={styles.subtitle}>VOCÊ IMAGINA, NÓS FAZEMOS ACONTECER.</PDF.Text>
            <PDF.Text style={styles.title}>Relatório de Serviços</PDF.Text>
            <PDF.Text style={styles.reportDate}>
              Período: de  {data.datein} a {data.dateout}
            </PDF.Text>
          </PDF.View>
        </PDF.View>

        {/*Solicitante*/}
        <PDF.View style={styles.section}>
          <PDF.Text style={styles.chapter}>SOLICITANTE</PDF.Text>
          <PDF.Text style={styles.field}>{data.client.name}</PDF.Text>
          <PDF.Text style={styles.field}>CNPJ: {formatCNPJ(data.client.cnpj)}</PDF.Text>
        </PDF.View>

        {/* RESUMO */}
        <PDF.View style={styles.section}>
          <PDF.Text style={styles.chapter}>RESUMO</PDF.Text>

          {filteredProjects.map((project, index) => {
            const tasks = data.tasks.filter((t) => t.idproject === project.id);
            const totalHoursEstimed = tasks.reduce((sum, task) => sum + (parseFloat(task.timeprevision) || 0), 0);
            const totalHoursRealized = tasks.reduce((sum, task) => sum + timeToDecimal(task.timespend), 0);
            const hours = Math.floor(totalHoursRealized);
            const minutes = Math.round((totalHoursRealized - hours) * 60);

            const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

            return (
              <PDF.View key={index}>
                <PDF.Text style={styles.field}>
                  PROJETO {index + 1} / {filteredProjects.length} - {project.title} - {formattedTime}H
                </PDF.Text>
              </PDF.View>
            )
          })}
        </PDF.View>

        {/* Project Data */}
        {filteredProjects.map((project, index) => {

          const tasks = data.tasks.filter((t) => t.idproject === project.id);
          const totalHoursEstimed = tasks.reduce((sum, task) => sum + (parseFloat(task.timeprevision) || 0), 0);
          const totalHoursRealized = tasks.reduce((sum, task) => sum + timeToDecimal(task.timespend), 0);

          // Converte para HH:MM corretamente
          const hours = Math.floor(totalHoursRealized);
          const minutes = Math.round((totalHoursRealized - hours) * 60);

          const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
          //console.log(formattedTime); // Exemplo: "07:30"

          const totalTasks = tasks.length;
          const completedTasks = tasks.filter(task => task.status === "done").length;
          const progress = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : "0.00";
          const clientContact = data.contacts.find(emp => emp.id === filteredProjects[index].idclientcontact);
          const companyContact = data.contacts.find(emp => emp.id === data.projects[index].idcompanycontact);

          return (
            <PDF.View key={index}>
              <PDF.View style={styles.section}>
                <PDF.Text style={styles.chapter}>PROJETO {index + 1} / {filteredProjects.length}</PDF.Text>
                <PDF.Text style={styles.field}>{filteredProjects[index].title}</PDF.Text>
                <PDF.Text style={styles.field}>Comentários: {filteredProjects[index].comments}</PDF.Text>
                <PDF.Text style={styles.field}>Início: {formatDateToLocal(filteredProjects[index].timestamp)}</PDF.Text>
                <PDF.Text style={styles.field}>Horas Planejadas:{totalHoursEstimed}h</PDF.Text>
                <PDF.Text style={styles.field}>Horas Realizadas:{formattedTime}h</PDF.Text>
                <PDF.Text style={styles.field}>Progresso: {progress}%</PDF.Text>
              </PDF.View>

              {/* Taker Project */}
              <PDF.View style={styles.section}>
                <PDF.Text style={styles.chapter}>RESPONSÁVEL</PDF.Text>
                <PDF.Text style={styles.field}>{clientContact?.name}</PDF.Text>
                <PDF.Text style={styles.field}>Telefone: {formatPhone(clientContact?.phone)}</PDF.Text>
                <PDF.Text style={styles.field}>Email: {clientContact?.email}</PDF.Text>
              </PDF.View>

              {/* Tasks */}
              <PDF.View style={styles.section}>
                <PDF.Text style={styles.chapter}>TAREFAS</PDF.Text>
              </PDF.View>

              <PDF.View style={styles.table}>
                <PDF.View style={styles.tableRowHeader}>
                  <PDF.Text style={styles.tableCellHeader}>Nome</PDF.Text>
                  <PDF.Text style={styles.tableCellHeader}>Status</PDF.Text>
                  <PDF.Text style={styles.tableCellHeader}>Data Inicial</PDF.Text>
                  <PDF.Text style={styles.tableCellHeader}>Data Final</PDF.Text>
                  <PDF.Text style={styles.tableCellHeaderWide}>O que?</PDF.Text>
                  <PDF.Text style={styles.tableCellHeaderWide}>Como?</PDF.Text>
                  <PDF.Text style={styles.tableCellHeader}>Quem?</PDF.Text>
                  <PDF.Text style={styles.tableCellHeader}>Criticidade</PDF.Text>
                  <PDF.Text style={styles.tableCellHeader}>Tempo Previsto</PDF.Text>
                  <PDF.Text style={styles.tableCellHeader}>Tempo Gasto</PDF.Text>
                </PDF.View>
                {tasks.map((task, index) => {
                  const contact = data.contacts.find(emp => emp.id === task.who);
                  const taskSprints = data.sprints && data.tasks ? data.sprints.filter((sprint) => sprint.idtask === task.id) : [];

                  return (
                    <PDF.View key={index}>

                      <PDF.View style={[styles.tableRow, index % 2 === 0 ? styles.tableRowAlt : {}]}>
                        <PDF.Text style={styles.tableCell}>{task.title}</PDF.Text>
                        <PDF.Text style={styles.tableCell}>{task.status}</PDF.Text>
                        <PDF.Text style={styles.tableCell}>{formatDateToLocal(task.startdate)}</PDF.Text>
                        <PDF.Text style={styles.tableCell}>{formatDateToLocal(task.enddate)}</PDF.Text>
                        <PDF.Text style={styles.tableCellWide}>{task.what}</PDF.Text>
                        <PDF.Text style={styles.tableCellWide}>{task.how}</PDF.Text>
                        <PDF.Text style={styles.tableCell}>{contact ? contact.name : "Unknown"}</PDF.Text>
                        <PDF.Text style={styles.tableCell}>{task.grade}</PDF.Text>
                        <PDF.Text style={styles.tableCell}>{task.timeprevision}</PDF.Text>
                        <PDF.Text style={styles.tableCell}>{task.timespend}</PDF.Text>
                      </PDF.View>

                      {/* Sprints */}

                      <PDF.View>
                        {taskSprints.map((sprint, index) => (
                          <PDF.View style={[styles.tableRowSprints, styles.sprintRow]} key={index}>
                            <PDF.Text style={styles.tableSprints}>{index + 1}</PDF.Text>
                            <PDF.Text style={styles.tableSprints}>Date: {sprint.date ? formatDateToLocal(sprint.date) : "N/A"}</PDF.Text>
                            <PDF.Text style={styles.tableSprints}>Start: {sprint.starttime ? formatTime(sprint.starttime) : "N/A"}</PDF.Text>
                            <PDF.Text style={styles.tableSprints}>End: {sprint.endtime ? formatTime(sprint.endtime) : "N/A"}</PDF.Text>
                          </PDF.View>
                        ))}
                      </PDF.View>

                    </PDF.View>
                  );
                })}
              </PDF.View>
            </PDF.View>
          );
        }
        )}
        <PDF.View style={styles.section}>
          <PDF.Text style={styles.chapter}>CORRIDAS</PDF.Text>
        </PDF.View>

        <PDF.View style={styles.table}>
          <PDF.View style={styles.tableRowHeader}>
            <PDF.Text style={styles.tableCellHeader}>Projeto</PDF.Text>
            <PDF.Text style={styles.tableCellHeader}>Data</PDF.Text>
            <PDF.Text style={styles.tableCellHeader}>Hora Inicio</PDF.Text>
            <PDF.Text style={styles.tableCellHeader}>Hora Final</PDF.Text>
            <PDF.Text style={styles.tableCellHeader}>Total</PDF.Text>
          </PDF.View>

          {data.sprints.map((sprint, index) => {
            const task = data.tasks.find((task) => task.id === sprint.idtask);
            const project = data.projects.find((project) => project.id === task?.idproject);
            return (
              <PDF.View style={[styles.tableRowSprints, styles.sprintRow]} key={index}>
                <PDF.Text style={styles.tableSprints}>{project?.title}</PDF.Text>
                <PDF.Text style={styles.tableSprints}>
                  {index === 0 || data.sprints[index].date !== data.sprints[index - 1].date
                    ? sprint.date
                      ? formatDateToLocal(sprint.date)
                      : ""
                    : ""}
                </PDF.Text>
                <PDF.Text style={styles.tableSprints}>{sprint.starttime ? formatTime(sprint.starttime) : "N/A"}</PDF.Text>
                <PDF.Text style={styles.tableSprints}>{sprint.endtime ? formatTime(sprint.endtime) : "N/A"}</PDF.Text>
                <PDF.Text style={styles.tableSprints}>{sprint.totaltime ? formatTime(sprint.totaltime) : "N/A"}</PDF.Text>
              </PDF.View>
            );
          })}
          {/* Soma total na última linha */}
          <PDF.View style={[styles.tableRowSprints, styles.sprintRow, styles.sprintRow]}>
            <PDF.Text style={styles.tableSprints} />
            <PDF.Text style={styles.tableSprints} />
            <PDF.Text style={styles.tableSprints} />
            <PDF.Text style={styles.tableSprints}>Total Geral:</PDF.Text>
            <PDF.Text style={styles.tableSprints}>
              {(() => {
                const totalMinutes = data.sprints.reduce((sum, sprint) => {
                  if (!sprint.totaltime) return sum;
                  const [hours, minutes] = sprint.totaltime.split(":").map(Number);
                  return sum + hours * 60 + minutes;
                }, 0);

                const totalHours = Math.floor(totalMinutes / 60);
                const remainingMinutes = totalMinutes % 60;

                return `${String(totalHours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}`;
              })()}
            </PDF.Text>
          </PDF.View>
        </PDF.View>

        {/* Footer */}
        <PDF.View style={styles.footer}>
          <PDF.Text style={styles.footerText}>Autoric Automation</PDF.Text>
          <PDF.Text style={styles.footerText}>www.autoric.com.br</PDF.Text>
          <PDF.Text style={styles.footerText}>(71) 99125-8769</PDF.Text>
          <PDF.Text style={styles.footerText}>CNPJ: 33.019.320/0001-42</PDF.Text>
          <PDF.Text style={styles.reportDate}>Data de impressão: {InvoiceDate}</PDF.Text>
        </PDF.View>

      </PDF.Page>
    </PDF.Document>
  );
};