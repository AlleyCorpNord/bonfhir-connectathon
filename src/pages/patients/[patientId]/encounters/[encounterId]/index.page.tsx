import { Paper, Title } from "@mantine/core";
import PatientLayout from "../../patient.layout";

export default function Encounter() {
  return (
    <Paper>
      <Title order={3}>Encounter</Title>
    </Paper>
  );
}

Encounter.layout = PatientLayout;
