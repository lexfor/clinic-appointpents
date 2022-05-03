import { AppointmentEntity } from '../entity/appointment.entity';
import { IAppointment } from './appointment.interface';

export interface IAppointmentRepository {
  createAppointment: (appointment: IAppointment) => Promise<AppointmentEntity>;
  getAppointment: (id: string) => Promise<AppointmentEntity>;
  deleteAppointment: (id: string) => Promise<void>;
}
