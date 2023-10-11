import { Paper, Title } from "@mantine/core";
import PatientLayout from "../patient.layout";

export default function Conditions() {
  return (
    <Paper>
      <Title order={3}>Conditions</Title>
    </Paper>
  );
}

Conditions.layout = PatientLayout;
