export interface Consultation {
  id?: string;
  patientId: string;
  date: string;
  reason: string;
  diagnosis: string;
  prescription?: string;
  notes?: string;
  synced: boolean;
}
