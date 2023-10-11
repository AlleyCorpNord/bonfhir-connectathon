import { Paper, Title } from "@mantine/core";
import PatientLayout from "../patient.layout";

export default function Appointments() {
  return (
    <Paper>
      <Title order={3}>Appointments</Title>
    </Paper>
  );
}

Appointments.layout = PatientLayout;
