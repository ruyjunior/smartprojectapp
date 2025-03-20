import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 10, backgroundColor: '#F8F9FA' },
  headerSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logo: { width: 60, height: 60, marginRight: 1 },
  headerTextContainer: { flex: 1, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#555' },
  reportDate: { fontSize: 12, fontStyle: 'italic', color: '#777' },
  chapter: { fontSize: 12, fontWeight: 'bold', backgroundColor: '#D3D3D3', padding: 5, marginBottom: 5 },
  section: { marginBottom: 10, padding: 10, backgroundColor: '#FFF', borderRadius: 5 },
  field: { fontSize: 12, marginBottom: 2 },
  label: { fontWeight: 'bold' },
  table: { display: 'flex', width: '100%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000' },
  tableRowHeader: { flexDirection: 'row', backgroundColor: '#D3D3D3', padding: 5 },
  tableRow: { flexDirection: 'row', padding: 5 },
  tableRowSprints: { flexDirection: 'row', padding: 2 },
  tableRowAlt: { backgroundColor: '#F1F1F1' },
  tableCellHeader: { flex: 1, fontWeight: 'bold', fontSize: 8, textAlign: 'center' },
  tableCellHeaderWide: { flex: 3, fontWeight: 'bold', fontSize: 8, textAlign: 'center' },
  tableCellWide: { flex: 3, fontSize: 7, textAlign: 'center' },
  tableCell: { flex: 1, fontSize: 7, textAlign: 'center' },
  tableSprints: { flex: 1, fontSize: 6, textAlign: 'center' },
  footer: { marginTop: 50, paddingTop: 10, borderTopWidth: 1, borderColor: '#000', alignItems: 'center' },
  footerText: { fontSize: 10, color: '#333' },
  sprintRow: {
    backgroundColor:'rgba(231, 228, 228, 0.53)',
  },
});

export default styles;