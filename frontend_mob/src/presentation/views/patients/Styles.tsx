import { StyleSheet } from "react-native";
import { MyColors } from "../../theme/AppTheme";

const PatientsStyles = StyleSheet.create({
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 2,
  },
  logoutText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: MyColors.textGray,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: MyColors.textDark,
    marginBottom: 10,
  },
  patientCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  patientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: MyColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientInfo: {
    flex: 1,
    marginLeft: 15,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: MyColors.textDark,
  },
  patientDetail: {
    fontSize: 13,
    color: MyColors.textGray,
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: MyColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  bottomNavItem: {
    alignItems: 'center',
  },
  bottomNavIcon: {
    width: 24,
    height: 24,
    tintColor: MyColors.textGray,
  },
  bottomNavIconActive: {
    width: 24,
    height: 24,
    tintColor: MyColors.primary,
  },
  bottomNavText: {
    fontSize: 11,
    color: MyColors.textGray,
    marginTop: 2,
  },
  bottomNavTextActive: {
    fontSize: 11,
    color: MyColors.primary,
    marginTop: 2,
  },
});

export default PatientsStyles;
