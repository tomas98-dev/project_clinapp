import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useFocusEffect } from '@react-navigation/native';
import { RoundedButton } from '../../components/RoundedButton';
import { Consultation } from '../../../domain/entities/Consultation';
import useViewModel from './ViewModel';
import styles from './Styles';
import { MyColors } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParamList, 'ClinicalHistoryScreen'> {};

export const ClinicalHistoryScreen = ({ navigation, route }: Props) => {

  const { patientId } = route.params;
  const { patient, consultations, isOnline, loadConsultations, deletePatient, deleteConsultation } = useViewModel(patientId);

  const confirmDeletePatient = () => {
    Alert.alert(
      'Eliminar paciente',
      `¿Estas seguro de eliminar a ${patient?.name} ${patient?.lastname}? Se eliminaran tambien todas sus consultas.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar', style: 'destructive', onPress: async () => {
            const success = await deletePatient();
            if (success) {
              ToastAndroid.show('Paciente eliminado', ToastAndroid.SHORT);
              navigation.goBack();
            } else {
              ToastAndroid.show('Error al eliminar paciente', ToastAndroid.SHORT);
            }
          }
        },
      ]
    );
  };

  const confirmDeleteConsultation = (consultation: Consultation) => {
    Alert.alert(
      'Eliminar consulta',
      `¿Eliminar la consulta del ${consultation.date}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar', style: 'destructive', onPress: async () => {
            const success = await deleteConsultation(consultation.id!);
            if (success) {
              ToastAndroid.show('Consulta eliminada', ToastAndroid.SHORT);
            } else {
              ToastAndroid.show('Error al eliminar consulta', ToastAndroid.SHORT);
            }
          }
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadConsultations();
    }, [patientId])
  );

  const renderConsultation = ({ item }: { item: Consultation }) => (
    <View style={styles.consultationItem}>
      <View style={styles.consultationHeader}>
        <Text style={styles.consultationDate}>{item.date}</Text>
        <TouchableOpacity onPress={() => confirmDeleteConsultation(item)}>
          <Text style={styles.deleteConsultationText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.consultationDiagnosis}>{item.diagnosis}</Text>
      <Text style={styles.consultationReason}>{item.reason}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmDeletePatient}>
            <Text style={styles.deletePatientText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.patientName}>{patient?.name} {patient?.lastname}</Text>
        <View style={styles.patientDetailRow}>
          <Text style={styles.patientDetail}>CC: {patient?.documentNumber}</Text>
          <Text style={styles.patientDetail}>{patient?.age} años</Text>
          <Text style={styles.patientDetail}>{patient?.sex === 'M' ? 'Masculino' : 'Femenino'}</Text>
        </View>
        <View style={styles.patientDetailRow}>
          <Text style={styles.patientDetail}>Tipo de sangre: {patient?.bloodType || 'N/A'}</Text>
        </View>
        <View style={styles.syncContainer}>
          <View style={[styles.syncDot, { backgroundColor: isOnline ? MyColors.success : MyColors.danger }]} />
          <Text style={styles.syncText}>{isOnline ? 'Sincronizado' : 'Sin conexion'}</Text>
        </View>
      </View>

      <FlatList
        style={styles.content}
        ListHeaderComponent={
          <>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Antecedentes</Text>
              <Text style={styles.backgroundText}>{patient?.background || 'Sin antecedentes registrados'}</Text>
            </View>
            <Text style={styles.sectionTitle}>Consultas previas</Text>
          </>
        }
        data={consultations}
        renderItem={renderConsultation}
        keyExtractor={(item) => item.id || item.date}
        ListFooterComponent={
          <View style={styles.newConsultationButton}>
            <RoundedButton
              text='NUEVA CONSULTA'
              onPress={() => navigation.navigate('ConsultationScreen', { patientId })}
            />
          </View>
        }
      />
    </View>
  );
}
