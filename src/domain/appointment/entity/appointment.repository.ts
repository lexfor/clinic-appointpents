import { Inject, Injectable } from '@nestjs/common';
import { AppointmentMapper } from '../mapper/appointment.mapper';
import { AppointmentEntity } from './appointment.entity';
import { IAppointmentRepository } from '../interfaces/repository.interface';
import { IAppointment } from '../interfaces/appointment.interface';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: AppointmentMapper,
  ) {}

  async createAppointment(
    appointment: IAppointment,
  ): Promise<AppointmentEntity> {
    const sql = `INSERT INTO appointments (
                 id, 
                 date,
                 complaints,
                 patient_id,
                 doctor_id
                 ) VALUES ($1, $2, $3, $4, $5);`;
    await this.pool.query(sql, [
      appointment.id,
      appointment.date,
      appointment.complaints,
      appointment.patient_id,
      appointment.doctor_id,
    ]);

    return this.mapper.toEntity(appointment);
  }

  async deleteAppointment(id: string): Promise<void> {
    const sql = `DELETE FROM appointments WHERE id = $1`;
    await this.pool.query(sql, [id]);
  }

  async getAppointment(id: string): Promise<AppointmentEntity> {
    const sql = `SELECT *  FROM appointments WHERE id = $1`;
    const { rows } = await this.pool.query(sql, [id]);
    const [appointment] = rows;
    return this.mapper.toEntity(appointment);
  }
}
