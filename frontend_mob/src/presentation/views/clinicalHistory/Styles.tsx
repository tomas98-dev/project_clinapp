import { StyleSheet } from "react-native";
import { MyColors } from "../../theme/AppTheme";

const ClinicalHistoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.background,
  },
  header: {
    backgroundColor: MyColors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {},
  backText: {
    color: 'white',
    fontSize: 16,
  },
  deletePatientText: {
    color: '#FF8A80',
    fontSize: 14,
    fontWeight: 'bold',
  },
  patientName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  patientDetailRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  patientDetail: {
    color: 'white',
    fontSize: 14,
    marginRight: 15,
  },
  syncContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  syncDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  syncText: {
    color: 'white',
    fontSize: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: MyColors.textDark,
    marginBottom: 10,
  },
  backgroundText: {
    fontSize: 14,
    color: MyColors.textGray,
    lineHeight: 22,
  },
  consultationItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 10,
  },
  consultationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteConsultationText: {
    color: MyColors.danger,
    fontSize: 12,
    fontWeight: 'bold',
  },
  consultationDate: {
    fontSize: 12,
    color: MyColors.primary,
    fontWeight: 'bold',
  },
  consultationDiagnosis: {
    fontSize: 14,
    fontWeight: 'bold',
    color: MyColors.textDark,
    marginTop: 3,
  },
  consultationReason: {
    fontSize: 13,
    color: MyColors.textGray,
    marginTop: 2,
  },
  newConsultationButton: {
    margin: 15,
    marginBottom: 30,
  },
});

export default ClinicalHistoryStyles;
