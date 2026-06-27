import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import useViewModel from './ViewModel';
import styles from './Styles';

export const CreatePatientScreen = () => {
  const navigation = useNavigation();
  const {
    name, lastname, documentNumber, age, sex, bloodType, background,
    errorMessage, successMessage, loading, onChange, createPatient,
  } = useViewModel();

  useEffect(() => {
    if (errorMessage !== '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage !== '') {
      ToastAndroid.show(successMessage, ToastAndroid.LONG);
      navigation.goBack();
    }
  }, [successMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuevo Paciente</Text>
      </View>

      <ScrollView style={styles.form}>
        <Text style={styles.sectionTitle}>Informacion Personal</Text>

        <CustomTextInput
          image={require('../../../../assets/user.png')}
          placeholder='Nombres'
          keyboardType='default'
          property='name'
          onChangeText={onChange}
          value={name}
        />
        <CustomTextInput
          image={require('../../../../assets/my_user.png')}
          placeholder='Apellidos'
          keyboardType='default'
          property='lastname'
          onChangeText={onChange}
          value={lastname}
        />
        <CustomTextInput
          image={require('../../../../assets/document.png')}
          placeholder='Numero de Documento (CC)'
          keyboardType='numeric'
          property='documentNumber'
          onChangeText={onChange}
          value={documentNumber}
        />
        <CustomTextInput
          image={require('../../../../assets/reloj.png')}
          placeholder='Edad'
          keyboardType='numeric'
          property='age'
          onChangeText={onChange}
          value={age}
        />

        <Text style={styles.sectionTitle}>Sexo</Text>
        <View style={styles.sexContainer}>
          <TouchableOpacity
            style={sex === 'M' ? styles.sexButtonActive : styles.sexButton}
            onPress={() => onChange('sex', 'M')}
          >
            <Text style={sex === 'M' ? styles.sexButtonTextActive : styles.sexButtonText}>Masculino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sex === 'F' ? styles.sexButtonActive : styles.sexButton}
            onPress={() => onChange('sex', 'F')}
          >
            <Text style={sex === 'F' ? styles.sexButtonTextActive : styles.sexButtonText}>Femenino</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Informacion Medica</Text>

        <CustomTextInput
          image={require('../../../../assets/checklist.png')}
          placeholder='Tipo de Sangre (Ej: O+)'
          keyboardType='default'
          property='bloodType'
          onChangeText={onChange}
          value={bloodType}
        />
        <CustomTextInput
          image={require('../../../../assets/description.png')}
          placeholder='Antecedentes'
          keyboardType='default'
          property='background'
          onChangeText={onChange}
          value={background}
        />

        <View style={styles.buttonContainer}>
          <RoundedButton text={loading ? 'GUARDANDO...' : 'GUARDAR PACIENTE'} onPress={() => createPatient()} />
        </View>
      </ScrollView>
    </View>
  );
};
