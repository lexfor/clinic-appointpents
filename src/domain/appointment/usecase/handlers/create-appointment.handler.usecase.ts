import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { CreateAppointmentCommandUsecase } from '../commands/create-appointment.command.usecase';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IAppointmentRepository } from '../../interfaces/repository.interface';
import { IAppointment } from '../../interfaces/appointment.interface';

@CommandHandler(CreateAppointmentCommandUsecase)
export class CreateAppointmentHandlerUsecase
  implements ICommandHandler<CreateAppointmentCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('APPOINTMENT_REPOSITORY')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(command: CreateAppointmentCommandUsecase): Promise<void> {
    const date = new Date(command.date);
    const appointment: IAppointment = {
      id: uuidv4(),
      date,
      complaints: command.complaints,
      patient_id: command.patientID,
      doctor_id: command.doctorID,
    };

    await this.appointmentRepository.createAppointment(appointment);

    this.client.emit('create.appointment', {
      actionID: uuidv4(),
      appointmentID: appointment.id,
    });
  }
}
