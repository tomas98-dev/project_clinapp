import { Consultation } from "../entities/Consultation";

export interface ConsultationRepository {
  getByPatientId(patientId: string): Promise<Consultation[]>;
  create(consultation: Consultation): Promise<Consultation>;
}
