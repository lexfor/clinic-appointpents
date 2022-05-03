import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateAppointmentHandlerUsecase } from './usecase/handlers/create-appointment.handler.usecase';
import { poolFactory } from '../../factories/database.factory';
import { AppointmentRepository } from './entity/appointment.repository';
import { AppointmentFetcher } from './view/appointment.fetcher';
import { AppointmentMapper } from './mapper/appointment.mapper';
import { AppointmentService } from './services/appointment.service';
import { AppointmentController } from './controllers/appointment.controller';
import { DeleteAppointmentHandlerUsecase } from './usecase/handlers/delete-appointment.handler.usecase';

const handlers = [
  CreateAppointmentHandlerUsecase,
  DeleteAppointmentHandlerUsecase,
];

@Module({
  imports: [ConfigModule.forRoot(), CqrsModule],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    {
      provide: 'APPOINTMENT_REPOSITORY',
      useClass: AppointmentRepository,
    },
    {
      provide: 'APPOINTMENT_FETCHER',
      useClass: AppointmentFetcher,
    },
    AppointmentMapper,
    AppointmentService,
    ...handlers,
  ],
  controllers: [AppointmentController],
  exports: [AppointmentMapper],
})
export class AppointmentModule {}
