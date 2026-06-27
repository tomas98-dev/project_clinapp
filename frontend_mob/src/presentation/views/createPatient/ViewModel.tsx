import { useState } from "react";
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery";

const CreatePatientViewModel = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    name: '',
    lastname: '',
    documentNumber: '',
    age: '',
    sex: '',
    bloodType: '',
    background: '',
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const resetForm = () => {
    setValues({
      name: '',
      lastname: '',
      documentNumber: '',
      age: '',
      sex: '',
      bloodType: '',
      background: '',
    });
  };

  const isValidForm = (): boolean => {
    setErrorMessage('');
    if (values.name === '') {
      setErrorMessage('El nombre es requerido');
      return false;
    }
    if (values.lastname === '') {
      setErrorMessage('El apellido es requerido');
      return false;
    }
    if (values.documentNumber === '') {
      setErrorMessage('El numero de documento es requerido');
      return false;
    }
    if (values.age === '') {
      setErrorMessage('La edad es requerida');
      return false;
    }
    if (values.sex === '') {
      setErrorMessage('El sexo es requerido');
      return false;
    }
    return true;
  };

  const createPatient = async () => {
    if (!isValidForm()) return;

    setLoading(true);
    try {
      const response = await ApiDelivery.post('/patients/create', {
        name: values.name,
        lastname: values.lastname,
        document_number: values.documentNumber,
        age: parseInt(values.age),
        sex: values.sex,
        blood_type: values.bloodType || null,
        background: values.background || null,
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        resetForm();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Error al crear el paciente';
      setErrorMessage(msg);
    }
    setLoading(false);
  };

  return {
    ...values,
    errorMessage,
    successMessage,
    loading,
    onChange,
    createPatient,
  };
};

export default CreatePatientViewModel;
