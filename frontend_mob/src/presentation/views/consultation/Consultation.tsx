import React, { useEffect } from 'react';
import { View, Text, TextInput, ScrollView, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { RoundedButton } from '../../components/RoundedButton';
import useViewModel from './ViewModel';
import styles from './Styles';

interface Props extends StackScreenProps<RootStackParamList, 'ConsultationScreen'> {};

export const ConsultationScreen = ({ navigation, route }: Props) => {

  const { patientId } = route.params;
  const {
    reason, diagnosis, prescription, notes,
    patientInfo, errorMessage, successMessage,
    onChange, saveConsultation
  } = useViewModel(patientId);

  useEffect(() => {
    if (errorMessage !== '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage !== '') {
      ToastAndroid.show(successMessage, ToastAndroid.LONG);
    }
  }, [successMessage]);

  const handleSave = async () => {
    const saved = await saveConsultation();
    if (saved) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nueva Consulta</Text>
        <Text style={styles.headerSubtitle}>Paciente: {patientInfo.name} (CC {patientInfo.doc})</Text>
      </View>

      <ScrollView style={styles.form}>
        <Text style={styles.label}>Motivo de consulta</Text>
        <TextInput
          style={styles.inputMultiline}
          placeholder='Describa el motivo de la consulta'
          multiline
          value={reason}
          onChangeText={(text) => onChange('reason', text)}
        />

        <Text style={styles.label}>Diagnostico CIE-10</Text>
        <TextInput
          style={styles.input}
          placeholder='Ej: I10 - Hipertension esencial'
          value={diagnosis}
          onChangeText={(text) => onChange('diagnosis', text)}
        />

        <Text style={styles.label}>Prescripcion / Tratamiento</Text>
        <TextInput
          style={styles.inputMultiline}
          placeholder='Medicamentos y tratamiento indicado'
          multiline
          value={prescription}
          onChangeText={(text) => onChange('prescription', text)}
        />

        <Text style={styles.label}>Notas / Observaciones</Text>
        <TextInput
          style={styles.inputMultiline}
          placeholder='Observaciones adicionales'
          multiline
          value={notes}
          onChangeText={(text) => onChange('notes', text)}
        />

        <View style={styles.offlineContainer}>
          <Text>⚠️</Text>
          <Text style={styles.offlineText}>Sin conexion: se guardara y sincronizara luego</Text>
        </View>

        <View style={styles.buttonContainer}>
          <RoundedButton text='GUARDAR CONSULTA' onPress={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
}
