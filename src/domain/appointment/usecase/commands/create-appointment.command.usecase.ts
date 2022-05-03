export class CreateAppointmentCommandUsecase {
  date: string;

  complaints: string;

  patientID: string;

  doctorID: string;

  constructor(date, complaints, patientID, doctorID) {
    this.date = date;
    this.complaints = complaints;
    this.patientID = patientID;
    this.doctorID = doctorID;
  }
}
