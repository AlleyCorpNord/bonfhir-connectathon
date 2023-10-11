import { Paper, Title } from "@mantine/core";
import PatientLayout from "../patient.layout";

export default function Medications() {
  return (
    <Paper>
      <Title order={3}>Medications</Title>
    </Paper>
  );
}

Medications.layout = PatientLayout;
