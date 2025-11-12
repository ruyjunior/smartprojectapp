// ...existing code...
import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 10, backgroundColor: '#FFFFFF', paddingBottom: 110, color: '#0F172A', fontSize: 10 },
  headerSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 1 },
  logo: { width: 72, height: 72, marginTop: 1, marginLeft: 4, borderRadius: 6, objectFit: 'cover' },
  logoDev: { width: 32, height: 32, borderRadius: 6 },
  logoApp: { width: 32, height: 32, borderRadius: 6 },

  headerTextContainer: { flex: 1, alignItems: 'flex-start', paddingLeft: 10 },
  companyTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: 8,
    paddingRight: 8,
  },

  title: { fontSize: 16, fontWeight: 700, marginBottom: 1, color: '#0B2545' },
  subtitle: { fontSize: 11, color: '#374151' },
  reportDate: { fontSize: 9, fontStyle: 'italic', color: '#6B7280' },

  chapter: { fontSize: 11, fontWeight: 700, backgroundColor: '#EEF6FF', padding: 1, marginBottom: 4, borderRadius: 6, color: '#0F172A' },
  section: { marginBottom: 1, padding: 1, backgroundColor: '#FFF', borderRadius: 8, borderWidth: 0.5, borderColor: '#E6EEF9' },
  field: { fontSize: 10, marginBottom: 1, lineHeight: 1.2 },
  label: { fontWeight: 700 },

  // Task / Sprint styles
  taskSection: {
    marginBottom: 1,
    padding: 1,
    backgroundColor: '#FBFDFF',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#E6EEF9',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskTitle: { fontSize: 12, fontWeight: 700, color: '#0B2545' },
  taskMeta: { fontSize: 9, color: '#475569' },
  taskDescription: { marginTop: 1, fontSize: 10, color: '#111827' },

  sprintContainer: {
    marginTop: 1,
    padding: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#EEF6FF',
  },
  sprintList: { marginTop: 1, display: 'flex', flexDirection: 'column', gap: 6 },
  sprintItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 1,
    paddingHorizontal: 1,
    borderRadius: 6,
    backgroundColor: 'rgba(240, 249, 255, 0.7)',
  },
  sprintDetails: { flexDirection: 'column', flex: 1, paddingRight: 12 },
  sprintInfo: { fontSize: 9, color: '#0F172A' },
  sprintTimes: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  timeBadge: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    fontSize: 8,
    color: '#0B2545',
  },

  // fallback table styles (kept minimal)
  table: { display: 'flex', width: '100%' },
  tableRowHeader: { flexDirection: 'row', backgroundColor: '#F3F7FF', padding: 5 },
  tableRow: { flexDirection: 'row', padding: 1 },
  tableRowSprints: { flexDirection: 'row', padding: 1 },
  tableRowAlt: { backgroundColor: '#FBFBFD' },
  tableCellHeader: { flex: 1, fontWeight: 700, fontSize: 8, textAlign: 'center' },
  tableCellHeaderWide: { flex: 3, fontWeight: 700, fontSize: 8, textAlign: 'left' },
  tableCellWide: { flex: 3, fontSize: 8, textAlign: 'left' },
  tableCell: { flex: 1, fontSize: 8, textAlign: 'center' },
  tableSprints: { flex: 1, fontSize: 7, textAlign: 'center' },

  footer: {
    position: 'absolute',
    height: 60,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 12,
    left: 30,
    right: 30,
    borderTopWidth: 0.5,
    borderTopColor: '#E6E9EE',
  },
  footerText: { fontSize: 10, color: '#333' },
  footerTextDev: { fontSize: 8, color: '#666' },

  sprintRow: { backgroundColor: 'rgba(231, 228, 228, 0.25)' },

  // utilities
  muted: { color: '#6B7280' },
  small: { fontSize: 8, color: '#6B7280' },
});

export default styles;
// ...existing code...