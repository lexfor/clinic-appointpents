import { AppointmentEntity } from '../entity/appointment.entity';
import { PatientAppointmentsViewDto } from '../dto/view/patient-appointments.view.dto';

export interface IAppointmentFetcher {
  getDoctorAppointment: (
    id: string,
    date?: string,
  ) => Promise<AppointmentEntity[]>;
  getPatientAppointment: (
    id: string,
    date?: string,
  ) => Promise<PatientAppointmentsViewDto[]>;
}
