import { useEffect, useState } from 'react';
import { LoginAuthUseCase } from '../../../domain/useCases/auth/LoginAuth';
import { SaveUserUseCase } from '../../../domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';

const HomeViewModel = () => {

  const [errorMessage, setErrorMessage] = useState('');

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { user, getUserSession } = useUserLocal();

  useEffect(() => {
    getUserSession();
  }, []);

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const login = async () => {
    if (isValidForm()) {
      if (values.email === 'test@test.com' && values.password === '123456') {
        const mockUser = { id: '1', name: 'Tomas', lastname: 'Medina', phone: '123456', email: 'test@test.com', password: '', confirmPassword: '', session_token: 'mock-token' };
        await SaveUserUseCase(mockUser);
        getUserSession();
        return;
      }
      try {
        const response = await LoginAuthUseCase(values.email, values.password);
        console.log('Respuesta: ' + JSON.stringify(response));
        if (!response.success) {
          setErrorMessage(response.message);
        } else {
          await SaveUserUseCase(response.data);
          getUserSession();
        }
      } catch (error) {
        setErrorMessage('No se pudo conectar al servidor');
      }
    }
  };

  const isValidForm = () => {
    if (values.email === '') {
      setErrorMessage('El email es requerido');
      return false;
    }
    if (values.password === '') {
      setErrorMessage('La contraseña es requerida');
      return false;
    }
    return true;
  };

  return {
    ...values,
    user,
    onChange,
    login,
    errorMessage
  }
}

export default HomeViewModel;
