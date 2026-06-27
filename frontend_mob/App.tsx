import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RemoveUserLocalUseCase } from './src/domain/useCases/userLocal/RemoveUserLocal';
import { HomeScreen } from './src/presentation/views/home/Home';
import { RegisterScreen } from './src/presentation/views/register/Register';
import { PatientsScreen } from './src/presentation/views/patients/Patients';
import { ClinicalHistoryScreen } from './src/presentation/views/clinicalHistory/ClinicalHistory';
import { ConsultationScreen } from './src/presentation/views/consultation/Consultation';
import { ProfileInfoScreen } from './src/presentation/views/profile/info/ProfileInfo';
import { CreatePatientScreen } from './src/presentation/views/createPatient/CreatePatient';

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  PatientsScreen: undefined;
  ClinicalHistoryScreen: { patientId: string };
  ConsultationScreen: { patientId: string };
  ProfileInfoScreen: undefined;
  CreatePatientScreen: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    RemoveUserLocalUseCase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: true,
            title: "Registro",
          }}
        />
        <Stack.Screen
          name="PatientsScreen"
          component={PatientsScreen}
        />
        <Stack.Screen
          name="ClinicalHistoryScreen"
          component={ClinicalHistoryScreen}
        />
        <Stack.Screen
          name="ConsultationScreen"
          component={ConsultationScreen}
        />
        <Stack.Screen
          name="ProfileInfoScreen"
          component={ProfileInfoScreen}
        />
        <Stack.Screen
          name="CreatePatientScreen"
          component={CreatePatientScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
