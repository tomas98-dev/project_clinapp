export interface Patient {
  id: string;
  name: string;
  lastname: string;
  documentNumber: string;
  age: number;
  sex: 'M' | 'F';
  bloodType?: string;
  background?: string;
}
