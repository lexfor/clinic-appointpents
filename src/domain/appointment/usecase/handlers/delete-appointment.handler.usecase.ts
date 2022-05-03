import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IAppointmentRepository } from '../../interfaces/repository.interface';
import { DeleteAppointmentCommandUsecase } from '../commands/delete-appointment.command.usecase';

@CommandHandler(DeleteAppointmentCommandUsecase)
export class DeleteAppointmentHandlerUsecase
  implements ICommandHandler<DeleteAppointmentCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('APPOINTMENT_REPOSITORY')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(command: DeleteAppointmentCommandUsecase): Promise<void> {
    const appointment = await this.appointmentRepository.getAppointment(
      command.appointmentID,
    );
    if (new Date() > new Date(appointment.getDate)) {
      return;
    }
    await this.appointmentRepository.deleteAppointment(command.appointmentID);

    this.client.emit('delete.appointment', {
      actionID: uuidv4(),
      appointmentID: command.appointmentID,
    });
  }
}
