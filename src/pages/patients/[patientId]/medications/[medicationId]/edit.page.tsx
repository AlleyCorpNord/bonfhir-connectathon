import { Paper, Title } from "@mantine/core";
import PatientLayout from "../../patient.layout";

export default function EditMedication() {
  return (
    <Paper>
      <Title order={3}>Edit Medication</Title>
    </Paper>
  );
}

EditMedication.layout = PatientLayout;
