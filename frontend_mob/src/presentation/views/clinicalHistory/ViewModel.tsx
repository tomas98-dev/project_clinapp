import { useState, useEffect } from "react";
import { Patient } from "../../../domain/entities/Patient";
import { Consultation } from "../../../domain/entities/Consultation";
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery";

const ClinicalHistoryViewModel = (patientId: string) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    loadPatientData();
  }, [patientId]);

  const loadPatientData = async () => {
    try {
      const response = await ApiDelivery.get(`/patients/${patientId}`);
      if (response.data.success) {
        const p = response.data.data.patient;
        setPatient({
          id: String(p.id),
          name: p.name,
          lastname: p.lastname,
          documentNumber: p.document_number,
          age: p.age,
          sex: p.sex,
          bloodType: p.blood_type,
          background: p.background,
        });

        const consults: Consultation[] = response.data.data.consultations.map((c: any) => ({
          id: String(c.id),
          patientId: String(c.patient_id),
          date: c.date.split('T')[0],
          reason: c.reason,
          diagnosis: c.diagnosis,
          prescription: c.prescription,
          notes: c.notes,
          synced: c.synced === 1,
        }));
        setConsultations(consults);
        setIsOnline(true);
      }
    } catch (error) {
      console.log('Error al cargar historia clinica:', error);
      setIsOnline(false);
    }
  };

  const deletePatient = async (): Promise<boolean> => {
    try {
      const response = await ApiDelivery.delete(`/patients/${patientId}`);
      return response.data.success;
    } catch (error) {
      console.log('Error al eliminar paciente:', error);
      return false;
    }
  };

  const deleteConsultation = async (consultationId: string): Promise<boolean> => {
    try {
      const response = await ApiDelivery.delete(`/consultations/${consultationId}`);
      if (response.data.success) {
        setConsultations(prev => prev.filter(c => c.id !== consultationId));
        return true;
      }
      return false;
    } catch (error) {
      console.log('Error al eliminar consulta:', error);
      return false;
    }
  };

  return {
    patient,
    consultations,
    isOnline,
    loadConsultations: loadPatientData,
    deletePatient,
    deleteConsultation,
  };
}

export default ClinicalHistoryViewModel;
