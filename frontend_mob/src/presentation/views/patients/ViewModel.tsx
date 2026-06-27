import { useState, useEffect } from "react";
import { Patient } from "../../../domain/entities/Patient";
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery";

const PatientsViewModel = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  const mapPatients = (data: any[]): Patient[] =>
    data.map((p: any) => ({
      id: String(p.id),
      name: p.name,
      lastname: p.lastname,
      documentNumber: p.document_number,
      age: p.age,
      sex: p.sex,
      bloodType: p.blood_type,
      background: p.background,
    }));

  const loadPatients = async (query?: string) => {
    setLoading(true);
    try {
      const url = query && query.trim() !== '' ? `/patients?search=${query}` : '/patients';
      const response = await ApiDelivery.get(url);
      if (response.data.success) {
        const mapped = mapPatients(response.data.data);
        setPatients(mapped);
      }
    } catch (error) {
      console.log('Error al cargar pacientes:', error);
    }
    setLoading(false);
  };

  const onSearch = (text: string) => {
    setSearchQuery(text);
    loadPatients(text);
  };

  return {
    patients,
    searchQuery,
    loading,
    loadPatients,
    onSearch,
  };
}

export default PatientsViewModel;
