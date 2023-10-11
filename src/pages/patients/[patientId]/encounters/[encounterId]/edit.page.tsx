import { Paper, Title } from "@mantine/core";
import PatientLayout from "../../patient.layout";

export default function EditEncounter() {
  return (
    <Paper>
      <Title order={3}>Edit Encounter</Title>
    </Paper>
  );
}

EditEncounter.layout = PatientLayout;
