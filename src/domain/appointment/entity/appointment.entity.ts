import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class AppointmentEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly date: string;
  @ApiProperty()
  private readonly complaints: string;
  @ApiProperty()
  private readonly patientID: string;
  @ApiProperty()
  private readonly doctorID: string;

  constructor(
    date: string,
    complaints: string,
    patientID: string,
    doctorID: string,
    id: string = uuidv4(),
  ) {
    this.date = date;
    this.complaints = complaints;
    this.patientID = patientID;
    this.doctorID = doctorID;
    this.id = id;
  }

  get getID(): string {
    return this.id;
  }

  get getDate(): string {
    return this.date;
  }

  get getComplaints(): string {
    return this.complaints;
  }

  get getPatientID(): string {
    return this.patientID;
  }

  get getDoctorID(): string {
    return this.doctorID;
  }
}
