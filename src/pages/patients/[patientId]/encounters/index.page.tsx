import { Paper, Title } from "@mantine/core";
import PatientLayout from "../patient.layout";

export default function Encounters() {
  return (
    <Paper>
      <Title order={3}>Encounters</Title>
    </Paper>
  );
}

Encounters.layout = PatientLayout;
