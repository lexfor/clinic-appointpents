import { Inject, Injectable } from '@nestjs/common';
import { IAppointmentFetcher } from '../interfaces/fetcher.interface';
import { AppointmentMapper } from '../mapper/appointment.mapper';
import { AppointmentEntity } from '../entity/appointment.entity';
import { PatientAppointmentsViewDto } from '../dto/view/patient-appointments.view.dto';

@Injectable()
export class AppointmentFetcher implements IAppointmentFetcher {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: AppointmentMapper,
  ) {}

  async getDoctorAppointment(
    id: string,
    date?: string,
  ): Promise<AppointmentEntity[]> {
    let dateSort = '';
    if (date) {
      dateSort = `AND date = ${date}`;
    }
    const sql = `SELECT 
                    appointments.id,
                    appointments.date, 
                    users.first_name as firstName,
                    users.last_name as lastName,
                    cards.intolerances,
                    appointments.complaints
                    FROM appointments
                    INNER JOIN doctors ON appointments.doctor_id = doctors.id
                    INNER JOIN users ON appointments.patient_id = users.id
                    INNER JOIN cards ON users.id = cards.user_id
                    WHERE doctors.user_id = $1 ${dateSort} `;
    const { rows } = await this.pool.query(sql, [id]);
    return rows;
  }

  async getPatientAppointment(
    id: string,
    date?: string,
  ): Promise<PatientAppointmentsViewDto[]> {
    let dateSort = '';
    if (date) {
      dateSort = `AND date = ${date}`;
    }
    const sql = `SELECT 
                    appointments.id,
                    appointments.date, 
                    doctors.cabinet,
                    specializations.name as specializationName,
                    users.first_name as firstName,
                    users.last_name as lastName
                    FROM appointments
                    INNER JOIN doctors ON appointments.doctor_id = doctors.id
                    INNER JOIN specializations ON doctors.specialization_id = specializations.id
                    INNER JOIN users ON doctors.user_id = users.id
                    WHERE patient_id = $1 ${dateSort} `;
    const { rows } = await this.pool.query(sql, [id]);
    return rows;
  }
}
