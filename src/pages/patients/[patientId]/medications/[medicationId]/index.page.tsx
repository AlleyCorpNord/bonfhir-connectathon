import { Paper, Title } from "@mantine/core";
import PatientLayout from "../../patient.layout";

export default function Medication() {
  return (
    <Paper>
      <Title order={3}>Medication</Title>
    </Paper>
  );
}

Medication.layout = PatientLayout;
