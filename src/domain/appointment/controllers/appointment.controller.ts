import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import { CreateAppointmentFormDto } from '../dto/form/create-appointment.form.dto';
import { PatientAppointmentsViewDto } from '../dto/view/patient-appointments.view.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(
    @Body() form: CreateAppointmentFormDto,
    @Request() req,
  ) {
    if (req.user.role === 'patient') {
      return await this.appointmentService.createAppointment(form);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string, @Request() req) {
    if (req.user.role === 'doctor' || req.user.role === 'patient') {
      return await this.appointmentService.deleteAppointment(id);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Get('patient/:id')
  async getPatientAppointment(
    @Param('id') id: string,
    @Query('date') date: string,
    @Request() req,
  ): Promise<PatientAppointmentsViewDto[]> {
    if (req.user.role === 'patient') {
      return await this.appointmentService.getPatientAppointment(id, date);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Get('doctor/:id')
  async getDoctorAppointment(
    @Param('id') id: string,
    @Query('date') date: string,
    @Request() req,
  ) {
    if (req.user.role === 'doctor') {
      return await this.appointmentService.getDoctorAppointment(id, date);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }
}
