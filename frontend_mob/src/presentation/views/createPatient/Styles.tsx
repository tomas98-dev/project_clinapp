import { StyleSheet } from "react-native";
import { MyColors } from "../../theme/AppTheme";

const CreatePatientStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.background,
  },
  header: {
    backgroundColor: MyColors.primary,
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: 'white',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: MyColors.textDark,
    marginBottom: 5,
    marginTop: 10,
  },
  sexContainer: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  sexButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  sexButtonActive: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: MyColors.primary,
    alignItems: 'center',
    backgroundColor: MyColors.primary,
  },
  sexButtonText: {
    fontSize: 14,
    color: MyColors.textGray,
    fontWeight: 'bold',
  },
  sexButtonTextActive: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 25,
    marginBottom: 30,
  },
});

export default CreatePatientStyles;
