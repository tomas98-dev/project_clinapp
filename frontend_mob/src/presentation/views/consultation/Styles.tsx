import { StyleSheet } from "react-native";
import { MyColors } from "../../theme/AppTheme";

const ConsultationStyles = StyleSheet.create({
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
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: 'white',
    fontSize: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 3,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: MyColors.textDark,
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  inputMultiline: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  offlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  offlineText: {
    color: MyColors.danger,
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 25,
    marginBottom: 30,
  },
});

export default ConsultationStyles;
