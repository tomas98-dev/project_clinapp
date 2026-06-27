import React, { useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';
import { useUserLocal } from '../../hooks/useUserLocal';
import { RemoveUserLocalUseCase } from '../../../domain/useCases/userLocal/RemoveUserLocal';
import { Patient } from '../../../domain/entities/Patient';
import useViewModel from './ViewModel';
import styles from './Styles';

export const PatientsScreen = () => {

  const { patients, searchQuery, onSearch, loadPatients } = useViewModel();
  const { user } = useUserLocal();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      loadPatients();
    }, [])
  );

  const logout = async () => {
    await RemoveUserLocalUseCase();
    navigation.replace('HomeScreen');
  };

  const renderPatient = ({ item }: { item: Patient }) => {
    const initials = item.name.charAt(0) + item.lastname.charAt(0);
    return (
      <TouchableOpacity
        style={styles.patientCard}
        onPress={() => navigation.navigate('ClinicalHistoryScreen', { patientId: item.id })}
      >
        <View style={styles.patientAvatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.name} {item.lastname}</Text>
          <Text style={styles.patientDetail}>CC: {item.documentNumber}</Text>
          <Text style={styles.patientDetail}>{item.age} años - {item.sex === 'M' ? 'Masculino' : 'Femenino'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Hola, Dr. {user?.name || ''}</Text>
            <Text style={styles.headerSubtitle}>Historia Clinica Movil</Text>
          </View>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Text>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder='Buscar por documento o nombre'
            value={searchQuery}
            onChangeText={onSearch}
          />
        </View>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Pacientes recientes</Text>
        <FlatList
          data={patients}
          renderItem={renderPatient}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreatePatientScreen')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <View style={styles.bottomNavItem}>
          <Text style={styles.bottomNavTextActive}>Inicio</Text>
        </View>
        <View style={styles.bottomNavItem}>
          <Text style={styles.bottomNavText}>Notificaciones</Text>
        </View>
        <View style={styles.bottomNavItem}>
          <Text style={styles.bottomNavText}>Perfil</Text>
        </View>
      </View>
    </View>
  );
}
