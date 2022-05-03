import { AppointmentEntity } from '../entity/appointment.entity';
import { IAppointment } from '../interfaces/appointment.interface';

export class AppointmentMapper {
  toEntity(appointment: IAppointment): AppointmentEntity {
    return new AppointmentEntity(
      appointment.date.toISOString(),
      appointment.complaints,
      appointment.patient_id,
      appointment.doctor_id,
      appointment.id,
    );
  }

  toRow(appointment: AppointmentEntity): IAppointment {
    return {
      id: appointment.getID,
      date: new Date(appointment.getDate),
      complaints: appointment.getComplaints,
      patient_id: appointment.getPatientID,
      doctor_id: appointment.getDoctorID,
    };
  }
}
