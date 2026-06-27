import { useState } from "react";
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery";

const ConsultationViewModel = (patientId: string) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [patientInfo, setPatientInfo] = useState({ name: '', doc: '' });
  const [values, setValues] = useState({
    reason: '',
    diagnosis: '',
    prescription: '',
    notes: '',
  });

  const loadPatientInfo = async () => {
    try {
      const response = await ApiDelivery.get(`/patients/${patientId}`);
      if (response.data.success) {
        const p = response.data.data.patient;
        setPatientInfo({ name: `${p.name} ${p.lastname}`, doc: p.document_number });
      }
    } catch (error) {
      console.log('Error al cargar info del paciente:', error);
    }
  };

  useState(() => {
    loadPatientInfo();
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const isValidForm = (): boolean => {
    setErrorMessage('');
    if (values.reason.trim() === '') {
      setErrorMessage('El motivo de consulta es requerido');
      return false;
    }
    if (values.diagnosis.trim() === '') {
      setErrorMessage('El diagnostico es requerido');
      return false;
    }
    return true;
  };

  const saveConsultation = async (): Promise<boolean> => {
    if (!isValidForm()) return false;

    try {
      const response = await ApiDelivery.post('/consultations/create', {
        patient_id: parseInt(patientId),
        date: new Date().toISOString().split('T')[0],
        reason: values.reason,
        diagnosis: values.diagnosis,
        prescription: values.prescription,
        notes: values.notes,
      });

      if (response.data.success) {
        setSuccessMessage('Consulta guardada correctamente');
        setValues({ reason: '', diagnosis: '', prescription: '', notes: '' });
        return true;
      } else {
        setErrorMessage(response.data.message);
        return false;
      }
    } catch (error) {
      setErrorMessage('Error al guardar la consulta');
      return false;
    }
  };

  return {
    ...values,
    patientInfo,
    errorMessage,
    successMessage,
    onChange,
    saveConsultation,
  };
}

export default ConsultationViewModel;
