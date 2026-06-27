import { Patient } from "../entities/Patient";

export interface PatientRepository {
  getAll(): Promise<Patient[]>;
  getById(id: string): Promise<Patient>;
}
