import { Paper, Title } from "@mantine/core";
import PatientLayout from "../../patient.layout";

export default function EditCondition() {
  return (
    <Paper>
      <Title order={3}>Edit Condition</Title>
    </Paper>
  );
}

EditCondition.layout = PatientLayout;
