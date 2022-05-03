import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppointmentEntity } from '../entity/appointment.entity';
import { CreateAppointmentFormDto } from '../dto/form/create-appointment.form.dto';
import { CreateAppointmentCommandUsecase } from '../usecase/commands/create-appointment.command.usecase';
import { DeleteAppointmentCommandUsecase } from '../usecase/commands/delete-appointment.command.usecase';
import { IAppointmentFetcher } from '../interfaces/fetcher.interface';
import { PatientAppointmentsViewDto } from '../dto/view/patient-appointments.view.dto';

@Injectable()
export class AppointmentService {
  constructor(
    private commandBus: CommandBus,
    @Inject('APPOINTMENT_FETCHER')
    private appointmentFetcher: IAppointmentFetcher,
  ) {}

  async createAppointment(
    form: CreateAppointmentFormDto,
  ): Promise<AppointmentEntity[]> {
    return await this.commandBus.execute(
      new CreateAppointmentCommandUsecase(
        form.date,
        form.complaints,
        form.patientID,
        form.doctorID,
      ),
    );
  }

  async deleteAppointment(id: string): Promise<AppointmentEntity[]> {
    return await this.commandBus.execute(
      new DeleteAppointmentCommandUsecase(id),
    );
  }

  async getPatientAppointment(
    id: string,
    date: string,
  ): Promise<PatientAppointmentsViewDto[]> {
    return await this.appointmentFetcher.getPatientAppointment(id, date);
  }

  async getDoctorAppointment(
    id: string,
    date: string,
  ): Promise<AppointmentEntity[]> {
    return await this.appointmentFetcher.getDoctorAppointment(id, date);
  }
}
