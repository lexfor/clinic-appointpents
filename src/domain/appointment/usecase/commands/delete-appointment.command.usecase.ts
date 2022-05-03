export class DeleteAppointmentCommandUsecase {
  appointmentID: string;

  constructor(appointmentID) {
    this.appointmentID = appointmentID;
  }
}
