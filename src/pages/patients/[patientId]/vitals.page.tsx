import { Paper, Title } from "@mantine/core";
import PatientLayout from "./patient.layout";

export default function Vitals() {
  return (
    <Paper>
      <Title order={3}>Vitals</Title>
    </Paper>
  );
}

Vitals.layout = PatientLayout;
